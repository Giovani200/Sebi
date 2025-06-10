'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();

                if (res.ok && data.isAuthenticated) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Erreur récupération utilisateur:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });

            if (res.ok) {
                router.push('/login');
            }
        } catch (error) {
            console.error('Erreur déconnexion:', error);
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">Administration Sebi</h1>
            </div>

            <div className="flex items-center">
                {isLoading ? (
                    <div className="h-10 w-40 bg-gray-200 rounded-md animate-pulse"></div>
                ) : user ? (
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 focus:outline-none"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {user.firstName?.charAt(0) || 'A'}
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-700">{user.firstName || 'Admin'}</p>
                                <p className="text-xs text-gray-500">Administrateur</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => router.push('/login')}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Connexion
                    </button>
                )}
            </div>
        </header>
    );
}
