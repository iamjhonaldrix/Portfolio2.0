import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'About', href: '#about', external: false },
    { name: 'Skills', href: '#skills', external: false },
    { name: 'Projects', href: 'https://github.com/iamjhonaldrix/', external: false },
    { name: 'Writeups', href: 'https://b3rl1n.gitbook.io/b3rl1n/', external: true },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav 
      ref={navRef}
      className="bg-slate-900/80 backdrop-blur-md text-white border-b border-slate-800/80 fixed top-0 w-full z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="/" 
              className="text-xl font-bold tracking-wider font-mono text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              B3RL1N
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="relative py-1 text-slate-300 hover:text-indigo-400 font-medium text-xs uppercase tracking-wider transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA & Socials */}
            <div className="flex items-center space-x-4 border-l border-slate-800/80 pl-6">
              <a 
                href="https://github.com/iamjhonaldrix/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub Profile"
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              <a
                href="#contacts"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 active:scale-95"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown with Smooth Height Animation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-800/80 bg-slate-900/95 backdrop-blur-lg ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contacts"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium text-base transition-colors shadow-md shadow-indigo-600/20"
              onClick={() => setIsOpen(false)}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}