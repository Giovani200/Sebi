'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const res = await fetch('/api/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (!res.ok) return setMessage(data.message);
        setMessage('Email de réinitialisation envoyé (si le compte existe).');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm w-full">
            <h2 className="text-xl font-bold">Mot de passe oublié ?</h2>
            <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Envoyer le lien
            </button>
            {message && <p className="text-sm text-gray-700">{message}</p>}

            <div className="text-sm mt-2">
                <p>Tu te souviens de ton mot de passe ? <Link href="/login" className="text-blue-500 underline">Retour à la connexion</Link></p>
            </div>

        </form>
    );
}
