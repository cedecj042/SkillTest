
import { useState } from "react";
import "../../../css/table.css";
import Modal from "../Modal";
import EditUserForm from "../Forms/EditUserForm";
import { useRequest } from "@/Library/hooks";

export default function UserTable({ users }) {
    // console.log(users);

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const openEditModal = (user) => {
        setEditModal(true);
        setSelectedUser(user);
    }
    const closeEditModal = () => {
        setEditModal(false);
    }
    const { isProcessing, deleteRequest, putRequest } = useRequest();
    return (
        <>
            <table className="table students-table">
                <thead>
                    <tr>
                        {/* <th>User Id</th> */}
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Created At</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            {/* <td>{user.user_id}</td> */}
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>
                            {/* <td>
                                <div className="d-inline-flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEditModal(user)
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
                                            openModal(user);
                                        }}
                                        className="btn btn-outline-danger d-flex justify-content-center align-items-left"
                                        disabled={isProcessing}
                                    >
                                        <span className="material-symbols-outlined">delete</span> Delete
                                    </button>
                                </div>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                modalTitle={"Edit User"}
                onClose={closeEditModal}
                show={editModal}
            >
                <EditUserForm closeModal={closeEditModal} user={selectedUser} />
            </Modal>
        </>
    )
}