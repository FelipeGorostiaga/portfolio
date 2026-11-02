export type Job = {
  role: string;
  company: string;
  companyUrl: string;
  /** Logo under /public; the `mark` letters show when there is none. */
  logo?: string;
  mark: string;
  /** 'YYYY-MM' */
  start: string;
  /** 'YYYY-MM', or null while the job is current. */
  end: string | null;
  summary: string;
  bullets: string[];
  tags: string[];
};

// Newest first. Copy drafted in docs/superpowers/specs/2026-10-31-portfolio-redesign-design.md §4.
export const jobs: Job[] = [
  {
    role: 'Senior React Software Engineer',
    company: 'Humand',
    companyUrl: 'https://humand.co/',
    logo: '/humand.png',
    mark: 'hu',
    start: '2024-02',
    end: null,
    summary: 'Senior front-end engineer on the Humand employee-experience platform.',
    bullets: [
      'Drive key technical decisions for the Service Management, Forms and Surveys modules, used by millions of people around the world.',
      'Build responsive, accessible features for the web and admin apps with React, TypeScript and Material UI, and contribute to the design system they share.',
      'Lead framework upgrades across the apps, such as the move from React Query v3 to v5.',
      'Mentor colleagues and review pull requests to keep the codebase healthy.',
      'Interview engineering candidates and help grow the team.',
    ],
    tags: ['React', 'TypeScript', 'Material UI', 'React Query'],
  },
  {
    role: 'Prompt Engineer',
    company: 'Scale AI (freelance)',
    companyUrl: 'https://scale.com/',
    logo: '/logos/scale-logo.svg',
    mark: 'sc',
    start: '2023-06',
    end: '2024-02',
    summary: 'Freelance reviewer and task writer for LLM training data.',
    bullets: [
      'Reviewed model answers to computer-science and STEM prompts for correctness, reasoning and clarity.',
      'Rewrote weak responses into reference-quality answers.',
      'Wrote prompts and evaluation criteria that expose where models fail.',
    ],
    tags: ['AI', 'Prompt Engineering', 'LLM evaluation', 'Computer Science'],
  },
  {
    role: 'Senior Fullstack Developer',
    company: 'Banco Galicia',
    companyUrl: 'https://www.galicia.ar/empresas',
    logo: '/logos/galicia-logo.png',
    mark: 'bg',
    start: '2023-03',
    end: '2024-02',
    summary: "Transactional team of the bank's B2B web platform.",
    bullets: [
      "Built React screens that match the design team's high-fidelity specs.",
      'Created configurable components shared by several teams in a micro-frontend architecture.',
      'Developed, tested and deployed NestJS microservices with a focus on the security of transactional flows.',
    ],
    tags: ['React', 'NestJS', 'Next.js', 'Micro-frontends'],
  },
  {
    role: 'Backend Developer',
    company: 'Banco Galicia',
    companyUrl: 'https://www.galicia.ar/empresas',
    logo: '/logos/galicia-logo.png',
    mark: 'bg',
    start: '2022-11',
    end: '2023-03',
    summary: "Core team of the bank's B2B mobile app.",
    bullets: [
      'Designed, tested and deployed the NestJS microservices behind the mobile app.',
      'Shaped the technical decisions of its backend-for-frontend (BFF) layer.',
    ],
    tags: ['NestJS', 'Microservices', 'BFF'],
  },
  {
    role: 'Software Engineer',
    company: 'Dome.xyz (freelance)',
    companyUrl: 'https://www.mydome.xyz',
    logo: '/logos/dome-logo.svg',
    mark: 'do',
    start: '2022-04',
    end: '2022-12',
    summary: 'Lead developer of a four-person team at a crypto startup.',
    bullets: [
      'Designed the architecture around cost, scalability and performance.',
      'Built the REST API, the web app, scheduled jobs and serverless functions.',
      'Integrated several web3 providers and APIs.',
      'Ran the infrastructure on AWS and Vercel and advised on UI/UX.',
    ],
    tags: ['NestJS', 'Next.js', 'PostgreSQL', 'AWS', 'Vercel'],
  },
  {
    role: 'Junior Developer',
    company: 'Banco Galicia',
    companyUrl: 'https://www.galicia.ar/empresas',
    logo: '/logos/galicia-logo.png',
    mark: 'bg',
    start: '2021-12',
    end: '2022-11',
    summary: "Core team of the bank's B2B web platform.",
    bullets: ['Built React components for the business web app.', 'Developed, tested and deployed NestJS microservices.'],
    tags: ['React', 'NestJS', 'Next.js'],
  },
  {
    role: 'Business Intelligence Developer',
    company: 'Bolsas y Mercados Argentinos (BYMA)',
    companyUrl: 'https://www.byma.com.ar/',
    logo: '/logos/byma-logo.png',
    mark: 'by',
    start: '2020-06',
    end: '2020-12',
    summary: "Investor relations team at Argentina's stock exchange.",
    bullets: [
      'Built interactive dashboards on historical market activity.',
      "Wrote scheduled jobs that parse each day's market data.",
      'Helped analyze and present the quarterly reports.',
    ],
    tags: ['Python', 'Power BI'],
  },
];
