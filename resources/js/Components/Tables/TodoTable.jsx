
import { useState } from "react";
import "../../../css/table.css";
import Modal from "../Modal";
import { useRequest } from "@/Library/hooks";
import EditTodoForm from "../Forms/EditTodoForm";
import DeleteForm from "../Forms/DeleteForm";
import { toast } from "sonner";

export default function TodoTable({ todos }) {
    console.log(todos);

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    console.log(selectedTodo)
    const openEditModal = (todo) => {
        setEditModal(true);
        setSelectedTodo(todo);
    }
    const closeEditModal = () => {
        setEditModal(false);
    }
    const openDeleteModal = (todo) => {
        setDeleteModal(true);
        setSelectedTodo(todo);
    }
    const closeDeleteModal = () => {
        setDeleteModal(false);
    }
    const { isProcessing, deleteRequest, putRequest } = useRequest();

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    const deleteTodo = async (todo) => {
        deleteRequest("todo.delete", todo.todo_id, {
            onSuccess: (data) => {
                toast.success("Todo deleted successfully", { duration: 3000 });
                closeDeleteModal();
            },
            onError: () => {
                toast.error("Failed to delete todo", { duration: 3000 });
            },
        }); 
    };
    return (
        <>
            <table className="table todos-table">
                <thead>
                    <tr>
                        {/* <th>Todo Id</th> */}
                        <th>Title</th>
                        <th className="desc">Description</th>
                        <th>Created At</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={index}>
                            {/* <td>{todo.todo_id}</td> */}
                            <td>{todo.title}</td>
                            <td>{truncateText(todo.description, 80)}</td>
                            <td>{todo.created_at}</td>
                            <td>{todo.due_date}</td>
                            <td>
                                <div className="d-inline-flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEditModal(todo)
                                        }}
                                        className="btn btn-outline-primary d-flex justify-content-center align-items-left"
                                    >
                                        <span className="material-symbols-outlined align-self-center">
                                            edit_square
                                        </span>{" "}
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openDeleteModal(todo);
                                        }}
                                        className="btn btn-outline-danger d-flex justify-content-center align-items-left"
                                        disabled={isProcessing}
                                    >
                                        <span className="material-symbols-outlined">delete</span> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                modalTitle={"Edit Todo"}
                onClose={closeEditModal}
                modalSize={"modal-lg"}
                show={editModal}
            >
                <EditTodoForm closeModal={closeEditModal} todo={selectedTodo} />
            </Modal>

            <Modal
                modalTitle={"Delete Todo"}
                onClose={closeDeleteModal}
                show={deleteModal}
            >
                {selectedTodo && (
                    <DeleteForm onClose={closeDeleteModal} onDelete={() => deleteTodo(selectedTodo)} isProcessing={isProcessing}
                    title={selectedTodo.title}
                />
                )}
            </Modal>
        </>
    )
}