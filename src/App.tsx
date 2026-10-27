import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  Asterisk,
  Check,
  ChevronDown,
  Code2,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { portfolio as p } from "./content";
import type { Project } from "./content";
import { Pointer, Reveal, useTilt } from "./Interactions";

const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Toolkit" },
  { id: "journey", label: "Journey" },
];

function Modal({
  title,
  children,
  close,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="modal-inner">
        <button
          ref={closeButton}
          className="icon-button modal-close"
          onClick={close}
          aria-label="Close dialog"
        >
          <X size={22} />
        </button>
        <span className="eyebrow">A CLOSER LOOK</span>
        <h2 id="dialog-title">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}

function Orbital({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`orbital ${small ? "orbital-small" : ""}`}
      aria-hidden="true"
    >
      <div className="orbit-halo" />
      <div className="orbit-axis axis-x" />
      <div className="orbit-axis axis-y" />
      <div className="orbit-sphere">
        {Array.from({ length: 13 }, (_, i) => (
          <i
            key={i}
            style={{ transform: `translate(-50%, -50%) rotateY(${i * 14}deg)` }}
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <b
            key={i}
            style={{
              top: `${10 + i * 10}%`,
              width: `${Math.sqrt(1 - ((i - 4) / 5) ** 2) * 100}%`,
              height: `${16 + Math.abs(i - 4) * 2}%`,
            }}
          />
        ))}
      </div>
      <div className="orbit-ring ring-one" />
      <div className="orbit-ring ring-two" />
      <div className="orbit-ring ring-three" />
      <div className="orbit-point point-one" />
      <div className="orbit-point point-two" />
      <div className="orbit-core">
        <Asterisk strokeWidth={1} />
      </div>
      {!small && (
        <>
          <span className="orbit-coord coord-top">FIG. 001 — POSSIBILITY</span>
          <span className="orbit-coord coord-bottom">BUILT TO EXPLORE ↗</span>
          <span className="orbit-cross cross-one">+</span>
          <span className="orbit-cross cross-two">+</span>
        </>
      )}
    </div>
  );
}

