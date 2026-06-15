import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { CLINIC_SERVICES } from '../data';

interface ServicesSectionProps {
  onBookService: (serviceId: string) => void;
  servicesImgUrl: string;
}

export default function ServicesSection({ onBookService, servicesImgUrl }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'clinical' | 'aesthetic'>('all');

  const filteredServices = CLINIC_SERVICES.filter(service => {
    if (activeTab === 'all') return true;
    return service.category === activeTab;
  });

  // Dynamic icon helper safely retrieving from Lucide
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="h-5 w-5" />;
    }
    return <LucideIcons.Sparkles className="h-5 w-5" />;
  };

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'clinical', name: 'Clinical & Reconstructive' },
    { id: 'aesthetic', name: 'Cosmetic & Aesthetic' }
  ];

  return (
    <section id="services" className="py-24 bg-[#FDFCF9] border-b border-[#E8E2D9] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head description */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-[10px] font-extrabold text-[#7C9070] uppercase tracking-[0.2em] block">
              What We Do
          </span>
          <h2 className="font-serif text-[#2C3328] text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Advanced Medical &amp; Aesthetic Solutions
          </h2>
          <p className="font-sans text-xs text-[#6B705C] leading-relaxed max-w-2xl mx-auto italic font-light">
            Delivering safe, scientifically proven treatments utilizing US-FDA approved machinery and clinical precision designed for Indian skin types.
          </p>
        </div>

        {/* Tab filters with responsive container */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-[#E8E2D9] pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-all border cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-[#2C3328] text-[#FDFCF9] border-[#2C3328] shadow-sm'
                  : 'bg-[#F0EBE3] text-[#6B705C] border-[#E8E2D9] hover:bg-[#E8E2D9] hover:text-[#2C3328]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid & Hero Highlight Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Highlight Card left-side on wide screens */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden bg-[#2C3328] text-[#FDFCF9] p-8 flex flex-col justify-between group min-h-[350px] shadow-sm border border-[#E8E2D9]/20">
            {/* Absolute treat background */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${servicesImgUrl})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3328] via-[#2C3328]/60 to-transparent z-0" />

            <div className="relative z-10 space-y-3 text-left">
              <span className="bg-[#7C9070]/90 text-[#FDFCF9] font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full w-fit block">
                Gold Standard Safety
              </span>
              <h3 className="font-serif font-normal text-2xl leading-tight text-[#FDFCF9]">
                Artistic Precision
              </h3>
              <p className="font-sans text-xs text-[#E8E2D9] leading-relaxed font-light">
                Our studio features highly specialized clinical systems, high-sterility operating suites, and custom implants aligned with elite international medical criteria.
              </p>
            </div>

            <div className="relative z-10 pt-6 text-left">
              <span className="font-serif text-[#D4A373] text-sm block mb-1">Standard Price Match</span>
              <span className="font-sans text-[10px] text-[#A5A58D] leading-none">All procedures align with clinical safety guidelines.</span>
            </div>
          </div>

          {/* Dynamic Service Grid List */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#FDFCF9] p-6 rounded-2xl border border-[#E8E2D9] hover:bg-[#F2EFE9]/30 hover:border-[#7C9070]/60 transition-all flex flex-col justify-between group text-left"
              >
                <div className="space-y-4">
                  {/* Service Category & Icon Row */}
                  <div className="flex items-center justify-between">
                    <div className="bg-[#F0EBE3] text-[#7C9070] p-2.5 rounded-xl border border-[#E8E2D9]">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B705C] px-3 py-1 rounded-full bg-[#F2EFE9]">
                      {service.category === 'clinical' ? 'Clinical & Trauma' : 'Aesthetic/Cosmetic'}
                    </span>
                  </div>

                  {/* Text Description */}
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-sm text-[#2C3328] uppercase tracking-wider group-hover:text-[#7C9070] transition-colors">
                      {service.title}
                    </h4>
                    <p className="font-sans text-xs text-[#6B705C] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Pricing, Duration & CTA Action Footer */}
                <div className="border-t border-[#E8E2D9] pt-4 mt-6 flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-[#A5A58D] font-bold uppercase">Pricing Est.</span>
                    <span className="font-serif text-base font-semibold text-[#7C9070]">{service.priceRange}</span>
                  </div>
                  <button
                    id={`service-book-${service.id}`}
                    onClick={() => onBookService(service.id)}
                    className="bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-widest py-2.5 px-4.5 rounded-lg transition-all cursor-pointer"
                  >
                    Select &amp; Book
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
