'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../i18n/client'; // Assurez-vous que le fichier i18n est correctement importé
import { useTranslation } from 'react-i18next';

export default function RegisterForm() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [age, setAge] = useState('');
    const [emailParent, setEmailParent] = useState('');
    const [showParentEmail, setShowParentEmail] = useState(false);
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            // Validation basique
            if (!email || !password || !prenom || !nom || !age) {
                return setMessage("Tous les champs sont obligatoires.");
            }

            // Vérifier l'âge pour l'email parent
            if (parseInt(age) < 14 && !emailParent) {
                return setMessage("L'email d'un parent est requis pour les moins de 14 ans.");
            }

            // Afficher un message de chargement
            setMessage("Inscription en cours...");

            const userData = {
                email,
                password,
                firstName: prenom,       // ✅ Renommé pour correspondre à l'API
                lastName: nom,           // ✅ Renommé pour correspondre à l'API
                age: parseInt(age),
                parentEmail: showParentEmail ? emailParent : ""  // ✅ Renommé pour correspondre à l'API
            };
            console.log("Données envoyées:", userData);

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();

            if (!res.ok) {
                console.log("Réponse du serveur:", data);
                return setMessage(data.message || "Erreur lors de l'inscription");
            }

            // Inscription réussie
            setMessage('Inscription réussie !');

            // Redirection après délai
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            console.log("Erreur:", error);
            setMessage("Problème de connexion au serveur");
        }
    };

    const handleAgeChange = (e) => {
        const value = e.target.value;
        setAge(value);
        setShowParentEmail(parseInt(value) < 14);
    };

     return (
        <div className="min-h-screen w-full bg-gradient-to-tr from-[#fdf2dd] to-amber-50 py-16 px-4 flex items-center justify-center relative overflow-auto">
            {/* Éléments décoratifs variés */}
            <div className="absolute top-[8%] left-[15%] w-36 h-20 bg-orange-100/40 rounded-tr-3xl rounded-bl-3xl transform rotate-6"></div>
            <div className="absolute bottom-[15%] right-[10%] w-24 h-24 bg-amber-100/30 rounded-full blur-sm"></div>
            <div className="absolute top-[35%] right-[25%] w-28 h-16 bg-yellow-50/40 rounded-br-2xl transform -rotate-12"></div>
            
            {/* Étoiles avec animations différentes */}
            <div className="absolute top-[25%] left-[32%] text-3xl animate-bounce opacity-50">✨</div>
            <div className="absolute bottom-[35%] right-[22%] text-4xl animate-spin-slow animation-delay-700 opacity-40">⭐</div>
            <div className="absolute top-[20%] right-[12%] text-2xl animate-pulse opacity-60">⭐</div>
            <div className="absolute bottom-[25%] left-[18%] text-xl animate-float-slow animation-delay-300 opacity-40">✨</div>
            
            <div className="bg-white/90 p-8 rounded-tr-3xl rounded-bl-3xl shadow-lg w-full max-w-lg relative border-2 border-amber-200 transform rotate-1 animate-scaleIn">
                <div className="absolute -top-12 -left-8 w-28 h-28 transform -rotate-12">
                    <Image
                        src="/images/sebi.webp"
                        alt={t('register.sebiAlt')}
                        width={110}
                        height={110}
                        className="object-contain animate-pulse"
                    />
                </div>

                <div className="bg-gradient-to-br from-orange-100 to-amber-50 p-3 rounded-lg mb-6 shadow-inner">
                    <h2 className="text-3xl font-bold text-center text-orange-600 drop-shadow-sm animate-slideIn">
                        {t('register.title')}
                    </h2>
                    <p className="text-center text-orange-500 text-sm mt-1">{t('register.subtitle')}</p>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="animate-fadeInUp animate-delay-100 bg-orange-50/50 rounded-lg p-2">
                            <label className="text-xs text-orange-700 font-medium block mb-1 ml-1">
                                {t('register.fields.firstName')}
                            </label>
                            <div className="flex items-center border-b-2 border-orange-300">
                                <span className="text-orange-400 mr-2">👤</span>
                                <input
                                    type="text"
                                    placeholder={t('register.placeholders.firstName')}
                                    value={prenom}
                                    onChange={e => setPrenom(e.target.value)}
                                    className="w-full text-gray-700 p-1 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                                    required
                                />
                            </div>
                        </div>

                        <div className="animate-fadeInUp animate-delay-100 bg-orange-50/50 rounded-lg p-2">
                            <label className="text-xs text-orange-700 font-medium block mb-1 ml-1">
                                {t('register.fields.lastName')}
                            </label>
                            <div className="flex items-center border-b-2 border-orange-300">
                                <span className="text-orange-400 mr-2">📝</span>
                                <input
                                    type="text"
                                    placeholder={t('register.placeholders.lastName')}
                                    value={nom}
                                    onChange={e => setNom(e.target.value)}
                                    className="w-full text-gray-700 p-1 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="animate-fadeInUp animate-delay-200 bg-orange-50/50 rounded-lg p-2">
                        <label className="text-xs text-orange-700 font-medium block mb-1 ml-1">
                            {t('register.fields.email')}
                        </label>
                        <div className="flex items-center border-b-2 border-orange-300">
                            <span className="text-orange-400 mr-2">📧</span>
                            <input
                                type="email"
                                placeholder={t('register.placeholders.email')}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full text-gray-700 p-1 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="animate-fadeInUp animate-delay-200 bg-orange-50/50 rounded-lg p-2">
                            <label className="text-xs text-orange-700 font-medium block mb-1 ml-1">
                                {t('register.fields.age')}
                            </label>
                            <div className="flex items-center border-b-2 border-orange-300">
                                <span className="text-orange-400 mr-2">🎂</span>
                                <input
                                    type="number"
                                    placeholder={t('register.placeholders.age')}
                                    value={age}
                                    onChange={handleAgeChange}
                                    className="w-full text-gray-700 p-1 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                                    required
                                    min="4"
                                    max="120"
                                />
                            </div>
                        </div>

                        <div className="animate-fadeInUp animate-delay-200 bg-orange-50/50 rounded-lg p-2">
                            <label className="text-xs text-orange-700 font-medium block mb-1 ml-1">
                                {t('register.fields.password')}
                            </label>
                            <div className="flex items-center border-b-2 border-orange-300">
                                <span className="text-orange-400 mr-2">🔒</span>
                                <input
                                    type="password"
                                    placeholder={t('register.placeholders.password')}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full text-gray-700 p-1 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-orange-300/70"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {showParentEmail && (
                        <div className="animate-fadeInUp bg-amber-50/80 p-4 rounded-lg border-l-4 border-amber-300 shadow-sm">
                            <div className="flex items-start mb-2">
                                <span className="text-amber-500 mr-2 text-xl">👪</span>
                                <label className="text-sm text-orange-700 font-medium">
                                    {t('register.parentEmailNotice')}
                                </label>
                            </div>
                            <div className="flex items-center border-b-2 border-amber-300 ml-6">
                                <span className="text-amber-400 mr-2">📧</span>
                                <input
                                    type="email"
                                    placeholder={t('register.placeholders.parentEmail')}
                                    value={emailParent}
                                    onChange={e => setEmailParent(e.target.value)}
                                    className="w-full text-gray-700 p-2 bg-transparent focus:outline-none focus:border-amber-500 transition-all duration-300 placeholder-amber-400/70"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className={`${message.includes(t('register.success')) ? 'bg-green-50 border-green-500 text-green-700' : 'bg-orange-50 border-orange-500 text-orange-700'} border-r-4 p-4 rounded-lg animate-fadeInUp flex items-center`}>
                            <span className="mr-2 text-xl">{message.includes(t('register.success')) ? '✅' : '⚠️'}</span>
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-br from-orange-300 to-amber-400 hover:from-orange-400 hover:to-amber-500 
                                text-white font-bold py-3 px-6 rounded-tr-xl rounded-bl-xl transition-all duration-300 
                                hover:scale-105 shadow-md border border-orange-200 animate-fadeInUp animate-delay-300 flex items-center justify-center"
                        >
                            <span className="mr-2">🚀</span>
                            {t('register.buttons.register')}
                        </button>
                        <Link
                            href="/login"
                            className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300
                                text-gray-700 font-bold py-3 px-6 rounded-tr-xl rounded-bl-xl transition-all duration-300 
                                hover:scale-105 shadow-md border border-gray-200 text-center animate-fadeInUp animate-delay-300 flex items-center justify-center"
                        >
                            <span className="mr-2">🔑</span>
                            {t('register.buttons.login')}
                        </Link>
                    </div>
                </form>

                {/* Éléments décoratifs */}
                <div className="absolute -top-3 -right-3 text-amber-300 text-2xl animate-spin-slow">✨</div>
                <div className="absolute -bottom-3 -left-3 text-amber-300 text-2xl animate-float-slow animation-delay-500">⭐</div>
            </div>
        </div>
    );
}