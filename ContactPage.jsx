import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  Mail, Phone, MapPin, Send, Award, Shield, Linkedin, Instagram, 
  Clock, MessageSquare, PhoneCall, Search, ChevronDown, ChevronUp,
  Building2, Globe2
} from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import OfficialLinks from '@/components/OfficialLinks';

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const faqData = [
  {
    question: "What's your rate for brand partnerships?",
    answer: "Rates vary based on project scope, duration, and deliverables. Please share your campaign details via info@movsummirzazada.com for a custom quote. I'm selective about partnerships that align with my artistic values."
  },
  {
    question: "Do you accept audition tapes?",
    answer: "Yes! I welcome casting submissions. Please include project details, character breakdown, shooting schedule, and production company information to contact@movsummirzazada.com. Priority given to projects with confirmed financing."
  },
  {
    question: "How can I book you for an event?",
    answer: "I'm available for film festivals, industry panels, masterclasses, and select corporate events. Please provide event details, date, location, and honorarium to contact@movsummirzazada.com."
  },
  {
    question: "What languages do you work in?",
    answer: "I'm fluent in Azerbaijani (native), English (fluent), Russian (fluent), and have working knowledge of Turkish and German. Open to projects in any of these languages."
  },
  {
    question: "Are you represented by an agent?",
    answer: "Yes, I work with professional representation. For casting and commercial inquiries, agent details will be provided upon serious project discussion through contact@movsummirzazada.com."
  },
  {
    question: "What's your typical response time?",
    answer: "Priority inquiries (casting, festivals, press with deadlines) receive responses within 24-48 hours. General inquiries within 3-5 business days. All messages are personally reviewed."
  },
  {
    question: "Which email should I use for my inquiry?",
    answer: "Use contact@movsummirzazada.com for general inquiries and casting. For partnerships/collaborations, use info@movsummirzazada.com. For financial/legal matters, use the respective dedicated emails listed on this page."
  },
  {
    question: "Do you work internationally?",
    answer: "Absolutely! I'm based in Dubai but work on international projects. I've filmed in Azerbaijan, Germany, UK, Georgia, and am open to projects worldwide. I handle travel logistics for confirmed productions."
  }
];

// ============================================================================
// COMPONENT: TrustBadges
// ============================================================================

