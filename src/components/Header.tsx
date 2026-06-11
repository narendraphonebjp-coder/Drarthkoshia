import React, { useState, useEffect } from 'react';
import { Menu, X, HeartPulse, User } from 'lucide-react';

interface HeaderProps {
  onOpenPortal: () => void;
  portalUserName: string | null;
  onLogoutPortal: () => void;
}

export default function Header({ onOpenPortal, portalUserName, onLogoutPortal }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Dr. Arth', href: '#about' },
    { name: 'Treatments & Services', href: '#services' },
    { name: 'Patient Reviews', href: '#reviews' },
    { name: 'Contact & Clinic', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-blue-50/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2.5 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg leading-tight tracking-tight text-slate-900">
                Koshia <span className="text-blue-600">Skin Care</span>
              </span>
              <span className="font-sans text-[10px] font-medium text-slate-500 tracking-wider uppercase">
                &amp; Aesthetic Clinic
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA / Portal Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            {portalUserName ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <User className="h-4 w-4" />
                  <span>Hi, {portalUserName.split(' ')[0]}</span>
                </div>
                <button
                  id="header-logout-btn"
                  onClick={onLogoutPortal}
                  className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                id="header-portal-btn"
                onClick={onOpenPortal}
                className="bg-slate-900 text-white hover:bg-slate-800 transition-all font-sans text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md border border-slate-900"
              >
                Patient Portal
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)] animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="block font-sans text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 px-4 py-2.5 rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-4">
              {portalUserName ? (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-700 font-medium">Signed in as <strong>{portalUserName}</strong></span>
                  <button
                    id="mobile-logout-btn"
                    onClick={() => {
                      onLogoutPortal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-semibold text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  id="mobile-portal-btn"
                  onClick={() => {
                    onOpenPortal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-950 text-white font-sans text-sm font-bold py-3 px-4 rounded-xl text-center shadow-lg hover:bg-slate-900 transition-colors"
                >
                  Patient Portal / Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
