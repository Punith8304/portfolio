import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Mail,
  Phone,
  FileText,
  ChevronRight,
  Terminal as TermIcon,
  Award,
  Cpu,
  GraduationCap,
  Video,
  BookOpen,
  Coffee,
  ExternalLink,
  CheckCircle,
  ShieldCheck,
  Layout,
  MessageCircle,
  MapPinHouse,
} from 'lucide-react';

// ============================================================================
// Custom Icons
// ============================================================================

function GithubIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.6-.6 5.4-2.1 5.4-5.8 0-1.3-.4-2.4-1-3.3.1-.6.2-1.6-.1-2.4-.6-.2-2 .1-4.6 2.1a9.2 9.2 0 0 0-4 0C7.2 3 5.8 3.3 5.2 3.5c-.3.8-.2 1.8-.1 2.4-.6.9-1 2-1 3.3 0 3.6 1.8 5.2 5.4 5.8a4.8 4.8 0 0 0-1 3.5v4" />
      <path d="M9 18c-4.5 0-5.5-3.5-7-5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width={4} height={12} x={2} y={9} />
      <circle cx={4} cy={4} r={2} />
    </svg>
  );
}

// ============================================================================
// Data Constants & Information
// ============================================================================

const PROJECTS_DATA = [
  {
    title: 'Chatkaro',
    period: 'January 2026 - March 2026',
    description: 'A real-time, zero-friction messaging platform with a Linux-terminal inspired UI.',
    longDescription: 'Engineered a real-time communications application utilizing Next.js, Node.js, and Socket.io. Built with privacy and a high-efficiency user experience in mind, it supports message persistence, allowing users to access chat history, and features dynamic social discovery without phone-number or email verification barriers.',
    tech: ['Next.js', 'Socket.io', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
    link: 'https://github.com/Punith8304/charkaro',
    category: 'MERN',
    status: 'Completed',
    highlights: [
      'Linux terminal-inspired interface with minimalist aesthetic to improve performance and responsiveness.',
      'Established full duplex socket connections to support instant real-time chats with dynamic room updates.',
      'Maintained high privacy using session tokens and in-memory key management.',
      'Designed modular components for the chat area, friend suggestion system, and settings drawer.',
      'Optimized backend API performance handling concurrent connections with sub-50ms message latency.'
    ]
  },
  {
    title: 'Lendhome',
    period: 'February 2025 - May 2025',
    description: 'A comprehensive broker-free property rental interface featuring map integration of map systems.',
    longDescription: 'Developed an innovative full-stack real estate web application that directly connects property owners and tenants without brokers, streamlining negotiations and apartment searches based on location, budget, and custom criteria.',
    tech: ['React.js', 'PostgreSQL', 'Node.js', 'Express.js', 'REST APIs', 'Google Maps API'],
    category: 'PERN',
    status: 'Completed',
    highlights: [
      'Created and integrated backend RESTful APIs using Express.js routing to handle CRUD property listings.',
      'Incorporated the Google Maps API for interactive location suggestion and address verification.',
      'Implemented full database search querying using PostgreSQL and custom-tailored search filters.',
      'Reduced data fetching time by using custom database query optimization and indexing.'
    ]
  }
];

const SKILLS_DATA = [
  { name: 'React.js', level: 'Advanced', category: 'Frontend' },
  { name: 'Next.js', level: 'Intermediate', category: 'Frontend' },
  { name: 'JavaScript', level: 'Advanced', category: 'Frontend' },
  { name: 'TypeScript', level: 'Intermediate', category: 'Frontend' },
  { name: 'HTML5 / CSS3', level: 'Expert', category: 'Frontend' },
  { name: 'Node.js', level: 'Advanced', category: 'Backend' },
  { name: 'Express.js', level: 'Advanced', category: 'Backend' },
  { name: 'Socket.io', level: 'Intermediate', category: 'Backend' },
  { name: 'REST APIs', level: 'Advanced', category: 'Backend' },
  { name: 'MongoDB', level: 'Advanced', category: 'Databases' },
  { name: 'PostgreSQL', level: 'Intermediate', category: 'Databases' },
  { name: 'Git & GitHub', level: 'Advanced', category: 'Tooling' }
];

const COMMANDS = {
  help: {
    command: 'help',
    description: 'Displays available commands.',
    output: [
      'Available Commands:',
      '  about       - Displays complete background and academic overview',
      '  skills      - Lists technical skills with proficiency ratings',
      '  projects    - Displays details and highlights for featured projects',
      '  contact     - Shows professional contact information and links',
      '  clear       - Resets the terminal output display'
    ]
  },
  about: {
    command: 'about',
    description: 'Displays biographical and academic profile details.',
    output: [
      'Name: Akula Punith Kumar',
      'Batch: 2026 Fresh Graduate / Software Developer',
      'Degree: B.Tech in Chemical Engineering (AP IIIT, R.K. Valley)',
      'Interests: Full-Stack Web Development, UI/UX, Filmmaking/Editing, Teaching',
      'Philosophy:',
      '  I blend analytical methodologies learned from engineering',
      '  with modern web architectures (MERN/PERN). I prioritize clean,',
      '  maintainable, and reusable code.',
      '',
      'Engineering Focus:',
      '  - CommonJS module ecosystem, Node.js event loop execution',
      '  - Prototypal inheritance, event-driven architecture efficiency.'
    ]
  },
  skills: {
    command: 'skills',
    description: 'Shows the full technical arsenal.',
    output: [
      '=== TECHNICAL ARSENAL ===',
      'Frontend:',
      '  - React, Next.js, TypeScript, JQuery, HTML5, CSS3',
      'Backend:',
      '  - Node.js, Express.js, Socket.io, JWT',
      'Databases & Storage:',
      '  - PostgreSQL, MongoDB, SQL, Session Management',
      'Tooling:',
      '  - Git, Linux Terminal UI, Debugging, API Design'
    ]
  },
  projects: {
    command: 'projects',
    description: 'Displays detailed project descriptions and tech stacks.',
    output: [
      '=== FEATURED PROJECTS ===',
      '',
      '1. Chatkaro',
      '   - Tech: Next.js, Socket.io, MongoDB, Node.js',
      '2. Lendhome',
      '   - Tech: React, PostgreSQL, Node.js, Express'
    ]
  },
  contact: {
    command: 'contact',
    description: 'Lists contact links.',
    output: [
      '=== CONTACT INFO ===',
      'Email:   punithakula1210@gmail.com',
      'Phone:   +91 7569639418',
      'GitHub:  https://github.com/Punith8304',
      'LinkedIn: https://www.linkedin.com/in/akula-punith-kumar'
    ]
  }
};

// ============================================================================
// Main Portfolio Component
// ============================================================================

export default function Portfolio() {
  const initialTerminalOutput = [
    'Akula Punith Kumar - Portfolio Terminal Interface v2.8.5',
    '------------------------------------------------------',
    'System status: All systems operational. Type "help" to get started.',
    ''
  ];

  const [terminalOutput, setTerminalOutput] = useState(initialTerminalOutput);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  // Manages Lendhome Git sub-menu interaction
  const [openLendhomeGitMenu, setOpenLendhomeGitMenu] = useState(false);

  const handleCommand = useCallback((e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let newOutput = [...terminalOutput, `> ${inputVal}`];

    if (cmd === 'clear') {
      // Retain the first three lines of the welcome message
      newOutput = initialTerminalOutput;
    } else if (COMMANDS[cmd]) {
      newOutput.push(...COMMANDS[cmd].output);
    } else {
      newOutput.push(
        `Command not found: "${cmd}". Type "help" for a list of available commands.`
      );
    }

    setTerminalOutput(newOutput);
    setInputVal('');
  }, [inputVal, terminalOutput]);

  // Maintains scrolling when typing in the terminal without autofocusing on page load
  useEffect(() => {
    if (terminalOutput.length > 4) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalOutput]);

  const renderedProjects = useMemo(() => {
    return PROJECTS_DATA.map((project, idx) => (
      <div 
        key={idx} 
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderColor: '#334155',
          borderRadius: '16px',
          padding: '48px',
          borderWidth: '1px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.35s ease',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          minHeight: '560px'
        }}
        className="group hover:border-indigo-500/50 project-card"
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                {project.title === 'Chatkaro' ? (
                  <MessageCircle style={{ color: '#818cf8' }} size={32} strokeWidth={1.5} />
                ) : (
                  <MapPinHouse style={{ color: '#818cf8' }} size={32} strokeWidth={1.5} />
                )}
              </div>
              <div>
                <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                  {project.title}
                </h4>
                <span style={{ fontSize: '13px', color: '#6366f1', fontFamily: 'monospace', fontWeight: '500' }}>
                  {project.period}
                </span>
              </div>
            </div>

            {/* Lendhome Project Multi-repo menu */}
            {project.title === 'Lendhome' ? (
              <div 
                style={{ position: 'relative', display: 'inline-block' }}
                onMouseEnter={() => setOpenLendhomeGitMenu(true)}
                onMouseLeave={() => setOpenLendhomeGitMenu(false)}
              >
                <GithubIcon 
                  style={{ color: '#475569', cursor: 'pointer', transition: 'color 0.2s', display: 'block' }} 
                  size={24} 
                />

                <div 
                  className={`repo-selector-v2 ${openLendhomeGitMenu ? 'open' : ''}`}
                  style={{
                    opacity: openLendhomeGitMenu ? 1 : 0,
                    transform: openLendhomeGitMenu ? 'translateY(0)' : 'translateY(10px)',
                    pointerEvents: openLendhomeGitMenu ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    position: 'absolute',
                    top: '28px',
                    right: 0,
                    backgroundColor: '#0d1117',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '8px',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    width: '120px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Invisible padding bridge for hover safety */}
                  <div style={{ position: 'absolute', top: '-15px', left: 0, right: 0, height: '15px', cursor: 'default' }} />
                  
                  <a href="https://github.com/Punith8304/lendhome" target="_blank" rel="noreferrer" style={{ display: 'block', textDecoration: 'none', padding: '6px 8px', borderRadius: '4px', transition: 'background-color 0.2s' }} className="selector-link">
                    <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '11px', fontWeight: '600' }}>#</span> <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#94a3b8' }}>Frontend</span>
                  </a>
                  <a href="https://github.com/Punith8304/lendhome-server" target="_blank" rel="noreferrer" style={{ display: 'block', textDecoration: 'none', padding: '6px 8px', borderRadius: '4px', transition: 'background-color 0.2s' }} className="selector-link">
                    <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '11px', fontWeight: '600' }}>#</span> <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#94a3b8' }}>Backend</span>
                  </a>
                  <style>{`
                    .selector-link:hover {
                      background-color: #161b22;
                    }
                    .selector-link:hover span {
                      color: #818cf8 !important;
                    }
                  `}</style>
                </div>
              </div>
            ) : (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#475569', transition: 'all 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#475569')}
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>

          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: '1.8', marginBottom: '36px' }}>
            {project.longDescription}
          </p>

          <div style={{ paddingLeft: '20px', borderLeft: '2px solid rgba(99, 102, 241, 0.4)', margin: '0 0 36px 0' }}>
            <h5 style={{ fontSize: '11px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 16px 0' }}>KEY CONTRIBUTIONS</h5>
            <ul style={{ margin: 0, fontSize: '14px', color: '#64748b', listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', lineHeight: '1.6' }}>
                  <CheckCircle size={16} style={{ color: '#6366f1', marginTop: '3px', flexShrink: 0 }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {project.tech.map(t => (
              <span 
                key={t} 
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  backgroundColor: '#05070f',
                  color: '#a5b4fc',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '1px solid #1e293b',
                  fontWeight: '500'
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ));
  }, [openLendhomeGitMenu]);

  return (
    <div style={{ backgroundColor: '#05070f', color: '#94a3b8', minHeight: '100vh', paddingBottom: '24px' }}>
      <style>{`
        @media (max-width: 1024px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
          .responsive-flex-wrap {
            flex-direction: column !important;
            height: auto !important;
          }
          .responsive-terminal {
            width: 100% !important;
            height: 420px !important;
          }
        }
        @media (max-width: 768px) {
          .header-nav {
            display: none !important;
          }
          .hero-section {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          h2 {
            font-size: 42px !important;
          }
          .project-card {
            min-height: auto !important;
            height: auto !important;
          }
        }
        .portfolio-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 48px 20px 40px;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }
        @media (min-width: 1280px) {
          .portfolio-container {
            padding: 60px 40px 60px;
            gap: 72px;
          }
        }
      `}</style>
      
      {/* Header Area */}
      <header style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.08)', backgroundColor: 'rgba(5, 7, 15, 0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#6366f1', boxShadow: '0 0 12px #6366f1' }} />
            <h1 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '2.5px', color: '#ffffff', fontFamily: 'monospace', textTransform: 'uppercase', margin: 0 }}>
              &lt;akula-punith-kumar /&gt;
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="header-nav">
            <a 
              href="mailto:punithakula1210@gmail.com" 
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '12px', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              <Mail size={16} style={{ color: '#6366f1' }} />
              <span className="hidden md:inline">Email</span>
            </a>
            <a 
              href="tel:+917569639418" 
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '12px', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              <Phone size={16} style={{ color: '#6366f1' }} />
              <span className="hidden md:inline">Call</span>
            </a>

            <a 
              href="https://github.com/Punith8304" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s', fontSize: '12px', fontFamily: 'monospace' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              <GithubIcon size={16} style={{ color: '#6366f1' }} />
              <span className="hidden md:inline">GitHub</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/akula-punith-kumar" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s', fontSize: '12px', fontFamily: 'monospace' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              <LinkedinIcon size={16} style={{ color: '#6366f1' }} />
              <span className="hidden md:inline">LinkedIn</span>
            </a>
            
            <a 
              href="https://example.com/resume.pdf" 
              target="_blank" 
              rel="noreferrer" 
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                color: '#818cf8',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '11px',
                fontFamily: 'monospace',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s',
                fontWeight: '600'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
              }}
            >
              <FileText size={14} /> Resume
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="portfolio-container">
        
        {/* Hero Section */}
        <section className="hero-section" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            <div>
              <p style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '12px', marginBottom: '20px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Software Developer Portfolio
              </p>
              <h2 style={{ fontSize: '64px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 16px 0', lineHeight: '1.1' }}>
                Akula Punith Kumar.
              </h2>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginBottom: '28px', alignItems: 'center' }}>
                <a 
                  href="mailto:punithakula1210@gmail.com" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#818cf8', fontFamily: 'monospace', fontSize: '15px', textDecoration: 'none' }}
                >
                  <Mail size={18} style={{ color: '#6366f1' }} />
                  punithakula1210@gmail.com
                </a>
                <a 
                  href="tel:+917569639418" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#818cf8', fontFamily: 'monospace', fontSize: '15px', textDecoration: 'none' }}
                >
                  <Phone size={18} style={{ color: '#6366f1' }} />
                  +91 7569639418
                </a>
              </div>

              <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '850px', lineHeight: '1.8', margin: 0 }}>
                I am a 2026 Batch Fresher and Full-Stack Developer specializing in the MERN and PERN stacks. 
                With an analytical background in Chemical Engineering from AP IIIT R.K. Valley, I enjoy 
                architecting optimized backend systems and highly responsive client applications.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontFamily: 'monospace', fontSize: '11px' }}>
              <span style={{ backgroundColor: '#0e1726', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '8px', color: '#818cf8', fontWeight: '500' }}># MERN / PERN Stacks</span>
              <span style={{ backgroundColor: '#0e1726', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '8px', color: '#64748b', fontWeight: '500' }}># REST & Real-time Web Systems</span>
              <span style={{ backgroundColor: '#0e1726', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '8px', color: '#64748b', fontWeight: '500' }}># UI/UX & Analytical Debugging</span>
            </div>
          </div>
        </section>

        {/* Dynamic Project Stats */}
        <section style={{ borderTop: '1px solid rgba(148, 163, 184, 0.1)', paddingTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '36px' }}>
            <div>
              <p style={{ fontSize: '38px', fontWeight: '800', color: '#ffffff', fontFamily: 'monospace', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>02+</p>
              <p style={{ fontSize: '10px', color: '#475569', fontFamily: 'monospace', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>Built Applications</p>
            </div>
            <div>
              <p style={{ fontSize: '38px', fontWeight: '800', color: '#ffffff', fontFamily: 'monospace', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>99.9%</p>
              <p style={{ fontSize: '10px', color: '#475569', fontFamily: 'monospace', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>System Uptime</p>
            </div>
            <div>
              <p style={{ fontSize: '38px', fontWeight: '800', color: '#ffffff', fontFamily: 'monospace', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>B.Tech</p>
              <p style={{ fontSize: '10px', color: '#475569', fontFamily: 'monospace', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>AP IIIT R.K. Valley</p>
            </div>
            <div>
              <p style={{ fontSize: '38px', fontWeight: '800', color: '#ffffff', fontFamily: 'monospace', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>2026</p>
              <p style={{ fontSize: '10px', color: '#475569', fontFamily: 'monospace', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>Batch Fresher</p>
            </div>
        </section>

        {/* Core Qualifications Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0 }}>
            <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '13px', marginRight: '12px' }}>01.</span> CORE QUALIFICATIONS
          </h3>
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '36px' }}>
            {[
              { 
                title: 'Architect & Build', 
                desc: 'Build modular, scalable React codebases. Implement highly responsive component hierarchies, and integrate front-end architectures with efficient back-end REST APIs.', 
                icon: <Layout size={36} style={{ color: '#6366f1', marginBottom: '36px' }} /> 
              },
              { 
                title: 'Problem Solving & Debugging', 
                desc: 'Apply analytical techniques from technical academic engineering projects to identify bugs, optimize data processing, and streamline user workflows.', 
                icon: <Cpu size={36} style={{ color: '#6366f1', marginBottom: '36px' }} /> 
              },
              { 
                title: 'Security & Session Management', 
                desc: 'Implement secure route access, user session verification using JSON Web Tokens (JWT), and maintain high privacy standards.', 
                icon: <ShieldCheck size={36} style={{ color: '#6366f1', marginBottom: '36px' }} /> 
              }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(10px)',
                  padding: '48px',
                  borderRadius: '16px',
                  borderColor: '#1e293b',
                  borderWidth: '1px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '320px',
                  transition: 'border-color 0.3s'
                }}
                className="hover:border-slate-700"
              >
                <div>
                  {item.icon}
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', margin: '0 0 16px 0', letterSpacing: '0.5px' }}>{item.title}</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.8', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Arsenal Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0 }}>
            <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '13px', marginRight: '12px' }}>02.</span> TECHNICAL ARSENAL
          </h3>
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px' }}>
            {SKILLS_DATA.map((skill, i) => (
              <div 
                key={i}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(30, 41, 59, 0.5)',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>{skill.name}</div>
                <div style={{ fontSize: '10px', color: '#6366f1', fontFamily: 'monospace', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{skill.category}</div>
                <div style={{ height: '5px', width: '100%', backgroundColor: '#05070f', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div 
                    style={{
                      height: '100%',
                      width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : '60%',
                      backgroundColor: '#818cf8',
                      borderRadius: '9999px'
                    }} 
                  />
                </div>
                <div style={{ fontSize: '9px', color: '#475569', fontFamily: 'monospace', marginTop: '16px', textTransform: 'uppercase' }}>{skill.level}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0 }}>
            <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '13px', marginRight: '12px' }}>03.</span> FEATURED PROJECTS
          </h3>
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(560px, 1fr))', gap: '48px' }}>
            {renderedProjects}
          </div>
        </section>

        {/* Education and Personal Background Section */}
        <section className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0 }}>
              <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '13px', marginRight: '12px' }}>04.</span> EDUCATION
            </h3>
            <div 
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '44px',
                borderRadius: '16px',
                border: '1px solid #334155',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', gap: '32px' }}>
                <GraduationCap style={{ color: '#6366f1', flexShrink: 0 }} size={42} />
                <div>
                  <h4 style={{ fontSize: '17px', color: '#ffffff', fontWeight: '700', margin: '0 0 8px 0' }}>AP IIIT, R.K. Valley</h4>
                  <p style={{ fontSize: '11px', color: '#6366f1', fontFamily: 'monospace', marginBottom: '32px', letterSpacing: '0.5px' }}>July 2022 - Current | Kadapa, AP</p>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.8', margin: 0 }}>
                    B.Tech. in Chemical Engineering. I balance analytical industrial engineering concepts 
                    with web application development.
                  </p>
                </div>
              </div>
              <span style={{ fontSize: '10px', color: '#334155', fontFamily: 'monospace', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                # EDUCATION HISTORY
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0 }}>
              <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '13px', marginRight: '12px' }}>05.</span> INTERESTS & FOCUS
            </h3>
            <div 
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '44px',
                borderRadius: '16px',
                border: '1px solid #334155',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <Video size={20} style={{ color: '#6366f1', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>Filmmaking & Video Editing</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>I apply storytelling techniques to UI/UX design components.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                  <BookOpen size={20} style={{ color: '#6366f1', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>Teaching & Mentoring</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>I am passionate about breaking down technical architectures.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                  <Award size={20} style={{ color: '#6366f1', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>Algorithmic Optimization</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Interested in data structures and architecture schema design.</div>
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '10px', color: '#334155', fontFamily: 'monospace', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                # PERSONAL ATTRIBUTES
              </span>
            </div>
          </div>

        </section>

        {/* Interactive Terminal Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0 }}>
            <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '13px', marginRight: '12px' }}>06.</span> INTERACTIVE TERMINAL
          </h3>
          
          <div className="responsive-flex-wrap" style={{ display: 'flex', flexDirection: 'row', gap: '36px', height: '420px' }}>
            
            <div 
              className="responsive-terminal"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '44px',
                borderRadius: '16px',
                border: '1px solid #334155',
                width: '32%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '32px' }}>
                  <TermIcon size={26} style={{ color: '#6366f1' }} />
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#ffffff', fontFamily: 'monospace', letterSpacing: '2px' }}>
                    TERMINAL DETAILS
                  </span>
                </div>

                <h4 style={{ fontSize: '17px', color: '#ffffff', fontWeight: '700', margin: '0 0 8px 0' }}>Akula Punith Kumar</h4>
                <p style={{ fontSize: '11px', color: '#6366f1', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '20px' }}>
                  SOFTWARE DEVELOPER / 2026 BATCH
                </p>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  This interface lets you explore technical parameters. Type keywords such as <span style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>skills</span> or <span style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>projects</span> to begin.
                </p>
              </div>

              <div style={{ fontSize: '10px', color: '#475569', fontFamily: 'monospace', paddingTop: '20px', borderTop: '1px solid rgba(148, 163, 184, 0.1)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Coffee size={16} style={{ color: '#6366f1' }} />
                <span>ENVIRONMENT IS READY</span>
              </div>
            </div>

            <div 
              className="responsive-terminal"
              style={{
                backgroundColor: '#0d1321',
                border: '1px solid #1e293b',
                borderRadius: '16px',
                padding: '32px',
                width: '68%',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'monospace',
                fontSize: '13px',
                height: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '24px' }} className="scrollbar-thin">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} style={{ color: '#94a3b8', lineHeight: '1.8', marginBottom: '8px', whiteSpace: 'pre-wrap' }}>
                    {line}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', gap: '18px', borderTop: '1px solid rgba(148, 163, 184, 0.1)', paddingTop: '24px' }}>
                <ChevronRight style={{ color: '#6366f1' }} size={18} />
                <input 
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a command (e.g., help, contact)..."
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    width: '100%'
                  }}
                />
              </form>
            </div>
          </div>
        </section>

      </div>

      {/* Footer Area */}
      <footer style={{ padding: '20px 40px', borderTop: '1px solid rgba(148, 163, 184, 0.06)', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', fontFamily: 'monospace', color: '#475569', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0 }}>
          &copy; {new Date().getFullYear()} Designed and Built by Akula Punith Kumar. All rights reserved.
        </p>
      </footer>
    </div>
  );
}