import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <>
            <Head title={title} />
            <div className="container-fluid">
                <div className="row h-100">
                    {children}
                </div>
            </div>
        </>
    );
}
