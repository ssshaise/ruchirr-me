import React, { useState, useEffect, useRef, ReactNode } from 'react';
// Using neutral gray/slate for focus rings and accents instead of blue
import { Mail, Linkedin, Github, Briefcase, Code, User, Home, Award, ExternalLink, Brain, Sigma, Orbit, LucideProps } from 'lucide-react'; // Added Brain, Sigma, Orbit, LucideProps
// Import Framer Motion hooks and components
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- TypeScript Interfaces ---
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string; // Optional image URL
  liveUrl?: string;  // Link to live demo
  repoUrl?: string;  // Link to GitHub repo
}

interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string[];
  location?: string; // Optional location
}

interface Certificate {
    id: number;
    name: string;
    issuingOrganization: string;
    dateIssued?: string; // Optional issue date
    credentialUrl?: string; // Optional link to verify
    icon?: React.ElementType;
}


// --- Mock Data ---
// User's actual data
const projectsData: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'This personal portfolio site built with React, TypeScript, and Tailwind CSS.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    repoUrl: 'https://github.com/ssshaise/ruchirr-me',
    imageUrl: 'https://i.postimg.cc/76LGLGgd/Screenshot-2025-04-26-014034.png'
  },
  {
    id: 2,
    title: 'Rolar : Advanced Ride Sharing App',
    description: 'An advanced ride sharing application with solved real world problems that we face everyday.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    repoUrl: 'https://github.com/ssshaise/RolaR',
    imageUrl: 'https://i.postimg.cc/50G0NP9Q/pexels-photo-5835466.webp'
  },
   {
    id: 3,
    title: 'TruthLens : AI-Powered Fake News Detector',
    description: 'A powerful tool to detect fake news and misinformation using machine learning.',
    technologies: ['Python', 'BERT', 'Scikit-learn', 'TensorFlow'],
    liveUrl: '#',
    repoUrl: 'https://github.com/ssshaise/TruthLens',
    imageUrl: 'https://i.postimg.cc/fyCwpZqs/b8e96be9-a9a1-4af1-8902-b82671481e26.png'
  },
  {
    id: 4,
    title: 'Dynamic Pricing Engine',
    description: 'Developed an ML-based system optimizing product prices with XGBoost/Prophet, achieving 30% revenue improvement.',
    technologies: ['Python', 'Machine Learning', 'Prophet', 'NumPy'],
    liveUrl: '#',
    repoUrl: 'https://github.com/ssshaise/',
    imageUrl: 'https://i.postimg.cc/pXD2kbXd/unnamed.png'
  },
  {
    id: 5,
    title: 'OpenPilot : Self-Driving Software',
    description: 'An open-source self-driving car software that can be installed on various car models. I have forked the repo and contributed in it.',
    technologies: ['Python', 'C++', 'TensorFlow', 'OpenCV'],
    repoUrl: 'https://github.com/ssshaise/openpilot',
    imageUrl: 'https://i.postimg.cc/0Qx1sFwy/107aa381-a61e-49ff-9a68-59b4fd315093.jpg'
  },
  {
    id: 6 ,
    title: 'Deepfake Detector with (XAI)                (In Progress)',
    description: 'Built multi-modal AI to detect deepfakes/misinformation (XAI) (92% F1), featuring SHAP/LIME.',
    technologies: ['Python', 'Keras', 'TensorFlow', 'OpenCV', 'PyTorch', 'SHAP'],
    repoUrl: 'https://github.com/ssshaise/',
    imageUrl: 'https://i.postimg.cc/GmCp13SY/unnamed.png'
  },
];

