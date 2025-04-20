import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ContactAndAbout } from '../components/ContactAndAbout';
import { 
  Rocket, 
  Globe2, 
  Sun, 
  MapPin,
  Mail,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero section
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    // Animate mission keywords
    const keywords = gsap.utils.toArray('.mission-keyword');
    keywords.forEach((keyword) => {
      gsap.to(keyword, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: keyword,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Make founder cards visible immediately
    const cards = gsap.utils.toArray('.founder-card');
    cards.forEach((card) => {
      gsap.set(card, {
        opacity: 1,
        x: 0
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-dark" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.2
            }}
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-light mb-8">
              We're building energy for a{' '}
              <TypeAnimation
                sequence={[
                  'Type 3 civilization.',
                  2000,
                  'sustainable future.',
                  2000,
                  'better tomorrow.',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-primary"
                repeat={Infinity}
              />
            </h1>
            <p className="text-xl text-light/80 mb-12 max-w-2xl mx-auto">
              Kardashev imagined a future where civilizations control the energy of entire galaxies.
              We're starting with rooftops in Indore.
            </p>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowRight className="h-8 w-8 text-primary rotate-90" />
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-dark-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">
              Our mission is to make clean energy{' '}
              <span className="mission-keyword inline-block opacity-0 translate-y-4 text-primary">accessible</span>,{' '}
              <span className="mission-keyword inline-block opacity-0 translate-y-4 text-primary">investable</span>, and{' '}
              <span className="mission-keyword inline-block opacity-0 translate-y-4 text-primary">intelligent</span>.
            </h2>
            <p className="text-xl text-light/60">
              We believe everyone should be able to own a piece of the sun — whether through rooftop installations or wattage credits.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <Card 
              variant="glass" 
              padding="lg"
              className="founder-card group backdrop-blur-xl"
              style={{ opacity: 1, transform: 'translateX(0)' }}
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Saksham Mahajan"
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-light mb-2">Saksham Mahajan</h3>
              <p className="text-primary mb-4">Strategy & Product</p>
              <p className="text-light/60">
                A design-thinker and systems entrepreneur obsessed with making the sustainable path the easiest path.
              </p>
            </Card>

            <Card 
              variant="glass" 
              padding="lg"
              className="founder-card group backdrop-blur-xl"
              style={{ opacity: 1, transform: 'translateX(0)' }}
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Manoj Mahajan"
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-light mb-2">Manoj Mahajan</h3>
              <p className="text-primary mb-4">Engineering & Infrastructure</p>
              <p className="text-light/60">
                A veteran in electrical engineering with 20+ years in industrial energy systems, now focused on building the solar backbone of India.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section ref={storyRef} className="py-24 bg-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-12 text-center">Our Origin Story</h2>
            <div className="space-y-8 text-xl text-light/80">
              <p>
                It started with a conversation about the Kardashev scale — and a realization:
                the only way humanity reaches that future is if clean energy becomes the baseline.
              </p>
              <p>
                We looked around — and began in Indore, where over 13,800 rooftops are already solarizing the city.
                Type 3 was born to scale that effort — fast, accessible, and profitable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-24 bg-dark-100 relative">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80"
            alt="Aerial view of solar panels"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-100 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-light mb-4 flex items-center justify-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Our Office in Indore
              </h2>
              <p className="text-light/60">6/3 South Harsiddhi, Opp. Garden, Indore, MP</p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.3631073318185!2d75.8662!3d22.7154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQyJzU1LjQiTiA3NcKwNTEnNTguMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="text-center">
              <a 
                href="https://goo.gl/maps/YOUR-LOCATION-LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
              >
                Get Directions
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-12">
            We're building the future of solar.<br />
            Let's build it together.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              to="/services"
              variant="secondary"
              size="lg"
            >
              Explore Services
            </Button>
            <Button 
              to="/contact"
              variant="ghost"
              size="lg"
              className="!border-dark !text-dark hover:!bg-dark hover:!text-light"
            >
              Join the Team
            </Button>
            <Button 
              to="/contact"
              variant="ghost"
              size="lg"
              className="!border-dark !text-dark hover:!bg-dark hover:!text-light"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Contact and About Section */}
      <ContactAndAbout />
    </div>
  );
}

export default About;