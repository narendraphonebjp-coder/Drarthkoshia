import React from 'react';
import { Award, GraduationCap, Building2, Stethoscope, CheckCircle } from 'lucide-react';
import { DOCTOR_INFO } from '../data';

interface AboutSectionProps {
  clinicLobbyUrl: string;
}

export default function AboutSection({ clinicLobbyUrl }: AboutSectionProps) {
  const credentials = [
    {
      icon: GraduationCap,
      title: "M.B.B.S, M.S., M.Ch (Gold Medalist)",
      desc: "Post-graduate super-specialization in plastic and aesthetic surgery, advanced microvascular techniques, and body contouring."
    },
    {
      icon: Award,
      title: "Board-Certified Plastic Surgeon",
      desc: "Extensive clinical fellowships at the world-renowned Mayo Clinic, Rochester, USA and Chang Gung Memorial Hospital, Taiwan."
    },
    {
      icon: Building2,
      title: "Modern Surgical Infrastructure",
      desc: "Fully equipped with modern operating theaters, advanced liposuction systems, and high sterile medical standards."
    },
    {
      icon: Stethoscope,
      title: "Premier Professional Member",
      desc: "Proud active member of leading national and international plastic, cosmetic, and reconstructive surgery associations."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#F2EFE9]/30 border-b border-[#E8E2D9] relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clinic space imagery */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Visual borders in organic sage */}
            <div className="absolute top-[-15px] left-[-15px] w-20 h-20 border-t-2 border-l-2 border-[#7C9070] rounded-tl-2xl -z-10" />
            <div className="absolute bottom-[-15px] right-[-15px] w-20 h-20 border-b-2 border-r-2 border-[#6B705C] rounded-br-2xl -z-10" />

            <div className="rounded-3xl overflow-hidden shadow-lg relative bg-[#FDFCF9] p-2 border border-[#E8E2D9]">
              <img
                src={clinicLobbyUrl}
                alt="Dr. Akhilesh Agarwal Clinic Studio"
                className="w-full h-auto aspect-[4/3] object-cover rounded-2xl hover:scale-102 transition-all duration-550"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#FDFCF9]/95 backdrop-blur-md p-4 rounded-xl border border-[#E8E2D9] shadow-md flex items-center space-x-4">
                <div className="bg-[#7C9070] text-[#FDFCF9] p-3 rounded-lg flex-shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[#2C3328] text-[13px] tracking-tight">Advanced Care Facility</h4>
                  <p className="font-sans text-[11px] text-[#6B705C]">Anandapur Area, Kolkata</p>
                </div>
              </div>
            </div>

            {/* Glowing effect inside background */}
            <div className="absolute inset-0 bg-[#7C9070]/5 blur-[50px] rounded-full -z-20" />
          </div>

          {/* Right Column: Bio details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-[10px] font-extrabold text-[#7C9070] uppercase tracking-[0.2em] block">
                Meet the Physician
              </span>
              <h2 className="font-serif font-normal text-[#2C3328] text-4xl sm:text-5xl leading-tight tracking-tight">
                {DOCTOR_INFO.name}
              </h2>
              <div className="font-sans text-xs uppercase tracking-widest text-[#6B705C] font-semibold">
                {DOCTOR_INFO.title}
              </div>
            </div>

            <p className="font-sans text-sm text-[#4A443E] leading-relaxed italic font-light">
              {DOCTOR_INFO.about}
            </p>

            {/* Bullet List for specialized training details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {credentials.map((cred, idx) => {
                const CredIcon = cred.icon;
                return (
                  <div key={idx} className="flex space-x-3 text-left">
                    <div className="flex-shrink-0 self-start p-2 rounded-lg bg-[#F0EBE3] text-[#7C9070] border border-[#E8E2D9]">
                      <CredIcon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-sans font-bold text-xs text-[#2C3328] leading-snug uppercase tracking-wider">
                        {cred.title}
                      </h3>
                      <p className="font-sans text-[11px] text-[#6B705C] leading-relaxed">
                        {cred.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Core Values / Commitments */}
            <div className="p-5 rounded-2xl bg-[#F2EFE9] border border-[#E8E2D9] flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
              <div className="flex items-center space-x-3 text-left">
                <div className="bg-[#F0EBE3] text-[#7C9070] p-2 rounded-full border border-[#E8E2D9]">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#2C3328] uppercase tracking-wider">Zero Commercial Up-selling</h4>
                  <p className="font-sans text-[11px] text-[#6B705C]">Only honest scientific skincare solutions aligned with guidelines.</p>
                </div>
              </div>
              <a
                href="#contact"
                className="bg-[#2C3328] text-[#FDFCF9] hover:bg-[#3D4637] transition-all font-sans text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg text-center cursor-pointer"
              >
                Find Clinic
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
