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
      className="relative min-h-screen pt-28 pb-12 flex items-center overflow-hidden bg-slate-50/50"
    >
      {/* Background blobs in organic designs matching the mock */}
      <div className="absolute top-20 right-[-10%] w-[50vw] h-[50vw] max-w-[600px] bg-sky-200/40 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] max-w-[450px] bg-blue-100/40 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8">
            
            {/* Tagline / Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full w-fit">
              <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
              <span className="font-sans text-xs font-semibold text-blue-800 tracking-wide uppercase">
                #1 Rated Dermatologist &amp; Laser Clinic in Ahmedabad
              </span>
            </div>

            {/* Heading mimicking the structure of the mock */}
            <h1 className="font-sans font-extrabold text-slate-900 tracking-tight text-4xl sm:text-5xl md:text-6xl leading-[1.15]">
              Find a <span className="text-blue-600 relative inline-block">Doctor<span className="absolute bottom-0 left-0 w-full h-[6px] bg-blue-100 -z-[1]" /></span> And <br />
              Book An <span className="text-blue-600 relative inline-block">
                Appointment
                {/* Simulated red hand-drawn swoosh or underline */}
                <svg className="absolute left-0 bottom-[-8px] w-full h-[12px] text-rose-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,7 C30,3 70,3 100,7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Customized premium subtext */}
            <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              We are Gujarat's premier dermatology destination led by <span className="font-semibold text-slate-800">{DOCTOR_INFO.name}</span>. 
              Get advanced US-FDA lasers, surgical hair restoration, clinical skin treatment, and personalized chemical therapies with 24/7 post-care assistance.
            </p>

            {/* Action Buttons mimicking the mock call-to-actions */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <button
                id="hero-book-btn"
                onClick={onBookAppointment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-sans text-base font-bold py-4 px-8 rounded-full shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 active:scale-95 transition-all flex items-center space-x-2.5 group"
              >
                <Calendar className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" />
                <span>Make Appointment</span>
              </button>

              <button
                id="hero-play-video"
                onClick={onPlayVideo}
                className="flex items-center space-x-3 text-slate-800 hover:text-blue-600 font-sans text-base font-semibold py-3 px-4 group transition-colors"
              >
                {/* SVG play circle matching the layout perfectly */}
                <div className="bg-white group-hover:bg-blue-50 text-blue-600 p-3 rounded-full shadow-md group-hover:shadow-lg border border-slate-100 group-hover:border-blue-200 transition-all">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <span>Play Video / Tour</span>
              </button>
            </div>

            {/* Small Quick Trusts */}
            <div className="grid grid-cols-3 gap-4 xl:gap-8 pt-4 border-t border-slate-100">
              <div className="flex flex-col space-y-1">
                <span className="font-sans font-bold text-slate-900 text-2xl xl:text-3xl">8+ <span className="text-blue-600">Yrs</span></span>
                <span className="font-sans text-xs font-medium text-slate-500">Clinical Experience</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-sans font-bold text-slate-900 text-2xl xl:text-3xl">9,500+</span>
                <span className="font-sans text-xs font-medium text-slate-500">Healed Patients</span>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="font-sans font-bold text-slate-900 text-2xl xl:text-3xl">4.9</span>
                  <div className="flex text-amber-400">
                    <Star className="h-4.5 w-4.5 fill-current" />
                  </div>
                </div>
                <span className="font-sans text-xs font-medium text-slate-500">380+ Google Reviews</span>
              </div>
            </div>

          </div>

          {/* Hero Right Media Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0">
            
            {/* Decorative polka dots backing behind doctor, matching mock up */}
            <div className="absolute top-[-5%] right-[5%] -z-10 text-blue-200/90 hidden sm:block">
              <svg className="w-36 h-36" fill="currentColor">
                <pattern id="dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>

            {/* Blue abstract backdrop organic shape curves */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-sky-500 to-sky-400 rounded-[4rem] rounded-tl-[10rem] rotate-3 -z-20 shadow-2xl opacity-90 scale-95 md:scale-100" />
            <div className="absolute inset-0 bg-blue-500/10 rounded-[4rem] rounded-tl-[10rem] -rotate-3 -z-20 " />

            {/* Doctor portrait image inside framing */}
            <div className="relative overflow-hidden w-full max-w-[380px] rounded-[3.5rem] rounded-tl-[9rem] bg-white/10 backdrop-blur-sm p-2 shadow-2xl border border-white/20">
              <img
                src={doctorPortraitUrl}
                alt="Dr. Arth Koshia portrait"
                className="w-full h-auto aspect-square object-cover rounded-[3rem] rounded-tl-[8rem] bg-slate-100 scale-102 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating element 1: Interactive Love Circle, mimicking the mock red love popup */}
            <div className="absolute top-[10%] right-[-5%] sm:right-[0%] bg-rose-500 text-white p-4.5 rounded-2xl shadow-xl shadow-rose-500/30 animate-bounce duration-4000">
              <Heart className="h-6 w-6 fill-current text-white" />
            </div>

            {/* Floating element 2: Trust verification box */}
            <div className="absolute bottom-[5%] left-[-5%] sm:left-[0%] bg-white p-4 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 flex items-center space-x-3 max-w-[200px]">
              <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-full">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-400">Verified</span>
                <span className="font-sans text-sm font-bold text-slate-800 leading-tight">Board Certified Dermatologist</span>
              </div>
            </div>

            {/* Abstract ambient floating blobs */}
            <div className="absolute bottom-[-15px] right-[10%] w-8 h-8 rounded-full bg-blue-400 animate-pulse duration-3000" />
            <div className="absolute top-[-25px] left-[15%] w-5 h-5 rounded-full bg-sky-300 animate-pulse duration-2000" />
            
          </div>

        </div>
      </div>
    </section>
  );
}
