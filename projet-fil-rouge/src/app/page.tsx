

// import RegisterForm from '@/app/components/RegisterForm';

import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <h2> Tu es sur la page accueil</h2>
      <p>inscrit toi par ici <Link href="/register">Register</Link></p>
      <p>si tu veux jouer c&apos;est ici <Link href="/games">Game</Link></p>
      <p><a href="/leaderboard" className="text-blue-600 underline hover:text-blue-800">Voir le classement</a></p>


    </div>
  );
}
