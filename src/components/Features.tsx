import React from 'react';
import { Search, UserCheck, CalendarDays, Sparkles } from 'lucide-react';

export default function Features() {
  const steps = [
    {
      id: "step-1",
      title: "1. Easy Booking",
      desc: "Instantly schedule your clinic visit at Ambawadi or easily book via our secure patient portal.",
      icon: Search,
      bgColor: "bg-[#F0EBE3] text-[#7C9070] border-[#E8E2D9]",
      iconColor: "text-[#7C9070]"
    },
    {
      id: "step-2",
      title: "2. Expert Skin Analysis",
      desc: "Dr. Arth Koshia reviews your clinical symptoms, lifestyle factors, and skin/hair composition.",
      icon: UserCheck,
      bgColor: "bg-[#F2EFE9] text-[#6B705C] border-[#E8E2D9]",
      iconColor: "text-[#6B705C]"
    },
    {
      id: "step-3",
      title: "3. Customized Therapy",
      desc: "Receive world-class FDA lasers, optimized medical creams, or targeted hair regeneration therapies.",
      icon: CalendarDays,
      bgColor: "bg-[#F0EBE3] text-[#7C9070] border-[#E8E2D9]",
      iconColor: "text-[#7C9070]"
    },
    {
      id: "step-4",
      title: "4. Lasting Healthy Skin",
      desc: "Benefit from continuous post-session digital tracking, clinical follow-ups, and genuine care.",
      icon: Sparkles,
      bgColor: "bg-[#F2EFE9] text-[#6B705C] border-[#E8E2D9]",
      iconColor: "text-[#6B705C]"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#FDFCF9] border-b border-[#E8E2D9] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching the layout of the mockup */}
        <div className="text-center space-y-2 mb-16">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-[#6B705C] block">
            Easy 4-Step Sequence
          </span>
          <h2 className="font-serif text-[#2C3328] text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            How it <span className="italic font-light text-[#7C9070]">Works</span>
          </h2>
          <div className="mx-auto w-12 h-0.5 bg-[#7C9070] mt-4" />
        </div>

        {/* 4 Cards Grid mirroring the mock icons and typography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="relative bg-[#FDFCF9] p-6.5 rounded-3xl border border-[#E8E2D9]/60 hover:border-[#7C9070]/60 hover:bg-[#F2EFE9]/30 transition-all duration-300 group flex flex-col items-center text-center space-y-4"
              >
                {/* Visual Connector Line for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-[40px] right-[-20%] w-[40%] h-[1px] bg-[#E8E2D9] z-10" />
                )}

                {/* Circle Icon Base */}
                <div className={`p-4 rounded-full ${step.bgColor} border flex items-center justify-center relative z-20 group-hover:scale-110 transition-all shadow-sm`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Typography details */}
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-[#2C3328] text-sm uppercase tracking-wider group-hover:text-[#7C9070] transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6B705C] leading-relaxed">
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