function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "interface")
    return (
      <div className="project-art interface-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="interface-window">
          <div className="window-top">
            <span />
            <span />
            <span />
            <i />
          </div>
          <div className="window-body">
            <div className="mini-sidebar">
              <b />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="mini-main">
              <span className="mini-label">FORM / FUNCTION</span>
              <div className="mini-title">
                Less, but
                <br />
                <em>better.</em>
              </div>
              <div className="mini-rule" />
              <div className="mini-bottom">
                <span>CONCEPTUAL PROJECT ART</span>
                <ArrowUpRight />
              </div>
            </div>
          </div>
        </div>
        <span className="art-coordinate">X: 024 — Y: 096</span>
      </div>
    );
  if (kind === "system")
    return (
      <div className="project-art system-art" aria-hidden="true">
        <div className="art-grid" />
        <svg viewBox="0 0 500 340" className="system-svg">
          <defs>
            <linearGradient id="flow">
              <stop stopColor="#687cfa" />
              <stop offset="1" stopColor="#b9c0ff" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#flow)" strokeWidth="1">
            <path d="M100 100H200Q250 100 250 170T300 240H400" />
            <path d="M100 240H200Q250 240 250 170T300 100H400" />
            <path d="M100 170H400" />
          </g>
          <g fill="#171925" stroke="#6c72a0">
            <rect x="67" y="70" width="64" height="60" rx="12" />
            <rect x="67" y="140" width="64" height="60" rx="12" />
            <rect x="67" y="210" width="64" height="60" rx="12" />
            <rect x="369" y="70" width="64" height="60" rx="12" />
            <rect x="369" y="140" width="64" height="60" rx="12" />
            <rect x="369" y="210" width="64" height="60" rx="12" />
          </g>
          <g
            fill="#aeb6fc"
            fontFamily="monospace"
            fontSize="20"
            textAnchor="middle"
          >
            <text x="99" y="107">
              {"{ }"}
            </text>
            <text x="99" y="177">
              ↗
            </text>
            <text x="99" y="247">
              &lt;/&gt;
            </text>
            <text x="401" y="107">
              01
            </text>
            <text x="401" y="177">
              ∞
            </text>
            <text x="401" y="247">
              ⌘
            </text>
          </g>
          <circle cx="250" cy="170" r="35" fill="#b2b9fc" />
          <path
            d="m238 170 9 9 17-18"
            fill="none"
            stroke="#1c2038"
            strokeWidth="3"
          />
        </svg>
        <span className="art-coordinate">CONNECTED BY DESIGN</span>
      </div>
    );
  return (
    <div className="project-art experiment-art" aria-hidden="true">
      <div className="experiment-disc">
        {Array.from({ length: 16 }, (_, i) => (
          <i key={i} style={{ transform: `rotate(${i * 11.25}deg)` }} />
        ))}
        <span>PREP.</span>
      </div>
      <span className="art-coordinate">
        CRACKIT AI / PREPARE WITH PURPOSE ↗
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  open,
}: {
  project: Project;
  index: number;
  open: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref);
  return (
    <Reveal
      className={`project-wrap project-wrap-${index}`}
      delay={index * 0.07}
    >
      <div ref={ref} className="project-card">
        <button
          className="project-open"
          onClick={open}
          data-cursor="Explore"
          aria-label={`Explore ${project.title}`}
        >
          <ProjectVisual kind={project.visual} />
          <span className="project-float">
            <ArrowUpRight size={25} />
          </span>
        </button>
        <div className="project-meta">
          <span>{project.category}</span>
          <span>
            {project.draft
              ? "CONTENT PENDING"
              : project.technologies.slice(0, 2).join(" / ")}
          </span>
        </div>
        <button className="project-title" onClick={open}>
          <h3>{project.title}</h3>
          <ArrowUpRight size={22} />
        </button>
        <p>{project.description}</p>
      </div>
    </Reveal>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const [modal, setModal] = useState<"resume" | "contact" | Project | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  const closeModal = () => {
    setModal(null);
    setCopied(false);
  };
  useEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>("main > section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 700) setMenu(false);
    };
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [menu]);
  const copyEmail = async () => {
    if (!p.email) return;
    try {
      await navigator.clipboard.writeText(p.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Pointer />
      <div className="page-spotlight" aria-hidden="true" />
      <motion.div
        className="scroll-progress"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
        aria-hidden="true"
      />
      <header className="header">
        <a href="#home" className="brand">
          <span className="brand-symbol" aria-hidden="true">
            {p.monogram}
            <span>↗</span>
          </span>
          <span className="brand-name">
            {p.name}
            <span aria-hidden="true">PERSONAL PORTFOLIO</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <a
              key={item.id}
              className={active === item.id ? "active" : ""}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-contact">
          Let’s talk <ArrowUpRight size={16} />
        </a>
        <button
          id="menu-toggle"
          className="menu-toggle icon-button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="mobile-navigation"
          aria-label={menu ? "Close navigation" : "Open navigation"}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <AnimatePresence>
          {menu && (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
            >
              {[...nav, { id: "contact", label: "Let’s talk" }].map(
                (item, i) => (
                  <a
                    href={`#${item.id}`}
                    key={item.id}
                    onClick={() => setMenu(false)}
                  >
                    <span>0{i + 1}</span>
                    {item.label}
                    <ArrowUpRight />
                  </a>
                ),
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        <section id="home" className="hero section-shell">
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="status-dot" />
              {p.role}
            </span>
            <span className="hero-edition">
              INDEPENDENT BY DESIGN / VOL. 01
            </span>
          </div>
          <div className="hero-content">
            <div className="hero-copy">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="hero-intro"
              >
                Hello, I’m {p.firstName}. <span className="intro-dash" />
              </motion.p>
              <h1>
                {p.headline.map((line, i) => (
                  <span className={`headline-mask line-${i}`} key={line}>
                    <motion.span
                      initial={reduce ? false : { y: "115%", rotate: 3 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{
                        delay: 0.15 + i * 0.12,
                        duration: 0.95,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {line}
                      {i === 1 && (
                        <span className="headline-star" aria-hidden="true">
                          ✳
                        </span>
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <p className="hero-description">{p.introduction}</p>
                <div className="hero-actions">
                  <a
                    className="button button-primary"
                    href="#work"
                    data-cursor="Explore"
                  >
                    Explore my work <ArrowUpRight size={19} />
                  </a>
                  {p.resumeUrl ? (
                    <a
                      className="button button-text"
                      href={p.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View resume <ArrowUpRight size={17} />
                    </a>
                  ) : (
                    <button
                      className="button button-text"
                      onClick={() => setModal("resume")}
                    >
                      View resume <ArrowUpRight size={17} />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
            <motion.div
              className="hero-art"
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              <Orbital />
              <span className="art-side-label">LOGIC MEETS IMAGINATION</span>
            </motion.div>
          </div>
          <div className="hero-bottom">
            <a href="#work" className="scroll-cue">
              <span className="scroll-cue-icon">
                <ArrowDown size={16} />
              </span>
              SCROLL TO DISCOVER
            </a>
            <span className="hero-footnote">
              <span>THOUGHTFULLY DESIGNED.</span> CAREFULLY BUILT.
            </span>
            <span className="section-index">01 — 06</span>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                A LITTLE LOGIC <Asterisk /> A LOT OF CURIOSITY <Asterisk />{" "}
                ALWAYS EXPLORING <Asterisk />
              </span>
            ))}
          </div>
        </div>

        <section id="work" className="work section-shell section-space">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="section-number">01 /</span> SELECTED WORK
              </span>
              <h2>
                Made with intent.
                <br />
                <span className="muted">Built to be explored.</span>
              </h2>
            </div>
            <p className="heading-aside">
              From a freelancer platform
              <br />
              to thoughtful backend systems.
              <br />A few things I’ve built.
              <ArrowDown size={22} />
            </p>
          </Reveal>
          {p.profilePending && (
            <div className="draft-note">
              <span className="status-dot" />
              <span>
                PROJECT PREVIEW{" "}
                <span className="draft-note-detail">
                  — Original visual studies. Real project details coming with
                  your resume.
                </span>
              </span>
            </div>
          )}
          <div className="projects-grid">
            {p.projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                open={() => setModal(project)}
              />
            ))}
          </div>
          <div className="work-footer">
            <span>Good work starts with a good question.</span>
            <a className="text-link" href="#contact">
              Have one in mind? <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <section id="about" className="about section-shell section-space">
          <Reveal className="about-top">
            <span className="eyebrow">
              <span className="section-number">02 /</span> THE HUMAN SIDE
            </span>
            <span className="mini-caption">BEYOND THE CODE</span>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-title">
              <h2>
                {p.about.split("pixels.")[0]}
                <span>pixels.</span>
              </h2>
              <div className="about-signature">
                <Asterisk size={45} strokeWidth={1} />
                <span>
                  AN OPEN MIND.
                  <br />A WORK IN PROGRESS.
                </span>
              </div>
            </Reveal>
            <div className="about-body">
              <Reveal>
                <span className="about-marker">HELLO, AGAIN.</span>
                <p className="about-lead">{p.biography}</p>
                <p className="content-note">{p.biographyNote}</p>
              </Reveal>
              <Reveal className="about-facts">
                <div>
                  <span>01 — BASED IN</span>
                  <p>{p.location || "Location to be added"}</p>
                </div>
                <div>
                  <span>02 — FOCUS</span>
                  <p>
                    {p.availability || "Professional direction to be added"}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="skills section-shell section-space">
          <Reveal className="section-heading compact">
            <div>
              <span className="eyebrow">
                <span className="section-number">03 /</span> THE TOOLKIT
              </span>
              <h2>
                Tools for the
                <br />
                <span className="muted">possibilities.</span>
              </h2>
            </div>
            <p className="heading-aside">
              From interface to infrastructure.
              <br />A practical toolkit for building
              <br />
              across the full stack.
            </p>
          </Reveal>
          <div className="skill-groups">
            {p.skills.map((skill, i) => (
              <Reveal key={skill.group} delay={i * 0.05}>
                <div className="skill-group">
                  <span className="skill-number">0{i + 1}</span>
                  <h3>{skill.group}</h3>
                  <div className="skill-chips">
                    {skill.items.length ? (
                      skill.items.map((item) => (
                        <span className="chip" key={item}>
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="skill-placeholder">
                        Awaiting resume <Plus size={15} />
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="built-with">
            <Code2 size={17} />
            <span>This website is built with</span>
            <span>React</span>
            <span>TypeScript</span>
            <span>Motion</span>
            <span>CSS & SVG</span>
          </div>
        </section>

        <section id="journey" className="journey section-shell section-space">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="section-number">04 /</span> THE JOURNEY
              </span>
              <h2>Always becoming.</h2>
            </div>
            <p className="heading-aside">
              A collection of chapters.
              <br />
              Each one shaping the next.
            </p>
          </Reveal>
          <div className="journey-grid">
            <Reveal>
              <div className="journey-label">
                <span>01</span>
                <h3>Experience</h3>
                <ArrowDown size={18} />
              </div>
              <div className="timeline">
                {p.experience.length ? (
                  p.experience.map((item) => (
                    <div
                      className="timeline-item"
                      key={item.title + item.company}
                    >
                      <span className="timeline-dot" />
                      <span className="eyebrow">{item.dates}</span>
                      <h4>{item.title}</h4>
                      <span>{item.company}</span>
                      <p>{item.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="timeline-item">
                    <span className="timeline-dot" />
                    <span className="eyebrow">YOUR STORY GOES HERE</span>
                    <h4>
                      The work. The growth.
                      <br />
                      The lessons along the way.
                    </h4>
                    <p>
                      Roles, organizations, dates, and responsibilities will
                      appear here once your resume is provided.
                    </p>
                    <span className="pending-label">
                      EXPERIENCE DETAILS PENDING
                    </span>
                  </div>
                )}
              </div>
              <div className="certification-block">
                <h3>Continuing the learning.</h3>
                {p.certifications.map((item) => (
                  <div className="certification-row" key={item.title}>
                    <span>
                      {item.url ? (
                        <a
                          className="text-link"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.title}
                          <ArrowUpRight size={12} />
                        </a>
                      ) : (
                        item.title
                      )}
                    </span>
                    <span>
                      {item.issuer}
                      {item.date && ` / ${item.date}`}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="journey-label">
                <span>02</span>
                <h3>Education & learning</h3>
                <ArrowDown size={18} />
              </div>
              <div className="timeline">
                {p.education.length ? (
                  p.education.map((item) => (
                    <div className="timeline-item" key={item.title}>
                      <span className="timeline-dot" />
                      <span className="eyebrow">{item.dates}</span>
                      <h4>{item.title}</h4>
                      <span>{item.institution}</span>
                      <p>{item.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="timeline-item">
                    <span className="timeline-dot" />
                    <span className="eyebrow">THE FOUNDATIONS</span>
                    <h4>
                      Curiosity doesn’t
                      <br />
                      have a finish line.
                    </h4>
                    <p>
                      Education, institutions, dates, and verified
                      certifications will be added from your resume.
                    </p>
                    <span className="pending-label">
                      EDUCATION DETAILS PENDING
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="contact section-shell section-space">
          <Reveal>
            <div className="contact-top">
              <span className="eyebrow">
                <span className="section-number">05 /</span> START A
                CONVERSATION
              </span>
              <span className="contact-spark" aria-hidden="true">
                ✳
              </span>
            </div>
            <h2>
              Something good
              <br />
              starts with <span>hello.</span>
            </h2>
            <div className="contact-bottom">
              <p>
                Have an idea worth exploring?
                <br />
                Let’s see where a conversation takes us.
              </p>
              {p.email ? (
                <a
                  className="contact-cta"
                  href={`mailto:${p.email}`}
                  data-cursor="Say hello"
                >
                  Let’s talk <ArrowUpRight />
                </a>
              ) : (
                <button
                  className="contact-cta"
                  onClick={() => setModal("contact")}
                  data-cursor="Say hello"
                >
                  Let’s talk <ArrowUpRight />
                </button>
              )}
            </div>
          </Reveal>
          <div className="contact-links">
            {p.resumeUrl && (
              <a
                className="text-link"
                href={p.resumeUrl}
                download="N-Siva-Bhadra-Resume.pdf"
              >
                <FileText size={16} /> Download resume <ArrowDown size={14} />
              </a>
            )}
            {p.email && (
              <button className="text-link copy-email" onClick={copyEmail}>
                {copied ? <Check size={16} /> : <Mail size={16} />}{" "}
                {copied ? "Copied!" : "Copy email"}
              </button>
            )}
            {p.github && (
              <a
                className="text-link"
                href={p.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub <ArrowUpRight size={14} />
              </a>
            )}
            {p.linkedin && (
              <a
                className="text-link"
                href={p.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
              </a>
            )}
            {p.email && (
              <a className="text-link" href={`mailto:${p.email}`}>
                <Mail size={16} /> Email <ArrowUpRight size={14} />
              </a>
            )}
            {!p.email && !p.github && !p.linkedin && (
              <span className="content-note">
                Contact links awaiting your details.
              </span>
            )}
          </div>
        </section>
      </main>
      <footer className="footer section-shell">
        <a href="#home" className="footer-brand">
          {p.monogram}
          <ArrowUpRight size={15} />
        </a>
        <span>
          © {new Date().getFullYear()} {p.name}. Made with intention.
        </span>
        <a href="#home" className="back-top">
          BACK TO TOP <ArrowUp size={16} />
        </a>
      </footer>

      {modal && (
        <Modal
          title={
            typeof modal === "object"
              ? modal.title
              : modal === "resume"
                ? "A little more to the story."
                : "Let’s make the connection."
          }
          close={closeModal}
        >
          {modal === "resume" ? (
            <>
              <FileText
                className="modal-illustration"
                size={42}
                strokeWidth={1}
              />
              <p>
                The resume hasn’t been supplied yet. Once it’s added, this
                button will open the actual document.
              </p>
              <div className="modal-note">
                CONTENT PENDING — Add your public resume file and set{" "}
                <code>resumeUrl</code> in the content configuration.
              </div>
              <button className="button button-primary" onClick={closeModal}>
                Back to exploring <ArrowRight size={18} />
              </button>
            </>
          ) : modal === "contact" ? (
            <>
              <p>
                Contact details haven’t been supplied yet. Add your email and
                professional profiles to enable direct links here.
              </p>
              <div className="modal-note">
                No messages are collected or sent by this preview.
              </div>
              <button className="button button-primary" onClick={closeModal}>
                Keep exploring <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <>
              <div className="modal-art">
                <ProjectVisual kind={modal.visual} />
                <div className="project-art-note">
                  Original conceptual artwork — not a product screenshot.
                </div>
              </div>
              <span className="pending-label">
                {modal.draft
                  ? "PROJECT SLOT — NOT A CLAIM OF COMPLETED WORK"
                  : modal.category}
              </span>
              <p>{modal.description}</p>
              <h3>Contribution</h3>
              <p>{modal.contribution}</p>
              {!!modal.technologies.length && (
                <div className="skill-chips">
                  {modal.technologies.map((tech) => (
                    <span className="chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="modal-actions">
                {modal.demo && (
                  <a
                    className="button button-primary"
                    href={modal.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live project <ArrowUpRight size={16} />
                  </a>
                )}
                {modal.repository && (
                  <a
                    className="button button-text"
                    href={modal.repository}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={17} /> Repository
                  </a>
                )}
                {!modal.demo && !modal.repository && (
                  <div>
                    <p className="content-note">
                      Demo and repository links are not listed in the resume.
                    </p>
                    {p.github && (
                      <a
                        className="text-link"
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={16} /> Explore my GitHub{" "}
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {modal === "contact" && p.email && (
            <button className="button button-text" onClick={copyEmail}>
              {copied ? <Check size={16} /> : <Mail size={16} />}
              {copied ? "Email copied" : "Copy email"}
            </button>
          )}
        </Modal>
      )}
      <a
        className="floating-next"
        href="#work"
        aria-label="Explore selected work"
      >
        <ChevronDown size={18} />
      </a>
    </>
  );
}
