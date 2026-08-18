import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaInstagram,
  FaTiktok,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaCamera,
  FaHeart,
  FaReply,
  FaTrash,
  FaCog,
  FaThumbtack,
  FaLinkedin
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

import { supabase } from '../lib/supabase';

const Contact = () => {
  // States untuk contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);



  // Handle contact form
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    try {
      // Save message to Supabase
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: contactForm.name,
            email: contactForm.email,
            message: contactForm.message,
            status: 'unread'
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Message saved to database:', data);

      alert('Message sent successfully! Thank you for reaching out. 📧');
      setContactForm({ name: '', email: '', message: '' });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert(`Failed to send message: ${error.message}. Please try again later.`);
    } finally {
      setIsSubmittingContact(false);
    }
  };




  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/ayanmujawar2904',
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'hover:shadow-gray-500/25'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com/ayanmujawar',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:shadow-pink-500/25'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/ayanmujawar',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:shadow-blue-500/25'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 pb-32 relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-portfolio-gold/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-portfolio-gold-dark/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-portfolio-secondary/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-moderniz mb-4">
            <span className="dark:bg-gradient-to-r from-portfolio-gold via-portfolio-gold-light to-portfolio-gold-dark dark:bg-clip-text dark:text-transparent text-portfolio-gold">
              GET IN
            </span>
            {' '}
            <span className="dark:text-portfolio-text">TOUCH</span>
          </h2>
          <p className="text-xl dark:text-portfolio-secondary font-cascadia">
            Let's collaborate and build something amazing!
          </p>


        </motion.div>

        <div className="flex justify-center w-full">
          {/* Contact Form & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-6xl"
          >
            {/* Contact Form Panel */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-portfolio-gold to-portfolio-gold-dark rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block"></div>
              <div className="relative bg-portfolio-surface/80 bg-portfolio-surface backdrop-blur-xl rounded-3xl p-8 border border-portfolio-border dark:shadow-none shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 dark:bg-gradient-to-r from-portfolio-gold to-portfolio-gold-dark bg-portfolio-gold rounded-full">
                    <FaPaperPlane className="text-portfolio-text text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold dark:text-portfolio-text">Contact Me</h3>
                    <p className="dark:text-portfolio-secondary">Have something to discuss? Send me a message!</p>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="group">
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 dark:text-portfolio-secondary group-focus-within:text-portfolio-gold dark:group-focus-within:text-portfolio-gold-light transition-colors duration-300" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-12 pr-4 py-4 bg-portfolio-gold/10 border border-portfolio-gold/30 rounded-xl text-portfolio-text dark:placeholder-slate-400 placeholder-slate-400 focus:border-portfolio-gold focus:ring-2 focus:ring-portfolio-gold/40 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 dark:text-portfolio-secondary group-focus-within:text-portfolio-gold transition-colors duration-300" />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-12 pr-4 py-4 bg-portfolio-gold/10 border border-portfolio-gold/30 rounded-xl text-portfolio-text dark:placeholder-slate-400 placeholder-slate-500 focus:border-portfolio-gold focus:ring-2 focus:ring-portfolio-gold/40 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <FaComment className="absolute left-4 top-6 dark:text-portfolio-secondary group-focus-within:text-portfolio-gold transition-colors duration-300" />
                      <textarea
                        placeholder="Your Message"
                        rows="4"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full pl-12 pr-4 py-4 bg-portfolio-gold/10 border border-portfolio-gold/30 rounded-xl text-portfolio-text dark:placeholder-slate-400 placeholder-slate-500 focus:border-portfolio-gold focus:ring-2 focus:ring-portfolio-gold/40 transition-all duration-300 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmittingContact}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full dark:bg-gradient-to-r from-portfolio-gold to-portfolio-gold-dark hover:from-portfolio-gold-light hover:to-portfolio-gold bg-portfolio-gold hover:bg-portfolio-gold-light text-portfolio-bg font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-portfolio-gold/25 disabled:opacity-50"
                  >
                    {isSubmittingContact ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Divider (Mobile Only) */}
            <div className="flex lg:hidden items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              <span className="text-portfolio-secondary font-semibold">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>

            {/* Social Media Panel */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-portfolio-gold to-portfolio-gold-dark rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block"></div>
              <div className="relative bg-portfolio-surface/80 bg-portfolio-surface backdrop-blur-xl rounded-3xl p-8 border border-portfolio-border shadow-lg dark:shadow-none">
                <h3 className="text-2xl font-bold dark:text-portfolio-text mb-6 text-center">Connect With Me</h3>
                <div className="grid gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`group flex items-center gap-4 p-4 bg-gradient-to-r ${social.color} rounded-xl text-portfolio-text transition-all duration-300 ${social.hoverColor} hover:shadow-xl`}
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold">{social.name}</span>
                        <p className="text-sm opacity-90">Follow me on {social.name}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaReply className="rotate-180" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;