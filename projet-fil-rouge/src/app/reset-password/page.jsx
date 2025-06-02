'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!token || !email) {
      return setMessage("Lien invalide ou expiré.");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("Les mots de passe ne correspondent pas.");
    }

    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) return setMessage(data.message);
    setMessage("Mot de passe réinitialisé avec succès !");
    setTimeout(() => router.push('/login'), 2000);
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-slideIn">Réinitialiser le mot de passe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-fadeInUp animate-delay-100">
            <input
              type="password"
              placeholder="NOUVEAU MOT DE PASSE"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
              required
            />
          </div>

          <div className="animate-fadeInUp animate-delay-200">
            <input
              type="password"
              placeholder="CONFIRMEZ LE MOT DE PASSE"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-200 text-gray-700 py-2 rounded hover:bg-green-300 transition-all duration-300 mt-6 animate-fadeInUp animate-delay-300"
          >
            Réinitialiser
          </button>
          
          {message && (
            <p className={`text-sm ${message.includes('succès') ? 'text-green-600' : 'text-red-500'} mt-2 animate-fadeInUp text-center`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}