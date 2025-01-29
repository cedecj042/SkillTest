
import LoginForm from '@/Components/Forms/LoginForm';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import '../../../css/auth.css';

export default function Login({ status, canResetPassword }) {


    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="container-fluid vh-100 background">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-sm-6 col-md-5 col-lg-4 h-50">
                        <div className="d-flex flex-column gap-3 justify-content-between">
                            <div>
                                <h2 className='mb-3'>Welcome</h2>
                                <LoginForm />
                            </div>
                            <label className='text-center'>Not yet registered?
                                <a
                                    href={route("signup")}
                                    className="text-main ps-2 text-decoration-none fw-bold"
                                >
                                    Signup
                                </a>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
