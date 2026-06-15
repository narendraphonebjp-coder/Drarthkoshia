import { Service, Review, ClinicStats } from './types';

export const DOCTOR_INFO = {
  name: "Dr. Akhilesh Agarwal",
  title: "MBBS, MS (Surgery), M.Ch. (Plastic & Reconstructive Surgery)",
  specialty: "Gold Medalist Plastic, Cosmetic & Reconstructive Surgeon",
  about: "Dr. Akhilesh Agarwal is a highly accomplished, board-certified plastic, cosmetic, and reconstructive surgeon based in Kolkata. A Gold Medalist in MBBS, he completed his MS (Surgery) and M.Ch. (Plastic Surgery) from the prestigious Medical College, Kolkata. Dr. Agarwal has visited world-renowned institutes to refine his expertise, including Chang Gung Memorial Hospital in Taiwan for advanced microvascular reconstructive surgery, and the Mayo Clinic in Rochester, USA, in the department of Aesthetic & Reconstructive Breast Surgery. Renowned for his surgical artistry and patient-focused approach, he balances meticulous clinical safety with stunning, natural transformations. He is also committed to humanitarian care, regularly volunteering with Repose Clinic and Smile Train to provide free cleft surgeries.",
  clinicName: "Dr. Akhilesh Agarwal's Plastic & Cosmetic Surgery Clinic",
  address: "Flat 3103, URBANA Tower, 783 Anandapur Road, Kolkata, West Bengal 700107",
  shortAddress: "Anandapur, Kolkata",
  phone: "+91 62915 72182",
  email: "akhil2u@rediffmail.com",
  workingHours: [
    { days: "Monday - Saturday", hours: "10:00 AM - 07:00 PM" },
    { days: "Sunday", hours: "Closed / Emergency Reconstructions" }
  ],
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.234381335965!2d88.406981!3d22.5141643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276a7e0ed3659%3A0xe510b61cd7db084c!2sUrbana!5e0!3m2!1sen!2sin!4v1718105000000!5m2!1sen!2sin"
};

export const CLINIC_STATS: ClinicStats = {
  experienceYears: 10,
  happyPatients: 1500,
  googleRating: 4.9,
  reviewCount: 150
};

export const CLINIC_SERVICES: Service[] = [
  {
    id: "rhinoplasty",
    title: "Rhinoplasty Nose Surgery",
    description: "Advanced aesthetic nose reshaping designed with absolute mathematical and artistic facial balance, correcting structural deviations, breathing issues, or cartilage alignment.",
    icon: "Sparkles",
    category: "aesthetic",
    priceRange: "₹65,000 - ₹1,40,000",
    duration: "120 mins"
  },
  {
    id: "liposuction",
    title: "High-Definition Liposuction",
    description: "Targeted removal of persistent subcutaneous body fat using ultrasonic and power-assisted technologies, highlighting muscle definitions and contouring localized curves.",
    icon: "Zap",
    category: "aesthetic",
    priceRange: "₹50,000 - ₹1,80,000",
    duration: "90 mins"
  },
  {
    id: "mommy-makeover",
    title: "Mommy Makeover Program",
    description: "A comprehensive, personal combination of abdominoplasty (tummy tuck) and breast lift or augmentation, restoring volume and elasticity post-pregnancy or weight loss.",
    icon: "Smile",
    category: "aesthetic",
    priceRange: "₹1,20,000 - ₹2,50,000",
    duration: "180 mins"
  },
  {
    id: "reconstructive-trauma",
    title: "Trauma Reconstruction & Cleft Care",
    description: "Highly specialized microvascular surgery restoring function and aesthetic appearance after traumatic tissue losses, burns, facial fractures, or cleft lips.",
    icon: "HeartPulse",
    category: "clinical",
    priceRange: "₹40,000 - ₹1,50,000",
    duration: "150 mins"
  },
  {
    id: "breast-surgery",
    title: "Breast Lift & Augmentation",
    description: "Safe, customized breast volume and contour enhancements using FDA-approved cohesive silicone implants or natural fat transfer, tailored to individual desires.",
    icon: "Sun",
    category: "aesthetic",
    priceRange: "₹90,000 - ₹2,20,000",
    duration: "90 mins"
  },
  {
    id: "vitiligo-surgery",
    title: "Vitiligo Grafting Surgery",
    description: "Advanced cellular grafting techniques such as Melanocyte Transfer (MKG) and ultra-thin epidermal grafting, safely restoring natural pigment to vitiligo patches.",
    icon: "Activity",
    category: "clinical",
    priceRange: "₹15,000 - ₹50,000",
    duration: "75 mins"
  }
];

export const CLINIC_REVIEWS: Review[] = [
  {
    id: "rev-1",
    authorName: "Madhuri Banerjee",
    rating: 5,
    relativeTimeDescription: "2 weeks ago",
    text: "After a severe traumatic injury, I never thought I would look or feel like myself again. Thanks to Dr. Akhilesh's skillful reconstructive surgery, I have regained my appearance and confidence. He gave me back a part of my life that I thought was lost forever.",
    treatment: "Microvascular Reconstruction"
  },
  {
    id: "rev-2",
    authorName: "Arindam Chakraborty",
    rating: 5,
    relativeTimeDescription: "1 month ago",
    text: "Choosing Dr. Akhilesh for my surgical modification was one of the best and most comfortable experiences of my life. I would absolutely recommend him. The results are much better than I could have ever imagined.",
    treatment: "Aesthetic Body Sculpting"
  },
  {
    id: "rev-3",
    authorName: "Sharmila Ghosh",
    rating: 5,
    relativeTimeDescription: "3 months ago",
    text: "I was struggling with stubborn fat for years despite rigorous diet and exercise. Dr. Akhilesh performed customized Liposuction, and the results are outstanding! The Urbana Tower clinic is beautifully clean and modern.",
    treatment: "High-Definition Liposuction"
  },
  {
    id: "rev-4",
    authorName: "Dr. Amitava Roy",
    rating: 5,
    relativeTimeDescription: "6 months ago",
    text: "As a surgeon myself, I appreciate Dr. Akhilesh's exceptional surgical skills, microvascular precision, and strict adherence to evidence-based medical ethics. His free cleft surgeries with Smile Train are inspiring. Best surgeon in Kolkata.",
    treatment: "Congenital Cleft Repair"
  }
];

export const TIME_SLOTS = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
];
