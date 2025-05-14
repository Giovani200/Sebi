'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique pour envoyer l'email
    console.log(email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center animate-fadeInUp" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
        <div className="bg-orange-50 p-8 rounded-lg shadow-lg w-96 animate-scaleIn">
          <div className="text-green-500 text-5xl mb-4 animate-scaleIn">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-slideIn">Email envoyé !</h2>
          <p className="text-gray-600 mb-6 animate-fadeInUp animate-delay-100">
            Un lien de réinitialisation a été envoyé à votre adresse email.
          </p>
          <Link href="/login" className="text-blue-600 hover:text-blue-800 transition-colors animate-fadeInUp animate-delay-200">
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center animate-fadeInUp" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
      <div className="bg-orange-50 p-8 rounded-lg shadow-lg w-96 animate-scaleIn">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-slideIn">Mot de passe oublié ?</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-fadeInUp animate-delay-100">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="VOTRE EMAIL"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-200 text-gray-700 py-2 rounded hover:bg-green-300 transition-all duration-300 mt-6 animate-fadeInUp animate-delay-200"
          >
            Envoyer le lien
          </button>

          <div className="mt-4 text-center animate-fadeInUp animate-delay-300">
            <Link href="/login" className="text-blue-600 hover:text-blue-800 transition-colors">
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 