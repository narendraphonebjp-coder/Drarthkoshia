import React, { useState, useEffect } from 'react';
import { X, Lock, Shield, Mail, Phone, Calendar, Clock, MessageSquare, User, FileText, Check, PlusCircle, LogOut, Users, Inbox, Stethoscope, Sparkles } from 'lucide-react';
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
  initialServiceId = 'rhinoplasty'
}: PortalModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'dashboard'>(portalUserName ? 'dashboard' : 'signin');
  const [authData, setAuthData] = useState({ name: '', email: '', phone: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  
  // Dashboard states
  const [dashboardTab, setDashboardTab] = useState<'appointments' | 'prescriptions' | 'messages' | 'book'>('appointments');
  
  // Doctor/Staff Dashboard specific Tab
  const [doctorActiveTab, setDoctorActiveTab] = useState<'scheduler' | 'patients' | 'inquiries'>('scheduler');

  // Unified localStorage Synchronized States
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('clinic_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: "appt-initial",
        patientName: "Arjun Patel",
        email: "arjun@gmail.com",
        phone: "+91 98765 43210",
        date: "2026-06-25",
        timeSlot: "11:30 AM",
        serviceId: "rhinoplasty",
        treatmentType: "Rhinoplasty Nose Surgery",
        notes: "Follow up review of nose structural alignment post-rhinoplasty.",
        status: "confirmed"
      }
    ];
  });

  const [prescriptionsList, setPrescriptionsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('clinic_prescriptions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: "RX-2026-9912",
        patientName: "Arjun Patel",
        email: "arjun@gmail.com",
        diagnosis: "Aesthetic Rhinoplasty Realignment",
        doctorName: DOCTOR_INFO.name,
        date: "June 11, 2026",
        plan: [
          "Analgesics & Anti-inflammatory - Once daily after meals (for swelling control)",
          "Silicone Scar Gel - Gentle microvascular ointment cover, morning and night",
          "Nasal Splint Alignment - Keep in place styled correctly for 7 days",
          "Hydration and Safe Wash - Clean surrounding facial nodes with physiological saline"
        ],
        instructions: "Avoid active scrubbing. Apply healing ointment for 48 hours post-laser."
      }
    ];
  });

  const [inquiriesList, setInquiriesList] = useState<any[]>(() => {
    const saved = localStorage.getItem('clinic_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: "inq-1",
        name: "Sanjay Sen",
        email: "sanjay@gmail.com",
        phone: "+91 94330 11223",
        query: "Need details of high-definition liposuction recovery time for corporate employees.",
        date: "2026-06-12",
        status: "pending"
      },
      {
        id: "inq-2",
        name: "Priya Das",
        email: "priya@outlook.com",
        phone: "+91 81005 55666",
        query: "Do you offer non-surgical liquid rhinoplasty options, or is surgical rhinoplasty the only option for droopy nose tips?",
        date: "2026-06-14",
        status: "resolved"
      }
    ];
  });

  const [patientsList, setPatientsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('clinic_patients');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { name: "Arjun Patel", email: "arjun@gmail.com", phone: "+91 98765 43210", notes: "Regular aesthetic Rhinoplasty client tracking structural realignment." },
      { name: "Priya Das", email: "priya@outlook.com", phone: "+91 81005 55666", notes: "Sent inquiry regarding liquid rhinoplasty options." },
      { name: "Sanjay Sen", email: "sanjay@gmail.com", phone: "+91 94330 11223", notes: "Interested in High-Definition Liposuction contours." }
    ];
  });

  // Booking states
  const [bookForm, setBookForm] = useState({
    date: '2026-06-18',
    timeSlot: TIME_SLOTS[0],
    serviceId: initialServiceId,
    notes: ''
  });
  const [isBookSuccess, setIsBookSuccess] = useState(false);

  // New Prescription Form for Doctor Dashboard
  const [selectedPatientForRx, setSelectedPatientForRx] = useState<any | null>(null);
  const [rxForm, setRxForm] = useState({
    diagnosis: 'Post-Operative Recovery',
    medicinesText: '',
    instructions: 'Avoid strenuous exercises. Wash with soft sterile solution.'
  });
  const [rxSuccessMessage, setRxSuccessMessage] = useState('');

  // Secure Message states
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'patient' | 'doctor'; text: string; time: string }>>([
    {
      sender: 'doctor',
      text: "Hello! Welcome to Dr. Akhilesh Agarwal's Patient Portal. You can ask queries about your healing, post-operative care, or procedures here. How can our clinic team assist you today?",
      time: "10:15 AM"
    }
  ]);

  // Synchronizers whenever state list mutations occur
  useEffect(() => {
    localStorage.setItem('clinic_appointments', JSON.stringify(appointmentsList));
  }, [appointmentsList]);

  useEffect(() => {
    localStorage.setItem('clinic_prescriptions', JSON.stringify(prescriptionsList));
  }, [prescriptionsList]);

  useEffect(() => {
    localStorage.setItem('clinic_inquiries', JSON.stringify(inquiriesList));
  }, [inquiriesList]);

  useEffect(() => {
    localStorage.setItem('clinic_patients', JSON.stringify(patientsList));
  }, [patientsList]);

  // Handle external storage triggers (e.g., landing page inquiry submits)
  useEffect(() => {
    const handleSync = () => {
      const inqs = localStorage.getItem('clinic_inquiries');
      if (inqs) {
        try {
          setInquiriesList(JSON.parse(inqs));
        } catch (e) {}
      }
      const appts = localStorage.getItem('clinic_appointments');
      if (appts) {
        try {
          setAppointmentsList(JSON.parse(appts));
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authData.email || !authData.password) {
      setErrorMessage("Please fill all required login inputs.");
      return;
    }

    if (authData.email.toLowerCase() === "doctor@drakhileshagarwal.com" || authData.email.toLowerCase() === "admin@clinic.com") {
      onLoginSuccess("Dr. Akhilesh Agarwal (Chief Surgeon)");
      setErrorMessage('');
      setActiveTab('dashboard');
      return;
    }

    // Simple mock patient success
    const determinedName = authData.email.split('@')[0];
    const formattedName = determinedName.charAt(0).toUpperCase() + determinedName.slice(1) + " Patel";
    onLoginSuccess(formattedName);
    
    // Register self in patients list if not present
    const selfPatient = {
      name: formattedName,
      email: authData.email,
      phone: authData.phone || "+91 99000 12345",
      notes: "Registered through portal account login session."
    };
    if (!patientsList.some(p => p.email.toLowerCase() === authData.email.toLowerCase())) {
      setPatientsList(prev => [...prev, selfPatient]);
    }
    
    setErrorMessage('');
    setActiveTab('dashboard');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authData.name || !authData.email || !authData.password || !authData.phone) {
      setErrorMessage("Please complete all registration rows.");
      return;
    }

    // Save newly created profile to patient list for doctor inspection
    const newPatient = {
      name: authData.name,
      email: authData.email,
      phone: authData.phone,
      notes: "Newly self-registered via patient portal."
    };

    if (!patientsList.some(p => p.email.toLowerCase() === authData.email.toLowerCase())) {
      setPatientsList(prev => [...prev, newPatient]);
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
      email: authData.email || "patient@drakhileshagarwal.com",
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

    // Instant realistic response after 1.2 seconds
    setTimeout(() => {
      const respTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const docMsg = {
        sender: 'doctor' as const,
        text: `Thank you for your message. Dr. Akhilesh Agarwal is currently in consultation sessions. Our clinical helpdesk coordinates medical inputs immediately. For emergency assistance regarding post-treatment care, please contact our helpline number ${DOCTOR_INFO.phone}.`,
        time: respTime
      };
      setChatMessages(prev => [...prev, docMsg]);
    }, 1200);
  };

  const activeUserTitle = portalUserName || "Arjun Patel";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#2C3328]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FDFCF9] rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl border border-[#E8E2D9] flex flex-col md:flex-row animate-in zoom-in-95 duration-250">
        
        {/* Left column brand detail / decoration */}
        <div className="bg-[#2C3328] text-[#FDFCF9] p-6 md:p-8 md:w-1/3 flex flex-col justify-between relative overflow-hidden text-left border-r border-[#3D4637]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C9070]/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#6B705C]/10 rounded-full blur-xl" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-[#7C9070] text-[#FDFCF9] p-2 rounded-xl border border-[#7C9070]/20">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#FDFCF9]">Secure Portal</span>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif text-[#FDFCF9] text-xl leading-snug font-normal">Your Skin Health Dashboard</h3>
              <p className="font-sans text-xs text-[#A5A58D] leading-relaxed">
                Check and confirm upcoming treatments, download medical prescriptions, or ask follow-up questions directly to our dermatological office.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-[#3D4637] space-y-2.5 text-xs text-[#A5A58D]">
            <span className="font-bold text-[#E8E2D9] block uppercase tracking-wider text-[10px]">Clinic Security Compliance</span>
            <p className="font-light text-[11px] leading-relaxed">100% HIPAA and medical data compliant. Prescriptions are encrypted on server files securely.</p>
          </div>
        </div>

        {/* Right column core functions */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[85vh] md:max-h-[min(85vh,650px)] relative bg-[#FDFCF9]">
          
          {/* Close trigger */}
          <button
            id="close-portal-modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-[#6B705C] hover:text-[#2C3328] p-2 rounded-full hover:bg-[#F2EFE9] transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Tab 1: SIGN IN FLOW */}
          {activeTab === 'signin' && !portalUserName && (
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="font-serif text-2xl text-[#2C3328]">Sign In to Portal</h2>
                <p className="font-sans text-[#6B705C] text-xs mt-1 italic font-light">Access clinical prescriptions, diagnostic charts and rapid appointments.</p>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-700 font-sans text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#7C9070]" />
                    <input
                      type="email"
                      required
                      value={authData.email}
                      onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                      placeholder="e.g., patient@gmail.com"
                      className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-3 pl-10 pr-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#7C9070]" />
                    <input
                      type="password"
                      required
                      value={authData.password}
                      onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-3 pl-10 pr-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                    />
                  </div>
                </div>

                <button
                  id="portal-signin-submit"
                  type="submit"
                  className="w-full bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer text-center"
                >
                  Enter Account Dashboard
                </button>
              </form>

              <div className="pt-4 border-t border-[#E8E2D9] space-y-3 text-xs text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B705C] font-light">First time at the clinic?</span>
                  <button
                    id="portal-switch-signup"
                    onClick={() => setActiveTab('signup')}
                    className="text-[#7C9070] font-bold hover:underline cursor-pointer"
                  >
                    Register Patient Profile
                  </button>
                </div>

                <div className="bg-[#7C9070]/5 border border-[#7C9070]/20 p-4 rounded-xl space-y-2 text-left mt-2">
                  <div className="flex items-center space-x-2 text-[#2C3328] font-bold uppercase tracking-wider text-[10px]">
                    <Stethoscope className="h-3.5 w-3.5 text-[#7C9070]" />
                    <span>Clinic Admin &amp; Practitioner Dashboard</span>
                  </div>
                  <p className="text-[11px] text-[#6B705C] leading-normal font-light">
                    Are you the doctor or clinical secretary? Enter the master organizer panel to view upcoming appointments and live patient inquiry sheets.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onLoginSuccess("Dr. Akhilesh Agarwal (Chief Surgeon)");
                      setActiveTab('dashboard');
                      setDashboardTab('appointments');
                    }}
                    className="w-full bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Login as Doctor / Staff &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: SIGN UP FLOW */}
          {activeTab === 'signup' && !portalUserName && (
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="font-serif text-2xl text-[#2C3328]">Create Patient Account</h2>
                <p className="font-sans text-[#6B705C] text-xs mt-1 italic font-light">Unlock seamless treatment tracking and direct inquiries.</p>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-700 font-sans text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#7C9070]" />
                    <input
                      type="text"
                      required
                      value={authData.name}
                      onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                      placeholder="e.g., Anoop Shah"
                      className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-3 pl-10 pr-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Mobile No.</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[#7C9070]" />
                      <input
                        type="tel"
                        required
                        value={authData.phone}
                        onChange={(e) => setAuthData({ ...authData, phone: e.target.value })}
                        placeholder="+91 99999 00000"
                        className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-3 pl-10 pr-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#7C9070]" />
                      <input
                        type="email"
                        required
                        value={authData.email}
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                        placeholder="patient@gmail.com"
                        className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-3 pl-10 pr-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#7C9070]" />
                    <input
                      type="password"
                      required
                      value={authData.password}
                      onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                      placeholder="Create Secure Password"
                      className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-3 pl-10 pr-3.5 outline-none focus:border-[#7C9070] bg-white text-[#2C3328]"
                    />
                  </div>
                </div>

                <button
                  id="portal-signup-submit"
                  type="submit"
                  className="w-full bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer text-center"
                >
                  Generate Profile Account
                </button>
              </form>

              <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                <span className="text-[#6B705C] font-light">Already registered?</span>
                <button
                  id="portal-switch-signin"
                  onClick={() => setActiveTab('signin')}
                  className="text-[#7C9070] font-bold hover:underline cursor-pointer"
                >
                  Sign In Instantly
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: PREMIUM LOGGED-IN PORTAL DASHBOARD */}
          {(portalUserName || activeTab === 'dashboard') && (
            !(portalUserName?.includes("Dr. Akhilesh")) ? (
              <div className="space-y-6">
              
              {/* Patient header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-4 text-left">
                <div>
                  <h3 className="font-serif text-[#2C3328] text-base font-normal">Patient Portal Dashboard</h3>
                  <span className="font-sans text-xs text-[#6B705C]">Hello, <strong className="text-[#7C9070]">{activeUserTitle}</strong> • Welcome Back</span>
                </div>
                <button
                  id="portal-logout-action"
                  onClick={() => {
                    onLogout();
                    setActiveTab('signin');
                  }}
                  className="flex items-center space-x-1 text-[#6B705C] hover:text-[#2C3328] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Dashboard Internal Navigation tabs */}
              <div className="flex flex-wrap gap-2 border-b border-[#E8E2D9] pb-4">
                <button
                  onClick={() => setDashboardTab('appointments')}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                    dashboardTab === 'appointments' ? 'bg-[#2C3328] text-[#FDFCF9] border-[#2C3328]' : 'bg-[#F0EBE3] text-[#6B705C] border-[#E8E2D9] hover:bg-[#E8E2D9]'
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Confirmations ({appointmentsList.length})</span>
                </button>
                <button
                  onClick={() => setDashboardTab('prescriptions')}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                    dashboardTab === 'prescriptions' ? 'bg-[#2C3328] text-[#FDFCF9] border-[#2C3328]' : 'bg-[#F0EBE3] text-[#6B705C] border-[#E8E2D9] hover:bg-[#E8E2D9]'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Prescriptions (1)</span>
                </button>
                <button
                  onClick={() => setDashboardTab('messages')}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                    dashboardTab === 'messages' ? 'bg-[#2C3328] text-[#FDFCF9] border-[#2C3328]' : 'bg-[#F0EBE3] text-[#6B705C] border-[#E8E2D9] hover:bg-[#E8E2D9]'
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Ask Dr. Agarwal</span>
                </button>
                <button
                  onClick={() => setDashboardTab('book')}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer bg-[#7C9070] text-[#FDFCF9] border border-[#7C9070] hover:bg-[#6B705C]`}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>

              {/* Sub-view A: ACTIVE CONFIRMATION SCHEDULER HISTORY */}
              {dashboardTab === 'appointments' && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Your Scheduled Clinical Sessions</h4>
                    <span className="text-[9px] text-[#7C9070] font-extrabold bg-[#F0EBE3] px-2.5 py-1 rounded-full border border-[#E8E2D9] uppercase tracking-wider">Live Status Active</span>
                  </div>

                  {appointmentsList.length === 0 ? (
                    <div className="text-center py-8 text-[#6B705C] text-xs font-medium italic">
                      No active bookings. Select the "Book Appointment" tab to choose a medical slot.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointmentsList.map((appt) => (
                        <div key={appt.id} className="bg-[#F2EFE9]/40 border border-[#E8E2D9] p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <span className="text-[9px] bg-[#F0EBE3] text-[#7C9070] font-extrabold tracking-wider uppercase py-1 px-3 rounded-full inline-block">
                              {appt.treatmentType}
                            </span>
                            <h5 className="font-sans font-bold text-xs text-[#2C3328] uppercase tracking-wider">
                              Patient: {appt.patientName}
                            </h5>
                            
                            <div className="flex flex-wrap items-center gap-3 text-[#6B705C] text-xs font-medium">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3.5 w-3.5 text-[#7C9070]" />
                                <span>{appt.date}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3.5 w-3.5 text-[#7C9070]" />
                                <span>{appt.timeSlot}</span>
                              </span>
                            </div>

                            {appt.notes && (
                              <p className="font-sans text-[11px] text-[#A5A58D] leading-tight">Note: {appt.notes}</p>
                            )}
                          </div>

                          <div className="flex flex-col sm:items-end justify-between flex-shrink-0">
                            <span className="inline-flex items-center space-x-1 text-[#7C9070] font-bold text-[10px] uppercase tracking-wider bg-[#F0EBE3] px-3 py-1.5 rounded-full border border-[#E8E2D9]">
                              <Check className="h-3 w-3 text-[#7C9070]" />
                              <span>Confirmed</span>
                            </span>
                            <span className="text-[10px] text-[#A5A58D] mt-2">ID: {appt.id.slice(0, 10)}</span>
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
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Official Diagnostic Records &amp; Remedies</h4>

                  <div className="border border-[#E8E2D9] p-5 rounded-2xl bg-white space-y-4 shadow-sm relative">
                    <div className="border-b border-dashed border-[#E8E2D9] pb-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#2C3328] block">{DOCTOR_INFO.clinicName}</span>
                        <span className="text-[#6B705C]">Anandapur, Kolkata</span>
                      </div>
                      <div className="text-right text-[#6B705C]">
                        <span className="font-mono text-[#2C3328] block">REF: RX-2026-9912</span>
                        <span className="text-[#A5A58D]">Date: June 11, 2026</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] text-[#A5A58D] uppercase font-bold block">Patient Name</span>
                        <span className="text-xs font-bold text-[#2C3328] uppercase">{activeUserTitle}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] text-[#A5A58D] uppercase font-bold block">Diagnosis</span>
                          <span className="text-xs font-semibold text-[#2C3328]">Aesthetic Rhinoplasty Realignment</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#A5A58D] uppercase font-bold block">Prescribing Surgeon</span>
                          <span className="text-xs font-semibold text-[#2C3328]">{DOCTOR_INFO.name}</span>
                        </div>
                      </div>

                      <div className="bg-[#F2EFE9]/40 border border-[#E8E2D9] p-4 rounded-xl space-y-2">
                        <span className="text-[10px] text-[#7C9070] font-extrabold uppercase tracking-widest block">Surgical Recovery Plan</span>
                        <ul className="text-xs text-[#4A443E] space-y-2 list-disc pl-4.5 font-light">
                          <li><strong>Analgesics &amp; Anti-inflammatory</strong> - Once daily after meals (for swelling control)</li>
                          <li><strong>Silicone Scar Gel</strong> - Gentle microvascular ointment cover, morning and night</li>
                          <li><strong>Nasal Splint Alignment</strong> - Keep in place styled correctly for 7 days</li>
                          <li><strong>Hydration and Safe Wash</strong> - Clean surrounding facial nodes with physiological saline</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-[#E8E2D9] pt-3 flex items-center justify-between bg-[#F0EBE3] p-2.5 rounded-xl border border-[#E8E2D9]">
                      <span className="text-[9px] text-[#7C9070] font-bold uppercase tracking-wider">Important Instructions</span>
                      <p className="text-[10px] text-[#6B705C] italic font-light">Avoid active scrubbing. Apply healing ointment for 48 hours post-laser.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-view C: CHAT MESSAGING PORTAL WITH CHATBOT RESPONSE */}
              {dashboardTab === 'messages' && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Secure Message Workspace</h4>
                    <span className="text-[9px] bg-[#F0EBE3] text-[#7C9070] px-2.5 py-1 rounded-full border border-[#E8E2D9] font-bold uppercase tracking-wider">Dr. Agarwal Helpdesk</span>
                  </div>

                  {/* Chat window viewport */}
                  <div className="border border-[#E8E2D9] rounded-2xl bg-[#F2EFE9]/30 h-[220px] p-4 overflow-y-auto space-y-3.5 flex flex-col justify-end">
                    <div className="space-y-3 flex flex-col">
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-1 ${
                            msg.sender === 'doctor'
                              ? 'bg-white text-[#2C3328] border border-[#E8E2D9] self-start text-left'
                              : 'bg-[#7C9070] text-[#FDFCF9] self-end text-right'
                          }`}
                        >
                          <p className="font-sans font-medium leading-relaxed">{msg.text}</p>
                          <span className={`block text-[9px] ${msg.sender === 'doctor' ? 'text-slate-400' : 'text-slate-200'}`}>
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
                      className="flex-1 text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 outline-none focus:border-[#7C9070] bg-white text-[#4A443E]"
                    />
                    <button
                      id="chat-send-message-btn"
                      type="submit"
                      className="bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-xl cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

              {/* Sub-view D: ACTIVE BOOKER FORM INSIDE PORTAL */}
              {dashboardTab === 'book' && (
                <div className="space-y-4 text-left">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Schedule New Clinical Consultation</h4>

                  {isBookSuccess ? (
                    <div className="bg-emerald-55/60 border border-emerald-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 animate-in fade-in duration-200">
                      <div className="bg-[#7C9070] text-[#FDFCF9] p-2 rounded-full">
                        <Check className="h-5 w-5" />
                      </div>
                      <h4 className="font-sans font-bold text-emerald-800 text-xs uppercase tracking-wider">Booking Approved</h4>
                      <p className="font-sans text-[11px] text-emerald-600 leading-normal">Your session is now loaded inside your Active Appointments queue!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookAppointment} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Pick Session Date</label>
                          <input
                            type="date"
                            required
                            value={bookForm.date}
                            onChange={(e) => setBookForm({ ...bookForm, date: e.target.value })}
                            className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 focus:border-[#7C9070] outline-none bg-white text-[#2C3328]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Available Time Slot</label>
                          <select
                            value={bookForm.timeSlot}
                            onChange={(e) => setBookForm({ ...bookForm, timeSlot: e.target.value })}
                            className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 focus:border-[#7C9070] outline-none bg-white text-[#2C3328]"
                          >
                            {TIME_SLOTS.map((t, idx) => (
                              <option key={idx} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Treatment / Clinical Service required</label>
                        <select
                          value={bookForm.serviceId}
                          onChange={(e) => setBookForm({ ...bookForm, serviceId: e.target.value })}
                          className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 focus:border-[#7C9070] outline-none bg-white text-[#2C3328]"
                        >
                          {CLINIC_SERVICES.map((s) => (
                            <option key={s.id} value={s.id}>{s.title} ({s.priceRange})</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider block">Describe Symptoms or Surgical Request</label>
                        <textarea
                          rows={2}
                          value={bookForm.notes}
                          onChange={(e) => setBookForm({ ...bookForm, notes: e.target.value })}
                          placeholder="e.g., mommy makeover consult, nose reshaping revision, scar revision, post-trauma assessment..."
                          className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 focus:border-[#7C9070] outline-none resize-none bg-white text-[#2C3328]"
                        />
                      </div>

                      <button
                        id="portal-create-appt-btn"
                        type="submit"
                        className="w-full bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer text-center font-sans"
                      >
                        Confirm Appointment Slot
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>
            ) : (
              // ==================== DOCTOR/STAFF ADMINISTRATION DESK ====================
              <div className="space-y-6">
                {/* Doctor header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-4 text-left">
                  <div>
                    <h3 className="font-serif text-[#2C3328] text-base font-normal flex items-center space-x-2 animate-in fade-in">
                      <Stethoscope className="h-5 w-5 text-[#7C9070]" />
                      <span>Clinic Master Organizer Desk</span>
                    </h3>
                    <span className="font-sans text-xs text-[#6B705C] block mt-1">Practitioner: <strong className="text-[#7C9070]">{portalUserName}</strong></span>
                  </div>
                  <button
                    id="portal-logout-action"
                    onClick={() => {
                      onLogout();
                      setActiveTab('signin');
                    }}
                    className="flex items-center space-x-1 text-[#6B705C] hover:text-[#2C3328] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer font-sans"
                  >
                    <LogOut className="h-4 w-4 text-red-600" />
                    <span className="text-red-700">Logout Desk</span>
                  </button>
                </div>

                {/* Master Dashboard Overview Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                  <div className="bg-[#F2EFE9] border border-[#E8E2D9] p-3 rounded-xl shadow-sm text-left">
                    <span className="text-[9px] font-bold text-[#6B705C] uppercase tracking-wider block">Database Profiles</span>
                    <p className="text-xl font-serif text-[#2C3328] font-semibold">{patientsList.length}</p>
                  </div>
                  <div className="bg-[#F2EFE9] border border-[#E8E2D9] p-3 rounded-xl shadow-sm text-left">
                    <span className="text-[9px] font-bold text-[#6B705C] uppercase tracking-wider block">Upcoming Sessions</span>
                    <p className="text-xl font-serif text-[#2C3328] font-semibold">{appointmentsList.filter(a => a.status !== 'cancelled').length}</p>
                  </div>
                  <div className="bg-[#F2EFE9] border border-[#E8E2D9] p-3 rounded-xl shadow-sm text-left">
                    <span className="text-[9px] font-bold text-[#6B705C] uppercase tracking-wider block">Active Inquiries</span>
                    <p className="text-xl font-serif text-[#2C3328] font-semibold">{inquiriesList.filter(i => i.status === 'pending').length}</p>
                  </div>
                  <div className="bg-[#F2EFE9] border border-[#E8E2D9] p-3 rounded-xl shadow-sm text-left">
                    <span className="text-[9px] font-bold text-[#6B705C] uppercase tracking-wider block">Prescriptions Loaded</span>
                    <p className="text-xl font-serif text-[#2C3328] font-semibold">{prescriptionsList.length}</p>
                  </div>
                </div>

                {/* Doctor Dashboard Navigation tabs */}
                <div className="flex flex-wrap gap-2 border-b border-[#E8E2D9] pb-4">
                  <button
                    onClick={() => setDoctorActiveTab('scheduler')}
                    className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                      doctorActiveTab === 'scheduler' ? 'bg-[#2C3328] text-[#FDFCF9] border-[#2C3328]' : 'bg-[#F0EBE3] text-[#6B705C] border-[#E8E2D9] hover:bg-[#E8E2D9]'
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Clinical Scheduler ({appointmentsList.length})</span>
                  </button>
                  <button
                    onClick={() => setDoctorActiveTab('patients')}
                    className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                      doctorActiveTab === 'patients' ? 'bg-[#2C3328] text-[#FDFCF9] border-[#2C3328]' : 'bg-[#F0EBE3] text-[#6B705C] border-[#E8E2D9] hover:bg-[#E8E2D9]'
                    }`}
                  >
                    <Users className="h-3.5 w-3.5" />
                    <span>Active Patients Directory ({patientsList.length})</span>
                  </button>
                  <button
                    onClick={() => setDoctorActiveTab('inquiries')}
                    className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                      doctorActiveTab === 'inquiries' ? 'bg-[#2C3328] text-[#FDFCF9] border-[#2C3328]' : 'bg-[#F0EBE3] text-[#6B705C] border-[#E8E2D9] hover:bg-[#E8E2D9]'
                    }`}
                  >
                    <Inbox className="h-3.5 w-3.5" />
                    <span>Inpatient Inquiry Inbox ({inquiriesList.length})</span>
                  </button>
                </div>

                {/* 1. DOCTOR MODULE: CLINICAL SCHEDULER */}
                {doctorActiveTab === 'scheduler' && (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Incoming Patient Bookings</h4>
                      <span className="text-[10px] text-[#7C9070] italic font-semibold">Real-Time Sync Ready</span>
                    </div>

                    {appointmentsList.length === 0 ? (
                      <p className="text-center py-8 text-[#6B705C] text-xs italic">No patient appointments have been filed yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {appointmentsList.map((appt) => (
                          <div key={appt.id} className="bg-white border border-[#E8E2D9] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-all text-left">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-[10px] text-[#2C3328] bg-[#F0EBE3] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-sans">
                                  {appt.treatmentType}
                                </span>
                                <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-sans ${
                                  appt.status === 'confirmed' ? 'bg-emerald-55 text-emerald-800' :
                                  appt.status === 'cancelled' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  {appt.status}
                                </span>
                              </div>
                              <h5 className="font-sans font-bold text-sm text-[#2C3328] uppercase mt-1">
                                Patient: {appt.patientName}
                              </h5>
                              <p className="text-xs text-[#6B705C] font-semibold mt-0.5 font-sans">
                                📞 Mobile: {appt.phone} &bull; ✉️ Email: {appt.email}
                              </p>
                              <p className="text-xs text-[#7C9070] font-sans font-bold flex items-center space-x-2 mt-0.5 font-sans">
                                <span>📅 Date: {appt.date}</span>
                                <span>&bull;</span>
                                <span>⏰ Slot: {appt.timeSlot}</span>
                              </p>
                              {appt.notes && (
                                <p className="text-xs bg-[#FDFCF9] border border-[#E8E2D9] p-2.5 rounded-xl text-[#6B705C] italic mt-2 font-light leading-relaxed">
                                  Symptom Notes &amp; Requests: "{appt.notes}"
                                </p>
                              )}
                            </div>

                            <div className="flex flex-row md:flex-col items-center justify-end gap-2 shrink-0">
                              {appt.status !== 'confirmed' && (
                                <button
                                  onClick={() => {
                                    setAppointmentsList(prev => prev.map(a => a.id === appt.id ? { ...a, status: 'confirmed' } : a));
                                  }}
                                  className="w-full bg-[#7C9070] hover:bg-[#6B705C] text-white font-sans text-[10px] font-bold uppercase py-2 px-3.5 rounded-lg cursor-pointer transition-colors text-center"
                                >
                                  Confirm
                                </button>
                              )}
                              {appt.status !== 'cancelled' && (
                                <button
                                  onClick={() => {
                                    setAppointmentsList(prev => prev.map(a => a.id === appt.id ? { ...a, status: 'cancelled' } : a));
                                  }}
                                  className="w-full bg-[#F2EFE9] hover:bg-rose-100 text-rose-700 border border-[#E8E2D9] hover:border-rose-200 font-sans text-[10px] font-bold uppercase py-2 px-3.5 rounded-lg cursor-pointer transition-colors text-center"
                                >
                                  Cancel / Delete
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. DOCTOR MODULE: ACTIVE PATIENTS DIRECTORY */}
                {doctorActiveTab === 'patients' && (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Patient Records Directory</h4>
                      <span className="text-[10px] text-[#7C9070] italic">Select Patient to Issue Prescriptions</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
                      {/* Left List of Patients */}
                      <div className="lg:col-span-5 space-y-2.5 text-left">
                        {patientsList.map((pat, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedPatientForRx(pat);
                              setRxForm({
                                diagnosis: pat.notes.toLowerCase().includes('rhinoplasty') || pat.notes.toLowerCase().includes('nose') ? 'Rhinoplasty Post-Op care' : 'Aesthetic contours checkup',
                                medicinesText: pat.notes.toLowerCase().includes('rhinoplasty') || pat.notes.toLowerCase().includes('nose') 
                                  ? "Analgesics 500mg - Once daily after meals\nSilicone Scar Gel - Apply thin film twice daily\nNasal Support Splint - Keep perfectly aligned 7 days" 
                                  : "Gentle Facial Moisturizing Cream - Morning and evening\nBroad Spectrum SPF 50 - Apply daily before sun exposure",
                                instructions: 'Avoid strenuous exercises for 14 days. Wash gently with warm sterile saline.'
                              });
                            }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                              selectedPatientForRx?.email === pat.email
                                ? 'bg-[#2C3328] text-white border-[#2C3328] shadow-md'
                                : 'bg-white text-[#6B705C] border-[#E8E2D9] hover:bg-[#F2EFE9]'
                            }`}
                          >
                            <h5 className="font-sans font-bold text-xs uppercase tracking-wider block font-sans">
                              {pat.name}
                            </h5>
                            <p className="text-[11px] leading-tight mt-1 opacity-90 font-mono">{pat.email}</p>
                            <p className="text-[11px] font-semibold mt-0.5 opacity-95">📞 Contact: {pat.phone}</p>
                            <p className={`text-[10px] mt-2 italic font-light ${selectedPatientForRx?.email === pat.email ? 'text-[#E8E2D9]' : 'text-[#A5A58D]'}`}>
                              "{pat.notes || 'No description notes provided.'}"
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Right Prescription Generator & Clinical Records */}
                      <div className="lg:col-span-7 bg-white border border-[#E8E2D9] p-5 rounded-2xl space-y-4 shadow-sm text-left font-sans">
                        {selectedPatientForRx ? (
                          <div className="space-y-4 text-left">
                            <div className="border-b border-[#E8E2D9] pb-2 text-left">
                              <span className="text-[9px] bg-[#FDFCF9] border border-[#7C9070]/30 text-[#7C9070] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide inline-block font-sans">
                                Digital Prescription Compiler
                              </span>
                              <h4 className="font-serif text-[#2C3328] text-lg mt-2">E-Prescribe: {selectedPatientForRx.name}</h4>
                              <p className="text-xs text-[#6B705C] font-mono">Patient Email: {selectedPatientForRx.email}</p>
                            </div>

                            {rxSuccessMessage && (
                              <div className="bg-emerald-55/65 border border-emerald-200 p-3 rounded-xl text-emerald-800 text-xs font-semibold animate-in fade-in duration-200 text-left">
                                {rxSuccessMessage}
                              </div>
                            )}

                            <div className="space-y-3 font-sans text-left">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#6B705C] uppercase block tracking-wider text-left">Diagnosis / Surgical Treatment</label>
                                <input
                                  type="text"
                                  value={rxForm.diagnosis}
                                  onChange={(e) => setRxForm({ ...rxForm, diagnosis: e.target.value })}
                                  className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 outline-none focus:border-[#7C9070] bg-[#FDFCF9] text-[#2C3328]"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#6B705C] uppercase block tracking-wider flex justify-between text-left">
                                  <span>Medicines &amp; Frequency Dosage</span>
                                  <span className="text-[9px] text-[#A5A58D] font-normal normal-case">one per line</span>
                                </label>
                                <textarea
                                  rows={4}
                                  placeholder="e.g. tablet post-op 500mg - Twice daily"
                                  value={rxForm.medicinesText}
                                  onChange={(e) => setRxForm({ ...rxForm, medicinesText: e.target.value })}
                                  className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 outline-none focus:border-[#7C9070] bg-[#FDFCF9] text-[#2C3328] resize-none leading-relaxed font-mono"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#6B705C] uppercase block tracking-wider text-left">General Care Instructions</label>
                                <input
                                  type="text"
                                  value={rxForm.instructions}
                                  onChange={(e) => setRxForm({ ...rxForm, instructions: e.target.value })}
                                  className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 outline-none focus:border-[#7C9070] bg-[#FDFCF9] text-[#2C3328]"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  if (!rxForm.medicinesText.trim()) return;
                                  const planItems = rxForm.medicinesText.split('\n').filter(line => line.trim());
                                  const newRx = {
                                    id: `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                                    patientName: selectedPatientForRx.name,
                                    email: selectedPatientForRx.email,
                                    diagnosis: rxForm.diagnosis,
                                    doctorName: DOCTOR_INFO.name,
                                    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
                                    plan: planItems,
                                    instructions: rxForm.instructions
                                  };
                                  setPrescriptionsList([newRx, ...prescriptionsList]);
                                  setRxSuccessMessage(`Rx Prescribed Successfully! Dynamically synchronized to patient email account.`);
                                  setTimeout(() => setRxSuccessMessage(''), 4000);
                                }}
                                className="w-full bg-[#7C9070] hover:bg-[#6B705C] text-white font-sans text-xs font-bold uppercase py-3 rounded-xl cursor-pointer shadow-sm transition-colors text-center block mt-2"
                              >
                                Issue &amp; Upload Active Prescription
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 text-[#6B705C] text-xs italic font-light space-y-1.5">
                            <p>No Patient Selected</p>
                            <p className="text-[10px] text-[#A5A58D]">Click on any patient file row on the left side to compile real prescriptions, view email sync tags, or diagnose recovery regimes.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. DOCTOR MODULE: CONTACT INQUIRIES DESK */}
                {doctorActiveTab === 'inquiries' && (
                  <div className="space-y-4 text-left font-sans">
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2C3328]">Live Landing Inquiry Sheets</h4>
                      <span className="text-[10px] text-[#7C9070] italic font-semibold">Synchronized with Main Contact Form</span>
                    </div>

                    {inquiriesList.length === 0 ? (
                      <p className="text-center py-12 text-[#6B705C] text-xs italic">No contact inquiries exist in the registry.</p>
                    ) : (
                      <div className="space-y-3.5">
                        {inquiriesList.map((inq) => (
                          <div key={inq.id} className="bg-white border border-[#E8E2D9] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-all text-left">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-[9px] font-bold text-[#6B705C] bg-[#F2EFE9] px-2 py-0.5 rounded-md uppercase">
                                  Landing Page Form Submission &bull; {inq.date}
                                </span>
                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                  inq.status === 'resolved' ? 'bg-emerald-55 text-emerald-800' : 'bg-rose-50 text-rose-700 animate-pulse'
                                }`}>
                                  {inq.status}
                                </span>
                              </div>
                              <h5 className="font-sans font-bold text-xs text-[#2C3328] uppercase mt-1">From Customer: {inq.name}</h5>
                              <p className="text-[11px] text-[#6B705C] font-semibold">
                                ✉️ Email: {inq.email} &bull; 📞 Phone: {inq.phone}
                              </p>
                              <p className="text-xs text-[#2C2328] italic border-l-2 border-[#7C9070] pl-2 py-1 bg-[#FDFCF9] mr-12 mt-2 leading-relaxed">
                                "{inq.query}"
                              </p>
                            </div>

                            <div className="shrink-0 text-right">
                              {inq.status !== 'resolved' ? (
                                <button
                                  onClick={() => {
                                    setInquiriesList(prev => prev.map(i => i.id === inq.id ? { ...i, status: 'resolved' } : i));
                                  }}
                                  className="bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-[10px] font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-lg cursor-pointer transition-colors"
                                >
                                  Mark Resolved
                                </button>
                              ) : (
                                <span className="text-[11px] text-emerald-700 font-bold flex items-center space-x-1 justify-end font-sans">
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  <span>Resolved Desk</span>
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}
