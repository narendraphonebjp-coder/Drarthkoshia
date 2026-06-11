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
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header descriptive content */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-xs font-bold text-blue-600 uppercase tracking-widest block">
            Get In Touch
          </span>
          <h2 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
            Visit Our Clinic in Ahmedabad
          </h2>
          <p className="font-sans text-base text-slate-500 leading-relaxed">
            Conveniently located at Ambawadi area in JP 12th Business Hub. Have questions? Send us an inquiry or visit us during working hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-slate-900 text-xl text-left border-b border-slate-100 pb-3">
                Clinic Details
              </h3>

              {/* List of contact elements */}
              <div className="space-y-5 text-left">
                
                {/* 1. Address location */}
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 bg-blue-50 text-blue-600 p-3.5 rounded-2xl border border-blue-100 h-fit">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-sm text-slate-800">Address Location</h4>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed">
                      {DOCTOR_INFO.address}
                    </p>
                    <a
                      href="https://maps.google.com/?q=Dr.+Arth+Koshia,+201,+JP+12th+Business+Hub,+Surendra+Mangaldas+Rd,+Ambawadi,+Ahmedabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-sans text-xs font-bold text-blue-600 hover:underline pt-1"
                    >
                      Open in Google Maps App
                    </a>
                  </div>
                </div>

                {/* 2. Direct Phones */}
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 bg-emerald-50 text-emerald-600 p-3.5 rounded-2xl border border-emerald-100 h-fit">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-sm text-slate-800">Direct Helpline Phone</h4>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed font-semibold">
                      {DOCTOR_INFO.phone}
                    </p>
                    <span className="text-[10px] text-slate-400 block leading-none">WhatsApp booking available</span>
                  </div>
                </div>

                {/* 3. Direct Emails */}
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 bg-sky-50 text-sky-600 p-3.5 rounded-2xl border border-sky-100 h-fit">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-sm text-slate-800">Email Correspondence</h4>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed font-semibold">
                      {DOCTOR_INFO.email}
                    </p>
                  </div>
                </div>

                {/* 4. Business Clinical Hours */}
                <div className="flex space-x-4 pb-4">
                  <div className="flex-shrink-0 bg-indigo-50 text-indigo-600 p-3.5 rounded-2xl border border-indigo-100 h-fit">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-sans font-bold text-sm text-slate-800">Clinical Active Hours</h4>
                    <div className="space-y-1.5 pt-1">
                      {DOCTOR_INFO.workingHours.map((wh, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-slate-500 leading-relaxed">
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
            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100 text-left">
              <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                <strong>Emergency On-Call Support:</strong> Dr. Koshia coordinates on-call surgical trauma / severe skin allergic reactions for admitted patients outside standard hours.
              </p>
            </div>

          </div>

          {/* Center Column: Embed Interactive Google Maps */}
          <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-slate-100 relative min-h-[300px]">
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
          <div className="lg:col-span-4 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-900 text-lg">Send General Message</h4>
                <p className="font-sans text-slate-400 text-xs">For questions regarding treatment pricing and laser safety packages.</p>
              </div>

              {isSubmitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2.5 animate-in fade-in duration-300 h-full mt-6">
                  <div className="bg-emerald-500 text-white p-2.5 rounded-full">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="font-sans font-bold text-emerald-800 text-sm">Inquiry Received</h4>
                  <p className="font-sans text-xs text-emerald-600">Our desk team in Ambawadi will contact you within 1-2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3 mt-6">
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full text-xs font-semibold border border-slate-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-blue-600 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-sans text-[11px] font-bold text-slate-700">Mobile No.</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="Mobile (Optional)"
                        className="w-full text-xs font-semibold border border-slate-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-blue-600 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-sans text-[11px] font-bold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Your email address"
                        className="w-full text-xs font-semibold border border-slate-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-blue-600 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[11px] font-bold text-slate-700">Your Message</label>
                    <textarea
                      required
                      rows={3}
                      value={formState.query}
                      onChange={(e) => setFormState({ ...formState, query: e.target.value })}
                      placeholder="Comment here..."
                      className="w-full text-xs font-semibold border border-slate-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-blue-600 resize-none bg-white"
                    />
                  </div>

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-100 font-sans text-xs font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
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
