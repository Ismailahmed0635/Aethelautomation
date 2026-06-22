"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Bot,
  Workflow,
  Target,
  Share2,
  Cog,
  BarChart3,
  Menu,
  X,
  ArrowRight,
  Star,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  Sparkles,
  Users,
  TrendingUp,
  Clock,
  Quote,
  CheckCircle2,
  Zap,
} from "lucide-react";

// Custom inline SVG icons for brands to ensure 100% build compatibility
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);


/* ═══════════════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const HERO_STATS = [
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: TrendingUp, value: "10x", label: "Avg. ROI" },
  { icon: Clock, value: "24/7", label: "AI Uptime" },
];

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "MediCare AI Assistant",
    description:
      "Built an intelligent healthcare chatbot that handles 80% of patient inquiries automatically — from appointment scheduling to medical consultations and follow-up reminders.",
    image: "/images/portfolio/shopease.png",
    metric: "Appts +320%",
    metricColor: "bg-green-400",
    tags: ["AI Chatbot", "Healthcare", "NLP"],
  },
  {
    id: 2,
    title: "PropConnect CRM",
    description:
      "Automated the entire real estate lead pipeline — from capture to scoring to follow-up. Agents now close deals 3x faster with zero manual data entry.",
    image: "/images/portfolio/propconnect.png",
    metric: "Leads +250%",
    metricColor: "bg-aethel-orange",
    tags: ["CRM", "Real Estate", "Automation"],
  },
  {
    id: 3,
    title: "FoodFlow Automation",
    description:
      "End-to-end automation for a restaurant chain — social media scheduling, order management, and customer engagement all running on autopilot.",
    image: "/images/portfolio/foodflow.png",
    metric: "Revenue +180%",
    metricColor: "bg-aethel-amber",
    tags: ["Social Media", "F&B", "Workflow"],
  },
];

const SERVICES = [
  {
    icon: Bot,
    title: "AI Chatbot Development",
    description:
      "Custom-trained chatbots that understand your customers, answer instantly, and convert visitors into buyers — 24/7, no coffee breaks.",
    accent: "bg-aethel-orange",
  },
  {
    icon: Workflow,
    title: "CRM & Sales Automation",
    description:
      "Automate your sales pipeline from lead capture to close. No more lost leads, forgotten follow-ups, or spreadsheet chaos.",
    accent: "bg-blue-400",
  },
  {
    icon: Target,
    title: "Lead Generation Systems",
    description:
      "AI-powered lead magnets, landing pages, and nurture sequences that fill your calendar with qualified prospects on autopilot.",
    accent: "bg-green-400",
  },
  {
    icon: Share2,
    title: "Social Media Automation",
    description:
      "Schedule, publish, and engage across all platforms automatically. Your brand stays active even when you're offline.",
    accent: "bg-pink-400",
  },
  {
    icon: Cog,
    title: "Workflow Optimization",
    description:
      "We audit your business processes, eliminate bottlenecks, and connect your tools into a seamless automated workflow.",
    accent: "bg-purple-400",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Insights",
    description:
      "Turn raw data into actionable dashboards. Know exactly what's working, what's not, and where to double down.",
    accent: "bg-yellow-400",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Ismail Ahmed",
    role: "Agent Builder",
    image: "/images/team/ismail.jpeg",
    bio: "Expert in designing and orchestrating autonomous AI agents that handle complex enterprise workflows, customer support, and sales automation.",
    social: {
      facebook: "https://www.facebook.com/mdismailahmedmd",
      instagram: "https://www.instagram.com/md_ismail_l?igsh=MWdkZmJmZ2R1eDZreg==",
      linkedin: "https://www.linkedin.com/in/ismail-ahmed-442374393?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },
  {
    name: "Muhammad Samin",
    role: "Secondary Agent Builder",
    image: "/images/team/samin.png",
    bio: "Specialist in prompt engineering, integration architectures, and fine-tuning AI agents to execute specific workflow operations with high precision.",
    social: {
      facebook: "https://www.facebook.com/share/1D8PvRKPtU/",
      instagram: "https://www.instagram.com/saminidae_?igsh=Nnc2cXQ0bXBkOW1n",
      linkedin: "https://www.linkedin.com/in/muhammad-samin-0527bb3b6?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },
  {
    name: "Pritom Dev Nath",
    role: "Client Relationship & Sales Representative",
    image: "/images/team/pritom.jpeg",
    bio: "Dedicated advisor ensuring clients find the perfect AI solution, facilitating seamless onboarding and managing long-term partnerships.",
    social: {
      facebook: "https://www.facebook.com/share/1ECFsEfBc6/",
      instagram: "https://www.instagram.com/binary_devil?igsh=MThnbWVtOGk3NHNhNQ==",
      linkedin: "https://www.linkedin.com/in/pritomdebnath?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    company: "NovaBuy E-Commerce",
    avatar: "SK",
    rating: 5,
    text: "Aethel's chatbot reduced our support tickets by 72% in the first month. Our customers love the instant responses, and our team finally has time to focus on growth.",
  },
  {
    name: "Rafiq M.",
    company: "HomeBase Realty",
    avatar: "RM",
    rating: 5,
    text: "The CRM automation they built completely transformed our sales process. We went from losing 40% of leads to closing 3x more deals. Absolute game-changer.",
  },
  {
    name: "Taniya R.",
    company: "UrbanBites Restaurant",
    avatar: "TR",
    rating: 5,
    text: "We were drowning in manual tasks — social media, orders, follow-ups. Aethel automated everything. Now our revenue is up 180% and I actually sleep at night.",
  },
];

const FAQ_ITEMS = [
  {
    question: "What exactly does Aethel do?",
    answer:
      "We build custom AI and automation systems for businesses — including chatbots, CRM pipelines, social media automation, and workflow optimization. Think of us as your tech team that makes your business run smarter, faster, and 24/7.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects are delivered within 2-4 weeks, depending on complexity. A simple chatbot can be live in 5-7 days, while a full CRM automation suite takes around 3-4 weeks. We always provide a clear timeline upfront.",
  },
  {
    question: "Do I need technical knowledge to use your systems?",
    answer:
      "Absolutely not. We build everything with simplicity in mind. You'll get a dashboard you can manage with zero coding. Plus, we provide full training and ongoing support so you're never stuck.",
  },
  {
    question: "What's the pricing like?",
    answer:
      "Every business is different, so we offer custom quotes based on your needs. We start with a free strategy call to understand your goals, then provide a transparent proposal — no hidden fees, no surprises. Most clients see ROI within the first month.",
  },
  {
    question: "Can you work with my existing tools (e.g., WhatsApp, Shopify, HubSpot)?",
    answer:
      "Yes! We integrate with 200+ tools including WhatsApp, Facebook Messenger, Shopify, WooCommerce, HubSpot, Salesforce, Google Sheets, Slack, and more. If you use it, we can probably connect it.",
  },
  {
    question: "What happens after the project is delivered?",
    answer:
      "We don't disappear after launch. Every project includes 30 days of free support. After that, we offer affordable monthly maintenance plans to keep your systems updated, optimized, and running smoothly.",
  },
];

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════ */

