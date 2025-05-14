'use client';
import Link from 'next/link';

export default function ResetSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center animate-fadeInUp" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
      <div className="bg-orange-50 p-8 rounded-lg shadow-lg w-96 animate-scaleIn text-center">
        <div className="text-green-500 text-5xl mb-4 animate-scaleIn">✓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-slideIn">
          Mot de passe réinitialisé !
        </h2>
        <p className="text-gray-600 mb-6 animate-fadeInUp animate-delay-100">
          Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </p>
        <Link 
          href="/login"
          className="inline-block bg-green-200 text-gray-700 py-2 px-6 rounded hover:bg-green-300 transition-all duration-300 animate-fadeInUp animate-delay-200"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
} 