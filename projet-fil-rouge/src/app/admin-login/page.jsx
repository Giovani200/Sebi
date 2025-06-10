'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Veuillez remplir tous les champs');
            return;
        }

        try {
            setIsLoading(true);
            setMessage('');

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur de connexion');
            }

            const adminCheck = await fetch('/api/auth/check-admin');
            const adminData = await adminCheck.json();

            if (!adminCheck.ok || !adminData.isAdmin) {
                setMessage('Vous n\'avez pas les droits administrateur');
                await fetch('/api/auth/logout', { method: 'POST' });
                return;
            }

            router.push('/admin');

        } catch (error) {
            console.error('Erreur de connexion:', error);
            setMessage(error.message || 'Erreur de connexion');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-amber-200 rounded-full opacity-30 animate-bounce"></div>

            <div className="max-w-md w-full">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-orange-200">
                    {/* Logo/Avatar Sebi */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <Image
                                src="/images/sebi.webp"
                                alt="Sebi Admin"
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                            Espace Administrateur
                        </h2>
                        <p className="text-gray-600 mt-2">Connectez-vous pour gérer Sebi</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Adresse e-mail
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400">📧</span>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                    placeholder="admin@sebi.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400">🔒</span>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <div className="flex items-center">
                                    <span className="text-red-500 mr-2">⚠️</span>
                                    <p className="text-red-700 text-sm">{message}</p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-300 ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                                }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    Connexion en cours...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span className="mr-2">🚀</span>
                                    Se connecter
                                </div>
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <Link
                            href="/"
                            className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-200 flex items-center justify-center"
                        >
                            <span className="mr-2">🏠</span>
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
