'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { name: 'Tableau de bord', path: '/admin', icon: 'chart-pie' },
        { name: 'Utilisateurs', path: '/admin/users', icon: 'users' },
        { name: 'Statistiques', path: '/admin/stats', icon: 'chart-bar' },
        { name: 'Jeux', path: '/admin/games', icon: 'gamepad' },
    ];

    return (
        <div className={`${collapsed ? 'w-20' : 'w-64'} bg-gray-800 text-white h-screen transition-all duration-300 fixed left-0 top-0 z-10`}>
            <div className="p-4 flex items-center justify-between">
                <div className={`text-2xl font-bold ${collapsed ? 'hidden' : 'block'}`}>
                    Admin Sebi
                </div>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-400 hover:text-white"
                >
                    {collapsed ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    )}
                </button>
            </div>

            <nav className="mt-8">
                <ul className="space-y-2 px-4">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link href={item.path}>
                                <div className={`flex items-center p-3 rounded-md ${pathname === item.path ? 'bg-blue-700' : 'hover:bg-gray-700'
                                    }`}>
                                    <i className={`fas fa-${item.icon} ${collapsed ? 'text-xl' : 'mr-3'}`}></i>
                                    {!collapsed && <span>{item.name}</span>}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={`absolute bottom-8 ${collapsed ? 'px-4 w-full' : 'px-8 w-64'}`}>
                <Link href="/">
                    <div className="flex items-center p-3 rounded-md hover:bg-gray-700">
                        <i className="fas fa-home mr-3"></i>
                        {!collapsed && <span>Retour au site</span>}
                    </div>
                </Link>
            </div>
        </div>
    );
}
