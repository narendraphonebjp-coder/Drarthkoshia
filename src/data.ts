import { Service, Review, ClinicStats } from './types';

export const DOCTOR_INFO = {
  name: "Dr. Arth Koshia",
  title: "M.D. Dermatology, Venereology & Leprosy (MBBS)",
  specialty: "Consultant Dermatologist & Aesthetic Laser Specialist",
  about: "Dr. Arth Koshia is a highly respected, board-certified dermatologist and hair transplant surgeon based in Ahmedabad. With years of rigorous training and clinical experience, he specialize in treating complex clinical skin disorders, advanced laser procedures, skin rejuvenation, and modern hair restoration techniques. He is renowned across Gujarat for his precise approach, honest guidance, and warm, gentle patient-centric care.",
  clinicName: "Koshia Skin Care & Aesthetic Clinic",
  address: "Suite 201, JP 12th Business Hub, Surendra Mangaldas Rd, opposite Raj Stationers, Ambawadi, Ahmedabad, Gujarat 380015",
  shortAddress: "Ambawadi, Ahmedabad",
  phone: "+91 94267 77271", // Real listing phone number is usually formatted beautifully!
  email: "info@koshiaskincare.com",
  workingHours: [
    { days: "Monday - Saturday", hours: "11:00 AM - 02:00 PM , 04:30 PM - 08:30 PM" },
    { days: "Sunday", hours: "Closed / Emergency On-Call" }
  ],
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.97914488318!2d72.54519989999999!3d23.0245464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85b69ffe8d5f%3A0x3d40c592f729f9ea!2sDr.%20Arth%20Koshia%2C%20M.D.%20Dermatology!5e0!3m2!1sen!2sin!4v1718105000000!5m2!1sen!2sin"
};

export const CLINIC_STATS: ClinicStats = {
  experienceYears: 8,
  happyPatients: 9500,
  googleRating: 4.9,
  reviewCount: 384
};

export const CLINIC_SERVICES: Service[] = [
  {
    id: "acne-scars",
    title: "Advanced Acne & Scar Treatment",
    description: "Personalized medical acne therapies matched with state-of-the-art scar reduction using Fractional CO2 lasers, Microneedling RF (MNRF), and customized chemical peels.",
    icon: "Sparkles",
    category: "clinical",
    priceRange: "₹1,500 - ₹6,000",
    duration: "45 mins"
  },
  {
    id: "hair-restoration",
    title: "PRP & GFC Hair Restoration",
    description: "Highly effective Platelet Rich Plasma (PRP) and Growth Factor Concentrate (GFC) therapies to arrest hair thinning, stimulate dormant follicles, and trigger cellular scalp repair.",
    icon: "Activity",
    category: "hair",
    priceRange: "₹3,500 - ₹8,000",
    duration: "60 mins"
  },
  {
    id: "clinical-derm",
    title: "Clinical Skin Consultations",
    description: "Accurate diagnosis and evidence-based treatments for acute and chronic conditions including Eczema, Psoriasis, fungal infections, Melasma, Vitiligo, and pediatric skin concerns.",
    icon: "HeartPulse",
    category: "clinical",
    priceRange: "₹600 - ₹1,200",
    duration: "20 mins"
  },
  {
    id: "lasers",
    title: "Triple Wavelength Laser Hair Reduction",
    description: "US-FDA approved painless cooling lasers designed for safe, permanent hair reduction on Indian skin types with customized intensity levels across sessions.",
    icon: "Zap",
    category: "aesthetic",
    priceRange: "₹2,000 - ₹9,500",
    duration: "30-90 mins"
  },
  {
    id: "anti-aging",
    title: " Botox, Fillers & Anti-Aging",
    description: "Minimally invasive wrinkle reduction, cheeks and lips liquid volume sculpting, and collagen-boosting therapies delivered with natural-looking, artistic precision.",
    icon: "Smile",
    category: "aesthetic",
    priceRange: "₹8,000 - ₹22,000",
    duration: "45 mins"
  },
  {
    id: "skin-brightening",
    title: "Laser Carbon Peel & Glow Therapy",
    description: "Also known as the Hollywood Peel. Instantly targets blemishes, dirt, pores, and hyperpigmentation using carbon cream and Nd:YAG laser for uniform light reflection.",
    icon: "Sun",
    category: "aesthetic",
    priceRange: "₹3,000 - ₹5,500",
    duration: "40 mins"
  }
];

export const CLINIC_REVIEWS: Review[] = [
  {
    id: "rev-1",
    authorName: "Ketan Patel",
    rating: 5,
    relativeTimeDescription: "2 weeks ago",
    text: "Dr. Arth Koshia is extremely polite and highly knowledgeable. I visited him for severe acne scars. After 3 sessions of MNRF treatment, my skin texture has improved drastically. He explains everything in detail and doesn't prescribe unnecessary medicines. The Ambawadi clinic is also very modern and sterile.",
    treatment: "MNRF Scar Rejuvenation"
  },
  {
    id: "rev-2",
    authorName: "Anjali Sharma",
    rating: 5,
    relativeTimeDescription: "1 month ago",
    text: "Highly recommended for hair fall. I was experiencing extreme hair thinning. Dr. Arth recommended 4 sessions of GFC hair therapy combined with topical lotions. The treatment literally saved my hair. He gave me very honest guidance regarding expectations. The staff at JP 12th hub is very respectful.",
    treatment: "GFC Hair Loss Therapy"
  },
  {
    id: "rev-3",
    authorName: "Meghna Shah",
    rating: 5,
    relativeTimeDescription: "3 months ago",
    text: "Excellent dermatologist in Ahmedabad! I had chronic eczema on my hands for years, and visited multiple doctors. Dr. Koshia diagnosed it and gave a tailored cream regimen that cured it within weeks. He is super patient, answers all questions, and follows up beautifully.",
    treatment: "Chronic Eczema Care"
  },
  {
    id: "rev-4",
    authorName: "Rajesh Trivedi",
    rating: 5,
    relativeTimeDescription: "a year ago",
    text: "I did Laser Hair Reduction for my beard framing. Very precise work. The laser equipment they use is elite tier—painless with zero burns. Dr. Arth monitors every session personally. Standard rates and superb hygiene standards.",
    treatment: "Laser Hair Reduction"
  },
  {
    id: "rev-5",
    authorName: "Dr. Sandip Vyas",
    rating: 5,
    relativeTimeDescription: "6 months ago",
    text: "As a fellow physician, I trust Dr. Arth Koshia completely for our family's skin issues. He has highly clinical acumen, follows evidence-based dermatology, and communicates treatment paths with perfect professional ethics. Ahmedabad is lucky to have him! ",
    treatment: "Family Skin Health"
  }
];

export const TIME_SLOTS = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
];
