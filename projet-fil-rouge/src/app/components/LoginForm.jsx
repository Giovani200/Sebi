'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

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
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Se connecter
            </button>
            {message && <p className="text-sm text-red-500">{message}</p>}

            <div className="text-sm mt-2">
                <p>Pas encore inscrit ? <Link href="/register" className="text-blue-500 underline">Créer un compte</Link></p>
                <p className="mt-1">Mot de passe oublié ? <Link href="/forgot-password" className="text-blue-500 underline">Réinitialiser</Link></p>
            </div>

        </form>
    );
}
