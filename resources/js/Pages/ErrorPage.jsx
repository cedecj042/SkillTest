import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import '../../css/auth.css';

export default function ErrorPage({title,message}){
    const { props } = usePage();
    return(
        <GuestLayout>
            <Head title={title}/>
            <div className="container-fluid background">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col text-center">
                        <img src="/assets/stop.svg" alt="" height={"450"}/>
                        <h3>Oops..</h3>
                        <p>{message}</p>
                        <Link className="btn btn-primary d-inline-flex" href={route('todo.index')}>
                            Redirect back to users
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}