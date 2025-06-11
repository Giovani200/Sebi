"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function RewardNotification({ reward, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    // Design directement depuis la récompense générée par l'IA
    const design = {
        title: reward?.title || "Félicitations !",
        icon: reward?.icon || "🏆",
        bgGradient: reward?.bgGradient || "from-yellow-300 to-orange-400",
        borderColor: reward?.borderColor || "border-yellow-500",
        pattern: reward?.pattern || "✨",
        description: reward?.description || "Tu  as fait tes premiers pas dans l'aventure !"
    };

    useEffect(() => {
        if (reward) {
            setIsVisible(true);
            // Auto-fermeture après 5 secondes
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [reward]);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsLeaving(false);
            onClose();
        }, 300);
    };

    if (!reward || !isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'
            }`}>
            <div className={`relative transform transition-all duration-500 ${isLeaving ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
                }`}>
                <div className={`relative bg-gradient-to-br ${design.bgGradient} p-8 rounded-3xl shadow-2xl border-4 ${design.borderColor} max-w-sm mx-4`}>
                    {/* Affichage de l'image IA générée */}
                    {reward?.imageUrl && (
                        <div className="mb-4 flex justify-center">
                            <Image
                                src={reward.imageUrl}
                                alt="Récompense IA"
                                width={256}
                                height={256}
                                className="rounded-xl border-2 border-white shadow"
                            />
                        </div>
                    )}

                    {/* Patterns décoratifs */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        <div className="absolute top-4 left-4 text-2xl opacity-30 animate-pulse">{design.pattern}</div>
                        <div className="absolute top-8 right-6 text-xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>{design.pattern}</div>
                        <div className="absolute bottom-6 left-8 text-lg opacity-25 animate-pulse" style={{ animationDelay: '1s' }}>{design.pattern}</div>
                        <div className="absolute bottom-4 right-4 text-2xl opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}>{design.pattern}</div>
                    </div>

                    {/* Contenu du badge */}
                    <div className="relative z-10 text-center">
                        {/* Icône principale */}
                        <div className="text-6xl mb-4 animate-bounce">
                            {design.icon}
                        </div>

                        {/* Titre */}
                        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                            {design.title}
                        </h2>

                        {/* Score */}
                        <div className="bg-white/20 rounded-full px-4 py-2 mb-3">
                            <span className="text-white font-bold text-lg">
                                Score: {reward.score || 100}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-white/90 text-sm mb-4 leading-relaxed">
                            {design.description}
                        </p>

                        {/* Note spéciale (si présente) */}
                        {reward.specialNote && (
                            <div className="bg-white/20 rounded-xl px-4 py-2 mb-4">
                                <p className="text-white/90 text-xs font-medium">
                                    {reward.specialNote}
                                </p>
                            </div>
                        )}

                        {/* Badge décoratif */}
                        <div className="inline-block bg-white/10 rounded-full px-6 py-2 border-2 border-white/30">
                            <span className="text-white font-semibold text-sm">🎉 Félicitations ! 🎉</span>
                        </div>
                    </div>

                    {/* Bouton de fermeture */}
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        ✕
                    </button>

                    {/* Effets visuels */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                    <div className="absolute -top-1 -right-3 w-3 h-3 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -bottom-2 -left-3 w-3 h-3 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute -bottom-1 -right-2 w-4 h-4 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                </div>

                {/* Confettis animés */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute text-2xl animate-bounce opacity-70`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        >
                            {['🎉', '🌟', '✨', '🎊', '🏆'][Math.floor(Math.random() * 5)]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}