import React from 'react';
import { Calendar, Play, Heart, Star, ShieldCheck } from 'lucide-react';
import { DOCTOR_INFO } from '../data';

interface HeroProps {
  onBookAppointment: () => void;
  onPlayVideo: () => void;
  doctorPortraitUrl: string;
}

export default function Hero({ onBookAppointment, onPlayVideo, doctorPortraitUrl }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-12 flex items-center overflow-hidden bg-[#FDFCF9]"
    >
      {/* Background blobs in organic designs matching the mock */}
      <div className="absolute top-20 right-[-10%] w-[50vw] h-[50vw] max-w-[600px] bg-[#7C9070]/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] max-w-[450px] bg-[#6B705C]/5 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8">
            
            {/* Tagline / Badge */}
            <div className="inline-block px-4 py-2 bg-[#F0EBE3] rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7C9070] w-fit">
              #1 Rated Dermatologist &amp; Laser Clinic in Ahmedabad
            </div>

            {/* Heading mimicking the structure of the mock */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.1] text-[#2C3328] tracking-tight">
              Precision Care <br />
              <span className="italic font-light text-[#7C9070]">for Your Skin.</span>
            </h1>

            {/* Customized premium subtext */}
            <p className="font-sans text-sm sm:text-base text-[#6B705C] leading-relaxed max-w-xl italic font-light">
              Led by Dr. Arth Koshia, M.D. (Gold Medalist), we specialize in advanced US-FDA lasers, scar revision, pain-free hair transplants, and therapeutic skin healthcare in Ahmedabad.
            </p>

            {/* Action Buttons mimicking the mock call-to-actions */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <button
                id="hero-book-btn"
                onClick={onBookAppointment}
                className="bg-[#2C3328] text-[#FDFCF9] hover:bg-[#3D4637] font-sans text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center space-x-2.5 group cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-[#7C9070] group-hover:text-white transition-colors" />
                <span>Make Appointment</span>
              </button>

              <button
                id="hero-play-video"
                onClick={onPlayVideo}
                className="flex items-center space-x-3 text-slate-800 hover:text-blue-600 font-sans text-base font-semibold py-3 px-4 group transition-colors"
              >
                {/* SVG play circle matching the layout perfectly */}
                <div className="bg-[#F0EBE3] text-[#7C9070] group-hover:bg-[#E8E2D9] p-3 rounded-full transition-all">
                  <Play className="h-4.5 w-4.5 fill-current" />
                </div>
                <span>Play Clinic Tour</span>
              </button>
            </div>

            {/* Small Quick Trusts */}
            <div className="grid grid-cols-3 gap-4 xl:gap-8 pt-6 border-t border-[#E8E2D9]">
              <div className="flex flex-col space-y-1">
                <span className="font-serif font-medium text-[#2C3328] text-2xl xl:text-3xl">8+ <span className="text-[#7C9070] italic">Yrs</span></span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#6B705C]">Experience</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-serif font-medium text-[#2C3328] text-2xl xl:text-3xl">9,500+</span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#6B705C]">Happy Patients</span>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="font-serif font-medium text-[#2C3328] text-2xl xl:text-3xl">4.9</span>
                  <div className="flex text-[#D4A373]">
                    <Star className="h-4.5 w-4.5 fill-current" />
                  </div>
                </div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#6B705C]">380+ Reviews</span>
              </div>
            </div>

          </div>

          {/* Hero Right Media Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0">
            
            {/* Decorative polka dots backing behind doctor, matching mock up */}
            <div className="absolute top-[-5%] right-[5%] -z-10 text-[#7C9070]/10 hidden sm:block">
              <svg className="w-36 h-36" fill="currentColor">
                <pattern id="dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>

            {/* Sage/Olive abstract backdrop organic shape curves */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2C3328] via-[#7C9070] to-[#E8E2D9] rounded-[40px] rotate-3 -z-20 shadow-xl opacity-90 scale-95 md:scale-100" />
            <div className="absolute inset-0 bg-[#7C9070]/10 rounded-[40px] -rotate-3 -z-20 " />

            {/* Doctor portrait image inside framing */}
            <div className="relative overflow-hidden w-full max-w-[380px] rounded-[36px] bg-[#FDFCF9]/10 backdrop-blur-sm p-2 shadow-2xl border border-[#FDFCF9]/20">
              <img
                src={doctorPortraitUrl}
                alt="Dr. Arth Koshia portrait"
                className="w-full h-auto aspect-square object-cover rounded-[28px] bg-[#F2EFE9] scale-102 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating element 1: Interactive Love Circle, mimicking the mock red love popup */}
            <div className="absolute top-[10%] right-[-5%] sm:right-[0%] bg-[#7C9070] text-[#FDFCF9] p-4.5 rounded-2xl shadow-xl animate-bounce duration-4000">
              <Heart className="h-5 w-5 fill-current text-white" />
            </div>

            {/* Floating element 2: Trust verification box */}
            <div className="absolute bottom-[5%] left-[-5%] sm:left-[0%] bg-[#FDFCF9] p-4 rounded-2xl shadow-xl border border-[#E8E2D9] flex items-center space-x-3 max-w-[200px]">
              <div className="bg-[#F0EBE3] text-[#7C9070] p-2.5 rounded-full">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-[#6B705C]">Verified</span>
                <span className="font-sans text-xs font-bold text-[#2C3328] leading-tight">Board Certified Specialist</span>
              </div>
            </div>

            {/* Abstract ambient floating blobs */}
            <div className="absolute bottom-[-15px] right-[10%] w-6 h-6 rounded-full bg-[#7C9070]/30 animate-pulse duration-3000" />
            <div className="absolute top-[-25px] left-[15%] w-4 h-4 rounded-full bg-[#6B705C]/20 animate-pulse duration-2000" />
            
          </div>

        </div>
      </div>
    </section>
  );
}
