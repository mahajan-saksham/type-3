import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

interface FormData {
  name: string;
  contact: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

export function ContactAndAbout() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Phone or email is required';
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.contact) && 
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact)
    ) {
      newErrors.contact = 'Please enter a valid phone number or email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({ name: '', contact: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-dark to-dark-900 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{background: 'radial-gradient(circle at 15% 50%, rgba(204, 255, 0, 0.5) 0%, rgba(0, 0, 0, 0) 45%)'}} />
        <div className="absolute top-0 right-0 w-full h-full" style={{background: 'radial-gradient(circle at 85% 30%, rgba(0, 225, 255, 0.5) 0%, rgba(0, 0, 0, 0) 45%)'}} />
      </div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Us Block (Left Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex flex-col"
          >
            <div className="bg-gradient-to-b from-dark to-dark-900 rounded-xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 transition-all duration-300 p-6 md:p-8 h-full flex flex-col">
              <h2 className="text-3xl font-bold text-light mb-2">Contact Us</h2>
              <p className="text-light/60 text-lg mb-8">Ready to go solar? Let's talk.</p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-light/80">Phone</h3>
                    <p className="text-light/60">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mt-1">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-light/80">Email</h3>
                    <p className="text-light/60">hello@type3.energy</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-light/80">Address</h3>
                    <p className="text-light/60">6/3 South Harsiddhi, Opp. Garden, Indore, MP</p>
                    
                    {/* Google Maps iframe (desktop only) */}
                    <div className="hidden md:block mt-4 rounded-lg overflow-hidden border border-white/10 h-[200px]">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.2258240307995!2d75.8663!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b7c2b30b9%3A0xd5c9f5da7e0a8f1d!2sSouth%20Tukoganj%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mt-1">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-light/80">Hours</h3>
                    <p className="text-light/60">Mon–Sat, 10:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="mt-auto">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className={`w-full bg-dark-900/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-light/80 placeholder-light/40 focus:outline-none focus:border-primary/50 transition-colors`}
                        />
                      </div>
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          placeholder="Phone or Email"
                          className={`w-full bg-dark-900/50 border ${errors.contact ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-light/80 placeholder-light/40 focus:outline-none focus:border-primary/50 transition-colors`}
                        />
                      </div>
                      {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
                    </div>
                    
                    <div>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your Message"
                          rows={4}
                          className={`w-full bg-dark-900/50 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-light/80 placeholder-light/40 focus:outline-none focus:border-primary/50 transition-colors resize-none`}
                        />
                      </div>
                      {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-dark font-medium rounded-lg p-4 flex items-center justify-center transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          Send
                        </span>
                      )}
                    </button>
                    
                    {/* WhatsApp CTA */}
                    <div className="mt-4">
                      <a 
                        href="https://wa.me/919876543210" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-light/60 hover:text-primary transition-colors text-sm"
                      >
                        <svg className="h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Or connect on WhatsApp
                      </a>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-light mb-2">Message Sent!</h3>
                    <p className="text-light/60 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* About Us Block (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex flex-col"
          >
            <div className="bg-gradient-to-b from-dark to-dark-900 rounded-xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 transition-all duration-300 p-6 md:p-8 h-full flex flex-col">
              <h2 className="text-3xl font-bold text-light mb-2">About Type 3</h2>
              
              <div className="space-y-6 mt-6 flex-grow">
                <p className="text-light/80 leading-relaxed">
                  Type 3 is a rooftop solar company based in Indore, committed to making clean energy simple, accessible, and financially smart.
                </p>
                
                <p className="text-light/80 leading-relaxed">
                  We handle everything — from consultation to installation — using high-efficiency solar technology, transparent pricing, and expert execution.
                </p>
                
                <p className="text-light/80 leading-relaxed">
                  We believe solar isn't just a product, it's a step toward self-reliance.
                </p>
              </div>
              
              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-dark-900/50 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-primary text-3xl font-bold font-mono mb-1">500+</div>
                  <div className="text-light/60 text-sm">Installations</div>
                </div>
                
                <div className="bg-dark-900/50 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-primary text-3xl font-bold font-mono mb-1">5MW+</div>
                  <div className="text-light/60 text-sm">Capacity Installed</div>
                </div>
                
                <div className="bg-dark-900/50 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-primary text-3xl font-bold font-mono mb-1">98%</div>
                  <div className="text-light/60 text-sm">Customer Satisfaction</div>
                </div>
                
                <div className="bg-dark-900/50 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-primary text-3xl font-bold font-mono mb-1">10yr+</div>
                  <div className="text-light/60 text-sm">Industry Experience</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="mt-8">
                <a 
                  href="/products" 
                  className="block w-full bg-dark-900/50 hover:bg-dark-800/50 border border-white/10 hover:border-primary/20 text-light font-medium rounded-lg p-4 text-center transition-all duration-300"
                >
                  Explore Our Solar Solutions
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
