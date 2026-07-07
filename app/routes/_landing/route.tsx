import React from 'react';
import { Outlet } from 'react-router';

export default function Landing() {
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <Outlet />
        </main>
    );
}