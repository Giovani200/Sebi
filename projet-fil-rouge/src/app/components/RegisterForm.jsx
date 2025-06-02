'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterForm() {
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

        // Vérifier l'âge pour l'email parent
        if (parseInt(age) < 14 && !emailParent) {
            return setMessage("L'email d'un parent est requis pour les moins de 14 ans.");
        }

        const userData = {
            email,
            password,
            prenom,
            nom,
            age: parseInt(age),
            ...(showParentEmail && { emailParent })
        };

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (!res.ok) return setMessage(data.message);

        setMessage('Inscription réussie !');
        // Rediriger ou mettre à jour l'état global ici
    };

    const handleAgeChange = (e) => {
        const value = e.target.value;
        setAge(value);
        setShowParentEmail(parseInt(value) < 14);
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
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-slideIn">Inscription</h2>
                
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="animate-fadeInUp animate-delay-100">
                            <input
                                type="text"
                                placeholder="PRÉNOM"
                                value={prenom}
                                onChange={e => setPrenom(e.target.value)}
                                className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
                                required
                            />
                        </div>
                        
                        <div className="animate-fadeInUp animate-delay-100">
                            <input
                                type="text"
                                placeholder="NOM"
                                value={nom}
                                onChange={e => setNom(e.target.value)}
                                className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="animate-fadeInUp animate-delay-200">
                        <input
                            type="email"
                            placeholder="EMAIL"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="animate-fadeInUp animate-delay-200">
                            <input
                                type="number"
                                placeholder="ÂGE"
                                value={age}
                                onChange={handleAgeChange}
                                className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
                                required
                                min="4"
                                max="120"
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
                    </div>

                    {showParentEmail && (
                        <div className="animate-fadeInUp">
                            <input
                                type="email"
                                placeholder="EMAIL PARENT"
                                value={emailParent}
                                onChange={e => setEmailParent(e.target.value)}
                                className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
                                required
                            />
                        </div>
                    )}

                    {message && <p className="text-sm text-red-500 mt-2 animate-fadeInUp">{message}</p>}

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            type="submit"
                            className="w-full bg-green-200 text-gray-700 py-2 rounded hover:bg-green-300 transition-all duration-300 animate-fadeInUp animate-delay-300"
                        >
                            Valider
                        </button>
                        <Link
                            href="/login"
                            className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-all duration-300 text-center animate-fadeInUp animate-delay-300"
                        >
                            Connexion
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}