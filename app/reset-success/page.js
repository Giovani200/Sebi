'use client';
import Link from 'next/link';

export default function ResetSuccess() {
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
      <div className="card animate-scaleIn text-center">
        <div className="text-green-500 text-5xl mb-4 animate-scaleIn">✓</div>
        <h2 className="card-title animate-slideIn">
          Mot de passe réinitialisé !
        </h2>
        <p className="text-gray-600 mb-6 animate-fadeInUp animate-delay-100 text-responsive">
          Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </p>
        <Link 
          href="/login"
          className="btn-primary inline-block animate-fadeInUp animate-delay-200"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
} 