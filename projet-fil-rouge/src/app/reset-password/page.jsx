'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

  // Correction: Utiliser le bon endpoint
  const res = await fetch('/api/scores/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, newPassword }),
  });

  const data = await res.json();
  
  if (!res.ok) return setMessage(data.message);
  
  // Message de succès
  setMessage("Mot de passe réinitialisé avec succès !");
  
  // Redirection après 2 secondes
  setTimeout(() => router.push('/login'), 2000);
};

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#fdf2dd] to-amber-50 py-16 px-4 flex items-center justify-center relative overflow-auto">
      {/* Éléments décoratifs */}
      <div className="absolute top-[15%] left-[10%] w-36 h-16 bg-orange-100/40 rounded-xl transform rotate-12"></div>
      <div className="absolute bottom-[30%] right-[15%] w-20 h-20 bg-yellow-100/30 rounded-full"></div>
      <div className="absolute top-[40%] right-[20%] w-24 h-12 bg-amber-100/20 rounded-lg transform -rotate-6"></div>
      
      {/* Étoiles avec animations */}
      <div className="absolute top-[20%] right-[40%] text-3xl animate-pulse opacity-60">✨</div>
      <div className="absolute bottom-[25%] left-[20%] text-4xl animate-float-slow animation-delay-700 opacity-50">⭐</div>
      <div className="absolute top-[60%] right-[35%] text-2xl animate-ping animation-delay-1000 opacity-40">⭐</div>
      <div className="absolute bottom-[45%] left-[30%] text-xl animate-float-slow animation-delay-300 opacity-40">✨</div>
      
      <div className="bg-white/90 p-8 rounded-tl-3xl rounded-br-3xl shadow-lg max-w-md w-full relative border-2 border-amber-200 animate-scaleIn">
        <div className="absolute -top-8 -right-8 w-24 h-24 transform rotate-12">
          <Image
            src="/images/SEBI.png"
            alt="Sebi la gazelle"
            width={90}
            height={90}
            className="object-contain animate-bounce-slow"
          />
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-amber-50 p-3 rounded-lg mb-6 shadow-inner">
          <h2 className="text-2xl font-bold text-center text-orange-600 drop-shadow-sm animate-slideIn">
            Nouveau mot de passe
          </h2>
          <p className="text-center text-orange-500 text-sm mt-1">
            Choisissez un mot de passe sécurisé
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fadeInUp animate-delay-100 bg-orange-50/50 rounded-xl p-4">
            <label className="text-sm text-orange-700 font-medium mb-1 block">
              Nouveau mot de passe
            </label>
            <div className="flex items-center border-b-2 border-orange-300">
              <span className="text-orange-400 mr-2">🔒</span>
              <input
                type="password"
                placeholder="Votre nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full text-gray-700 p-2 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                required
              />
            </div>
          </div>

          <div className="animate-fadeInUp animate-delay-200 bg-orange-50/50 rounded-xl p-4">
            <label className="text-sm text-orange-700 font-medium mb-1 block">
              Confirmation
            </label>
            <div className="flex items-center border-b-2 border-orange-300">
              <span className="text-orange-400 mr-2">🔐</span>
              <input
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-gray-700 p-2 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                required
              />
            </div>
          </div>

          {message && (
            <div className={`${message.includes('succès') ? 'bg-green-50 border-green-500 text-green-700' : 'bg-orange-50 border-orange-500 text-orange-700'} border-r-4 p-4 rounded-xl animate-fadeInUp flex items-center`}>
              <span className="mr-2 text-xl">{message.includes('succès') ? '✅' : '⚠️'}</span>
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-orange-300 to-amber-400 hover:from-orange-400 hover:to-amber-500 
                     text-white font-bold py-3 px-6 rounded-tl-xl rounded-br-xl transition-all duration-300 
                     hover:scale-105 shadow-md border border-orange-200 animate-fadeInUp animate-delay-300 flex items-center justify-center"
          >
            <span className="mr-2">🔄</span>
            Réinitialiser mon mot de passe
          </button>
          
          <div className="text-center mt-4 animate-fadeInUp animate-delay-300">
            <Link 
              href="/login" 
              className="text-orange-600 hover:text-orange-800 transition-colors text-sm"
            >
              <span className="border-b border-dashed border-orange-300">
                Retour à la connexion
              </span>
            </Link>
          </div>
        </form>

        {/* Éléments décoratifs */}
        <div className="absolute -top-2 -left-2 text-amber-300 text-xl animate-spin-slow">✨</div>
        <div className="absolute -bottom-2 -right-2 text-amber-300 text-xl animate-float-slow animation-delay-500">⭐</div>
      </div>
    </div>
  );
}