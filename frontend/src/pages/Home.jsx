import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import RotatingText from '../components/RotatingText.jsx';
import ContactSection from '../components/ContactSection.jsx';


import {
  Zap, Server, Database, LayoutGrid, Cloud, Cpu, Code, GitBranch, Menu, X, Anchor,
  ArrowDown, Globe, Laptop, Users, Lock
} from "lucide-react";


const FaReact = Zap;
const SiNodedotjs = Server;
const SiMongodb = Database;
const SiTailwindcss = LayoutGrid;
const SiAmazonaws = Cloud;
const FaCode = Code;
const FaPython = Cpu;
const FaAnchor = Anchor;
const FaGithub = GitBranch;
const FaLinkedin = Users;
const FaEnvelope = Globe;





// --- GLOBAL DATA & VARIANTS ---

// Education Data
const educationData = [
  {
    title: "B.Tech in CSE",
    org: "S.B. JAIN INSTITUTE OF TECHNOLOGY MANAGEMENT & RESEARCH",
    year: "2022 - Present",
    grade: "Current CGPA: 8.0/10",
    details:
      "Focus on full-stack development, algorithms, and cloud computing fundamentals.",
    img: "education2.png",
    fallback: "https://placehold.co/32x32/1f2937/ffffff?text=SB",
    align: "right",
  },
  {
    title: "Higher Secondary (12th)",
    org: "Kendriya Vidyalaya Ambajhari Nagpur",
    year: "2020 - 2022",
    grade: "Percentage: 63.8%",
    details:
      "Key subjects: Physics, Chemistry, and Mathematics (PCM). Built strong logic and analytical skills.",
    img: "education1.png",
    fallback: "https://placehold.co/32x32/1f2937/ffffff?text=KV",
    align: "left",
  },
  {
    title: "Secondary School (10th)",
    org: "Kendriya Vidyalaya Ambajhari Nagpur",
    year: "2018 - 2020",
    grade: "Percentage: 77.2%",
    details:
      "Developed strong foundational knowledge across all subjects.",
    img: "education1.png",
    fallback: "https://placehold.co/32x32/1f2937/ffffff?text=KV",
    align: "right",
  },
];

// NEW Experience Data
const experienceData = [
  {
    title: "Cyber Security & Ethical Hacking Intern",
    company: "National Skill Development Corporation (NSDC)",
    year: "Jan 2024 – Jul 2024",
    img: "nsdc-logo.png",
    fallback: "https://placehold.co/40x40/1e293b/ffffff?text=TI",
    details: [
      "Performed vulnerability assessments and network monitoring.",
      "Assisted in ethical hacking and security patch validation.",
    ],
    align: "right",
  },
  {
    title: "Web Development Intern",
    company: "Codemate & IT Solutions",
    year: "Oct 2023 – Dec 2023",
    img: "Codemate.webp",
    fallback: "https://placehold.co/40x40/1e293b/ffffff?text=FD",
    details: [
      "Designed and deployed client websites.",
      "Focused on SEO & performance.",
      "Delivered modern, responsive UI."
    ],
    align: "left",
  },
];
  const projectsData = [
  {
    title: "Portfolio Website",
    description:
      "A fully responsive personal portfolio crafted with modern animations, smooth scroll effects, and a performance-focused design to highlight projects, skills, and experience elegantly.",
    image: "portfolio.png",
    fallback: "https://placehold.co/800x400/0f172a/ffffff?text=Portfolio",
    stack: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "Responsive Design",
    ],
    live: "https://ansh-dev-portfolio.netlify.app/", // not deployed
    repo: "https://github.com/ANSHM30/Portfolio.git",
  },
  {
    title: "E-commerce Platform",
    description:
      "A complete MERN-based online store featuring secure user authentication, dynamic product management, cart functionality, and Stripe payment integration for smooth transactions.",
    image: "ecommerce.png",
    fallback: "https://placehold.co/800x400/0f172a/ffffff?text=E-commerce",
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "JWT Auth",
      "Stripe",
    ],
    live: "",
    repo: "https://github.com/yourusername/mern-ecommerce",
  },
  {
    title: "Travel Bucket List",
    description:
      "An interactive travel planner to pin dream destinations, visualize trips on a dynamic world map, and manage lists with filtering and sharing options in real-time.",
    image: "travel-bucketlist.png",
    fallback: "https://placehold.co/800x400/0f172a/ffffff?text=Travel+Bucket+List",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Leaflet.js",
      "Cloudinary",
    ],
    live: "",
    repo: "https://github.com/ANSHM30/Travel-Bucket-list.git",
  },
];

