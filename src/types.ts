export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'clinical' | 'aesthetic' | 'hair';
  priceRange?: string;
  duration?: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number; // e.g., 5
  relativeTimeDescription: string;
  text: string;
  profilePhotoUrl?: string;
  treatment?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceId: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  treatmentType: string;
}

export interface ClinicStats {
  experienceYears: number;
  happyPatients: number;
  googleRating: number;
  reviewCount: number;
}
