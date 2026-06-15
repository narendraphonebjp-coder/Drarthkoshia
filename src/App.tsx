import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ReviewsSection from './components/ReviewsSection';
import PortalModal from './components/PortalModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Icons for the Video Modal
import { Play, Pause, RotateCcw, Volume2, Maximize2, X, Star, Calendar, UserCheck, Stethoscope } from 'lucide-react';
import { DOCTOR_INFO, CLINIC_SERVICES } from './data';

// Importing generated assets with TS-ignore for seamless Vite asset handling
// @ts-ignore
import doctorPortraitImg from './assets/images/doctor_portrait_1781532451482.jpg';
// @ts-ignore
import clinicLobbyImg from './assets/images/clinic_lobby_1781532470305.jpg';
// @ts-ignore
import dermalTreatmentImg from './assets/images/dermal_treatment_1781532488482.jpg';

export default function App() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalUserName, setPortalUserName] = useState<string | null>(null);
  const [prefilledServiceId, setPrefilledServiceId] = useState<string>('rhinoplasty');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Simulated Video Player States
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoTimeSeconds, setVideoTimeSeconds] = useState(0); // 0 to 120 seconds

  // Handle live timer progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isVideoOpen && isPlaying) {
      interval = setInterval(() => {
        setVideoTimeSeconds((prev) => {
          if (prev >= 120) {
            return 0; // loop back to start
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoOpen, isPlaying]);

  const handleOpenPortal = () => {
    setIsPortalOpen(true);
  };

  const handleClosePortal = () => {
    setIsPortalOpen(false);
  };

  const handleLoginSuccess = (name: string) => {
    setPortalUserName(name);
  };

  const handleLogout = () => {
    setPortalUserName(null);
  };

  const handleBookService = (serviceId: string) => {
    setPrefilledServiceId(serviceId);
    setIsPortalOpen(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const restartVideo = () => {
    setVideoTimeSeconds(0);
    setIsPlaying(true);
  };

  // Derived slideshow properties
  const progress = (videoTimeSeconds / 120) * 100;
  const mins = Math.floor(videoTimeSeconds / 60);
  const secs = videoTimeSeconds % 60;
  const currentTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  let activeVideoImg = clinicLobbyImg;
  let activeChapterTitle = "1. Modern Consultation Lounge";
  let activeChapterDesc = "Walkthrough of our elegant reception and waiting room designed in natural olive and beige tones.";

  if (videoTimeSeconds >= 40 && videoTimeSeconds < 80) {
    activeVideoImg = dermalTreatmentImg;
    activeChapterTitle = "2. Sterile Surgical & Aesthetic Suite";
    activeChapterDesc = "A tour of our pristine operating environment and advanced laser systems designed for safety.";
  } else if (videoTimeSeconds >= 80) {
    activeVideoImg = doctorPortraitImg;
    activeChapterTitle = "3. Personal Consultation";
    activeChapterDesc = "Meet Dr. Akhilesh Agarwal to discuss high-definition body sculpting and advanced rhinoplasty designs.";
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Sticky Header Navigation */}
      <Header
        onOpenPortal={handleOpenPortal}
        portalUserName={portalUserName}
        onLogoutPortal={handleLogout}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section styled like reference mockup */}
        <Hero
          onBookAppointment={() => handleBookService('rhinoplasty')}
          onPlayVideo={() => setIsVideoOpen(true)}
          doctorPortraitUrl={doctorPortraitImg}
        />

        {/* Replicated "How It Works" 4-Step sequence */}
        <Features />

        {/* About Dr. Arth & Clinic space showcase */}
        <AboutSection clinicLobbyUrl={clinicLobbyImg} />

        {/* Dynamic Medical & Esthetic filters list */}
        <ServicesSection
          onBookService={handleBookService}
          servicesImgUrl={dermalTreatmentImg}
        />

        {/* Verified Patient reviews, summaries & mock submission form */}
        <ReviewsSection />

        {/* Embedded Map, coordinates details & inquiry messaging forms */}
        <ContactSection />
      </main>

      {/* Structured footer with disclaimers */}
      <Footer />

      {/* Interactive Portal Modal for Accounts, Bookings, Chats & Records */}
      <PortalModal
        isOpen={isPortalOpen}
        onClose={handleClosePortal}
        onLoginSuccess={handleLoginSuccess}
        portalUserName={portalUserName}
        onLogout={handleLogout}
        initialServiceId={prefilledServiceId}
      />

      {/* High-Polish Video Modal simulation for modern virtual tours */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative border border-slate-800 animate-in zoom-in-95 duration-200">
            
            {/* Visual Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-left">
              <div>
                <h3 className="font-sans font-bold text-sm text-slate-100">Virtual Clinic Tour &amp; Consultation</h3>
                <p className="font-sans text-[10px] text-slate-400">Walking inside {DOCTOR_INFO.clinicName} (Anandapur, Kolkata)</p>
              </div>
              <button
                id="close-video-modal"
                onClick={() => setIsVideoOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Viewport Stage */}
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeVideoImg}
                alt="Clinic Tour Footage"
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  isPlaying ? 'brightness-[0.75] contrast-[1.05] scale-105' : 'brightness-50 filter blur-sm scale-100'
                }`}
                key={activeVideoImg}
                referrerPolicy="no-referrer"
              />

              {/* Floating Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Patient Reception Tag / watermark */}
              <div className="absolute top-4 left-4 bg-slate-950/80 px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase font-bold text-emerald-400 flex items-center space-x-1 border border-slate-800">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span>REC • LIVE CLINIC TOUR &amp; SURGERY PORTFOLIO</span>
              </div>

              {/* Central Large Play Icon if paused */}
              {!isPlaying && (
                <button
                  id="video-play-center-btn"
                  onClick={togglePlay}
                  className="absolute bg-[#7C9070] text-[#FDFCF9] p-5 rounded-full shadow-2xl border border-[#7C9070]/50 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                  <Play className="h-8 w-8 fill-current translate-x-0.5" />
                </button>
              )}

              {/* Text overlay introducing the doctor */}
              <div className="absolute bottom-16 left-6 right-6 text-left space-y-1 z-10">
                <span className="text-xs font-bold text-[#D4A373] tracking-widest uppercase block mb-1">
                  {activeChapterTitle}
                </span>
                <p className="text-xs text-slate-200 leading-normal max-w-lg filter drop-shadow font-light">
                  {activeChapterDesc}
                </p>
              </div>
            </div>

            {/* Customizable Video Media Controls */}
            <div className="p-4 bg-slate-950 flex flex-col space-y-3">
              {/* Progress Bar Track */}
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span>{currentTime}</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>02:00</span>
              </div>

              {/* Control Action Buttons Bar */}
              <div className="flex items-center justify-between text-slate-300 text-sm">
                <div className="flex items-center space-x-4">
                  <button
                    id="video-play-pause-toggle"
                    onClick={togglePlay}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                  </button>
                  <button
                    id="video-restart"
                    onClick={restartVideo}
                    className="hover:text-blue-400 transition-colors"
                  >
                    <RotateCcw className="h-4.5 w-4.5" />
                  </button>
                  <div className="flex items-center space-x-1">
                    <Volume2 className="h-4.5 w-4.5" />
                    <span className="text-[10px]">100%</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-500">1080p Full HD</span>
                  <button className="hover:text-blue-400">
                    <Maximize2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