// Define key icons for the quick-bar (Hero section)
const quickSkills = [
  { icon: FaReact, color: "text-cyan-400", name: "React" },
  { icon: SiNodedotjs, color: "text-green-500", name: "Node.js" },
  { icon: SiMongodb, color: "text-green-400", name: "MongoDB" },
  { icon: SiTailwindcss, color: "text-sky-400", name: "Tailwind" },
  { icon: SiAmazonaws, color: "text-orange-400", name: "AWS" },
];
// Define core skills for the Jiggle block (About section)
const coreSkills = [
  { Icon: FaReact, name: 'React', color: 'text-sky-400' },
  { Icon: SiNodedotjs, name: 'Node.js', color: 'text-green-500' },
  { Icon: FaCode, name: 'JS', color: 'text-yellow-400' },
  { Icon: FaPython, name: 'Python', color: 'text-blue-400' },
  { Icon: FaAnchor, name: 'SQL', color: 'text-blue-500' },
];

export function Navbar({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [hidden, setHidden] = useState(false); // hide on scroll down
  const lastScroll = useRef(0);
  const observerRef = useRef(null);

  const navItems = useMemo(
    () => [
      { name: "Home", id: "home" },
      { name: "About", id: "about" },
      { name: "Education", id: "education" },
      { name: "Experience", id: "experience" },
      { name: "Skills", id: "skills" },
      { name: "Projects", id: "projects" },
      { name: "Contact", id: "contact" },
    ],
    []
  );

  const handleScrollClick = useCallback(
    (id) => {
      setIsOpen(false);
      scrollToSection(id);
    },
    [scrollToSection]
  );

  // Intersection observer for active section highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -40% 0px", threshold: [0, 0.3, 0.6] }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [navItems]);

  // show/hide navbar on scroll
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY || 0;
      const delta = current - lastScroll.current;
      // If scrolling down more than 10px -> hide, else show
      if (current > 80 && delta > 10) {
        setHidden(true);
      } else if (delta < -10) {
        setHidden(false);
      }
      lastScroll.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // custom cursor effect (disabled on touch devices)
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
    if (isTouch) return;

    const ring = document.createElement("div");
    const dot = document.createElement("div");
    ring.className = "custom-cursor-ring";
    dot.className = "custom-cursor-dot";
    document.body.append(ring, dot);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    const ease = 0.16;
    let rafId = null;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px,0)`;
    };

    const animate = () => {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px,0)`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", move);
    rafId = requestAnimationFrame(animate);

    const onEnter = () => ring.classList.add("cursor-active");
    const onLeave = () => ring.classList.remove("cursor-active");

    // hover targets
    const hoverTargets = document.querySelectorAll("a, button, .group, .card-animate, .nav-link");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // ripple on click
    const ripple = document.createElement("div");
    ripple.className = "custom-cursor-ripple";
    document.body.appendChild(ripple);
    const clickRipple = (e) => {
      ripple.classList.remove("active");
      void ripple.offsetWidth;
      ripple.style.left = `${e.clientX - 20}px`;
      ripple.style.top = `${e.clientY - 20}px`;
      ripple.classList.add("active");
    };
    document.addEventListener("click", clickRipple);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("click", clickRipple);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      ring.remove();
      dot.remove();
      ripple.remove();
    };
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-lg nav-wrapper ${
        hidden ? "nav-hidden" : "nav-visible"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
        {/* logo */}
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Ansh<span className="text-white">.dev</span>
        </div>

        {/* desktop nav — aligned right */}
        <nav className="hidden lg:flex items-center space-x-8 ml-auto" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollClick(item.id)}
              className={`nav-link text-sm font-medium ${activeId === item.id ? "active" : ""}`}
              aria-current={activeId === item.id ? "page" : undefined}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* mobile menu button */}
        <button
          className="lg:hidden text-gray-300 p-2 rounded-md hover:bg-gray-800 transition ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* mobile dropdown */}
      {isOpen && (
        <motion.div
          className="lg:hidden bg-black/90 pb-4 shadow-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-2 px-4 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollClick(item.id)}
                className={`block text-left py-2 px-3 text-gray-200 rounded-md transition ${
                  activeId === item.id ? "font-semibold bg-gray-800/50" : "hover:bg-gray-800"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredLive, setHoveredLive] = useState(null);

  // Use useCallback to create a stable scrolling function
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Define a style object for the interactive glow
  const gradientStyle = useMemo(() => ({
    background: 'radial-gradient(400px at var(--x) var(--y), rgba(124, 58, 237, 0.4), transparent 80%)',
  }), []);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  // inside your App() / Home() function component — NOT at module top-level
useEffect(() => {
  // only run on touch devices
  if (typeof window === 'undefined' || !('ontouchstart' in window)) return;

  const onTouchStart = (e) => {
    const group = e.currentTarget;
    if (!group) return;
    group.classList.add('is-touched');
    // remove after a short delay so it doesn't stick
    setTimeout(() => group.classList.remove('is-touched'), 900);
  };

  const groups = Array.from(document.querySelectorAll('.group'));
  groups.forEach(g => g.addEventListener('touchstart', onTouchStart, { passive: true }));

  return () => {
    groups.forEach(g => g.removeEventListener('touchstart', onTouchStart));
  };
}, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-950 text-white font-sans">
      
      {/* Custom Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            scroll-behavior: smooth;
            background-color: #030712; /* Darkest base color */
          }
          
          /* OPTIMIZED CSS STARFIELD BACKGROUND */
          .starfield::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh; /* Only covers the viewport (Hero) */
            background: 
              radial-gradient(2px 2px at 20px 30px, #eee, transparent),
              radial-gradient(2px 2px at 40px 70px, #eee, transparent),
              radial-gradient(3px 3px at 50px 160px, #fff, transparent),
              radial-gradient(2px 2px at 90px 40px, #fff, transparent),
              radial-gradient(3px 3px at 100px 100px, #ddd, transparent);
            background-size: 200px 200px;
            opacity: 0.5;
            z-index: -10;
            animation: pulse 15s infinite alternate;
          }
          
          @keyframes pulse {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
        `}
      </style>

      {/* Global Starfield Background and Dark Overlay (Optimized CSS/Static BG) */}
      <div className="starfield fixed inset-0 w-full h-full -z-10"></div>
      <div className="fixed inset-0 bg-black/80 -z-10"></div>

      {/* Navbar Component */}
      <Navbar scrollToSection={scrollToSection} />

      {/* ------------------------------------------------------------------ */}
      {/* Hero Section */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="home"
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 pt-16 overflow-hidden bg-[#0f0f0f] text-white"
      >
        {/* --- Crimson Core Glow Grid Background --- */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(255, 140, 0, 0.12) 0, rgba(255, 140, 0, 0.12) 1px, transparent 1px, transparent 22px),
              repeating-linear-gradient(-45deg, rgba(255, 69, 0, 0.08) 0, rgba(255, 69, 0, 0.08) 1px, transparent 1px, transparent 22px)
              `,
            backgroundSize: "44px 44px",
          }}
        />

        {/* --- Hero Content --- */}
        <motion.p
          className="text-lg text-gray-300 mb-2 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 animate-gradient bg-[length:200%_auto]">
            Ansh Mishra
          </span>
        </motion.h1>

        {/* --- Rotating Text (with glow animation) --- */}
        <div className="relative z-20 text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-4 animate-glow">
          <RotatingText />
        </div>

        <motion.p
          className="text-md sm:text-lg md:text-xl text-gray-400 max-w-2xl mt-4 mb-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          I transform ideas into elegant digital solutions, blending creativity
          with technical excellence to create experiences that inspire and
          engage.
        </motion.p>

        <motion.div
          className="flex space-x-6 mb-10 text-white/70 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {quickSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-1"
              whileHover={{
                scale: 1.2,
                color: skill.color,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <skill.icon className={`text-2xl ${skill.color}`} title={skill.name} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-4 relative z-10">
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work &rarr;
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="px-6 py-3 rounded-full border border-gray-300 text-white font-semibold hover:bg-gray-800 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 w-full flex justify-center z-20">
          <div className="flex flex-col items-center text-white opacity-70">
            <span className="text-xs mb-2">SCROLL</span>
            <ArrowDown className="w-4 h-4 text-white animate-bounce" />
          </div>
        </div>
      </section>


{/* ------------------------------------------------------------------ */}
{/* ABOUT SECTION - with Crimson Glow Background + Interactive Effects */}
{/* ------------------------------------------------------------------ */}
<section
  id="about"
  className="w-full h-full object-cover relative z-10 py-20 overflow-hidden min-h-screen flex items-center justify-center"
>
  {/* 🔥 Crimson Core Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background:
        "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), radial-gradient(68% 58% at 50% 50%, #c81e3a 0%, #a51d35 16%, #7d1a2f 32%, #591828 46%, #3c1722 60%, #2a151d 72%, #1f1317 84%, #141013 94%, #0a0a0a 100%), radial-gradient(90% 75% at 50% 50%, rgba(228,42,66,0.06) 0%, rgba(228,42,66,0) 55%), radial-gradient(150% 120% at 8% 8%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), radial-gradient(150% 120% at 92% 92%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), radial-gradient(60% 50% at 50% 60%, rgba(240,60,80,0.06), rgba(0,0,0,0) 60%), #050505",
    }}
  />
  {/* Subtle vignette for depth */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage:
        "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
      opacity: 0.95,
    }}
  />

  {/* --------------------------- CONTENT --------------------------- */}
  <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

    {/* --- About Text Column --- */}
    <div
      className="relative p-4 md:p-0 rounded-xl order-1 md:order-1"
      onMouseMove={handleMouseMove}
    >
      {/* Gradient Shadow (glow around content box) */}
      <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-600 to-fuchsia-600 opacity-50 blur-2xl transition duration-500"></div>

      {/* Interactive Glow Overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none rounded-xl transition-opacity duration-300 hover:opacity-100 opacity-80"
        style={{
          ...gradientStyle,
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`,
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 bg-gradient-to-br from-[#015668] via-[#263f44] to-[#ffd369] backdrop-blur-sm rounded-xl border border-zinc-700 shadow-lg p-6">
        <h2 className="text-4xl font-bold text-white mb-4">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 animate-gradient">
            Me
          </span>
        </h2>

                 {/* MOBILE-ONLY PROFILE IMAGE - increased size */}
          <div className="md:hidden mb-6 flex justify-center">
            <div className="relative rounded-2xl p-1 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#d8c292] via-[#5b5b5b] to-[#b67171] border border-zinc-800 shadow-xl">
              <img
                src="profile.png"
                alt="Ansh Mishra - Full Stack Developer"
                className="w-72 h-72 rounded-lg object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://placehold.co/384x384/4f46e5/ffffff?text=Ansh+Mishra';
                }}
              />
            </div>
          </div>

        <h3 className="text-2xl font-semibold text-gray-100 mb-4">
          Hello! I'm Ansh Mishra, a passionate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 animate-gradient">
            Full Stack Developer
          </span>{" "}
          focused on performance and user experience.
        </h3>

        <p className="text-gray-300 mb-6">
          I’m passionate about building scalable web applications and learning
          new technologies. Here’s a quick overview of my core skills:
        </p>

        {/* --- Animated Skill Icons --- */}
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">
          Core Skills Showcase
        </h3>
        <div className="flex flex-wrap gap-8 justify-start">
          {coreSkills.map(({ Icon, name, color }, index) => (
            <div key={name} className="flex flex-col items-center group">
              <motion.div
                animate={{ y: [0, -3, 0], rotate: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: index * 0.5 + 0.5,
                }}
                whileHover={{ scale: 1.15 }}
              >
                <Icon className={`${color} text-5xl`} />
              </motion.div>
              <span className="text-xs text-gray-400 mt-2 transition-colors duration-200 group-hover:text-indigo-400">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* --- Quote Block --- */}
        <motion.div
          className="mt-8 p-6 bg-gray-900 rounded-xl shadow-lg border border-indigo-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: [1, 1.01, 1],
            boxShadow: [
              "0 4px 10px rgba(0,0,0,0.5)",
              "0 6px 15px rgba(124,58,237,0.3)",
              "0 4px 10px rgba(0,0,0,0.5)",
            ],
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0. }}
        >
          <p className="text-lg italic text-gray-200 mb-4">
            "The only way to do great work is to love what you do."
          </p>
          <p className="text-sm font-semibold text-indigo-400 text-right">
            – Steve Jobs
          </p>
        </motion.div>
      </div>
    </div>

    {/* --- Desktop Profile Image Column (hidden on mobile) --- */}
    <div className="hidden md:flex justify-center order-2 md:order-2">
      <div className="relative group">
        {/* Gradient Shadow */}
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-600 to-fuchsia-600 opacity-50 blur-2xl transition duration-500 group-hover:opacity-80"></div>

              {/* RIGHT: Desktop profile image */}
      <div className="hidden md:flex items-center justify-center order-2">
        <div className="relative group w-full max-w-md">
          {/* Glow behind image */}
          <div className="absolute -inset-6 rounded-2xl bg-gradient-to-tr from-teal-600/30 to-purple-600/20 blur-3xl pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl p-1 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-2xl border border-zinc-800"
          >
             <img
            src="profile.png"
            alt="Ansh Mishra"
            className="w-full h-full object-cover rounded-[14px]"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x800/4f46e5/ffffff?text=Ansh';
            }}
          />
          </motion.div>
      </div>
    </div>
  </div>
</div>
</div>
</section>


{/* ------------------------------------------------------------------ */}
{/* ------------------------------------------------------------------ */}
{/* EDUCATION SECTION (with glowing timeline dots; reliable animations) */}
{/* ------------------------------------------------------------------ */}
<section
  id="education"
  className="py-20 bg-gradient-to-l from-[#6f4a8e] via-[#221f3b] to-[#050505] relative z-10 overflow-hidden"
>
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-white mb-16">
      🎓 My Educational <span className="text-indigo-400">Journey</span>
    </h2>

    <div className="relative min-h-[600px]">
      {/* Vertical timeline line */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full
          bg-gradient-to-b from-purple-600 via-indigo-500 to-purple-600
          rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)]"
      ></div>

      {/* Timeline cards */}
      <div className="space-y-16">
        {educationData.map((item, i) => (
          <motion.div
            key={i}
            className={`relative flex ${
              item.align === "right"
                ? "justify-start md:justify-end"
                : "justify-end md:justify-start"
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            {/* Dot / marker with glow pulse */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full z-10 border-4 border-[#221f3b] ring-2 ring-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.8)]"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.85, 1, 0.85],
                boxShadow: [
                  "0 0 10px rgba(168,85,247,0.4)",
                  "0 0 20px rgba(168,85,247,0.7)",
                  "0 0 10px rgba(168,85,247,0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Card with glowing gradient border */}
            <div
              className={`relative w-full md:w-5/12 group ${
                item.align === "right" ? "md:mr-16" : "md:ml-16"
              }`}
            >
              {/* Glow Shadow Behind Card */}
              <div
                className="absolute -inset-2 rounded-lg
                  bg-[conic-gradient(at_left,_var(--tw-gradient-stops))]
                  from-neutral-600 via-violet-600 to-gray-600
                  opacity-40 blur-2xl group-hover:opacity-60 transition-all duration-500"
              ></div>

              {/* Actual Card */}
              <div className="relative bg-[#0a0a0a]/70 backdrop-blur-sm p-5 rounded-xl shadow-2xl border-t-4 border-indigo-500 hover:scale-[1.03] transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={item.img}
                    alt={`${item.title} Logo`}
                    className="w-8 h-8 object-contain rounded-full bg-white p-1"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = item.fallback;
                    }}
                  />
                  <h3 className="text-xl font-semibold text-indigo-400">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-sm">{item.org}</p>
                <p className="text-gray-400 text-xs">{item.year}</p>
                <p className="text-base font-bold text-purple-400 mt-2 mb-1">
                  {item.grade}
                </p>
                <p className="text-gray-400 text-sm">{item.details}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* ------------------------------------------------------------------ */}
{/* EXPERIENCE SECTION (Radial Gradient Now Fully Visible) */}
{/* ------------------------------------------------------------------ */}
<section
  id="experience"
  className="py-20 relative z-10 overflow-hidden"
  style={{
    background:
      "radial-gradient(ellipse at left, #200f21 0%, #382039 45%, #5a3d5c 100%)",
  }}
>
  <div className="max-w-5xl mx-auto px-6 relative z-10">
    <h2 className="text-4xl font-bold text-center text-white mb-16">
      💼 Professional <span className="text-yellow-300">Experience</span>
    </h2>

    <div className="relative min-h-[400px]">
      {/* Timeline vertical line */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full
        bg-gradient-to-b from-yellow-400 via-red-500 to-yellow-400
        rounded-full shadow-[0_0_20px_rgba(255,200,100,0.5)]"
      ></div>

      {/* Timeline Cards */}
      <div className="space-y-16 relative z-10">
        {experienceData.map((item, i) => (
          <motion.div
            key={i}
            className={`relative flex ${
              item.align === "right"
                ? "justify-start md:justify-end"
                : "justify-end md:justify-start"
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Timeline Dot */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6
              bg-gradient-to-t from-yellow-500 via-red-600 to-yellow-400
              rounded-full z-10 border-4 border-[#200f21] ring-2 ring-amber-400
              animate-pulse shadow-[0_0_25px_rgba(255,200,80,0.8)]"
            ></div>

            {/* Card Container */}
            <div
              className={`relative w-full md:w-5/12 ${
                item.align === "right" ? "md:mr-16" : "md:ml-16"
              } group`}
            >
              {/* Gradient Shadow behind cards */}
              <div
                className="absolute -inset-2 rounded-lg
                bg-gradient-to-t from-yellow-600 via-red-500 to-yellow-600
                opacity-40 blur-2xl transition-all duration-500
                group-hover:opacity-70"
              ></div>

              {/* Card Content */}
              <div
                className="relative border border-zinc-700 rounded-lg bg-zinc-900/90
                p-6 text-slate-200 shadow-lg hover:shadow-2xl
                transition-transform duration-300 hover:-translate-y-1 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={item.img}
                    alt={`${item.title} Logo`}
                    className="w-9 h-9 object-contain rounded-full bg-white p-1"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = item.fallback;
                    }}
                  />
                  <h3 className="text-xl font-semibold text-yellow-300">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-sm font-medium">
                  {item.company}
                </p>
                <p className="text-gray-400 text-xs mb-3">{item.year}</p>

                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {item.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* ------------------------------------------------------------------ */}
{/* SKILLS SECTION (Extended + Cloudinary + modern stack + hover glow) */}
{/* ------------------------------------------------------------------ */}
<section id="skills" className="py-20 bg-gray-950">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-white mb-12">
      🛠️ Technical <span className="text-indigo-400">Skills</span>
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">

      {/* React */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-slate-600 via-teal-600 to-pink-600 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <FaReact className="w-12 h-12 text-cyan-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">React</p>
        </div>
      </div>

      {/* Node.js */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-slate-600 via-green-600 to-teal-600 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <SiNodedotjs className="w-12 h-12 text-green-500 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">Node.js</p>
        </div>
      </div>

      {/* Express.js */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-lime-600 via-slate-600 to-zinc-800 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <Server className="w-12 h-12 text-lime-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">Express.js</p>
        </div>
      </div>

      {/* MongoDB */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-green-500 via-emerald-600 to-gray-700 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <SiMongodb className="w-12 h-12 text-green-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">MongoDB</p>
        </div>
      </div>

      {/* Cloudinary */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-slate-500 via-sky-500 to-pink-600 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <Cloud className="w-12 h-12 text-sky-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">Cloudinary</p>
        </div>
      </div>

      {/* Tailwind CSS */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-cyan-600 via-sky-400 to-indigo-500 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <SiTailwindcss className="w-12 h-12 text-sky-300 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">Tailwind CSS</p>
        </div>
      </div>

      {/* AWS */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-orange-400 via-yellow-500 to-amber-600 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <SiAmazonaws className="w-12 h-12 text-orange-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">AWS</p>
        </div>
      </div>

      {/* Git / GitHub */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-gray-400 via-slate-600 to-zinc-800 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <FaGithub className="w-12 h-12 text-gray-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">Git / GitHub</p>
        </div>
      </div>

      {/* REST APIs */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-500 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <Server className="w-12 h-12 text-amber-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">REST APIs</p>
        </div>
      </div>

      {/* JWT Auth */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-emerald-500 via-green-600 to-slate-700 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <Lock className="w-12 h-12 text-emerald-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">JWT Auth</p>
        </div>
      </div>

      {/* Deployment */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-600 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <Globe className="w-12 h-12 text-purple-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">Deployment</p>
        </div>
      </div>

      {/* Postman / Testing */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <Laptop className="w-12 h-12 text-orange-300 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">Postman / Testing</p>
        </div>
      </div>

      {/* Python */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-600 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <FaPython className="w-12 h-12 text-blue-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">Python</p>
        </div>
      </div>

      {/* JavaScript */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <FaCode className="w-12 h-12 text-yellow-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">JavaScript</p>
        </div>
      </div>

      {/* SQL */}
      <div className="relative group">
        <div className="group-glow absolute -inset-2 rounded-lg bg-gradient-to-br from-indigo-400 via-blue-500 to-sky-600 opacity-0 blur-2xl transition-all duration-500"></div>
        <div className="card-animate relative bg-gray-900 p-6 rounded-xl flex flex-col items-center">
          <span className="rotate-top-normal">
            <FaAnchor className="w-12 h-12 text-indigo-400 mb-3" />
          </span>
          <p className="text-lg font-medium text-white">SQL</p>
        </div>
      </div>

    </div>
  </div>
</section>



{/* ------------------------------------------------------------------ */}
{/* PROJECTS SECTION (Responsive + touch friendly overlays + themed bg) */}
{/* ------------------------------------------------------------------ */}
<section
  id="projects"
  style={{
    background: "radial-gradient(ellipse at top left, #000000, #1a8b9d, #b2d430)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    minHeight: "100vh",
    paddingTop: "3.2rem",
    paddingBottom: "4rem",
  }}
>
  <div className="max-w-7xl w-full mx-auto px-6">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center text-white z-10">
      🚀 Projects
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
      {projectsData.map((p, idx) => (
        <motion.article
          key={idx}
          className="group relative rounded-3xl overflow-hidden border border-zinc-800 
                     shadow-2xl bg-gray-900/90 backdrop-blur-md transition-all duration-450 transform"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: idx * 0.05 }}
          viewport={{ once: true, amount: 0.18 }}
          onMouseEnter={() => setHoveredProject(idx)}
          onMouseLeave={() => { setHoveredProject(null); setHoveredLive(null); }}
          onTouchStart={() => {
            // toggle overlay on touch so mobile users can access buttons
            setHoveredProject((cur) => (cur === idx ? null : idx));
          }}
          onClick={() => {
            // allow simple tap toggle fallback for devices that don't fire touchstart reliably
            setHoveredProject((cur) => (cur === idx ? null : idx));
          }}
          role="article"
          tabIndex={0}
          aria-label={`${p.title} project card`}
        >
          {/* subtle gradient border glow behind card */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-t from-amber-700 via-yellow-600 to-orange-600 opacity-20 blur-lg pointer-events-none "></div>

          {/* responsive image area: smaller on mobile to prevent oversized cards */}
         {/* responsive image area - cover but focus top on small screens */}
{/* responsive image area - larger image with smoother hover zoom */}
<div className="relative w-full h-52 sm:h-60 md:h-72 lg:h-80 overflow-hidden rounded-t-3xl">
  <img
    src={p.image}
    alt={`${p.title} preview`}
    loading="lazy"
    className="w-full h-full object-cover object-top sm:object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-110"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = p.fallback;
    }}
  />

           {/* Overlay (desktop: shows on hover; mobile: shows when tapped because hoveredProject state toggles) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={hoveredProject === idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center gap-4 bg-black/36 backdrop-blur-sm"
            >
              {/* LIVE button: either link or disabled placeholder */}
              {p.live ? (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white text-sm shadow-lg hover:opacity-90 transition"
                >
                  Live
                </a>
              ) : (
                <div className="relative">
                  <button
                    disabled
                    className="px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-400 text-sm font-semibold cursor-not-allowed shadow-lg"
                  >
                    Live
                  </button>

                  {hoveredLive === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.16 }}
                      className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-gray-200 text-xs px-3 py-1 rounded-md shadow-md border border-gray-700 whitespace-nowrap"
                    >
                      🚧 Currently in progress — not deployed
                    </motion.div>
                  )}
                </div>
              )}

              {/* CODE / GitHub button */}
              <a
                href={p.repo || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gray-900 border border-gray-600 font-semibold text-white text-sm shadow-lg hover:bg-gray-800 transition flex items-center gap-2"
              >
                <FaGithub className="w-4 h-4" /> Code
              </a>
            </motion.div>
          </div>

          {/* content area: slightly taller on desktop but compact on mobile */}
          <div className="relative z-10 p-5 sm:p-6 md:p-8 bg-gray-950/90 backdrop-blur-sm rounded-b-3xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-400 mb-2">{p.title}</h3>
            <p className="text-gray-300 text-sm sm:text-sm md:text-base mb-4 leading-relaxed line-clamp-3">{p.description}</p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {p.stack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium text-gray-200 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </div>
</section>

    {/* Contact Section */}
<ContactSection />

      {/* Footer */}
      <footer className="w-full py-4 bg-black/90 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Ansh Mishra. Built with React, Tailwind CSS, and Framer Motion.
      </footer>
    </div> // Closes the main component wrapper div
  ); // Closes the return statement
} // Closes the App function