/** All personal content lives here. Null values never create dead links.
 * Personal content is based on the supplied resume; unconfirmed dates are explicit.
 * Project visuals are original abstract artwork, not screenshots of claimed work.
 */
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  contribution: string;
  technologies: string[];
  visual: "interface" | "system" | "experiment";
  demo: string | null;
  repository: string | null;
  draft: boolean;
}

export const portfolio = {
  name: "N Siva Bhadra",
  firstName: "Siva Bhadra",
  monogram: "SB",
  profilePending: false,
  introduction:
    "Full-stack development. Thoughtful APIs. Systems that scale. I connect the interface to the infrastructure.",
  role: "Full-stack developer",
  headline: ["Ideas into", "scalable", "systems."],
  about: "The person behind the pixels.",
  biography:
    "I’m Siva Bhadra, a computer science graduate building across the full stack. At Miebach Consulting, I work on warehouse management systems — connecting client-facing features, distributed services, and the data that keeps operations moving.",
  biographyNote:
    "Outside the code: student leadership, badminton, and a curiosity that reaches from cloud computing to cybersecurity. I speak English, Telugu, and Hindi.",
  resumeUrl: "/resume.pdf" as string | null,
  email: "sivanibhadra@gmail.com" as string | null,
  github: "https://github.com/sivabhadra2911" as string | null,
  linkedin: "https://www.linkedin.com/in/siva-bhadra-9620a925b/" as string | null,
  location: "Bangalore, Karnataka" as string | null,
  availability: "Full-stack systems & backend engineering" as string | null,
  projects: [
    {
      id: "01",
      title: "SkillSpace",
      category: "01 / FULL-STACK PLATFORM",
      description:
        "A shared space for freelancers and recruiters, with personalized dashboards, scheduling, and a collaborative community.",
      contribution:
        "Developed the MERN platform, designed dashboards with scheduling and task management, and integrated job tracking, performance insights, and community features.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      visual: "interface",
      demo: null,
      repository: null,
      draft: false,
    },
    {
      id: "02",
      title: "TeamPulse",
      category: "02 / WELLNESS & CONNECTION",
      description:
        "An employee wellness bot that brings mood check-ins and meaningful team insights directly into Slack.",
      contribution:
        "Built the Node.js and TypeScript REST API for Slack slash commands. Modeled mood and session data in PostgreSQL with Sequelize, cached sessions and trends with Redis, and tested scoring and aggregation with Jest. Used scoped access and anonymized aggregation to protect sensitive data.",
      technologies: [
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "Sequelize",
        "Node.js",
        "Jest",
      ],
      visual: "system",
      demo: null,
      repository: null,
      draft: false,
    },
    {
      id: "03",
      title: "CrackIt AI",
      category: "03 / AI INTERVIEW PREPARATION",
      description:
        "From the next application to the next interview. On-demand, company- and role-specific questions, tips, and preparation topics.",
      contribution:
        "Built an AI-powered interview-prep REST API. Persisted generated content in PostgreSQL through Sequelize, used Redis caching and rate limiting to control repeated requests, structured LLM responses as parseable JSON, and tested caching and request handling with Jest.",
      technologies: [
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "LLM integration",
        "Jest",
      ],
      visual: "experiment",
      demo: null,
      repository: null,
      draft: false,
    },
  ] satisfies Project[],
  experience: [
    {
      title: "Associate IT Consultant",
      company: "Miebach Consulting · Bangalore, Karnataka",
      dates: "DATES TO BE CONFIRMED",
      description:
        "Develop and enhance warehouse management features within a full-stack, microservices architecture. Deploy and maintain services on AWS and Azure, optimize PostgreSQL data models and queries, and investigate discrepancies across distributed services. Collaborate on code reviews, architecture, releases, and monitoring.",
    },
  ] as { title: string; company: string; dates: string; description: string }[],
  skills: [
    {
      group: "Languages",
      items: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript"],
    },
    { group: "Frontend", items: ["React", "HTML5", "CSS3"] },
    {
      group: "Backend & APIs",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "Sequelize",
        "JWT",
        "Microservices",
      ],
    },
    {
      group: "Databases",
      items: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "Firebase"],
    },
    {
      group: "Cloud & tools",
      items: [
        "AWS",
        "Azure",
        "Docker",
        "Git",
        "GitHub",
        "CI/CD",
        "Postman",
        "Unit testing",
      ],
    },
    {
      group: "Foundations",
      items: ["DSA", "OOP", "DBMS", "System design", "Agile", "SDLC"],
    },
    { group: "Platforms", items: ["ServiceNow", "Salesforce", "Power BI"] },
  ],
  education: [
    {
      title: "B.Tech, Computer Science & Engineering",
      institution: "SRM Institute of Science and Technology",
      dates: "2022 — 2026",
      description:
        "CGPA: 9.01 · SRM Merit Scholarship. Committee Head, Directorate of Student Affairs. Flipkart Grid 5.0 participant.",
    },
    {
      title: "Sri Chaitanya Junior College",
      institution: "Junior college",
      dates: "2022",
      description: "81.1%",
    },
    {
      title: "Sri Chaitanya Techno School",
      institution: "School education",
      dates: "2020",
      description: "96.33%",
    },
  ] as {
    title: string;
    institution: string;
    dates: string;
    description: string;
  }[],
  certifications: [
    { title: "Cloud Computing", issuer: "Oracle", date: "", url: null },
    {
      title: "Foundations of Cybersecurity",
      issuer: "Coursera",
      date: "",
      url: null,
    },
    {
      title: "ServiceNow System Administrator",
      issuer: "ServiceNow",
      date: "",
      url: null,
    },
    { title: "Cisco Networking", issuer: "Cisco", date: "", url: null },
    {
      title: "Salesforce AI Associate",
      issuer: "Salesforce",
      date: "",
      url: null,
    },
  ] as { title: string; issuer: string; date: string; url: string | null }[],
};
