'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

    // Éléments décoratifs avec variation
    const decorativeElements = (
        <>
            {/* Formes géométriques variées */}
            <div className="absolute top-[15%] left-[10%] w-36 h-16 bg-orange-100/30 rounded-xl transform rotate-12"></div>
            <div className="absolute bottom-[30%] right-[15%] w-20 h-20 bg-yellow-100/30 rounded-full"></div>
            <div className="absolute top-[40%] right-[20%] w-24 h-12 bg-amber-100/20 rounded-lg transform -rotate-6"></div>
            
            {/* Étoiles avec animations différentes */}
            <div className="absolute top-[20%] right-[40%] text-3xl animate-pulse opacity-60">✨</div>
            <div className="absolute bottom-[25%] left-[20%] text-4xl animate-float-slow animation-delay-700 opacity-50">⭐</div>
            <div className="absolute top-[60%] right-[35%] text-2xl animate-ping animation-delay-1000 opacity-40">⭐</div>
            <div className="absolute bottom-[45%] left-[30%] text-xl animate-float-slow animation-delay-300 opacity-40">✨</div>
        </>
    );

    // Mascotte Sebi avec variation
    const sebiMascot = (
        <div className="absolute -top-8 -right-8 w-24 h-24 transform rotate-12">
            <Image
                src="/images/SEBI.png"
                alt="Sebi la gazelle"
                width={90}
                height={90}
                className="object-contain animate-bounce-slow"
            />
        </div>
    );

    // Affichage du succès avec un style légèrement varié
    if (message && !message.includes('erreur') && !message.includes('Erreur')) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-[#fdf2dd] to-amber-50 py-16 px-4 flex items-center justify-center relative overflow-auto">
                {decorativeElements}
                
                <div className="bg-white/90 p-8 rounded-3xl shadow-lg max-w-md w-full relative border-2 border-amber-200 transform rotate-1 animate-scaleIn">
                    {sebiMascot}
                    
                    <div className="flex justify-center mb-4 animate-scaleIn mt-6">
                        <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center">
                            <span className="text-orange-500 text-4xl">✓</span>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center text-orange-600 mb-4 drop-shadow-sm animate-slideIn">
                        Email envoyé !
                    </h2>
                    <p className="text-gray-700 mb-8 animate-fadeInUp animate-delay-100 text-center">
                        {message}
                    </p>
                    <div className="flex justify-center">
                        <Link 
                            href="/login" 
                            className="bg-gradient-to-br from-orange-200 to-amber-300 hover:from-orange-300 hover:to-amber-400 
                                    text-orange-800 font-bold py-3 px-8 rounded-xl transition-all duration-300 
                                    hover:scale-105 shadow-md border border-orange-200 animate-fadeInUp animate-delay-200 flex items-center"
                        >
                            <span className="mr-2">🔑</span>
                            Retour à la connexion
                        </Link>
                    </div>
                    
                    {/* Éléments décoratifs variés */}
                    <div className="absolute -top-2 -left-2 text-amber-300 text-xl animate-spin-slow">✨</div>
                    <div className="absolute -bottom-2 -right-2 text-amber-300 text-xl animate-float-slow animation-delay-500">⭐</div>
                </div>
            </div>
        );
    }

    // Formulaire normal avec style varié
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#fdf2dd] to-amber-50 py-16 px-4 flex items-center justify-center relative overflow-auto">
            {decorativeElements}
            
            <div className="bg-white/90 p-10 rounded-3xl shadow-lg max-w-md w-full relative border-2 border-amber-200 transform rotate-1 animate-scaleIn">
                {sebiMascot}
                
                <div className="bg-orange-50/80 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 mt-6 shadow-inner">
                    <span className="text-orange-500 text-3xl">🔒</span>
                </div>
                
                <h2 className="text-3xl font-bold text-center text-orange-600 mb-6 drop-shadow-sm animate-slideIn">
                    Mot de passe oublié ?
                </h2>
                
                <p className="text-gray-700 mb-8 animate-fadeInUp animate-delay-100 text-center border-l-4 border-orange-200 pl-4 py-2 bg-orange-50/50">
                    Pas de panique ! Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="animate-fadeInUp animate-delay-100 bg-orange-50/50 rounded-xl p-3">
                        <label className="text-sm text-orange-700 font-medium mb-1 block">
                            Adresse email
                        </label>
                        <div className="flex items-center border-b-2 border-orange-300">
                            <span className="text-orange-400 mr-2">📧</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="VOTRE EMAIL"
                                className="w-full text-gray-700 p-2 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                                required
                            />
                        </div>
                    </div>

                    {message && (
                        <div className="bg-orange-100 border-r-4 border-orange-500 text-orange-700 p-4 rounded-xl animate-fadeInUp">
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-br from-orange-200 to-amber-300 hover:from-orange-300 hover:to-amber-400 
                                   text-orange-800 font-bold py-4 px-6 rounded-xl transition-all duration-300 
                                   hover:scale-105 shadow-md border border-orange-200 animate-fadeInUp animate-delay-200 flex items-center justify-center"
                    >
                        <span className="mr-2">📤</span>
                        Envoyer le lien
                    </button>

                    <div className="mt-6 text-center animate-fadeInUp animate-delay-300">
                        <Link 
                            href="/login" 
                            className="text-orange-600 hover:text-orange-800 transition-colors font-medium inline-flex items-center"
                        >
                            <span className="mr-1">←</span>
                            Retour à la connexion
                        </Link>
                    </div>
                </form>
                
                {/* Éléments décoratifs variés */}
                <div className="absolute -top-2 -left-2 text-amber-300 text-xl animate-spin-slow">✨</div>
                <div className="absolute -bottom-2 -right-2 text-amber-300 text-xl animate-float-slow animation-delay-500">⭐</div>
            </div>
        </div>
    );
}