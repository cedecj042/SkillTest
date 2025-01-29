import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;
    return (
        <nav className="navbar navbar-custom  bg-body-tertiary d-flex justify-content-end">
            <div className="d-flex flex-row pe-5 py-1 gap-1">
                <span className="ms-2 align-content-center">
                    Hi, {auth.user.firstname}
                </span>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button" 
                    className="btn text-main fw-semibold"
                >
                    Logout
                </Link>
            </div>
        </nav>
    )
}