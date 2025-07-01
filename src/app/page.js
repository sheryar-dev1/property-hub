"use client"
import Image from "next/image";
import FaqAccordion from "./FaqAccordion";
import { supabase } from "./supabaseClient";
import React from "react";

// Sexy Fixed Header
function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/40 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-800/40 shadow-lg glassy-card2 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/office-building.svg" alt="Logo" width={40} height={40} className="drop-shadow-md" />
          <span className="font-extrabold text-xl text-gray-900 dark:text-white tracking-tight">Property Hub</span>
        </div>
        {/* Nav Links */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-pink-400 transition-colors">Home</a>
          <a href="#services" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-pink-400 transition-colors">Services</a>
          <a href="#faq" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-pink-400 transition-colors">FAQ</a>
          <a href="#testimonials" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-pink-400 transition-colors">Testimonials</a>
          <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-pink-400 transition-colors">Contact</a>
        </nav>
        {/* Contact Button */}
        <a href="#contact" className="ml-4 px-5 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 hidden md:inline-block">Contact Now</a>
        {/* Hamburger for mobile */}
        <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors">
          <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default function Home() {
  // Add state for reviews
  const [reviews, setReviews] = React.useState([]);
  const [name, setName] = React.useState("");
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");
  const [visibleReviews, setVisibleReviews] = React.useState(3);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);

  // Fetch reviews from Supabase
  React.useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, name, review, rating, created_at")
        .order("created_at", { ascending: false });
      if (!error) setReviews(data);
    };
    fetchReviews();
  }, []);

  // Handle review submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    if (!name || !review || !rating) {
      setError("Name, review, and rating are required.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("reviews").insert([{ name, review, rating }]);
    if (error) {
      setError("Failed to add review. Try again.");
    } else {
      setSuccess("Review added successfully!");
      setName("");
      setReview("");
      setRating(5);
      // Refresh reviews
      const { data } = await supabase
        .from("reviews")
        .select("id, name, review, rating, created_at")
        .order("created_at", { ascending: false });
      setReviews(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <Header />
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden min-h-[60vh] flex items-center justify-center pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-x opacity-80 z-0"></div>
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-10 backdrop-blur-xl"></div>
        <div className="relative z-20 w-full max-w-5xl mx-auto px-8 py-20 sm:px-12 lg:px-20 text-center rounded-2xl shadow-2xl bg-white/20 dark:bg-gray-900/40 border border-white/30 dark:border-gray-800/60 backdrop-blur-2xl glassy-card">
          <Image
            className="mx-auto mb-10 drop-shadow-xl animate-float"
            src="/office-building.svg"
            alt="Property Office Logo"
            width={120}
            height={120}
          />
          <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold text-white tracking-tight mb-8 drop-shadow-xl animate-fade-in">
         Almeezan Property Center 
          </h1>
          
          <p className="text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-medium animate-fade-in delay-200">
            Your trusted partner for all property needs - buying, selling, renting, and expert consultancy.
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-6 animate-fade-in delay-300">
            <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-blue-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300/40 text-lg animate-bounce-slow text-center">Contact Now</a>
            <a href="#services" className="px-8 py-4 bg-white/30 hover:bg-white/50 text-white font-bold rounded-xl shadow-xl border border-white/40 backdrop-blur-md hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/40 text-lg text-center">Our Services</a>
          </div>
        </div>
      </section>
      {/* Wavy SVG Divider - now outside the hero card, not overlapping */}
      <div className="w-full overflow-hidden leading-none -mt-8">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
          <path d="M0,0V46.29c47.29,22,104.09,29,158,17.39C267.75,44.15,327.29,0,385,0s117.25,44.15,227,63.68C665.91,92,723.71,85,770,63.68c53.91-11.61,110.71-4.61,158,17.39V0Z" opacity=".25" className="fill-white dark:fill-gray-900"></path>
          <path d="M0,0V15.81C47.29,37.8,104.09,44.8,158,33.19C267.75,14.95,327.29,0,385,0s117.25,14.95,227,33.19C665.91,51.8,723.71,44.8,770,33.19c53.91-11.61,110.71-4.61,158,17.39V0Z" opacity=".5" className="fill-white dark:fill-gray-900"></path>
          <path d="M0,0V5.63C47.29,27.62,104.09,34.62,158,23.01C267.75,4.77,327.29,0,385,0s117.25,4.77,227,23.01C665.91,42.62,723.71,35.62,770,23.01c53.91-11.61,110.71-4.61,158,17.39V0Z" className="fill-white dark:fill-gray-900"></path>
        </svg>
      </div>

      {/* Wavy Divider for next section */}
      {/* <div className="w-full overflow-hidden leading-none -mt-2">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 rotate-180">
          <path d="M0,0V46.29c47.29,22,104.09,29,158,17.39C267.75,44.15,327.29,0,385,0s117.25,44.15,227,63.68C665.91,92,723.71,85,770,63.68c53.91-11.61,110.71-4.61,158,17.39V0Z" opacity=".25" className="fill-white dark:fill-gray-800"></path>
          <path d="M0,0V15.81C47.29,37.8,104.09,44.8,158,33.19C267.75,14.95,327.29,0,385,0s117.25,14.95,227,33.19C665.91,51.8,723.71,44.8,770,33.19c53.91-11.61,110.71-4.61,158,17.39V0Z" opacity=".5" className="fill-white dark:fill-gray-800"></path>
          <path d="M0,0V5.63C47.29,27.62,104.09,34.62,158,23.01C267.75,4.77,327.29,0,385,0s117.25,4.77,227,23.01C665.91,42.62,723.71,35.62,770,23.01c53.91-11.61,110.71-4.61,158,17.39V0Z" className="fill-white dark:fill-gray-800"></path>
        </svg>
      </div> */}

      {/* Stats Section */}
      <section className="w-full bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div className="p-8 glassy-card shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2 animate-float">3000+</div>
              <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold">Properties Sold</div>
            </div>
            <div className="p-8 glassy-card shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-extrabold text-green-600 dark:text-green-400 mb-2 animate-float delay-100">200+</div>
              <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold">Happy Clients</div>
            </div>
            <div className="p-8 glassy-card shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-extrabold text-yellow-600 dark:text-yellow-400 mb-2 animate-float delay-200">25+</div>
              <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold">Years Experience</div>
            </div>
            <div className="p-8 glassy-card shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2 animate-float delay-300">10+</div>
              <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold">Cities Served</div>
            </div>
          </div>
        </div>
        {/* Wavy Divider for next section */}
        {/* <div className="w-full overflow-hidden leading-none absolute bottom-0 left-0">
          <svg viewBox="0 0 2000 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,0V46.29c47.29,22,104.09,29,158,17.39C267.75,44.15,327.29,0,385,0s117.25,44.15,227,63.68C665.91,92,723.71,85,770,63.68c53.91-11.61,110.71-4.61,158,17.39V0Z" opacity=".25" className="fill-blue-100 dark:fill-gray-900"></path>
            <path d="M0,0V15.81C47.29,37.8,104.09,44.8,158,33.19C267.75,14.95,327.29,0,385,0s117.25,14.95,227,33.19C665.91,51.8,723.71,44.8,770,33.19c53.91-11.61,110.71-4.61,158,17.39V0Z" opacity=".5" className="fill-blue-100 dark:fill-gray-900"></path>
            <path d="M0,0V5.63C47.29,27.62,104.09,34.62,158,23.01C267.75,4.77,327.29,0,385,0s117.25,4.77,227,23.01C665.91,42.62,723.71,35.62,770,23.01c53.91-11.61,110.71-4.61,158,17.39V0Z" className="fill-blue-100 dark:fill-gray-900"></path>
          </svg>
        </div> */}
      </section>

      {/* Services Section */}
      <section id="services" className="w-full bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 drop-shadow-lg tracking-tight">Our Premium Services</h2>
          <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Comprehensive solutions tailored to your property needs
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="glassy-card bg-white/60 dark:bg-gray-800/60 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-white/30 dark:border-gray-800/60 backdrop-blur-xl group hover:shadow-3xl hover:-translate-y-2 hover:scale-105 hover:border-gradient-to-r hover:from-pink-400 hover:to-blue-400 animate-fade-in-up"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="flex flex-col items-center justify-center w-full p-10">
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-pink-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 animate-gradient-spin">
                  <service.icon className="w-8 h-8 text-white drop-shadow-xl" />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white drop-shadow-lg tracking-tight text-center">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-medium text-center">
                  {service.description}
                </p>
                <button
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline hover:text-pink-500 dark:hover:text-pink-400 transition-colors text-lg"
                  onClick={() => {
                    setSelectedService(service);
                    setModalOpen(true);
                  }}
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Wavy Divider for next section */}
        <div className="w-full overflow-hidden leading-none absolute bottom-0 left-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,0V46.29c47.29,22,104.09,29,158,17.39C267.75,44.15,327.29,0,385,0s117.25,44.15,227,63.68C665.91,92,723.71,85,770,63.68c53.91-11.61,110.71-4.61,158,17.39V0Z" opacity=".25" className="fill-purple-100 dark:fill-gray-900"></path>
            <path d="M0,0V15.81C47.29,37.8,104.09,44.8,158,33.19C267.75,14.95,327.29,0,385,0s117.25,14.95,227,33.19C665.91,51.8,723.71,44.8,770,33.19c53.91-11.61,110.71-4.61,158,17.39V0Z" opacity=".5" className="fill-purple-100 dark:fill-gray-900"></path>
            <path d="M0,0V5.63C47.29,27.62,104.09,34.62,158,23.01C267.75,4.77,327.29,0,385,0s117.25,4.77,227,23.01C665.91,42.62,723.71,35.62,770,23.01c53.91-11.61,110.71-4.61,158,17.39V0Z" className="fill-purple-100 dark:fill-gray-900"></path>
          </svg>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-16 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Simple Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transparent steps to get your property deal done smoothly
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center justify-center relative">
                {/* Left card (even steps) */}
                {index % 2 === 0 ? (
                  <div className="w-full lg:w-1/2 flex justify-end pr-0 lg:pr-8 mb-6 lg:mb-0">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md text-right">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ) : <div className="w-full lg:w-1/2"></div>}
                {/* Center circle and line */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center text-2xl font-extrabold border-4 border-white dark:border-gray-900 mb-2">
                    {index + 1}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="h-16 w-1 bg-gray-200 dark:bg-gray-700"></div>
                  )}
                </div>
                {/* Right card (odd steps) */}
                {index % 2 === 1 ? (
                  <div className="w-full lg:w-1/2 flex justify-start pl-0 lg:pl-8 mt-6 lg:mt-0">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ) : <div className="w-full lg:w-1/2"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 lg:flex">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">Fair & Transparent Pricing</h2>
              <p className="text-blue-100 max-w-md mb-6">
                We believe in complete transparency with our clients about our commission structure.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white">No hidden charges</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white">Pay only after successful deal</span>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Our Commission Rates</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between text-blue-100">
                    <span>Buying/Selling Property</span>
                    <span className="font-medium">1% - 2%</span>
                  </li>
                  <li className="flex justify-between text-blue-100">
                    <span>Rental Agreements</span>
                    <span className="font-medium">1 Month's Rent</span>
                  </li>
                  <li className="flex justify-between text-blue-100">
                    <span>Documentation Services</span>
                    <span className="font-medium">Custom Quote</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Review Section */}
      <section className="w-full max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-pink-200/60 via-blue-100/60 to-purple-200/60 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80 rounded-3xl shadow-2xl p-10 mb-12 border border-white/30 dark:border-gray-800/60 backdrop-blur-xl glassy-card animate-fade-in-up">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 via-pink-400 to-purple-500 flex items-center justify-center shadow-xl mb-4 animate-float">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white text-center drop-shadow-lg tracking-tight">Share Your Experience</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md">We value your feedback! Add your review and help others make the right choice.</p>
          </div>
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-gray-900 dark:text-white shadow focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
            />
            <textarea
              placeholder="Write your review..."
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-gray-900 dark:text-white shadow focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all"
              value={review}
              onChange={e => setReview(e.target.value)}
              rows={4}
              disabled={loading}
            />
            {/* Star Rating Input */}
            <div className="flex items-center gap-3 justify-center">
              <span className="text-gray-700 dark:text-gray-200 font-semibold">Your Rating:</span>
              {[1,2,3,4,5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                  disabled={loading}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <svg
                    className={`w-8 h-8 transition-all ${star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:from-blue-500 hover:to-pink-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300/40 text-lg animate-bounce-slow"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
            {success && <p className="text-green-600 text-center font-semibold animate-fade-in">{success}</p>}
            {error && <p className="text-red-600 text-center font-semibold animate-fade-in">{error}</p>}
          </form>
        </div>
      </section>

      {/* Testimonials Section (now shows real user reviews) */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.length === 0 && <p className="text-gray-500 text-center col-span-3">No reviews yet.</p>}
            {reviews.slice(0, visibleReviews).map((r, index) => (
              <div key={r.id || index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 relative overflow-hidden group">
                {/* Quote Icon */}
                <svg className="absolute top-6 right-6 w-10 h-10 text-pink-200 dark:text-pink-400 opacity-30 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.17 6A5.001 5.001 0 002 11c0 2.21 1.79 4 4 4 .34 0 .67-.04.99-.1l-.49 2.45A1 1 0 007.47 19h2.02a1 1 0 00.99-.86l.5-2.5A5.978 5.978 0 0013 11c0-2.76-2.24-5-5-5zm9 0a5.001 5.001 0 00-5 5c0 2.21 1.79 4 4 4 .34 0 .67-.04.99-.1l-.49 2.45A1 1 0 0016.47 19h2.02a1 1 0 00.99-.86l.5-2.5A5.978 5.978 0 0022 11c0-2.76-2.24-5-5-5z" />
                </svg>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 via-pink-400 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {r.name?.split(' ').map(w => w[0]).join('').toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900 dark:text-white">{r.name}</h4>
                    <p className="text-gray-500 text-sm">{new Date(r.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic text-lg mb-4">"{r.review}"</p>
                <div className="mt-2 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-6 h-6 fill-current ${i < r.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {visibleReviews < reviews.length && (
            <div className="flex justify-center mt-8">
              <button
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:from-blue-500 hover:to-pink-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300/40 text-lg"
                onClick={() => setVisibleReviews(v => v + 3)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-blue-600 dark:bg-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Property Journey?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Contact us today for a free consultation and let us help you make the best property decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Call Now: 0345-9617853
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
              Email Us
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Answers to common questions about our services
          </p>
        </div>
        <FaqAccordion faqs={faqs} />
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contact Info Card */}
            <div className="glassy-card bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-12 animate-fade-in-up">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
                Have questions or ready to start your property journey? Reach out to us through any of these channels.
              </p>
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-500 to-pink-400 flex items-center justify-center shadow-lg animate-float">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Phone</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">0345-9617853</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Available 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
                {/* Office Location */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-400 flex items-center justify-center shadow-lg animate-float delay-100">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Office Location</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">Mansehra, Lala Ayub Market</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Visit us for face-to-face consultation</p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-400 flex items-center justify-center shadow-lg animate-float delay-200">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">info@propertyhub.com</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map Card */}
            <div className="glassy-card bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl overflow-hidden h-96 animate-fade-in-up delay-200 flex items-center justify-center">
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=Mansehra%20Lala%20Ayub%20Market&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-3xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
            <Image src="/office-building.svg" alt="Logo" width={40} height={40} className="drop-shadow-md" />

              <p className="text-gray-300">
                Your trusted partner for all property needs in Pakistan since 2008.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Property Buying</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Property Selling</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rental Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
              <p className="text-gray-300">
                Subscribe to our newsletter for property updates
              </p>
              <div className="mt-2 flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg w-full text-gray-900" />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Almeezan Property Center. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Service Modal */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in-up">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-pink-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-xl">
                <selectedService.icon className="w-8 h-8 text-white drop-shadow-xl" />
              </div>
              <h2 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white text-center drop-shadow-lg tracking-tight">{selectedService.title}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md">{selectedService.longDescription}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Data for services
const services = [
  {
    title: "Buy & Sell Properties",
    description: "Complete guidance for buying and selling residential and commercial properties with legal support.",
    longDescription: "We offer end-to-end support for buying and selling properties, including market analysis, legal paperwork, negotiation, and after-sale support. Our experienced team ensures a smooth and transparent process, whether you're a first-time buyer or a seasoned investor.",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5" />
      </svg>
    ),
    color: "bg-blue-600"
  },
  {
    title: "Rental Services",
    description: "Get or offer houses, flats, shops, or offices on rent with complete documentation.",
    longDescription: "Our rental services cover everything from property listing and tenant screening to agreement drafting and move-in support. We ensure all documentation is handled professionally and transparently, making renting hassle-free for both landlords and tenants.",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232a3 3 0 114.243 4.243L7.5 21H3v-4.5l12.232-12.268z" />
      </svg>
    ),
    color: "bg-green-600"
  },
  {
    title: "Legal Documentation",
    description: "Transfer, registry, file transfer, and all legal documentation services with expert guidance.",
    longDescription: "We handle all legal paperwork related to property transactions, including transfer, registry, file transfer, and more. Our legal experts ensure your documents are accurate, compliant, and processed quickly, giving you peace of mind.",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "bg-yellow-600"
  },
  {
    title: "Property Consultancy",
    description: "Investment advice, valuation services, and expert property market insights.",
    longDescription: "Get expert advice on property investment, market trends, and property valuation. We help you make informed decisions to maximize your returns and minimize risks, whether you're buying, selling, or investing.",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "bg-purple-600"
  },
  {
    title: "Site Visits & Surveys",
    description: "Professional property visits, surveys, and detailed reports before you make decisions.",
    longDescription: "We arrange and accompany you on property site visits, conduct professional surveys, and provide detailed reports. This helps you make confident decisions with all the facts in hand.",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z" />
      </svg>
    ),
    color: "bg-red-600"
  },
  {
    title: "After-Sale Support",
    description: "Continued guidance and support even after your deal is completed.",
    longDescription: "Our relationship doesn't end after the deal. We provide ongoing support for any property-related queries or issues, ensuring your satisfaction and peace of mind.",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 17l-3.5-3.5a2.121 2.121 0 010-3l7-7a2.121 2.121 0 013 0l7 7a2.121 2.121 0 010 3L16 17M8 17v5a2 2 0 002 2h4a2 2 0 002-2v-5" />
      </svg>
    ),
    color: "bg-pink-600"
  }
];

// Data for process steps
const steps = [
  {
    title: "Initial Consultation",
    description: "We discuss your property needs and requirements in detail."
  },
  {
    title: "Property Shortlisting",
    description: "Based on your criteria, we shortlist the best matching properties."
  },
  {
    title: "Site Visits",
    description: "Arrange and accompany you for property visits and evaluations."
  },
  {
    title: "Deal Negotiation",
    description: "Handle all negotiations to get you the best possible deal."
  },
  {
    title: "Documentation",
    description: "Take care of all legal paperwork and documentation process."
  },
  {
    title: "After-Sale Support",
    description: "Continue to support you even after the deal is completed."
  }
];

// Data for FAQs
const faqs = [
  {
    question: "Do you only provide services in mansehra?",
    answer: "Yes, we provide services in mansehra only."
    // answer: "No, we provide services in multiple cities across Pakistan including Karachi, Islamabad, and other major cities."
  },
  {
    question: "When is the commission paid?",
    answer: "Commission is paid only after the deal is successfully completed and all parties are satisfied."
  },
  {
    question: "Is there any fee for site visits?",
    answer: "Usually, site visits are free for our clients. In some cases where specialized surveys are needed, a nominal fee may apply which we'll discuss upfront."
  },
  {
    question: "How long does the property buying process take?",
    answer: "The timeline varies depending on the property type and documentation requirements. Typically it takes 2-6 weeks from initial search to completion."
  },
  {
    question: "Do you help with bank financing?",
    answer: "Yes, we have partnerships with major banks and can guide you through the financing process including mortgage applications."
  }
];