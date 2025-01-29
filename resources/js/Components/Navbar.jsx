import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;
    return (
        <nav className="navbar navbar-custom  bg-body-tertiary d-flex justify-content-end">
            <div className="d-flex flex-row pe-5 py-1 gap-1">
                <div className="me-5">
                    <Link
                    href={route('users.index')}
                    method="get"
                    as="button"
                    className="btn text-main fw-semibold"
                >
                    Users
                </Link>
                <Link
                    href={route('todos.index')}
                    method="get"
                    as="button"
                    className="btn text-main fw-semibold"
                >
                    Todos
                </Link>
                </div>
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