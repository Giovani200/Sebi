'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (!res.ok) return setMessage(data.message);

        setMessage('Connexion réussie !');
        // Rediriger ou mettre à jour l'état global ici

        // Déclencher l'événement pour afficher la notification
        window.dispatchEvent(new CustomEvent('showNotification', { 
            detail: { message: 'Connexion réussie!', type: 'success' } 
        }));
        
        // Rediriger vers la page d'accueil
        router.push('/');
    };

    return (
        <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed" style={{ 
            backgroundImage: 'url(/images/foret.jpg)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="bg-orange-50 p-8 rounded-lg shadow-lg w-96 animate-scaleIn">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-slideIn">Connexion</h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="animate-fadeInUp animate-delay-100">
                        <input
                            type="email"
                            placeholder="EMAIL"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
                            required
                        />
                    </div>
                    
                    <div className="animate-fadeInUp animate-delay-200">
                        <input
                            type="password"
                            placeholder="MOT DE PASSE"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-green-200 text-gray-700 py-2 rounded hover:bg-green-300 transition-all duration-300 mt-6 animate-fadeInUp animate-delay-300"
                    >
                        Se connecter
                    </button>
                    
                    {message && <p className="text-sm text-red-500 mt-2 animate-fadeInUp">{message}</p>}
                    
                    <div className="mt-6 text-center space-y-2">
                        <Link 
                            href="/register" 
                            className="block text-blue-600 hover:text-blue-800 transition-colors animate-fadeInUp animate-delay-300"
                        >
                            Pas encore inscrit ? Créer un compte
                        </Link>
                        <Link 
                            href="/forgot-password" 
                            className="block text-blue-600 hover:text-blue-800 transition-colors animate-fadeInUp animate-delay-300"
                        >
                            Mot de passe oublié ? Réinitialiser
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}