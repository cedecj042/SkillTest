import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import '../../css/users.css';
import UserTable from "@/Components/Tables/UserTable";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import { useState } from "react";
import AddUserForm from "@/Components/Forms/AddUserForm";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Users({ users,title }) {
    console.log(users);
    const {modal,setModal} = useState(false);
    const openModal = ()=>{
        setModal(true);
    }
    const closeModal = () => setModal(false);
    return (
        <GuestLayout>
            <Head title={title} />
            <Navbar title={title}/>
            <div className="container p-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex flex-row justify-content-between mb-3">
                            <h3>List of Users</h3>
                            {/* <button className="btn btn-primary" onClick={openModal}>Add User</button> */}
                        </div>
                        <div className="table-header">
                            <UserTable users={users.data} />
                        </div>
                        <Pagination links={users.meta.links} />
                    </div>
                </div>
            </div>
            <Modal
                modalTitle={"Add User"}
                onClose={closeModal}
                show={modal}
            >
                <AddUserForm onClose={closeModal}/>
                
            </Modal>
        </GuestLayout>
    );
}