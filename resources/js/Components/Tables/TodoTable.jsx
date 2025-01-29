
import { useState } from "react";
import "../../../css/table.css";
import Modal from "../Modal";
import { useRequest } from "@/Library/hooks";
import EditTodoForm from "../Forms/EditTodoForm";
import DeleteForm from "../Forms/DeleteForm";
import { toast } from "sonner";

export default function TodoTable({ todos }) {

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
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
    const openModal = (todo) => {
        setModal(true);
        setSelectedTodo(todo);
    }
    const closeModal = () => {
        setModal(false);
    }

    const { isProcessing, deleteRequest, putRequest,getRequest } = useRequest();


    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };



    const deleteTodo = async (todo) => {
        deleteRequest("todos.delete", todo.todo_id, {
            onSuccess: (data) => {
                toast.success("Todo deleted successfully", { duration: 3000 });
                closeDeleteModal();
            },
            onError: () => {
                toast.error("Failed to delete todo", { duration: 3000 });
            },
        });
    };

    const openTodoDetail = async (e,todo_id) =>{
        // e.preventdefault();
        console.log(todo_id);
        getRequest("todos.show",todo_id,{})
    }

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
                    {todos.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No todos found. Add some new todos!
                            </td>
                        </tr>
                    ) : (
                        todos.map((todo, index) => (
                            <tr key={index} className="clickable" onClick={(e) => {openTodoDetail(e,todo.todo_id)}}>
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
                        ))
                    )}
                    
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

            {/* <Modal
                modalTitle={"Todo"}
                onClose={closeModal}
                show={modal}
            >
                {selectedTodo && (
                    <>
                        <div className="modal-body">
                            <h2>{selectedTodo.title}</h2>
                            <div className="px-3 py-2 mb-2 bg-light rounded">
                                <label className="text-secondary" style={{ fontSize: '.8rem' }}>Description</label>
                                <p className="m-0">{selectedTodo.description}</p>
                            </div>
                            <div className="d-grid grid-2">
                                <div className="px-3 py-2 bg-light rounded">
                                    <label className="text-secondary" style={{ fontSize: '.8rem' }}>Created At</label>
                                    <p className="m-0">{selectedTodo.created_at}</p>
                                </div>
                                <div className="px-3 py-2 bg-light rounded">
                                    <label className="text-secondary" style={{ fontSize: '.8rem' }}>Due Date</label>
                                    <p className="m-0">{selectedTodo.due_date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={closeModal} className="btn btn-secondary">
                                Go Back
                            </button>
                        </div>
                    </>
                )}

            </Modal> */}
        </>
    )
}