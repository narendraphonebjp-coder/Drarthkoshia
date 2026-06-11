import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { CLINIC_SERVICES } from '../data';
import { Service } from '../types';

interface ServicesSectionProps {
  onBookService: (serviceId: string) => void;
  servicesImgUrl: string;
}

export default function ServicesSection({ onBookService, servicesImgUrl }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'clinical' | 'aesthetic' | 'hair'>('all');

  const filteredServices = CLINIC_SERVICES.filter(service => {
    if (activeTab === 'all') return true;
    return service.category === activeTab;
  });

  // Dynamic icon helper safely retrieving from Lucide
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="h-6 w-6" />;
    }
    return <LucideIcons.Sparkles className="h-6 w-6" />;
  };

  const categories = [
    { id: 'all', name: 'All Treatments' },
    { id: 'clinical', name: 'Clinical Dermatology' },
    { id: 'aesthetic', name: 'Aesthetic Lasers & Peels' },
    { id: 'hair', name: 'Hair Loss & Restoration' }
  ];

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head description */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="font-sans text-xs font-bold text-blue-600 uppercase tracking-widest block">
            What We Do
          </span>
          <h2 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
            Advanced Medical &amp; Aesthetic Solutions
          </h2>
          <p className="font-sans text-base text-slate-550 leading-relaxed">
            Delivering safe, scientifically proven treatments utilizing US-FDA approved machinery and clinical precision designed for Indian skin types.
          </p>
        </div>

        {/* Tab filters with responsive container */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-100 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-all border ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                  : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid & Hero Highlight Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Highlight Card left-side on wide screens */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 flex flex-col justify-between group min-h-[350px]">
            {/* Absolute treat background */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${servicesImgUrl})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-0" />

            <div className="relative z-10 space-y-3">
              <span className="bg-blue-600/90 text-white font-semibold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                US-FDA Laser Tech
              </span>
              <h3 className="font-sans font-bold text-xl sm:text-2xl leading-snug">
                Painless Cooling Lasers
              </h3>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                Our clinic features triple-wavelength cooling lasers that treat hyperpigmentation, body hair, or acne scars comfortably with zero recovery downtime.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <span className="font-mono text-xs text-blue-400 font-bold block mb-1">Standard Price Match</span>
              <span className="font-sans text-xs text-slate-400">All procedurals align with clinical safety guidelines.</span>
            </div>
          </div>

          {/* Dynamic Service Grid List */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Service Category & Icon Row */}
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1 rounded-full bg-slate-50">
                      {service.category === 'clinical' ? 'Clinical Derm' : service.category === 'aesthetic' ? 'Cosmetic/Laser' : 'Hair Restoration'}
                    </span>
                  </div>

                  {/* Text Description */}
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h4>
                    <p className="font-sans text-sm text-slate-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Pricing, Duration & CTA Action Footer */}
                <div className="border-t border-slate-50 pt-4 mt-6 flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Pricing Est.</span>
                    <span className="font-sans text-sm font-extrabold text-blue-700">{service.priceRange}</span>
                  </div>
                  <button
                    id={`service-book-${service.id}`}
                    onClick={() => onBookService(service.id)}
                    className="bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-100 font-sans text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all"
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
