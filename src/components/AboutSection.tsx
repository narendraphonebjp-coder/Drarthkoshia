import React from 'react';
import { Award, GraduationCap, Building2, Stethoscope, CheckCircle } from 'lucide-react';
import { DOCTOR_INFO, CLINIC_STATS } from '../data';

interface AboutSectionProps {
  clinicLobbyUrl: string;
}

export default function AboutSection({ clinicLobbyUrl }: AboutSectionProps) {
  const credentials = [
    {
      icon: GraduationCap,
      title: "M.D. Dermatology, Venereology & Leprosy (Gold Medalist)",
      desc: "Post-graduate specialization in cellular skin pathology, advanced therapeutics, and laser medicine."
    },
    {
      icon: Award,
      title: "Board-Certified Aesthetic Surgeon",
      desc: "Extensive hands-on training in FUE Hair Transplant surgery, Botox/Fillers liquid sculpting, and micro-needling RF."
    },
    {
      icon: Building2,
      title: "Modern Clinical Infrastructure",
      desc: "Fully equipped with modern US-FDA approved machinery, triple wavelength lasers, and high-sterilization standards."
    },
    {
      icon: Stethoscope,
      title: "Member of Premier Associations",
      desc: "Proud, active member of Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)."
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clinic space imagery */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Visual borders */}
            <div className="absolute top-[-20px] left-[-20px] w-24 h-24 border-t-4 border-l-4 border-blue-600 rounded-tl-3xl -z-10" />
            <div className="absolute bottom-[-20px] right-[-20px] w-24 h-24 border-b-4 border-r-4 border-sky-400 rounded-br-3xl -z-10" />

            <div className="rounded-3xl overflow-hidden shadow-2xl relative bg-white p-2 border border-slate-100">
              <img
                src={clinicLobbyUrl}
                alt="Koshia Skin Care Clinic Lobby"
                className="w-full h-auto aspect-[4/3] object-cover rounded-2xl hover:scale-102 transition-transform duration-550"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl flex items-center space-x-4">
                <div className="bg-blue-600 text-white p-3 rounded-xl flex-shrink-0">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-sm">State-of-the-Art Operations</h4>
                  <p className="font-sans text-xs text-slate-500">Suite 201, JP 12th hub, Surendra Mangaldas Rd</p>
                </div>
              </div>
            </div>

            {/* Glowing effect inside background */}
            <div className="absolute inset-0 bg-blue-550/5 blur-[50px] rounded-full -z-20" />
          </div>

          {/* Right Column: Bio details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-xs font-bold text-blue-600 uppercase tracking-widest block">
                Meet the Physician
              </span>
              <h2 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl leading-tight">
                {DOCTOR_INFO.name}
              </h2>
              <p className="font-sans text-sm font-medium text-slate-400 italic">
                {DOCTOR_INFO.title}
              </p>
            </div>

            <p className="font-sans text-base text-slate-600 leading-relaxed">
              {DOCTOR_INFO.about}
            </p>

            {/* Bullet List for specialized training details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {credentials.map((cred, idx) => {
                const CredIcon = cred.icon;
                return (
                  <div key={idx} className="flex space-x-3 text-left">
                    <div className="flex-shrink-0 self-start p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                      <CredIcon className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-sans font-bold text-sm text-slate-900 leading-snug">
                        {cred.title}
                      </h3>
                      <p className="font-sans text-xs text-slate-500 leading-relaxed">
                        {cred.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Core Values / Commitments */}
            <div className="p-5.5 rounded-2xl bg-white border border-slate-100/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-full border border-emerald-100">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900">Zero Commercial Up-selling</h4>
                  <p className="font-sans text-xs text-slate-500">Only honest scientific skincare solutions aligned with guidelines.</p>
                </div>
              </div>
              <a
                href="#contact"
                className="bg-sky-50 text-sky-800 hover:bg-sky-100 transition-colors font-sans text-xs font-bold px-4.5 py-2.5 rounded-xl border border-sky-100/50 text-center self-start md:self-auto"
              >
                Find Clinic Location
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
