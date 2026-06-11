import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, PenSquare, Share2, Check } from 'lucide-react';
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
    <section id="reviews" className="py-20 bg-slate-50/50 border-t border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statistics Head Summary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-sans text-xs font-bold text-blue-600 uppercase tracking-widest block">
              Patient Satisfaction
            </span>
            <h2 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
              What Our Happy Patients Say
            </h2>
            <p className="font-sans text-base text-slate-500 leading-relaxed">
              We take pride in our scientific treatments and ethical standards. Read actual feedbacks from individuals who received life-changing clinical care.
            </p>

            {/* Google Rating badge */}
            <div className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center justify-between shadow-sm max-w-sm">
              <div className="flex flex-col">
                <span className="font-sans text-lg font-bold text-slate-800">Google Verified</span>
                <span className="font-sans text-xs text-slate-400">Based on Google Maps data</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="flex items-center space-x-1">
                  <span className="font-mono text-xl font-extrabold text-slate-900">{CLINIC_STATS.googleRating}</span>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="font-sans text-[11px] font-bold text-blue-600">{CLINIC_STATS.reviewCount}+ Patients Rated</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-[20%] translate-y-[20%] text-slate-100 -z-0">
              <MessageSquare className="w-56 h-56" />
            </div>

            {/* Simulated Live Review Input */}
            <form onSubmit={handleSubmitReview} className="relative z-10 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <PenSquare className="h-5 w-5 text-blue-600" />
                  <h3 className="font-sans font-bold text-slate-900 text-base">Share Your Review</h3>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 py-1 px-2.5 rounded-full font-bold">Simulator</span>
              </div>

              {isSubmitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 animate-in fade-in-50 duration-300">
                  <div className="bg-emerald-500 text-white p-2 rounded-full">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="font-sans font-bold text-emerald-800 text-base">Thank you for sharing!</h4>
                  <p className="font-sans text-xs text-emerald-600">Your mock review has been formatted and dynamically added to the testimonials below.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="font-sans text-xs font-bold text-slate-600">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder="e.g., Varun Mehta"
                        className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2 px-3.5 focus:border-blue-600 focus:ring-0 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="font-sans text-xs font-bold text-slate-600">Treatment Received</label>
                      <select
                        value={newReview.treatment}
                        onChange={(e) => setNewReview({ ...newReview, treatment: e.target.value })}
                        className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2 px-3.5 focus:border-blue-600 outline-none bg-white"
                      >
                        {treatmentsList.map((t, i) => (
                          <option key={i} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1.5 text-left">
                      <label className="font-sans text-xs font-bold text-slate-600">Star Rating</label>
                      <div className="flex items-center space-x-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="p-1 focus:outline-none transition-transform active:scale-120"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= newReview.rating
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-slate-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      id="submit-review-form-btn"
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-sans text-sm font-bold py-2.5 px-6 rounded-xl shadow-md cursor-pointer self-end w-full sm:w-auto transition-colors align-bottom"
                    >
                      Post Review
                    </button>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="font-sans text-xs font-bold text-slate-600">Review Feedback</label>
                    <textarea
                      required
                      rows={2}
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      placeholder="Share your experience with Dr. Arth Koshia and the clinic staff..."
                      className="w-full text-sm font-medium border border-slate-200 rounded-xl py-2 px-3.5 focus:border-blue-600 outline-none resize-none"
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
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow duration-250 animate-in fade-in zoom-in-95 duration-300"
            >
              <div className="space-y-4">
                {/* Rating & relative days row */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < rev.rating ? 'fill-current text-amber-500' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-slate-400">{rev.relativeTimeDescription}</span>
                </div>

                {/* Main feedback text quotation */}
                <p className="font-sans text-sm text-slate-600 leading-relaxed italic text-left">
                  "{rev.text}"
                </p>
              </div>

              {/* Author patient bio details */}
              <div className="border-t border-slate-50 pt-4 mt-5 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-sm">{rev.authorName}</h4>
                  <span className="font-sans text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                    {rev.treatment}
                  </span>
                </div>
                {/* Verified client seal */}
                <span className="flex items-center space-x-1 text-emerald-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Verified Patient</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