function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hover on interactive elements
    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Attach hover listeners to interactive elements
    const interactives = document.querySelectorAll(
      'a, button, input, textarea, [role="button"], .cursor-hover'
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999]"
      style={{ mixBlendMode: "difference" }}
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════ */

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-aethel-off-white/90 backdrop-blur-xl border-b-3 border-aethel-black shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 cursor-hover"
          >
            <span className="font-heading font-extrabold text-2xl text-aethel-black">
              Ae<span className="text-aethel-orange">thel</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="neo-btn-ghost text-sm"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("#contact")}
              className="neo-btn-primary text-sm hidden sm:inline-flex"
            >
              <Sparkles className="w-4 h-4" />
              Contact Us
            </motion.button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden neo-btn-secondary p-2.5"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t-3 border-aethel-black bg-aethel-off-white"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="neo-btn-ghost text-left w-full justify-start"
                >
                  {link.label}
                </button>
              ))}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("#contact")}
                className="neo-btn-primary w-full mt-2"
              >
                <Sparkles className="w-4 h-4" />
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════ */

function HeroSection() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 border-3 border-aethel-orange/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 -left-40 w-96 h-96 border-3 border-aethel-amber/15 rounded-full"
        />
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-aethel-orange rounded-full opacity-40 animate-float-slow" />
        <div className="absolute top-40 left-1/4 w-4 h-4 bg-aethel-amber rounded-full opacity-30 animate-float-slow [animation-delay:1s]" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-green-400 rounded-full opacity-30 animate-float-slow [animation-delay:2s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} custom={0} className="mb-6">
              <span className="neo-badge text-aethel-orange">
                <Zap className="w-4 h-4" />
                AI-Powered Automation Agency
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="section-heading mb-3"
            >
              We Build{" "}
              <span className="relative inline-block">
                <span className="relative z-10">AI Systems</span>
                <span className="absolute bottom-1 left-0 right-0 h-4 bg-aethel-orange/25 -skew-x-3 z-0" />
              </span>{" "}
              That Sell While You Sleep
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="section-subheading mx-auto lg:mx-0 mb-8"
            >
              Chatbots that convert. CRMs that close. Workflows that never
              sleep. We automate your business so you can focus on what matters.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo("#contact")}
                className="neo-btn-primary text-lg px-8 py-4"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo("#portfolio")}
                className="neo-btn-secondary text-lg px-8 py-4"
              >
                See Our Work
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — Stats cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 items-center lg:items-end"
          >
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                custom={i + 2}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className={`neo-card px-8 py-6 flex items-center gap-5 w-full max-w-sm ${
                  i === 1 ? "lg:mr-12" : i === 2 ? "lg:mr-6" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-aethel-orange/10 border-3 border-aethel-black flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-7 h-7 text-aethel-orange" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-3xl text-aethel-black">
                    {stat.value}
                  </div>
                  <div className="font-body text-sm text-gray-500">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PORTFOLIO SECTION
   ═══════════════════════════════════════════════════ */

function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="neo-badge text-aethel-orange mb-4 inline-flex"
          >
            <Sparkles className="w-4 h-4" />
            Our Work
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="section-heading mb-3">
            Projects That Speak{" "}
            <span className="text-aethel-orange">Results</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="section-subheading mx-auto"
          >
            Real businesses. Real automation. Real growth. Here's what happens
            when you let AI handle the heavy lifting.
          </motion.p>
        </motion.div>

        {/* Portfolio grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            /* Outer wrapper — relative, NO overflow-hidden, so badge can overflow */
            <motion.div
              key={item.id}
              variants={fadeInUp}
              custom={i}
              className="relative"
            >
              {/* Floating metric badge — sibling to card, NOT inside overflow-hidden */}
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                whileInView={{ scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.4 + i * 0.15,
                }}
                className={`absolute -top-4 -right-3 z-20 ${item.metricColor} neo-badge text-aethel-black font-extrabold text-sm`}
              >
                <TrendingUp className="w-4 h-4" />
                {item.metric}
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="neo-card neo-card-lift overflow-hidden h-full flex flex-col"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden border-b-3 border-aethel-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-xl mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-heading font-semibold bg-aethel-off-white border-2 border-aethel-black rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════════════ */

function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-aethel-black relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 border-3 border-aethel-orange/10 rounded-full" />
        <div className="absolute bottom-20 left-20 w-48 h-48 border-3 border-aethel-orange/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="neo-badge text-aethel-orange mb-4 inline-flex"
          >
            <Cog className="w-4 h-4" />
            What We Do
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="section-heading text-white mb-3"
          >
            Services That{" "}
            <span className="text-aethel-orange">Automate Growth</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="section-subheading text-gray-400 mx-auto"
          >
            From intelligent chatbots to full-stack CRM automation — we build
            the systems that let your business run on autopilot.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="neo-card p-7 relative overflow-hidden group"
            >
              {/* Accent strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${service.accent}`}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl ${service.accent}/15 border-3 border-aethel-black flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <service.icon className="w-7 h-7 text-aethel-black" />
              </div>

              <h3 className="font-heading font-bold text-lg mb-1">
                {service.title}
              </h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TEAM SECTION
   ═══════════════════════════════════════════════════ */

