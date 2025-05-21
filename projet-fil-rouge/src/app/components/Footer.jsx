'use client';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <section aria-labelledby="footer-about">
            <h3 id="footer-about" className="text-gray-800 font-semibold text-lg">À propos</h3>
            <p className="text-gray-600 text-sm">
              Notre entreprise s'engage à fournir des services de qualité et une expérience exceptionnelle à nos clients.
            </p>
          </section>

          {/* Liens rapides */}
          <nav aria-labelledby="footer-links">
            <h3 id="footer-links" className="text-gray-800 font-semibold text-lg">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">Accueil</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">À propos</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-gray-900 text-sm">Services</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <section aria-labelledby="footer-contact">
            <h3 id="footer-contact" className="text-gray-800 font-semibold text-lg">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">Email : <a href="mailto:contact@example.com" className="hover:underline">contact@example.com</a></li>
              <li className="text-gray-600 text-sm">Tél : <a href="tel:+33123456789" className="hover:underline">+33 1 23 45 67 89</a></li>
              <li className="text-gray-600 text-sm">Adresse : 123 Rue Example</li>
            </ul>
          </section>

          {/* Réseaux sociaux */}
          <section aria-labelledby="footer-social">
            <h3 id="footer-social" className="text-gray-800 font-semibold text-lg">Suivez-nous</h3>
            <div className="flex space-x-4" role="navigation" aria-label="Réseaux sociaux">
              <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-900 transition-colors">
                {/* Facebook Icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12..."/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-gray-900 transition-colors">
                {/* Twitter Icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775..."/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-900 transition-colors">
                {/* Instagram Icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072..."/>
                </svg>
              </a>
            </div>
          </section>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Votre Entreprise. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
