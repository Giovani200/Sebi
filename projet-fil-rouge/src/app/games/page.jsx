
'use client';
import Image from 'next/image';
import Link from 'next/link'; // Ajout de l'import Link




const games = [
        {
        // name: "Sebi la Gazelle",
        // description: "Un jeu de plateforme où vous devez aider Sebi à collecter des pièces et à éviter les obstacles.",
        // image: sebi,
        link: "/games/sebi_la_gazelle",
        }
    ];

export default function Games() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Choisis ton compagnon de jeu !
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Carte Sebi */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg md:shadow-xl
                          md:group md:hover:bg-orange-50 md:transition-all md:duration-500
                          md:hover:shadow-orange-200 md:hover:-translate-y-1">
            <div className="p-6 relative">
              {/* Effet de fond animé - visible uniquement sur desktop */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-orange-100/0 to-orange-100/0 
                            md:group-hover:from-orange-100/50 md:group-hover:to-orange-200/30 transition-all duration-500">
                {/* Effet de particules */}
                <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-200 rounded-full animate-ping"></div>
                  <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-orange-200 rounded-full animate-ping delay-150"></div>
                  <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-orange-200 rounded-full animate-ping delay-300"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center relative z-10">
                {/* Image avec effet de zoom sur desktop uniquement */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 md:transform md:group-hover:scale-110 
                             md:transition-all md:duration-500 md:hover:rotate-2">
                  <Image
                    src="/images/SEBI.png"
                    alt="Sebi la gazelle"
                    fill
                    className="object-contain md:group-hover:filter md:group-hover:brightness-110"
                  />
                  
                  {/* Effet de halo - desktop uniquement */}
                  <div className="hidden md:block absolute -inset-4 bg-orange-200/0 md:group-hover:bg-orange-200/20 
                               rounded-full blur-2xl transition-all duration-500"></div>
                </div>

                {/* Texte avec animation sur desktop uniquement */}
                <div className="md:transform md:group-hover:-translate-y-2 md:transition-transform md:duration-500">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:group-hover:text-orange-600 md:transition-colors md:duration-300">
                    Joue avec Sebi !
                  </h2>
                  <p className="text-gray-600 text-center mb-6 md:group-hover:text-gray-700">
                    Rejoins Sebi la gazelle pour une aventure passionnante pleine de défis amusants !
                  </p>
                </div>

                {/* Bouton remplacé par Link tout en conservant le style */}
                <Link 
                  href="/games/sebi_la_gazelle" 
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 md:px-8 py-3 
                           rounded-full font-semibold shadow-md relative z-10 overflow-hidden
                           md:group-hover:shadow-xl md:transform md:group-hover:-translate-y-0.5 
                           md:transition-all md:duration-300 md:hover:scale-105 inline-block"
                >
                  <span className="relative z-10 md:group-hover:tracking-wider transition-all duration-300">
                    Commencer l'aventure
                  </span>
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="hidden md:block absolute inset-0 -z-10 bg-gradient-to-r from-orange-400/0 via-white/50 to-orange-400/0
                               opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Carte James */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg md:shadow-xl
                          md:group md:hover:bg-orange-50 md:transition-all md:duration-500
                          md:hover:shadow-orange-200 md:hover:-translate-y-1">
            <div className="p-6 relative">
              {/* Effet de fond animé - visible uniquement sur desktop */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-orange-100/0 to-orange-100/0 
                            md:group-hover:from-orange-100/50 md:group-hover:to-orange-200/30 transition-all duration-500">
                {/* Effet de particules */}
                <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-200 rounded-full animate-ping"></div>
                  <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-orange-200 rounded-full animate-ping delay-150"></div>
                  <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-orange-200 rounded-full animate-ping delay-300"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center relative z-10">
                {/* Image avec effet de zoom sur desktop uniquement */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 md:transform md:group-hover:scale-110 md:transition-transform md:duration-500">
                  <Image
                    src="/images/james.png"
                    alt="James le hibou"
                    fill
                    className="object-contain"
                  />
                  
                  {/* Effet de halo - desktop uniquement */}
                  <div className="hidden md:block absolute -inset-4 bg-orange-200/0 md:group-hover:bg-orange-200/20 
                               rounded-full blur-2xl transition-all duration-500"></div>
                </div>

                {/* Texte avec animation sur desktop uniquement */}
                <div className="md:transform md:group-hover:-translate-y-2 md:transition-transform md:duration-500">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:group-hover:text-orange-600 md:transition-colors md:duration-300">
                    Joue avec James !
                  </h2>
                  <p className="text-gray-600 text-center mb-6 md:group-hover:text-gray-700">
                    Découvre les mathématiques de façon amusante avec James le hibou, ton professeur préféré !
                  </p>
                </div>

                {/* Bouton remplacé par Link tout en conservant le style */}
                <Link
                  href="/games/james_le_hibou"
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 md:px-8 py-3 
                           rounded-full font-semibold shadow-md relative z-10 overflow-hidden
                           md:group-hover:shadow-xl md:transform md:group-hover:-translate-y-0.5 
                           md:transition-all md:duration-300 inline-block"
                >
                  <span className="relative z-10">Commencer l'apprentissage</span>
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
























// // cré moi une page de présentation de plusieur jeux avec leur lien
// // et une image de présentation
// // et un bouton pour y jouer

// "use client";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import sebi from "../../../public/sebi.png";
// // import sebilaGazelleImage2 from "../../public/sebi_la_gazelle_2.png";
// // import sebilaGazelleImage3 from "../../public/sebi_la_gazelle_3.png";
// // import sebilaGazelleImage4 from "../../public/sebi_la_gazelle_4.png";
// // import sebilaGazelleImage5 from "../../public/sebi_la_gazelle_5.png";



// export default function GamesPage() {
//     const games = [
//         {
//         name: "Sebi la Gazelle",
//         description: "Un jeu de plateforme où vous devez aider Sebi à collecter des pièces et à éviter les obstacles.",
//         image: sebi,
//         link: "/games/sebi_la_gazelle",
//         }
//         // {
//         // name: "Sebi la Gazelle 2",
//         // description: "La suite du jeu Sebi la Gazelle avec de nouveaux niveaux et défis.",
//         // image: sebilaGazelleImage2,
//         // link: "/games/sebi_la_gazelle_2",
//         // },
//         // {
//         // name: "Sebi la Gazelle 3",
//         // description: "Encore plus d'aventures avec Sebi dans ce troisième opus.",
//         // image: sebilaGazelleImage3,
//         // link: "/games/sebi_la_gazelle_3",
//         // },
//         // {
//         // name: "Sebi la Gazelle 4",
//         // description: "Nouveaux ennemis et nouveaux défis dans Sebi la Gazelle 4.",
//         // image: sebilaGazelleImage4,
//         // link: "/games/sebi_la_gazelle_4",
//         // },
//         // {
//         // name: "Sebi la Gazelle 5",
//         // description: "Le dernier chapitre de l'aventure de Sebi.",
//         // image: sebilaGazelleImage5,
//         // link: "/games/sebi_la_gazelle_5",
//         // },
//     ];

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {games.map((game) => (
//                 <div key={game.name} className="border p-4 rounded">
//                     <Image src={game.image} alt={game.name} className="w-full h-48 object-cover mb-2" />
//                     <h3 className="text-lg font-semibold">{game.name}</h3>
//                     <p className="text-sm text-gray-600">{game.description}</p>
//                     <Link href={game.link} className="mt-2 inline-block bg-blue-500 text-white py-1 px-4 rounded">
//                         Jouer
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// }
// // export default function GamesPage() {