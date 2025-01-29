import { Link, usePage } from "@inertiajs/react";
import '../../css/nav.css';

export default function Navbar({ title }) {
    const { auth } = usePage().props;
    console.log(title)
    return (
        <nav className="navbar navbar-custom  bg-body-tertiary d-flex justify-content-end">
            <div className="d-flex flex-row pe-5 py-1 gap-1">
                <div className="me-5 d-flex glex-row gap-2">
                    <Link
                        href={route('users.index')}
                        method="get"
                        as="button"
                        className={`link btn fw-semibold ${title === 'Users' ? 'active' : ''}`}
                    >
                        Users
                    </Link>
                    <Link
                        href={route('todos.index')}
                        method="get"
                        as="button"
                        className={`link btn fw-semibold ${title === 'Todos' ? 'active' : ''}`}
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