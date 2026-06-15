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
    { name: 'About Dr. Agarwal', href: '#about' },
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
          ? 'bg-[#FDFCF9]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#E8E2D9]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="bg-[#7C9070] text-[#FDFCF9] w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:bg-[#6B705C] transition-colors">
              A
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-lg leading-tight tracking-tight text-[#2C3328] group-hover:text-[#7C9070] transition-colors">
                Agarwal <span className="italic font-light text-[#7C9070]">Plastic Surgery</span>
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#6B705C] font-semibold">
                &amp; Cosmetic Clinic
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-[#6B705C] hover:text-[#2C3328] border-b-2 border-transparent hover:border-[#7C9070] transition-all py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA / Portal Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            {portalUserName ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-[#F0EBE3] text-[#2C3328] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  <User className="h-3.5 w-3.5 text-[#7C9070]" />
                  <span>Hi, {portalUserName.split(' ')[0]}</span>
                </div>
                <button
                  id="header-logout-btn"
                  onClick={onLogoutPortal}
                  className="text-xs font-bold uppercase tracking-wider text-[#6B705C] hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                id="header-portal-btn"
                onClick={onOpenPortal}
                className="bg-[#2C3328] text-[#FDFCF9] hover:bg-[#3D4637] transition-all font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full shadow-sm hover:shadow-md cursor-pointer"
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
              className="text-[#2C3328] hover:text-[#7C9070] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden bg-[#FDFCF9] border-t border-[#E8E2D9] shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)] animate-in slide-in-from-top-4 duration-200 text-left">
          <div className="px-5 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="block font-sans text-sm font-semibold uppercase tracking-wider text-[#6B705C] hover:bg-[#F2EFE9] hover:text-[#2C3328] px-4 py-3 rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#E8E2D9] flex flex-col space-y-3 px-4">
              {portalUserName ? (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#2C3328] font-medium">Signed in as <strong>{portalUserName}</strong></span>
                  <button
                    id="mobile-logout-btn"
                    onClick={() => {
                      onLogoutPortal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-bold text-red-600 uppercase tracking-wider"
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
                  className="w-full bg-[#2C3328] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl text-center shadow-lg hover:bg-[#3D4637] transition-colors"
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
