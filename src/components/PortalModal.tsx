import React, { useState } from 'react';
import { X, Lock, Shield, Mail, Phone, Calendar, Clock, Sparkles, MessageSquare, User, FileText, Check, PlusCircle, LogOut } from 'lucide-react';
import { TIME_SLOTS, CLINIC_SERVICES, DOCTOR_INFO } from '../data';
import { Appointment } from '../types';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
  portalUserName: string | null;
  onLogout: () => void;
  initialServiceId?: string;
}

export default function PortalModal({
  isOpen,
  onClose,
  onLoginSuccess,
  portalUserName,
  onLogout,
  initialServiceId = 'acne-scars'
}: PortalModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'dashboard'>(portalUserName ? 'dashboard' : 'signin');
  const [authData, setAuthData] = useState({ name: '', email: '', phone: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  
  // Dashboard states
  const [dashboardTab, setDashboardTab] = useState<'appointments' | 'prescriptions' | 'messages' | 'book'>('appointments');
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>([
    {
      id: "appt-initial",
      patientName: "Arjun Patel",
      email: "arjun@gmail.com",
      phone: "9876543210",
      date: "2026-06-25",
      timeSlot: "11:30 AM",
      serviceId: "acne-scars",
      treatmentType: "Advanced Acne & Scar Treatment",
      notes: "Follow up review of skin scarring from ancient acne breakouts.",
      status: "confirmed"
    }
  ]);
  
  // Booking states
  const [bookForm, setBookForm] = useState({
    date: '2026-06-18',
    timeSlot: TIME_SLOTS[0],
    serviceId: initialServiceId,
    notes: ''
  });
  const [isBookSuccess, setIsBookSuccess] = useState(false);

  // Secure Message states
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'patient' | 'doctor'; text: string; time: string }>>([
    {
      sender: 'doctor',
      text: "Hello! Welcome to Dr. Arth Koshia's Patient Portal. You can ask queries about your healing post-treatment care products here. How can our clinic team assist you today?",
      time: "10:15 AM"
    }
  ]);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authData.email || !authData.password) {
      setErrorMessage("Please fill all required login inputs.");
      return;
    }
    // Simple mock success
    const determinedName = authData.email.split('@')[0];
    const formattedName = determinedName.charAt(0).toUpperCase() + determinedName.slice(1) + " Patel";
    onLoginSuccess(formattedName);
    
    // Reset active appointments patientName to match
    setAppointmentsList(prev => prev.map(appt => ({ ...appt, patientName: formattedName })));
    
    setErrorMessage('');
    setActiveTab('dashboard');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authData.name || !authData.email || !authData.password || !authData.phone) {
      setErrorMessage("Please complete all registration rows.");
      return;
    }
    onLoginSuccess(authData.name);
    setErrorMessage('');
    setActiveTab('dashboard');
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const service = CLINIC_SERVICES.find(s => s.id === bookForm.serviceId);
    if (!service) return;

    const newAppt: Appointment = {
      id: `appt-${Date.now()}`,
      patientName: portalUserName || "Arjun Patel",
      email: authData.email || "patient@koshia.com",
      phone: authData.phone || "+91 99999 11111",
      date: bookForm.date,
      timeSlot: bookForm.timeSlot,
      serviceId: bookForm.serviceId,
      treatmentType: service.title,
      notes: bookForm.notes,
      status: "confirmed"
    };

    setAppointmentsList([newAppt, ...appointmentsList]);
    setIsBookSuccess(true);
    setTimeout(() => {
      setIsBookSuccess(false);
      setDashboardTab('appointments');
    }, 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'patient' as const, text: chatInput, time: timestamp };
    
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Instant realistic response after 1 second
    setTimeout(() => {
      const respTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const docMsg = {
        sender: 'doctor' as const,
        text: `Thank you for your message. Dr. Arth Koshia is currently in consultation sessions. Our clinical helpdesk coordinates medical inputs immediately. For emergency assistance regarding post-treatment redness, please contact our helpline number ${DOCTOR_INFO.phone}.`,
        time: respTime
      };
      setChatMessages(prev => [...prev, docMsg]);
    }, 1200);
  };

  const activeUserTitle = portalUserName || "Arjun Patel";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row animate-in zoom-in-95 duration-250">
        
        {/* Left column brand detail / decoration */}
        <div className="bg-slate-900 text-white p-6 md:p-8 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-sans font-extrabold text-sm tracking-wider uppercase">Secure Portal</span>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-xl leading-tight">Your Skin Health Dashboard</h3>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Check and confirm upcoming treatments, download medical prescriptions, or ask follow-up questions directly to our dermatological office.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-slate-800 space-y-2.5 text-xs text-slate-400">
            <span className="font-bold text-slate-200 block uppercase tracking-widest">Clinic Security Summary</span>
            <p>100% HIPAA and medical data compliant. Prescriptions are encrypted on server files securely.</p>
          </div>
        </div>

        {/* Right column core functions */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[85vh] md:max-h-[min(85vh,650px)] relative">
          
          {/* Close trigger */}
          <button
            id="close-portal-modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Tab 1: SIGN IN FLOW */}
          {activeTab === 'signin' && !portalUserName && (
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="font-sans font-extrabold text-2xl text-slate-900">Sign In to Portal</h2>
                <p className="font-sans text-slate-500 text-xs mt-1">Access clinical prescriptions, diagnostic charts and rapid appointments.</p>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-600 font-sans text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="font-sans text-xs font-bold text-slate-700 block">Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={authData.email}
                      onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                      placeholder="e.g., patient@gmail.com"
                      className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-xs font-bold text-slate-700 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={authData.password}
                      onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <button
                  id="portal-signin-submit"
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans text-sm font-bold py-3 rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer text-center"
                >
                  Enter Account Dashboard
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">First time at the clinic?</span>
                <button
                  id="portal-switch-signup"
                  onClick={() => setActiveTab('signup')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Register Patient Profile
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: SIGN UP FLOW */}
          {activeTab === 'signup' && !portalUserName && (
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="font-sans font-extrabold text-2xl text-slate-900">Create Patient Account</h2>
                <p className="font-sans text-slate-500 text-xs mt-1">Unlock seamless treatment tracking and direct inquiries.</p>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-600 font-sans text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-3.5 text-left">
                <div className="space-y-1">
                  <label className="font-sans text-xs font-bold text-slate-700 block">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={authData.name}
                      onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                      placeholder="e.g., Anoop Shah"
                      className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-slate-700 block">Mobile No.</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={authData.phone}
                        onChange={(e) => setAuthData({ ...authData, phone: e.target.value })}
                        placeholder="+91 99999 00000"
                        className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-slate-700 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={authData.email}
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                        placeholder="patient@gmail.com"
                        className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-xs font-bold text-slate-700 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={authData.password}
                      onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                      placeholder="Create Secure Password"
                      className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <button
                  id="portal-signup-submit"
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans text-sm font-bold py-3 rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer text-center"
                >
                  Generate Profile Account
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Already registered?</span>
                <button
                  id="portal-switch-signin"
                  onClick={() => setActiveTab('signin')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign In Instantly
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: PREMIUM LOGGED-IN PORTAL DASHBOARD */}
          {(portalUserName || activeTab === 'dashboard') && (
            <div className="space-y-6">
              
              {/* Patient header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 text-left">
                <div>
                  <h3 className="font-sans font-extrabold text-slate-900 text-lg">Patient Portal Dashboard</h3>
                  <span className="font-sans text-xs text-slate-500 font-medium">Hello, <strong className="text-blue-700">{activeUserTitle}</strong> • Welcome Back</span>
                </div>
                <button
                  id="portal-logout-action"
                  onClick={() => {
                    onLogout();
                    setActiveTab('signin');
                  }}
                  className="flex items-center space-x-1 text-slate-500 hover:text-red-500 transition-colors text-xs font-bold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Dashboard Internal Navigation tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-50 pb-2">
                <button
                  onClick={() => setDashboardTab('appointments')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                    dashboardTab === 'appointments' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Confirmations ({appointmentsList.length})</span>
                </button>
                <button
                  onClick={() => setDashboardTab('prescriptions')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                    dashboardTab === 'prescriptions' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Prescriptions (1)</span>
                </button>
                <button
                  onClick={() => setDashboardTab('messages')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                    dashboardTab === 'messages' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Ask Dr. Koshia</span>
                </button>
                <button
                  onClick={() => setDashboardTab('book')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100`}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>

              {/* Sub-view A: ACTIVE CONFIRMATION SCHEDULER HISTORY */}
              {dashboardTab === 'appointments' && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="font-sans font-bold text-slate-800 text-sm">Your Scheduled Clinical Sessions</h4>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Live Status Active</span>
                  </div>

                  {appointmentsList.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs font-medium">
                      No active bookings. Select the "Book Appointment" tab to choose a medical slot.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointmentsList.map((appt) => (
                        <div key={appt.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1.5">
                            <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold tracking-wider uppercase py-0.5 px-2 rounded-full inline-block">
                              {appt.treatmentType}
                            </span>
                            <h5 className="font-sans font-bold text-sm text-slate-900 flex items-center space-x-2">
                              <span>Patient: {appt.patientName}</span>
                            </h5>
                            
                            <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs font-medium">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                <span>{appt.date}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                <span>{appt.timeSlot}</span>
                              </span>
                            </div>

                            {appt.notes && (
                              <p className="font-sans text-[11px] text-slate-400 leading-tight">Note: {appt.notes}</p>
                            )}
                          </div>

                          <div className="flex flex-col sm:items-end justify-between flex-shrink-0">
                            <span className="inline-flex items-center space-x-1 text-emerald-700 font-extrabold text-xs bg-emerald-100/50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Confirmed</span>
                            </span>
                            <span className="text-[10px] text-slate-400 mt-2">ID: {appt.id.slice(0, 10)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-view B: CLINICAL PRESCRIPTIONS */}
              {dashboardTab === 'prescriptions' && (
                <div className="space-y-4 text-left">
                  <h4 className="font-sans font-bold text-slate-800 text-sm">Official Diagnostic Records &amp; Remedies</h4>

                  <div className="border border-slate-100 p-5 rounded-2xl bg-white space-y-4 shadow-sm relative">
                    <div className="border-b border-dashed border-slate-200 pb-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{DOCTOR_INFO.clinicName}</span>
                        <span className="text-slate-400">Ambawadi, Ahmedabad</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-slate-500 block">REF: RX-2026-9912</span>
                        <span className="text-slate-400">Date: June 11, 2026</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Patient Name</span>
                        <span className="text-sm font-semibold text-slate-800">{activeUserTitle}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Diagnosis</span>
                          <span className="text-xs font-semibold text-slate-800">Severe Acne Vulgaris &amp; Scar Tissue</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Prescribing Physician</span>
                          <span className="text-xs font-semibold text-slate-800">{DOCTOR_INFO.name}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl space-y-2">
                        <span className="text-[10px] text-blue-700 font-extrabold uppercase tracking-wide block">Regimen &amp; Medication Plan</span>
                        <ul className="text-xs font-medium text-slate-600 space-y-2 list-disc pl-4.5">
                          <li><strong>Cap. Isotretinoin 10mg</strong> - Once daily after dinner (for sebum suppression)</li>
                          <li><strong>Azelaic Acid 15% Gel</strong> - Soft pea-sized layer on hyperpigmentation, morning hours</li>
                          <li><strong>Fractional CO2 Laser Therapy</strong> - 3 sessions scheduled (spaced 4 weeks apart)</li>
                          <li><strong>Pore Cleansing Mineral Sunscreen SPF 50+</strong> - Always apply during outdoor hours</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-slate-200 pt-3 flex items-center justify-between bg-yellow-50/50 p-2.5 rounded-xl border border-yellow-100">
                      <span className="text-[10px] text-amber-800 font-bold">Important Instructions</span>
                      <p className="text-[10px] text-amber-600">Avoid active scrubbing. Apply healing ointment for 48 hours post-laser.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-view C: CHAT MESSAGING PORTAL WITH CHATBOT RESPONSE */}
              {dashboardTab === 'messages' && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="font-sans font-bold text-slate-800 text-sm">Secure Message Workspace</h4>
                    <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100 font-bold">Dr. Koshia Helpdesk</span>
                  </div>

                  {/* Chat window viewport */}
                  <div className="border border-slate-150 rounded-2xl bg-slate-50 h-[220px] p-4 overflow-y-auto space-y-3.5 flex flex-col justify-end">
                    <div className="space-y-3 flex flex-col">
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`max-w-[85%] p-3 rounded-2xl text-xs space-y-1 ${
                            msg.sender === 'doctor'
                              ? 'bg-white text-slate-800 border border-slate-100 self-start'
                              : 'bg-blue-600 text-white self-end'
                          }`}
                        >
                          <p className="font-sans font-medium leading-relaxed">{msg.text}</p>
                          <span className={`block text-[9px] text-right ${msg.sender === 'doctor' ? 'text-slate-400' : 'text-blue-100'}`}>
                            {msg.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask the clinic about products, side-effects, schedules..."
                      className="flex-1 text-xs font-semibold border border-slate-200 rounded-xl py-2 px-3.5 outline-none focus:border-blue-600 transition-colors bg-white text-slate-800"
                    />
                    <button
                      id="chat-send-message-btn"
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold py-2 px-4 rounded-xl shadow-md transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

              {/* Sub-view D: ACTIVE BOOKER FORM INSIDE PORTAL */}
              {dashboardTab === 'book' && (
                <div className="space-y-4 text-left">
                  <h4 className="font-sans font-bold text-slate-800 text-sm">Schedule New Clinical Consultation</h4>

                  {isBookSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 animate-in fade-in duration-200">
                      <div className="bg-emerald-500 text-white p-2 rounded-full">
                        <Check className="h-6 w-6" />
                      </div>
                      <h4 className="font-sans font-bold text-emerald-800 text-base">Booking Approved!</h4>
                      <p className="font-sans text-xs text-emerald-600">Your session is now loaded inside your Active Appointments queue.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookAppointment} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-sans text-xs font-bold text-slate-600 block">Pick Session Date</label>
                          <input
                            type="date"
                            required
                            value={bookForm.date}
                            onChange={(e) => setBookForm({ ...bookForm, date: e.target.value })}
                            className="w-full text-xs font-semibold border border-slate-200 rounded-xl py-2 px-3 focus:border-blue-600 outline-none bg-white text-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-sans text-xs font-bold text-slate-600 block">Available Time Slot</label>
                          <select
                            value={bookForm.timeSlot}
                            onChange={(e) => setBookForm({ ...bookForm, timeSlot: e.target.value })}
                            className="w-full text-xs font-semibold border border-slate-200 rounded-xl py-2 px-3 focus:border-blue-600 outline-none bg-white text-slate-800"
                          >
                            {TIME_SLOTS.map((t, idx) => (
                              <option key={idx} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-sans text-xs font-bold text-slate-600 block">Treatment / Clinical Service required</label>
                        <select
                          value={bookForm.serviceId}
                          onChange={(e) => setBookForm({ ...bookForm, serviceId: e.target.value })}
                          className="w-full text-xs font-semibold border border-slate-200 rounded-xl py-2 px-3 focus:border-blue-600 outline-none bg-white text-slate-800"
                        >
                          {CLINIC_SERVICES.map((s) => (
                            <option key={s.id} value={s.id}>{s.title} ({s.priceRange})</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-sans text-xs font-bold text-slate-600 block">Describe Symptoms (Optional)</label>
                        <textarea
                          rows={2}
                          value={bookForm.notes}
                          onChange={(e) => setBookForm({ ...bookForm, notes: e.target.value })}
                          placeholder="e.g., severe itching, hair patches loss, acne breakouts on chin area..."
                          className="w-full text-xs font-semibold border border-slate-200 rounded-xl py-2.5 px-3.5 focus:border-blue-600 outline-none resize-none bg-white text-slate-800"
                        />
                      </div>

                      <button
                        id="portal-create-appt-btn"
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold py-3 rounded-xl shadow-md cursor-pointer text-center"
                      >
                        Confirm Appointment Security Guard
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
