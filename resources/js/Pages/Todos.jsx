import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import '../../css/users.css';
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import { useState } from "react";
import TodoTable from "@/Components/Tables/TodoTable";
import AddTodoForm from "@/Components/Forms/AddTodoForm";

export default function Todos({ todos }) {
    console.log(todos);
    const [modal,setModal] = useState(false);
    const openModal = ()=>{
        setModal(true);
    }
    const closeModal = () =>{
        setModal(false)
    };
    return (
        <>
            <Head title="Users" />
            <Navbar />
            <div className="container p-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex flex-row justify-content-between mb-3">
                            <h3>List of Todos</h3>
                            <button className="btn btn-primary" onClick={openModal}>Add Todo</button>
                        </div>
                        <div className="table-header">
                            <TodoTable todos={todos.data} />
                        </div>
                        <Pagination links={todos.meta.links} />

                    </div>
                </div>
            </div>
            <Modal
                modalTitle={"Add Todo"}
                onClose={closeModal}
                show={modal}
                modalSize={"modal-lg"}
            >
                <AddTodoForm closeModal={closeModal}/>
                
            </Modal>
        </>
    );
}