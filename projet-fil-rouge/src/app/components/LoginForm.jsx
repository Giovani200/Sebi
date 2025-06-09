'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../../i18n/client'; // Assurez-vous que le fichier i18n est correctement importé
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
    const { t } = useTranslation();
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

        // Déclencher l'événement pour afficher la notification
        window.dispatchEvent(new CustomEvent('showNotification', { 
            detail: { message: 'Connexion réussie!', type: 'success' } 
        }));
        
        // Rediriger vers la page d'accueil
        router.push('/');
    };

     return (
        <div className="min-h-screen w-full bg-gradient-to-bl from-[#fdf2dd] to-amber-50 py-16 pb-0 px-4 flex items-center justify-center relative overflow-auto">
            {/* Éléments décoratifs variés */}
            <div className="absolute top-[12%] left-[15%] w-32 h-16 bg-orange-100/40 rounded-bl-3xl transform rotate-12"></div>
            <div className="absolute bottom-[25%] right-[12%] w-28 h-28 bg-amber-100/30 rounded-tr-3xl rounded-bl-3xl"></div>
            <div className="absolute top-[40%] left-[30%] w-20 h-20 bg-yellow-50/30 rounded-full transform -rotate-6"></div>
            
            {/* Étoiles avec animations différentes */}
            <div className="absolute top-[25%] right-[35%] text-3xl animate-pulse opacity-60">✨</div>
            <div className="absolute bottom-[30%] left-[18%] text-4xl animate-ping animation-delay-1000 opacity-40">⭐</div>
            <div className="absolute top-[15%] right-[20%] text-2xl animate-spin-slow opacity-50">⭐</div>
            <div className="absolute bottom-[15%] left-[40%] text-xl animate-bounce opacity-40">✨</div>
            
            <div className="bg-white/95 p-10 rounded-tl-3xl rounded-br-3xl shadow-lg w-full max-w-md relative border-2 border-amber-200 animate-scaleIn">
                <div className="absolute -top-10 -right-5 w-24 h-24">
                    <Image
                        src="/images/sebi.webp"
                        alt={t('login.sebiAlt')}
                        width={100}
                        height={100}
                        className="object-contain animate-pulse"
                    />
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-amber-50 p-3 rounded-lg mb-6 shadow-inner">
                    <h2 className="text-3xl font-bold text-center text-orange-600 drop-shadow-sm animate-slideIn">
                        {t('login.title')}
                    </h2>
                    <p className="text-center text-orange-500 text-sm mt-1">{t('login.subtitle')}</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="animate-fadeInUp animate-delay-100 bg-orange-50/70 rounded-xl p-4">
                        <label className="text-sm text-orange-700 font-medium mb-1 block">
                            {t('login.fields.email')}
                        </label>
                        <div className="flex items-center border-b-2 border-orange-300">
                            <span className="text-orange-400 mr-2">📧</span>
                            <input
                                type="email"
                                placeholder={t('login.placeholders.email')}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full text-gray-700 py-2 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="animate-fadeInUp animate-delay-200 bg-orange-50/70 rounded-xl p-4">
                        <label className="text-sm text-orange-700 font-medium mb-1 block">
                            {t('login.fields.password')}
                        </label>
                        <div className="flex items-center border-b-2 border-orange-300">
                            <span className="text-orange-400 mr-2">🔒</span>
                            <input
                                type="password"
                                placeholder={t('login.placeholders.password')}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full text-gray-700 py-2 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                                required
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`${message.includes(t('login.success')) ? 'bg-green-50 border-green-500 text-green-700' : 'bg-orange-50 border-orange-500 text-orange-700'} border-l-4 p-4 rounded-tr-xl rounded-br-xl animate-fadeInUp`}>
                            <div className="flex items-center">
                                <span className="mr-2">{message.includes(t('login.success')) ? '✅' : '⚠️'}</span>
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-br from-orange-300 to-amber-400 hover:from-orange-400 hover:to-amber-500 
                                   text-white font-bold py-4 px-6 rounded-tl-xl rounded-br-xl transition-all duration-300 
                                   hover:scale-[1.03] shadow-md animate-fadeInUp animate-delay-300 relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {t('login.buttons.login')}
                        </span>
                    </button>
                    
                    <div className="mt-6 space-y-3 animate-fadeInUp animate-delay-300">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="h-px bg-orange-200 flex-1"></div>
                            <span className="text-orange-400 text-sm">{t('login.or')}</span>
                            <div className="h-px bg-orange-200 flex-1"></div>
                        </div>
                        
                        <Link 
                            href="/register" 
                            className="block text-center bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100
                                      text-orange-600 font-medium py-3 px-6 rounded-tl-xl rounded-br-xl transition-all duration-300
                                      hover:scale-[1.02] border border-orange-200"
                        >
                            {t('login.buttons.register')}
                        </Link>
                        
                        <Link 
                            href="/forgot-password" 
                            className="block text-center text-amber-600 hover:text-amber-800 transition-colors text-sm mt-4"
                        >
                            <span className="border-b border-dashed border-amber-300">{t('login.forgotPassword')}</span>
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