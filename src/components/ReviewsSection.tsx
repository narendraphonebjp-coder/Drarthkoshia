import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, PenSquare, Check } from 'lucide-react';
import { CLINIC_REVIEWS, CLINIC_STATS } from '../data';
import { Review } from '../types';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(CLINIC_REVIEWS);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    treatment: 'Acne & Scar Care',
    text: ''
  });

  const treatmentsList = [
    "MNRF Scar Rejuvenation",
    "GFC Hair Loss Therapy",
    "Chronic Eczema Care",
    "Laser Hair Reduction",
    "Chemical Peels & Glowing",
    "General Clinical Skin Care"
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const addedReview: Review = {
      id: `custom-${Date.now()}`,
      authorName: newReview.name,
      rating: newReview.rating,
      relativeTimeDescription: 'Just now',
      text: newReview.text,
      treatment: newReview.treatment
    };

    setReviews([addedReview, ...reviews]);
    setIsSubmitSuccess(true);
    
    // Reset form
    setNewReview({
      name: '',
      rating: 5,
      treatment: 'Acne & Scar Care',
      text: ''
    });

    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 bg-[#F2EFE9]/30 border-t border-b border-[#E8E2D9] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statistics Head Summary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-sans text-[10px] font-extrabold text-[#7C9070] uppercase tracking-[0.2em] block">
              Patient Satisfaction
            </span>
            <h2 className="font-serif text-[#2C3328] text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              What Our Happy Patients Say
            </h2>
            <p className="font-sans text-xs text-[#6B705C] leading-relaxed italic font-light">
              We take pride in our scientific treatments and ethical standards. Read actual feedbacks from individuals who received life-changing clinical care.
            </p>

            {/* Google Rating badge */}
            <div className="bg-[#FDFCF9] border border-[#E8E2D9] p-6 rounded-3xl flex items-center justify-between shadow-sm max-w-sm">
              <div className="flex flex-col text-left">
                <span className="font-sans text-xs font-bold text-[#2C3328] uppercase tracking-wider">Google Verified</span>
                <span className="font-sans text-[11px] text-[#A5A58D]">Based on verified Maps data</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="flex items-center space-x-1">
                  <span className="font-serif text-lg font-bold text-[#2C3328]">{CLINIC_STATS.googleRating}</span>
                  <div className="flex text-[#D4A373]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="font-sans text-[10px] font-bold text-[#7C9070] uppercase tracking-wider">{CLINIC_STATS.reviewCount}+ Patients Rated</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FDFCF9] p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-sm relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-[20%] translate-y-[20%] text-[#F2EFE9] -z-0">
              <MessageSquare className="w-56 h-56" />
            </div>

            {/* Simulated Live Review Input */}
            <form onSubmit={handleSubmitReview} className="relative z-10 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
                <div className="flex items-center space-x-2">
                  <PenSquare className="h-4 w-4 text-[#7C9070]" />
                  <h3 className="font-sans font-bold text-[13px] tracking-wider uppercase text-[#2C3328]">Share Your Review</h3>
                </div>
                <span className="text-[9px] bg-[#F0EBE3] text-[#7C9070] py-1 px-2.5 rounded-full font-bold uppercase tracking-wider">Simulator</span>
              </div>

              {isSubmitSuccess ? (
                <div className="bg-emerald-55/60 border border-emerald-200/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 animate-in fade-in-50 duration-300">
                  <div className="bg-[#7C9070] text-[#FDFCF9] p-2 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="font-sans font-bold text-emerald-800 text-sm">Thank you for sharing!</h4>
                  <p className="font-sans text-[11px] text-emerald-600 leading-normal">Your review has been formatted and added to the client testimonials grid dynamically!</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder="e.g., Varun Mehta"
                        className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 focus:border-[#7C9070] outline-none bg-white text-[#2C3328]"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider">Treatment Received</label>
                      <select
                        value={newReview.treatment}
                        onChange={(e) => setNewReview({ ...newReview, treatment: e.target.value })}
                        className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 focus:border-[#7C9070] outline-none bg-white text-[#2C3328]"
                      >
                        {treatmentsList.map((t, i) => (
                          <option key={i} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1 text-left">
                      <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider">Star Rating</label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="p-1 focus:outline-none transition-all active:scale-110 cursor-pointer"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= newReview.rating
                                  ? 'text-[#D4A373] fill-current'
                                  : 'text-[#E8E2D9]'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      id="submit-review-form-btn"
                      type="submit"
                      className="bg-[#2C3328] hover:bg-[#3D4637] text-[#FDFCF9] font-sans text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-xl shadow-sm cursor-pointer self-end w-full sm:w-auto transition-colors align-bottom"
                    >
                      Post Review
                    </button>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="font-sans text-[11px] font-bold text-[#6B705C] uppercase tracking-wider">Review Feedback</label>
                    <textarea
                      required
                      rows={2}
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      placeholder="Share your experience with Dr. Arth Koshia and the clinic staff..."
                      className="w-full text-xs font-semibold border border-[#E8E2D9] rounded-xl py-2.5 px-3.5 focus:border-[#7C9070] outline-none resize-none bg-white text-[#2C3328]"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Dynamic Reviews Testimonial Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FDFCF9] p-6 rounded-3xl border border-[#E8E2D9]/80 shadow-sm flex flex-col justify-between hover:border-[#7C9070]/60 transition-all duration-250 text-left"
            >
              <div className="space-y-4">
                {/* Rating & relative days row */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4A373]">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < rev.rating ? 'fill-current text-[#D4A373]' : 'text-[#E8E2D9]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-[#A5A58D]">{rev.relativeTimeDescription}</span>
                </div>

                {/* Main feedback text quotation */}
                <p className="font-sans text-xs text-[#4A443E] leading-relaxed italic text-left">
                  "{rev.text}"
                </p>
              </div>

              {/* Author patient bio details */}
              <div className="border-t border-[#E8E2D9] pt-4 mt-5 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-[#2C3328] text-xs uppercase tracking-wider">{rev.authorName}</h4>
                  <span className="font-sans text-[10px] text-[#6B705C] bg-[#F2EFE9] border border-[#E8E2D9] px-2.5 py-0.5 rounded-full inline-block mt-1">
                    {rev.treatment}
                  </span>
                </div>
                {/* Verified client seal */}
                <span className="flex items-center space-x-1 text-[#7C9070]">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-sans text-[9px] font-bold uppercase tracking-wider">Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
