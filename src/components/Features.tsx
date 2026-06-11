import React from 'react';
import { Search, UserCheck, CalendarDays, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Features() {
  const steps = [
    {
      id: "step-1",
      title: "1. Easy Booking",
      desc: "Instantly schedule your clinic visit at Ambawadi or easily book via our secure patient portal.",
      icon: Search,
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: "step-2",
      title: "2. Expert Skin Analysis",
      desc: "Dr. Arth Koshia reviews your clinical symptoms, lifestyle factors, and skin/hair composition.",
      icon: UserCheck,
      bgColor: "bg-teal-50 text-teal-600 border-teal-100",
      iconColor: "text-teal-600"
    },
    {
      id: "step-3",
      title: "3. Customized Therapy",
      desc: "Receive world-class FDA lasers, optimized medical creams, or targeted hair regeneration therapies.",
      icon: CalendarDays,
      bgColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      id: "step-4",
      title: "4. Lasting Radiant Skin",
      desc: "Benefit from continuous post-session digital tracking, clinical follow-ups, and genuine care.",
      icon: Sparkles,
      bgColor: "bg-rose-50 text-rose-600 border-rose-100",
      iconColor: "text-rose-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white border-b border-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching the layout of the mockup */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl">
            How it Works?
          </h2>
          <p className="font-sans text-sm font-semibold text-slate-500 uppercase tracking-widest">
            4 Steps to your Radiant Skin Solution
          </p>
          <div className="mx-auto w-12 h-1 bg-blue-600 rounded-full mt-3" />
        </div>

        {/* 4 Cards Grid mirroring the mock icons and typography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="relative bg-white p-6 rounded-3xl border border-slate-100/80 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-300 group flex flex-col items-center text-center space-y-4"
              >
                {/* Visual Connector Line for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-[40px] right-[-20%] w-[40%] h-[2px] bg-slate-100 z-10" />
                )}

                {/* Circle Icon Base */}
                <div className={`p-4 rounded-2xl ${step.bgColor} border flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-7 w-7" />
                </div>

                {/* Typography details */}
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-slate-950 text-lg leading-snug group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
