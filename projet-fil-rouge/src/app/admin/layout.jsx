'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const res = await fetch('/api/auth/check-admin', {
                    credentials: 'include'
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        router.push('/admin-login');
                        return;
                    }
                    throw new Error('Accès non autorisé');
                }

                const data = await res.json();

                if (!data.isAdmin) {
                    throw new Error('Vous n\'avez pas les droits administrateur');
                }

                setUser(data.user);
                setIsAdmin(true);
                setIsLoading(false);
            } catch (error) {
                console.error('Erreur vérification admin:', error);
                setError(error.message);
                setIsLoading(false);

                if (error.message.includes('droits administrateur')) {
                    router.push('/');
                } else {
                    router.push('/admin-login');
                }
            }
        };

        checkAdminStatus();
    }, [router]);

    const navItems = [
        { name: 'Tableau de bord', path: '/admin', icon: '📊' },
        { name: 'Utilisateurs', path: '/admin/users', icon: '👥' },
        
        { name: 'Jeux', path: '/games', icon: '🎮' },
    ];

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/');
        } catch (error) {
            console.error('Erreur déconnexion:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <div className="inline-block animate-spin h-12 w-12 border-4 border-blue-300 border-t-blue-600 rounded-full mb-4"></div>
                    <p className="text-lg text-gray-700 font-medium">Vérification des droits...</p>
                </div>
            </div>
        );
    }

    if (error || !isAdmin) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
                    <div className="text-red-500 text-6xl mb-6">🚫</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Accès refusé</h1>
                    <p className="text-gray-600 mb-6">{error || 'Vous n\'avez pas les droits d\'accès'}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 shadow-2xl`}>
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        {!sidebarCollapsed && (
                            <div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                    Admin Sebi
                                </h2>
                                <p className="text-gray-400 text-sm mt-1">Panel d'administration</p>
                            </div>
                        )}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                        >
                            {sidebarCollapsed ? '→' : '←'}
                        </button>
                    </div>
                </div>

                <nav className="mt-8 px-4">
                    <div className="space-y-2">
                        {navItems.map((item) => (
                            <Link key={item.path} href={item.path}>
                                <div className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${pathname === item.path
                                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
                                        : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                                    }`}>
                                    <span className="text-xl">{item.icon}</span>
                                    {!sidebarCollapsed && <span className="ml-3 font-medium">{item.name}</span>}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-700">
                        <Link href="/">
                            <div className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
                                <span className="text-xl">🏠</span>
                                {!sidebarCollapsed && <span className="ml-3 font-medium">Retour au site</span>}
                            </div>
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Administration Sebi</h1>
                            <p className="text-gray-500 text-sm">Gérez votre plateforme éducative</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            {user && (
                                <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold">
                                        {user.firstName?.charAt(0) || 'A'}
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="text-sm font-medium text-gray-700">{user.firstName}</p>
                                        <p className="text-xs text-gray-500">Administrateur</p>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
                            >
                                <span>🚪</span>
                                <span className="hidden md:inline">Déconnexion</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
