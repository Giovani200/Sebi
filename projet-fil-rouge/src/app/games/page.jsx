// cré moi une page de présentation de plusieur jeux avec leur lien
// et une image de présentation
// et un bouton pour y jouer

"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import sebi from "../../../public/sebi.png";
// import sebilaGazelleImage2 from "../../public/sebi_la_gazelle_2.png";
// import sebilaGazelleImage3 from "../../public/sebi_la_gazelle_3.png";
// import sebilaGazelleImage4 from "../../public/sebi_la_gazelle_4.png";
// import sebilaGazelleImage5 from "../../public/sebi_la_gazelle_5.png";



export default function GamesPage() {
    const games = [
        {
        name: "Sebi la Gazelle",
        description: "Un jeu de plateforme où vous devez aider Sebi à collecter des pièces et à éviter les obstacles.",
        image: sebi,
        link: "/games/sebi_la_gazelle",
        }
        // {
        // name: "Sebi la Gazelle 2",
        // description: "La suite du jeu Sebi la Gazelle avec de nouveaux niveaux et défis.",
        // image: sebilaGazelleImage2,
        // link: "/games/sebi_la_gazelle_2",
        // },
        // {
        // name: "Sebi la Gazelle 3",
        // description: "Encore plus d'aventures avec Sebi dans ce troisième opus.",
        // image: sebilaGazelleImage3,
        // link: "/games/sebi_la_gazelle_3",
        // },
        // {
        // name: "Sebi la Gazelle 4",
        // description: "Nouveaux ennemis et nouveaux défis dans Sebi la Gazelle 4.",
        // image: sebilaGazelleImage4,
        // link: "/games/sebi_la_gazelle_4",
        // },
        // {
        // name: "Sebi la Gazelle 5",
        // description: "Le dernier chapitre de l'aventure de Sebi.",
        // image: sebilaGazelleImage5,
        // link: "/games/sebi_la_gazelle_5",
        // },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
                <div key={game.name} className="border p-4 rounded">
                    <Image src={game.image} alt={game.name} className="w-full h-48 object-cover mb-2" />
                    <h3 className="text-lg font-semibold">{game.name}</h3>
                    <p className="text-sm text-gray-600">{game.description}</p>
                    <Link href={game.link} className="mt-2 inline-block bg-blue-500 text-white py-1 px-4 rounded">
                        Jouer
                    </Link>
                </div>
            ))}
        </div>
    );
}
// export default function GamesPage() {