const experienceData: Experience[] = [
  {
    id: 1,
    role: 'Data Scientist Intern',
    company: 'Mamta Bio Enzymes',
    duration: 'Jan 2025 - Apr 2025',
    location: 'Remote, Delhi',
    description: [
      'Enhanced AI-driven systems for malware and cyber threat detection in email traffic at Mamta Bio Enzymes.',
      'Assisted in dataset maintenance, analysis, and Python prototype development under senior engineer mentorship.',
      'Contributed to transforming prototypes into production-ready code, researching patentable ideas.',
      'Gained expertise in machine learning, data science, and cybersecurity through collaboration with global partners.'
    ],
  },
  {
    id: 2,
    role: 'Frontend Developer Intern',
    company: 'Neuramonks',
    duration: 'Jan 2024 - March 2024',
    location: 'Remote, Delhi',
    description: [
      'Collaborated with development team to design and build user-friendly web applications using ReactJS.',
      'Wrote clean and efficient code, participated in integration and debugging, and contributed to code reviews.',
      'Stayed updated with latest web development trends and strengthened skills in React, JavaScript, HTML/CSS, and RESTful API integration.',
    ],
  },
];

const certificationsData: Certificate[] = [
    {
        id: 1,
        name: 'Applied Data Science with Python Specialization',
        issuingOrganization: 'University of Michigan',
        dateIssued: 'April 2024',
        credentialUrl: '#', // Replace with actual link if available
        icon: Brain,
    },
    {
        id: 2,
        name: 'Data science Fundamentals with Python and SQL',
        issuingOrganization: 'IBM',
        dateIssued: 'Feb 2024',
        credentialUrl: '#', // Replace with actual link if available
        icon: Sigma,
    },
    {
        id: 3,
        name: 'Machine Learning A-Z ',
        issuingOrganization: 'Udemy',
        dateIssued: 'Dec 2022',
        icon: Orbit,
        // credentialUrl: '#', // Add if available
    },
];


// --- Reusable Components ---

// Card component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-gray-700/50 hover:-translate-y-1 ${className}`}>
    {children}
  </div>
);

// CardContent component
const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 md:p-6 ${className}`}>
    {children}
  </div>
);
// CardHeader component
const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);
// CardTitle component (Base component, HoverableText will wrap this)
const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
    {children}
  </h3>
);
// CardDescription component
const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>
    {children}
  </p>
);

// Badge component
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded ${className}`}>
    {children}
  </span>
);

// Button component
const Button: React.FC<{ href?: string; onClick?: () => void; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'outline'; className?: string; target?: string; rel?: string; size?: 'sm' | 'md' | 'lg' }> = ({ href, onClick, children, variant = 'primary', className = '', target, rel, size = 'md' }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none transform hover:scale-[1.03]";
  const sizeStyles = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const variantStyles = {
    primary: "bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-500 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-400",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-500",
  };
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  if (href) return <a href={href} className={combinedClassName} target={target} rel={rel}>{children}</a>;
  return <button onClick={onClick} className={combinedClassName}>{children}</button>;
};

// --- Animation Components ---

// AnimatedSection component for revealing sections on scroll
const AnimatedSection: React.FC<{ children: ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(section);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 } // Trigger when 10% visible
    );
    observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
      observer.disconnect();
    };
  }, [delay]); // Include delay in dependency array if using setTimeout
  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-500 ease-out ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' } ${className}`} // Fade-in + slide-up effect
    >
      {children}
    </div>
  );
};