const TrustBadges = () => {
  const badges = [
    { icon: Award, text: 'FIPRESCI Prize Winner' },
    { icon: Instagram, text: '119K Followers' },
    { icon: Linkedin, text: 'LinkedIn Verified' },
    { icon: Clock, text: '98% Response Rate' },
    { icon: Shield, text: 'Privacy Protected' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-[#13251E]/60 border border-[#E0A995]/10 rounded-full backdrop-blur-sm"
          >
            <Icon className="w-4 h-4 text-[#E0A995]" />
            <span className="text-xs text-[#A8B3AF]">{badge.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

// ============================================================================
// COMPONENT: LocationCard
// ============================================================================

const LocationCard = ({ country, flag, address, phone, email, isPrimary }) => {
  const handleWhatsApp = () => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent("Hi Mimo, I'm reaching out about...");
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass-card p-8 rounded-2xl border transition-all duration-300 hover:border-[#E0A995]/40 ${
        isPrimary ? 'border-[#E0A995]/30' : 'border-[#E0A995]/10'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{flag}</span>
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#EBE8E3]">{country}</h3>
            {isPrimary && (
              <span className="text-xs text-[#E0A995] font-medium">Primary Office</span>
            )}
          </div>
        </div>
        <Building2 className="w-6 h-6 text-[#E0A995]/50" />
      </div>

      {/* Address */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#E0A995]/10 rounded-full border border-[#E0A995]/30 flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#E0A995]" />
          </div>
          <div className="flex-grow">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A8B3AF]/60 mb-1">
              Office Address
            </p>
            <p className="text-[#EBE8E3] leading-relaxed">{address}</p>
          </div>
        </div>

        {/* Phone with Actions */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#E0A995]/10 rounded-full border border-[#E0A995]/30 flex-shrink-0">
            <Phone className="w-5 h-5 text-[#E0A995]" />
          </div>
          <div className="flex-grow">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A8B3AF]/60 mb-2">
              Phone Number
            </p>
            <a 
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="text-[#EBE8E3] hover:text-[#E0A995] transition-colors font-medium block mb-3"
            >
              {phone}
            </a>
            <div className="flex gap-2">
              <Button
                onClick={handleWhatsApp}
                size="sm"
                className="flex-1 bg-[#25D366] hover:bg-[#1EBE57] text-white border-0"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={handleCall}
                size="sm"
                variant="outline"
                className="flex-1 border-[#E0A995]/20 text-[#A8B3AF] hover:text-[#E0A995] hover:border-[#E0A995] hover:bg-[#E0A995]/10"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#E0A995]/10 rounded-full border border-[#E0A995]/30 flex-shrink-0">
            <Mail className="w-5 h-5 text-[#E0A995]" />
          </div>
          <div className="flex-grow">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A8B3AF]/60 mb-1">
              Email
            </p>
            <a 
              href={`mailto:${email}`}
              className="text-[#EBE8E3] hover:text-[#E0A995] transition-colors font-medium"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: EmailDirectory
// ============================================================================

const EmailDirectory = () => {
  const emailCategories = [
    {
      category: 'Personal',
      email: 'mirzezadehmovsum@gmail.com',
      description: 'Direct personal correspondence',
      icon: Mail,
      color: '#E0A995'
    },
    {
      category: 'General Inquiries',
      email: 'contact@movsummirzazada.com',
      description: 'All general questions and casting',
      icon: Globe2,
      color: '#D4AF37'
    },
    {
      category: 'Partnership & Collaboration',
      email: 'info@movsummirzazada.com',
      description: 'Brand deals and creative projects',
      icon: Building2,
      color: '#B8860B'
    },
    {
      category: 'Finance & Billing',
      email: 'finance@movsummirzazada.com',
      description: 'Invoicing and payment matters',
      icon: Mail,
      color: '#CD853F'
    },
    {
      category: 'Legal Cases',
      email: 'legal@movsummirzazada.com',
      description: 'Legal inquiries and contracts',
      icon: Shield,
      color: '#DDA15E'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-2xl border border-[#E0A995]/10"
    >
      <h3 className="text-2xl font-serif font-bold text-[#EBE8E3] mb-6">
        Email Directory
      </h3>
      <p className="text-[#A8B3AF] mb-8">
        Choose the appropriate email for your specific inquiry to ensure faster response times.
      </p>

      <div className="space-y-4">
        {emailCategories.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={index}
              href={`mailto:${item.email}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-[#E0A995]/10 bg-[#13251E]/30 hover:bg-[#13251E]/60 hover:border-[#E0A995]/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="p-3 bg-[#E0A995]/10 rounded-full border border-[#E0A995]/30 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 text-[#E0A995]" />
              </div>
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-[#EBE8E3] group-hover:text-[#E0A995] transition-colors">
                    {item.category}
                  </h4>
                  <span className="text-xs text-[#A8B3AF] opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to email
                  </span>
                </div>
                <p className="text-sm text-[#A8B3AF] mb-2">{item.description}</p>
                <p className="text-sm text-[#E0A995] font-mono">{item.email}</p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: ContactForm
// ============================================================================

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    toast({
      title: "✨ Message Sent Successfully!",
      description: "Thank you for reaching out. I'll respond within 24-48 hours.",
      duration: 5000,
    });

    // Reset form
    setFormData({ name: '', email: '', reason: '', message: '' });
    e.target.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-2xl border border-[#E0A995]/10"
    >
      <h3 className="text-2xl font-serif font-bold text-[#EBE8E3] mb-2">
        Send a Message
      </h3>
      <p className="text-[#A8B3AF] mb-8">
        Fill out the form below and I'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#E0A995] mb-2">
              Your Name *
            </label>
            <Input 
              placeholder="Full Name" 
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required 
              className="bg-[#13251E]/60 border-[#E0A995]/20 text-[#EBE8E3] placeholder:text-[#A8B3AF]/50 focus:border-[#E0A995] h-12" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#E0A995] mb-2">
              Email Address *
            </label>
            <Input 
              type="email" 
              placeholder="your@email.com" 
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required 
              className="bg-[#13251E]/60 border-[#E0A995]/20 text-[#EBE8E3] placeholder:text-[#A8B3AF]/50 focus:border-[#E0A995] h-12" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#E0A995] mb-2">
            Reason for Contact *
          </label>
          <Select 
            value={formData.reason}
            onValueChange={(value) => handleChange('reason', value)}
            required
          >
            <SelectTrigger className="w-full bg-[#13251E]/60 border-[#E0A995]/20 text-[#EBE8E3] focus:ring-[#E0A995] h-12">
              <SelectValue placeholder="Select reason for contact" />
            </SelectTrigger>
            <SelectContent className="bg-[#13251E] border-[#E0A995]/20 text-[#EBE8E3]">
              <SelectItem value="acting" className="focus:bg-[#E0A995] focus:text-[#0A1612] cursor-pointer">
                Acting/Casting Inquiry
              </SelectItem>
              <SelectItem value="business" className="focus:bg-[#E0A995] focus:text-[#0A1612] cursor-pointer">
                Business/Brand Collaboration
              </SelectItem>
              <SelectItem value="media" className="focus:bg-[#E0A995] focus:text-[#0A1612] cursor-pointer">
                Media/Press Request
              </SelectItem>
              <SelectItem value="general" className="focus:bg-[#E0A995] focus:text-[#0A1612] cursor-pointer">
                General Message
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#E0A995] mb-2">
            Your Message *
          </label>
          <Textarea 
            placeholder="Tell me about your project or inquiry..." 
            rows={6} 
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            required 
            className="bg-[#13251E]/60 border-[#E0A995]/20 text-[#EBE8E3] placeholder:text-[#A8B3AF]/50 focus:border-[#E0A995] resize-none" 
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#E0A995] hover:bg-[#D49A89] text-[#0A1612] font-semibold py-6 text-base shadow-lg shadow-[#E0A995]/20 transition-all"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>

        {/* Privacy Notice */}
        <div className="flex items-start gap-3 p-4 bg-[#E0A995]/5 border border-[#E0A995]/20 rounded-lg">
          <Shield className="w-5 h-5 text-[#E0A995] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#A8B3AF] leading-relaxed">
            Your information is secure and will only be used to respond to your inquiry. 
            I respect your privacy and never share contact details with third parties.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: TestimonialQuote
// ============================================================================

const TestimonialQuote = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-12 rounded-2xl border border-[#E0A995]/20 text-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0A995]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="text-[#E0A995] text-6xl font-serif leading-none mb-6">"</div>
        <p className="text-xl md:text-2xl font-serif text-[#EBE8E3] leading-relaxed italic mb-8">
          His performance conveys a yearning for rebellion beneath a surface of routine, making him a powerful presence.
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px bg-[#E0A995]/20 w-12" />
          <div>
            <p className="font-semibold text-[#E0A995] mb-1">IFFR Rotterdam</p>
            <p className="text-sm text-[#A8B3AF]">Festival Review</p>
          </div>
          <div className="h-px bg-[#E0A995]/20 w-12" />
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: FAQSection
// ============================================================================

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-2xl border border-[#E0A995]/10"
    >
      <h3 className="text-2xl font-serif font-bold text-[#EBE8E3] mb-2">
        Frequently Asked Questions
      </h3>
      <p className="text-[#A8B3AF] mb-6">
        Find quick answers to common inquiries
      </p>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8B3AF]" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#13251E]/60 border border-[#E0A995]/20 rounded-xl py-3 pl-10 pr-4 text-[#EBE8E3] placeholder:text-[#A8B3AF]/50 focus:outline-none focus:border-[#E0A995] focus:ring-1 focus:ring-[#E0A995] transition-all"
        />
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredFAQs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#E0A995]/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#E0A995]/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left bg-[#13251E]/30 hover:bg-[#13251E]/50 transition-colors"
            >
              <span className="font-medium text-[#EBE8E3] pr-4">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#E0A995] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#E0A995] flex-shrink-0" />
                )}
              </motion.div>
            </button>
            
            <motion.div
              initial={false}
              animate={{ 
                height: openIndex === index ? 'auto' : 0,
                opacity: openIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 bg-[#0A1612]/30 text-[#A8B3AF] leading-relaxed border-t border-[#E0A995]/10">
                {faq.answer}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#A8B3AF]">
            No questions match your search. Try different keywords.
          </p>
        </div>
      )}
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT: ContactPage
// ============================================================================

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Movsum Mirzazada 'Mimo'</title>
        <meta name="description" content="Get in touch with Movsum Mirzazada. Offices in Dubai, UAE and Baku, Azerbaijan. Multiple contact options for casting, partnerships, press, and general inquiries." />
        <meta name="keywords" content="contact Movsum Mirzazada, Dubai office, Azerbaijan office, actor contact, casting inquiry" />
      </Helmet>
      
      <div className="bg-[#0A1612] text-[#EBE8E3] min-h-screen relative overflow-hidden">
        <GradientBackground />
        
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 px-8 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#EBE8E3] mb-4">
              Let's Create <span className="text-[#E0A995]">Together</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[#A8B3AF] max-w-3xl mx-auto leading-relaxed">
              Whether you're a casting director, journalist, brand, or creative collaborator—I'm here to connect.
            </p>
            
            {/* Trust Badges */}
            <TrustBadges />
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-8 z-10 relative">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Two-Location System */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#EBE8E3] mb-4">
                  Office <span className="text-[#E0A995]">Locations</span>
                </h2>
                <p className="text-[#A8B3AF] max-w-2xl mx-auto">
                  Connect with me through our offices in Dubai and Baku
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <LocationCard
                  country="United Arab Emirates"
                  flag="🇦🇪"
                  address="Paramount Tower, Business Bay, Dubai, UAE"
                  phone="+971 (58) 592 9669"
                  email="uae@movsummirzazada.com"
                  isPrimary={true}
                />
                <LocationCard
                  country="Azerbaijan"
                  flag="🇦🇿"
                  address="Alibeyov Brothers Street 97, Bailov, Baku"
                  phone="+994 (55) 263 9892"
                  email="aze@movsummirzazada.com"
                  isPrimary={false}
                />
              </div>
            </div>

            {/* Email Directory */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#EBE8E3] mb-4">
                  Contact by <span className="text-[#E0A995]">Department</span>
                </h2>
                <p className="text-[#A8B3AF] max-w-2xl mx-auto">
                  Reach the right team directly for faster assistance
                </p>
              </motion.div>

              <EmailDirectory />
            </div>

            {/* Contact Form and Testimonial */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div className="lg:col-span-1 flex flex-col gap-8">
                <TestimonialQuote />
                
                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-[#E0A995]/10"
                >
                  <h4 className="text-lg font-serif font-bold text-[#EBE8E3] mb-4">
                    Response Time
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#A8B3AF]">Casting Inquiries</span>
                      <span className="text-sm font-semibold text-[#E0A995]">24-48h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#A8B3AF]">Press/Media</span>
                      <span className="text-sm font-semibold text-[#E0A995]">24-48h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#A8B3AF]">General Inquiries</span>
                      <span className="text-sm font-semibold text-[#E0A995]">3-5 days</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#EBE8E3] mb-4">
                  Questions & <span className="text-[#E0A995]">Answers</span>
                </h2>
                <p className="text-[#A8B3AF] max-w-2xl mx-auto">
                  Common questions about working together
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <FAQSection />
              </div>
            </div>

             {/* Official Links Section */}
             <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12 pt-16 border-t border-[#E0A995]/10"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#EBE8E3] mb-4">
                  Official <span className="text-[#E0A995]">Social Channels</span>
                </h2>
                <p className="text-[#A8B3AF] max-w-2xl mx-auto">
                  Follow me on these platforms for more updates
                </p>
              </motion.div>

              <OfficialLinks />
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;