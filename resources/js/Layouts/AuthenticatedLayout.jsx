import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import GuestLayout from './GuestLayout';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <GuestLayout>
            <Head title={title} />
            <div className="container">
                <div className="row h-100">
                    {children}
                </div>
            </div>
        </GuestLayout>
    );
}