function TeamSection() {
  return (
    <section id="team" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="neo-badge text-aethel-orange mb-4 inline-flex"
          >
            <Users className="w-4 h-4" />
            The Team
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="section-heading mb-3"
          >
            Meet the <span className="text-aethel-orange">Minds</span> Behind
            Aethel
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="section-subheading mx-auto"
          >
            A small, focused team of builders who eat, sleep, and breathe
            automation. We're not a faceless agency — we're your partners in
            growth.
          </motion.p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -8 }}
              className="neo-card neo-card-lift p-6 text-center"
            >
              {/* Photo */}
              <div className="w-36 h-36 mx-auto mb-5 relative">
                <div className="w-full h-full rounded-2xl border-3 border-aethel-black shadow-brutal-sm overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative dot */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-aethel-orange rounded-full border-3 border-aethel-black" />
              </div>

              <h3 className="font-heading font-bold text-xl mb-0.5">
                {member.name}
              </h3>
              <p className="font-heading font-semibold text-aethel-orange text-sm mb-3">
                {member.role}
              </p>
              <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">
                {member.bio}
              </p>

              {/* Social Media Icons */}
              <div className="flex justify-center gap-3">
                <a
                  href={member.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-aethel-off-white border-2 border-aethel-black flex items-center justify-center hover:bg-aethel-orange hover:border-aethel-orange transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 text-aethel-black" />
                </a>
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-aethel-off-white border-2 border-aethel-black flex items-center justify-center hover:bg-aethel-orange hover:border-aethel-orange transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-aethel-black" />
                </a>
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-aethel-off-white border-2 border-aethel-black flex items-center justify-center hover:bg-aethel-orange hover:border-aethel-orange transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4 text-aethel-black" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TESTIMONIALS SECTION
   ═══════════════════════════════════════════════════ */

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-aethel-orange relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border-3 border-white/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-3 border-white/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="neo-badge bg-white text-aethel-orange mb-4 inline-flex"
          >
            <Star className="w-4 h-4" />
            Testimonials
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="section-heading text-white mb-3"
          >
            What Our Clients Say
          </motion.h2>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
              className="neo-card p-7 relative"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-aethel-orange/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, si) => (
                  <Star
                    key={si}
                    className="w-5 h-5 fill-aethel-amber text-aethel-amber"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-body text-gray-700 text-sm leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-100">
                <div className="w-11 h-11 rounded-xl bg-aethel-orange border-3 border-aethel-black flex items-center justify-center font-heading font-bold text-white text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-heading font-bold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="font-body text-xs text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ SECTION
   ═══════════════════════════════════════════════════ */

function FaqItem({ item, isOpen, toggle }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="neo-card overflow-hidden"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-6 text-left gap-4 cursor-hover"
      >
        <div>
          <h3 className="font-heading font-bold text-base md:text-lg">
            {item.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-aethel-orange/10 border-2 border-aethel-black flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6 pt-0">
              <div className="w-full h-0.5 bg-gray-100 mb-4" />
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="neo-badge text-aethel-orange mb-4 inline-flex"
          >
            <CheckCircle2 className="w-4 h-4" />
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="section-heading mb-3"
          >
            Got <span className="text-aethel-orange">Questions?</span>
          </motion.h2>
        </motion.div>

        {/* FAQ items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-4"
        >
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════ */

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyBBAGwUa7dWbpnK81F6XFTxf1nag864lWokvCzhoHwd86iEkQ8ovFrWk6X7M3ADC0r/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 4000);
      console.error("Error submitting form:", err);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-aethel-black relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 border-3 border-aethel-orange/10 rounded-full" />
        <div className="absolute bottom-20 left-10 w-24 h-24 border-3 border-aethel-orange/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="neo-badge text-aethel-orange mb-4 inline-flex"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="section-heading text-white mb-3"
          >
            Let's <span className="text-aethel-orange">Automate</span> Your
            Business
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="section-subheading text-gray-400 mx-auto"
          >
            Ready to stop doing everything manually? Book a free strategy call
            and let's explore how AI can transform your business.
          </motion.p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — Contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-6"
          >
            {/* Info cards */}
            {[
              {
                icon: Mail,
                label: "Email Us",
                value: "aethelautomation@gmail.com",
                accent: "bg-aethel-orange",
              },
              {
                icon: Phone,
                label: "Call Us",
                value: "01339563649",
                accent: "bg-green-400",
              },
              {
                icon: MapPin,
                label: "Find Us",
                value: "Dhaka, Bangladesh",
                accent: "bg-blue-400",
              },
            ].map((info, i) => (
              <motion.div
                key={info.label}
                variants={fadeInLeft}
                custom={i}
                className="neo-card p-5 flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${info.accent} border-3 border-aethel-black flex items-center justify-center flex-shrink-0`}
                >
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-body text-xs text-gray-500 uppercase tracking-wide">
                    {info.label}
                  </div>
                  <div className="font-heading font-bold text-base">
                    {info.value}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div variants={fadeInLeft} custom={3}>
              <p className="font-heading font-bold text-white mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FacebookIcon, label: "Facebook" },
                  { icon: LinkedinIcon, label: "LinkedIn" },
                  { icon: InstagramIcon, label: "Instagram" },
                  { icon: TwitterIcon, label: "Twitter" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 neo-card flex items-center justify-center rounded-xl cursor-hover"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-aethel-orange" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <form
              onSubmit={handleSubmit}
              className="neo-card p-8 flex flex-col gap-5"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-heading font-semibold text-sm mb-1.5 block"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ismail Ahmed"
                  required
                  className="neo-input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-heading font-semibold text-sm mb-1.5 block"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className="neo-input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="font-heading font-semibold text-sm mb-1.5 block"
                >
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1XXX-XXXXXX"
                  className="neo-input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-heading font-semibold text-sm mb-1.5 block"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or what you'd like to automate..."
                  rows={4}
                  required
                  className="neo-input resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="neo-btn-primary w-full text-base py-4 mt-2"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : error ? (
                  <>
                    Error! Try Again
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center font-body text-green-600 text-sm"
                  >
                    ✨ Thanks! We'll get back to you within 24 hours.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-aethel-black border-t-3 border-aethel-orange/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpeg"
                alt="Aethel Logo"
                className="w-10 h-10 rounded-lg border-2 border-aethel-orange"
              />
              <span className="font-heading font-extrabold text-2xl text-white">
                Ae<span className="text-aethel-orange">thel</span>
              </span>
            </div>
            <p className="font-body text-gray-500 text-sm leading-relaxed mb-1">
              Understand. Connect. Automate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-gray-500 text-sm hover:text-aethel-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.title}>
                  <span className="font-body text-gray-500 text-sm">
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">
              Contact
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-center gap-2 text-gray-500 text-sm font-body">
                <Mail className="w-4 h-4 text-aethel-orange" />
                aethelautomation@gmail.com
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm font-body">
                <Phone className="w-4 h-4 text-aethel-orange" />
                01339563649
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm font-body">
                <MapPin className="w-4 h-4 text-aethel-orange" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-gray-600 text-xs">
            © {new Date().getFullYear()} Aethel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   FLOATING MOBILE CTA
   ═══════════════════════════════════════════════════ */

function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToContact}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-aethel-orange border-3 border-aethel-black rounded-2xl shadow-brutal flex items-center justify-center sm:hidden"
          aria-label="Contact Us"
        >
          <Send className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════════════ */

export default function App() {
  return (
    <div className="cursor-none min-h-screen bg-aethel-off-white">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ServicesSection />
        <TeamSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
