'use client';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-orange-50 to-white">
      
      

      <div className="max-w-7xl mx-auto px-4 pb-12 pt-8">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Logo et description */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Logo Sebi"
                  width={60}
                  height={60}
                  className="rounded-full shadow-md hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute -inset-0.5 bg-orange-200 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                Sebi
              </h2>
            </div>
            <p className="text-gray-600 text-center lg:text-left mb-6">
              Une aventure éducative extraordinaire pour les petits explorateurs !
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 relative group cursor-default">
              Navigation
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></div>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group">
                  <span className="w-5 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mr-2"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group">
                  <span className="w-5 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mr-2"></span>
                  Jeux
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group">
                  <span className="w-5 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mr-2"></span>
                  Aide
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 relative group cursor-default">
              Légal
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></div>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group">
                  <span className="w-5 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mr-2"></span>
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group">
                  <span className="w-5 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mr-2"></span>
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 relative group cursor-default">
              Contact
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></div>
            </h3>
            <div className="space-y-3">
              <a href="mailto:contact@sebi.fr" 
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors duration-300 group">
                <div className="p-2 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors duration-300">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>contact@sebi.fr</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright et séparateur */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
          <div className="pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Sebi. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;