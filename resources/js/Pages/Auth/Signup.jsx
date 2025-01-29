import SignupForm from '@/Components/Forms/SignupForm';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/auth.css';

export default function Signup() {


    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="container-fluid background">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-6 d-flex flex-column gap-2 justify-content-between gap-5">
                        <div>
                            <h2 className='mb-3'>Signup</h2>
                            <SignupForm />
                        </div>
                        <label className='text-center'>Already signed up?
                            <a
                                href={route("login")}
                                className="text-main ps-2 text-decoration-none fw-bold"
                            >
                                Login
                            </a>
                        </label>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}