// AnimatedHeading component for word-by-word reveal
const AnimatedHeading: React.FC<{ text: string; className?: string; wordDelay?: number }> = ({ text, className = '', wordDelay = 75 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const words = text.split(' ');
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(heading);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.5 } // Trigger when 50% visible
    );
    observer.observe(heading);
    return () => {
      if (heading) observer.unobserve(heading);
      observer.disconnect();
    };
  }, []);
  return (
    // Use motion.h2 for potential future Framer Motion integration on the heading itself
    <motion.h2 ref={headingRef} className={` ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden pb-1"> {/* Wrapper for clipping */}
          <motion.span
            className={`inline-block`}
            initial={{ y: "100%", opacity: 0 }} // Start below and invisible
            animate={isVisible ? { y: "0%", opacity: 1 } : {}} // Animate to original position
            transition={{ delay: index * (wordDelay / 1000), duration: 0.3, ease: "easeOut" }} // Use Framer Motion transition
          >
            {word}&nbsp; {/* Add space back */}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
};

// CursorFollower component for the elastic cursor effect
const CursorFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 });
  const [isClicked, setIsClicked] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Elasticity Parameters
  const baseEasingFactor = 0.1;
  const distanceBoostFactor = 0.001;
  const maxEasingFactor = 0.5;
  const minDistanceThreshold = 1;

  // Update target position on mouse move
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => { setTargetPosition({ x: event.clientX, y: event.clientY }); };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle mouse down/up for click effect
  useEffect(() => {
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => { window.removeEventListener('mousedown', handleMouseDown); window.removeEventListener('mouseup', handleMouseUp); };
  }, []);

  // Animation loop with dynamic easing for elasticity
  useEffect(() => {
    const animate = () => {
      setPosition((currentPos) => {
        const dx = targetPosition.x - currentPos.x;
        const dy = targetPosition.y - currentPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 0.1) return currentPos; // Stop if very close
        let currentEasingFactor = baseEasingFactor;
        if (distance > minDistanceThreshold) {
          currentEasingFactor = Math.min(baseEasingFactor + distance * distanceBoostFactor, maxEasingFactor);
        }
        const nextX = currentPos.x + dx * currentEasingFactor;
        const nextY = currentPos.y + dy * currentEasingFactor;
        return { x: nextX, y: nextY };
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [targetPosition]); // Depend on targetPosition

  return (
    <div
      className={`fixed w-6 h-6 rounded-full bg-gray-400 dark:bg-gray-600 opacity-50 pointer-events-none z-[9999] transition-transform duration-100 ease-out ${isClicked ? 'scale-150' : 'scale-100'}`} // Click scale effect
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)', // Center the follower
      }}
    />
  );
};

// HoverableText component for character hover effect
const HoverableText: React.FC<{ text: string; className?: string; as?: keyof JSX.IntrinsicElements }> = ({ text, className = '', as: Component = 'span' }) => {
    const characters = text.split('');
    return (
        <Component className={className}>
            {characters.map((char, index) => (
                <span
                    key={index}
                    className="inline-block transition-colors duration-100 ease-in-out hover:text-gray-50 dark:hover:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300" // Light background on hover
                >
                    {char === ' ' ? '\u00A0' : char} {/* Render space */}
                </span>
            ))}
        </Component>
    );
};

// TypingHeading component for the hero title typing effect
const TypingHeading: React.FC<{ text: string; className?: string; typingSpeed?: number }> = ({ text, className = '', typingSpeed = 100 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayedText(''); setIsTypingComplete(false); indexRef.current = 0;
        const intervalId = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current += 1;
            } else {
                clearInterval(intervalId); setIsTypingComplete(true);
            }
        }, typingSpeed);
        return () => clearInterval(intervalId);
    }, [text, typingSpeed]);

    return (
        <h1 className={className}>
            {displayedText}
            <span className={`ml-1 inline-block h-[0.8em] w-[3px] bg-gray-700 dark:bg-gray-300 ${isTypingComplete ? 'animate-none opacity-0' : 'animate-blink'}`}></span>
        </h1>
    );
};

// --- ScatteringText Component Definitions ---
// Ensure these are defined before being used in Hero

// Character Component (Helper for ScatteringText - Simplified Logic)
const Character: React.FC<{ children: ReactNode; scrollYProgress: MotionValue<number>; index: number; totalChars: number }> = ({ children, scrollYProgress, index, totalChars }) => {
    const randomXSeed = useRef(Math.random() * 2 - 1); // -1 to 1
    const randomYSeed = useRef(Math.random() * 2 - 1); // -1 to 1
    const randomRotateSeed = useRef(Math.random() * 2 - 1); // -1 to 1

    const maxDisplacement = 50; // pixels
    const maxRotation = 30; // degrees

    // --- UPDATED TRANSFORMS ---
    // Animate from scattered (max displacement) to assembled (0 displacement)
    // as the element scrolls into view (scrollYProgress goes from 0 to targetProgressPoint)
    // Then clamp the values to 0 so the text stays assembled.
    const targetProgressPoint = 0.35; // Point at which text should be fully assembled (adjust 0.0 to 1.0)

    const x = useTransform(scrollYProgress, [0, targetProgressPoint], [maxDisplacement * randomXSeed.current, 0]);
    const y = useTransform(scrollYProgress, [0, targetProgressPoint], [maxDisplacement * randomYSeed.current, 0]);
    const rotate = useTransform(scrollYProgress, [0, targetProgressPoint], [maxRotation * randomRotateSeed.current, 0]);
    const opacity = useTransform(scrollYProgress, [0, targetProgressPoint / 2], [0, 1]); // Fade in quicker

    return (
        <motion.span
            className="inline-block relative" // Relative positioning needed for transforms
            style={{ x, y, rotate, opacity }} // Apply transforms from Framer Motion
        >
            {children}
        </motion.span>
    );
};

// ScatteringText Component using Framer Motion
const ScatteringText: React.FC<{ text: string; className?: string; as?: keyof JSX.IntrinsicElements }> = ({ text, className = '', as: Component = 'p' }) => {
    // Only support 'p', 'span', or 'div' for now for type safety
    const containerRef = useRef<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement>(null);
    const characters = text.split('');

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "start 0.4"]
    });

    // Map 'as' prop to the correct motion component and ref type
    let MotionComponent: React.ElementType;
    if (Component === 'p') MotionComponent = motion.p;
    else if (Component === 'span') MotionComponent = motion.span;
    else if (Component === 'div') MotionComponent = motion.div;
    else MotionComponent = motion.p; // fallback

    return (
        <MotionComponent ref={containerRef} className={className}>
            {characters.map((char, index) => (
                <Character key={index} scrollYProgress={scrollYProgress} index={index} totalChars={characters.length}>
                    {char === ' ' ? '\u00A0' : char}
                </Character>
            ))}
        </MotionComponent>
    );
};

// --- Section Components ---

// Navbar
const Navbar: React.FC<{ onToggleTheme: () => void; isDarkMode: boolean }> = ({ onToggleTheme, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [ { name: 'Home', href: '#home', icon: Home }, { name: 'About', href: '#about', icon: User }, { name: 'Experience', href: '#experience', icon: Briefcase }, { name: 'Certifications', href: '#certifications', icon: Award }, { name: 'Projects', href: '#projects', icon: Code }, { name: 'Contact', href: '#contact', icon: Mail }, ];
  return ( <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-gray-200 dark:border-gray-800"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div className="flex items-center justify-between h-16"> <div className="flex-shrink-0"> <a href="#home" className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">R</a> </div> <div className="hidden md:flex items-center space-x-1"> {navItems.map((item) => ( <a key={item.name} href={item.href} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.05]"> {item.name} </a> ))} <button onClick={onToggleTheme} className="ml-3 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-gray-500 transition-all duration-200 transform hover:scale-110" aria-label="Toggle dark mode"> {isDarkMode ? '☀️' : '🌙'} </button> </div> <div className="md:hidden flex items-center"> <button onClick={onToggleTheme} className="p-2 mr-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-gray-500 transition-all duration-200 transform hover:scale-110" aria-label="Toggle dark mode"> {isDarkMode ? '☀️' : '🌙'} </button> <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-colors duration-200" aria-controls="mobile-menu" aria-expanded={isOpen}> <span className="sr-only">Open main menu</span> <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /> </svg> <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> </svg> </button> </div> </div> </div> <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200 dark:border-gray-800`} id="mobile-menu"> <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"> {navItems.map((item) => ( <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"> <item.icon className="inline-block w-4 h-4 mr-2 align-middle" /> {item.name} </a> ))} </div> </div> </nav> );};

