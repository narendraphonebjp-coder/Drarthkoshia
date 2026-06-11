import React, { useState } from 'react';
import { HeartPulse, Check } from 'lucide-react';
import { DOCTOR_INFO } from '../data';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSuccess(true);
    setEmail('');
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Dr. Arth', href: '#about' },
    { name: 'Treatments', href: '#services' },
    { name: 'Patient Reviews', href: '#reviews' },
    { name: 'Clinic Address', href: '#contact' }
  ];

  return (
    <footer className="bg-[#2C3328] text-[#A5A58D] border-t border-[#3D4637] pt-20 pb-12 text-left relative overflow-hidden z-10">
      
      {/* Background decoration */}
      <div className="absolute bottom-0 right-[4%] w-80 h-80 bg-[#7C9070]/5 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Logo Brand column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-[#7C9070] text-[#FDFCF9] p-2 rounded-xl">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[#FDFCF9] text-lg leading-tight tracking-tight">
                  Koshia <span className="font-sans font-extrabold uppercase text-[10px] text-[#7C9070] block tracking-widest pt-0.5">Skin &amp; Laser Clinic</span>
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-[#E8E2D9]/70 leading-relaxed">
              Led by {DOCTOR_INFO.name}, M.D. Dermatology (Gold Medalist), we are Ahmedabad's premier destination for clinical dermatology, aesthetic lasers, and modern hair transplants.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="font-sans text-[10px] font-bold text-[#FDFCF9] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#FDFCF9] hover:underline transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Work Summary Column */}
          <div className="space-y-4">
            <h4 className="font-sans text-[10px] font-bold text-[#FDFCF9] uppercase tracking-wider">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#E8E2D9]/70 leading-relaxed">
              <p>Suite 201, JP 12th Business Hub, Surendra Mangaldas Rd, opposite Raj Stationers, Ambawadi, Ahmedabad</p>
              <p className="font-semibold text-[#FDFCF9]">Helpline: {DOCTOR_INFO.phone}</p>
              <p className="text-[10px] text-[#A5A58D]">Please complete an online reservation or sign in to patient portal prior to visiting.</p>
            </div>
          </div>

          {/* Newsletter Subscribe form Column */}
          <div className="space-y-4">
            <h4 className="font-sans text-[10px] font-bold text-[#FDFCF9] uppercase tracking-wider">
              Skincare Newsletter
            </h4>
            <p className="font-sans text-xs text-[#E8E2D9]/70 leading-relaxed">
              Subscribe to get monthly skin care tips, therapeutic laser announcements, and seasonal treatment offerings from Dr. Arth.
            </p>

            {isSuccess ? (
              <div className="bg-[#7C9070]/20 border border-[#7C9070]/50 p-3 rounded-xl flex items-center space-x-2 text-[#7C9070] text-xs font-semibold animate-in fade-in duration-300">
                <Check className="h-4 w-4 text-[#7C9070]" />
                <span>Subscription Confirmed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="flex-1 text-xs font-semibold border border-[#3D4637] bg-[#1E231B] text-[#FDFCF9] rounded-xl py-2 px-3 focus:border-[#7C9070] outline-none"
                />
                <button
                  id="footer-subscribe-btn"
                  type="submit"
                  className="bg-[#7C9070] hover:bg-[#6B705C] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-wider px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Divider and disclaimer */}
        <div className="border-t border-[#3D4637] pt-8 mt-12 text-center space-y-6">
          <p className="font-sans text-[10px] text-[#A5A58D] leading-relaxed max-w-4xl mx-auto">
            <strong>Medical Disclaimer:</strong> The clinical, aesthetic, and surgical data displayed on this website corresponds to a portfolio representation for {DOCTOR_INFO.clinicName}. All informational summaries, media assets, patient reviews, and mock prescriptions do not substitute professional medical opinion, direct clinical diagnosis, or physical therapeutic evaluation. Seek a physical board-certified physician or qualified dermatologist for personalized symptoms evaluation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A5A58D]/70">
            <span>© 2026 {DOCTOR_INFO.clinicName}. All rights reserved.</span>
            <span>Created for Dr. Arth Koshia M.D. Dermatology • Ambawadi, Ahmedabad</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
