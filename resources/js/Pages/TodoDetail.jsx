import Navbar from "@/Components/Navbar";
import GuestLayout from "@/Layouts/GuestLayout";
import { useRequest } from "@/Library/hooks";
import { Head } from "@inertiajs/react";

export default function TodoDetail({ todo }) {
    const {isProcessing,getRequest} = useRequest();
    const handleBackClick = async () => {
        getRequest('todos.index', {});
    };
    return (
        <GuestLayout>
            <Head title="Todos" />
            <Navbar />
            <div className="container">
                <div className="row vh-100 p-5">
                    <div className="col-12">
                        <div className="btn-toolbar mb-3">
                            <button
                                className="btn btn-transparent"
                                disabled={isProcessing}
                                onClick={handleBackClick}
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <h4 className="mb-0 align-content-center">Todo Detail</h4>
                        </div>
                        <hr />
                        <h2>{todo.data.title}</h2>
                        <div className="px-3 py-2 mb-2 bg-light rounded">
                            <label className="text-secondary" style={{ fontSize: '.8rem' }}>Description</label>
                            <p className="m-0">{todo.data.description}</p>
                        </div>
                        <div className="d-grid grid-2">
                            <div className="px-3 py-2 bg-light rounded">
                                <label className="text-secondary" style={{ fontSize: '.8rem' }}>Created At</label>
                                <p className="m-0">{todo.data.created_at}</p>
                            </div>
                            <div className="px-3 py-2 bg-light rounded">
                                <label className="text-secondary" style={{ fontSize: '.8rem' }}>Due Date</label>
                                <p className="m-0">{todo.data.due_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}