// Hero component (Uses ScatteringText)
const Hero: React.FC = () => (
  <section id="home" className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-black dark:to-gray-800 px-4 py-20">
    <div className="max-w-4xl">
      <img
        src="https://i.postimg.cc/DwYRNRxG/4f2e8208dddaad092bb86fcb121ef352.jpg" // User's image
        alt="Ruchir" // User's name
        className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-white dark:border-gray-700 shadow-lg object-cover" // Added object-cover
        onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src='https://placehold.co/150x150/cccccc/ffffff?text=Img+Error';
            }
        }
      />
      <TypingHeading
        text="HHi, I'm Ruchir" // User's name
        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 min-h-[1.2em]"
        typingSpeed={80}
      />
      {/* Use ScatteringText for the description */}
      <ScatteringText
        as="p"
        text="I'm a data scientist, passionate about turning data into impactful solutions through machine learning and intelligent systems." // User's description
        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
      />
      <div className="flex justify-center space-x-4">
        <Button href="#projects" variant="primary">View My Work</Button>
        <Button href="#contact" variant="outline">Get In Touch</Button>
      </div>
       <div className="mt-10 flex justify-center space-x-6">
            <a href="https://linkedin.com/in/ruchir-srivastava-a6b568282/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 transform hover:scale-125">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://github.com/ssshaise" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 transform hover:scale-125">
                <Github size={24} />
                 <span className="sr-only">GitHub</span>
            </a>
             <a href="mailto:work.sruchir@gmail.com" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 transform hover:scale-125">
                <Mail size={24} />
                 <span className="sr-only">Email</span>
            </a>
        </div>
    </div>
  </section>
);

