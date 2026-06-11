import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { DOCTOR_INFO } from '../data';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', query: '' });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.query) return;

    setIsSubmitSuccess(true);
    setFormState({ name: '', email: '', phone: '', query: '' });

    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 4500);
  };

  return (
    <section id="contact" className="py-24 bg-[#FDFCF9] border-b border-[#E8E2D9] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header descriptive content */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-[10px] font-extrabold text-[#7C9070] uppercase tracking-[0.2em] block">
            Get In Touch
          </span>
          <h2 className="font-serif text-[#2C3328] text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Our Location &amp; Contact Desk
          </h2>
          <p className="font-sans text-xs text-[#6B705C] leading-relaxed max-w-2xl mx-auto italic font-light">
            Conveniently located at Ambawadi area in JP 12th Business Hub, Ahmedabad. Send us an inquiry or visit us during working hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-[#2C3328] uppercase text-xs tracking-wider border-b border-[#E8E2D9] pb-3">
                Clinic Details
              </h3>

              {/* List of contact elements */}
              <div className="space-y-5 text-left">
                
                {/* 1. Address location */}
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 bg-[#F0EBE3] text-[#7C9070] p-3 rounded-xl border border-[#E8E2D9] h-fit">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Address Location</h4>
                    <p className="font-sans text-xs text-[#6B705C] leading-relaxed">
                      {DOCTOR_INFO.address}
                    </p>
                    <a
                      href="https://maps.google.com/?q=Dr.+Arth+Koshia,+201,+JP+12th+Business+Hub,+Surendra+Mangaldas+Rd,+Ambawadi,+Ahmedabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-sans text-xs font-bold text-[#7C9070] hover:underline pt-1"
                    >
                      Open in Google Maps App
                    </a>
                  </div>
                </div>

                {/* 2. Direct Phones */}
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 bg-[#F2EFE9] text-[#6B705C] p-3 rounded-xl border border-[#E8E2D9] h-fit">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Direct Helpline Phone</h4>
                    <p className="font-sans text-xs text-[#6B705C] leading-relaxed font-bold">
                      {DOCTOR_INFO.phone}
                    </p>
                    <span className="text-[10px] text-[#A5A58D] block leading-none">WhatsApp booking available</span>
                  </div>
                </div>

                {/* 3. Direct Emails */}
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 bg-[#F0EBE3] text-[#7C9070] p-3 rounded-xl border border-[#E8E2D9] h-fit">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Email Correspondence</h4>
                    <p className="font-sans text-xs text-[#6B705C] leading-relaxed font-bold">
                      {DOCTOR_INFO.email}
                    </p>
                  </div>
                </div>

                {/* 4. Business Clinical Hours */}
                <div className="flex space-x-4 pb-4">
                  <div className="flex-shrink-0 bg-[#F2EFE9] text-[#6B705C] p-3 rounded-xl border border-[#E8E2D9] h-fit">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328] mb-1">Clinical Active Hours</h4>
                    <div className="space-y-1.5 pt-1">
                      {DOCTOR_INFO.workingHours.map((wh, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-[#6B705C] leading-relaxed">
                          <span className="font-bold">{wh.days}:</span>
                          <span>{wh.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Note */}
            <div className="p-4.5 rounded-2xl bg-[#F2EFE9] border border-[#E8E2D9] text-left">
              <p className="font-sans text-[10px] text-[#6B705C] leading-normal font-light italic">
                <strong>Emergency Support:</strong> Dr. Koshia coordinates on-call surgical skin emergencies outside standard working hours.
              </p>
            </div>

          </div>

          {/* Center Column: Embed Interactive Google Maps */}
          <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-[#E8E2D9] relative min-h-[300px]">
            {/* Real embedded map using Dr. Arth Koshia's exact search coordinate query */}
            <iframe
              src={DOCTOR_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr. Arth Koshia Dermatology Clinic Location - Ambawadi Ahmedabad"
              className="absolute inset-0"
            />
          </div>

          {/* Right Column: General Inquiry Form */}
          <div className="lg:col-span-4 bg-[#F2EFE9]/40 p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1 border-b border-[#E8E2D9] pb-3">
                <h4 className="font-serif font-normal text-lg text-[#2C3328]">Send Direct Message</h4>
                <p className="font-sans text-[#6B705C] text-xs font-light">Get estimated answers within 1-2 hours.</p>
              </div>

              {isSubmitSuccess ? (
                <div className="bg-emerald-55/60 border border-emerald-250 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2.5 animate-in fade-in duration-300 h-full mt-6">
                  <div className="bg-[#7C9070] text-[#FDFCF9] p-2 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="font-sans font-bold text-emerald-800 text-xs uppercase tracking-wider">Inquiry Received</h4>
                  <p className="font-sans text-[11px] text-emerald-600 font-light leading-normal">Our desk team in Ambawadi will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3 mt-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold text-[#6B705C] uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-sans text-[10px] font-bold text-[#6B705C] uppercase tracking-wider">Mobile No.</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="Mobile (Optional)"
                        className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-sans text-[10px] font-bold text-[#6B705C] uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Your email"
                        className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold text-[#6B705C] uppercase tracking-wider">Your Message</label>
                    <textarea
                      required
                      rows={3}
                      value={formState.query}
                      onChange={(e) => setFormState({ ...formState, query: e.target.value })}
                      placeholder="Comment here..."
                      className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 outline-none focus:border-[#7C9070] resize-none bg-white text-[#2C3328]"
                    />
                  </div>

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="w-full bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