// About
const About: React.FC = () => ( <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900 overflow-hidden"> <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <AnimatedHeading text="About Me" className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12" /> <div className="grid md:grid-cols-2 gap-10 items-center"> <div> <img src="https://i.postimg.cc/25Z9Kybp/uriel-sc-11-KDti-UWRq4-unsplash.jpg" alt="About me illustration or photo" className="rounded-lg shadow-md w-full h-auto object-cover" onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src='https://placehold.co/600x400/cccccc/ffffff?text=Img+Error'; } } /> </div> <div className="text-gray-700 dark:text-gray-300 space-y-4 text-base md:text-lg"> <p> Hello! I'm Ruchir, a Student/Data Scientist based in Delhi. I'm passionate about uncovering meaningful insights from data, building intelligent systems, and solving real-world problems using machine learning, NLP, and data-driven decision-making. . </p> <p> Being a fresher, I specialize in Machine Learning, AI Model Developemnt, Data Visulaisation, Data Cleaning and SQL. Apart from that, I am also skilled in Full Stack Development using MERN Stack. I enjoy tackling complex problems and turning ideas into reality through code. </p> <p> My technical toolkit includes: Python, Scikit Learn, MatplotLib, TenserFlow, R, SQL, React, Node.js, TypeScript, Docker, AWS, etc. I'm always eager to learn new technologies and improve my craft. </p> <p> When I'm not coding, you can find me playing Football, instruments, clicking photos, writing and reading books - espically Classics. </p> <Button href="https://drive.google.com/file/d/17u4q62hI5EaDVpW2z9B-9x6k5EbceFzz/view?usp=sharing" target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-4"> Download Resume </Button> </div> </div> </div> </section> );
// Experience
const Experience: React.FC = () => ( <section id="experience" className="py-16 md:py-24 bg-gray-100 dark:bg-black overflow-hidden"> <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <AnimatedHeading text="Work Experience" className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12" /> <div className="space-y-8 relative border-l-2 border-gray-300 dark:border-gray-700 pl-6 md:pl-10"> {experienceData.map((exp) => ( <AnimatedSection key={exp.id} className="relative" delay={exp.id * 100}> <div className="absolute -left-[29px] md:-left-[45px] top-1 h-4 w-4 rounded-full bg-gray-800 dark:bg-gray-300 border-2 border-gray-100 dark:border-black"></div> <Card className="ml-4 hover:shadow-lg hover:-translate-y-0"> <CardHeader> <HoverableText as="h3" text={exp.role} className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100" /> <CardDescription> {exp.company} {exp.location ? `| ${exp.location}` : ''} </CardDescription> <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{exp.duration}</p> </CardHeader> <CardContent> <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-600 dark:text-gray-300"> {exp.description.map((point, idx) => ( <li key={idx}>{point}</li> ))} </ul> </CardContent> </Card> </AnimatedSection> ))} </div> </div> </section> );
// Certifications
const Certifications: React.FC = () => ( <section id="certifications" className="py-16 md:py-24 bg-white dark:bg-gray-900 overflow-hidden"> <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <AnimatedHeading text="Licenses & Certifications" className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12" /> <div className="space-y-6"> {certificationsData.map((cert, index) => ( <AnimatedSection key={cert.id} delay={index * 100}> <Card className="hover:shadow-lg hover:-translate-y-0"> <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"> <div className="flex items-center gap-4"> {cert.icon && ( <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"> <cert.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> </div> )} <div> <HoverableText as="h3" text={cert.name} className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100" /> <CardDescription className="text-xs md:text-sm"> {cert.issuingOrganization} {cert.dateIssued && ` • Issued ${cert.dateIssued}`} </CardDescription> </div> </div> {cert.credentialUrl && cert.credentialUrl !== '#' && ( <Button href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" className="mt-2 sm:mt-0 flex-shrink-0"> View Credential <ExternalLink size={14} className="ml-1.5" /> </Button> )} </CardContent> </Card> </AnimatedSection> ))} </div> </div> </section> );
// Projects
const Projects: React.FC = () => ( <section id="projects" className="py-16 md:py-24 bg-gray-100 dark:bg-black overflow-hidden"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <AnimatedHeading text="Projects" className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12" /> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {projectsData.map((project, index) => ( <AnimatedSection key={project.id} delay={index * 100}> <Card className="flex flex-col h-full"> {project.imageUrl && ( <img src={project.imageUrl} alt={`${project.title} screenshot`} className="w-full h-48 object-cover" onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src='https://placehold.co/600x400/cccccc/ffffff?text=Img+Load+Error'; } } /> )} <CardContent className="flex-grow"> <HoverableText as="h3" text={project.title} className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2" /> <CardDescription className="mb-4">{project.description}</CardDescription> <div className="mb-4"> {project.technologies.map((tech) => ( <Badge key={tech}>{tech}</Badge> ))} </div> </CardContent> <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 flex space-x-3 mt-auto"> {project.liveUrl && project.liveUrl !== '#' && ( <Button href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="sm"> Live Demo </Button> )} {project.repoUrl && project.repoUrl !== '#' && ( <Button href={project.repoUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm"> <Github size={16} className="mr-1" /> Code </Button> )} </div> </Card> </AnimatedSection> ))} </div> </div> </section> );
// Contact
const Contact: React.FC = () => ( <section id="contact" className="py-16 md:py-24 bg-white dark:bg-gray-900 overflow-hidden"> <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <AnimatedHeading text="Get In Touch" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6" /> <p className="text-lg text-gray-700 dark:text-gray-300 mb-8"> I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out! </p> <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"> <Button href="mailto:work.sruchir@gmail.com" variant="primary" className="w-full sm:w-auto"> <Mail size={18} className="mr-2"/> Email Me </Button> <Button href="https://linkedin.com/in/ruchir-srivastava-a6b568282/" target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full sm:w-auto"> <Linkedin size={18} className="mr-2"/> Connect on LinkedIn </Button> </div> </div> </section> );
// Footer
const Footer: React.FC = () => ( <footer className="bg-gray-100 dark:bg-black py-6 border-t border-gray-200 dark:border-gray-800"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400"> <p>&copy; {new Date().getFullYear()} Ruchir Srivastava. All rights reserved.</p> </div> </footer> );


// --- Main App Component ---
const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => { if (localStorage.theme === 'light') return false; return true; }); // Default dark
  useEffect(() => {
    if (isDarkMode) { document.documentElement.classList.add('dark'); localStorage.theme = 'dark'; }
    else { document.documentElement.classList.remove('dark'); localStorage.theme = 'light'; }
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; }
  }, [isDarkMode]);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // Apply the Outfit font family and updated background colors
    <div className={`${isDarkMode ? 'dark' : ''} font-['Outfit',_sans-serif] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      {/* Ensure <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet"> is in your index.html <head> */}
      <CursorFollower />
      <Navbar onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main>
        <Hero />
        <AnimatedSection> <About /> </AnimatedSection>
        <AnimatedSection> <Experience /> </AnimatedSection>
        <AnimatedSection> <Certifications /> </AnimatedSection>
        <AnimatedSection> <Projects /> </AnimatedSection>
        <AnimatedSection> <Contact /> </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default App;
