export type Skill = {
  /** Periodic-table motif, not a ranking. */
  number: string;
  category: string;
  symbol: string;
  name: string;
  description: string;
};

// From docs/design/Main.dc.html (Skills section).
export const skills: Skill[] = [
  {
    number: '01',
    category: 'Frontend',
    symbol: 'Re',
    name: 'React',
    description: 'Declarative UIs built from small, composable components.',
  },
  {
    number: '02',
    category: 'Framework',
    symbol: 'Nx',
    name: 'Next.js',
    description: 'Full-stack React with nested routing, middleware and multiple rendering strategies.',
  },
  {
    number: '03',
    category: 'Language',
    symbol: 'Ts',
    name: 'TypeScript',
    description: 'JavaScript with types: better tooling and fewer surprises in production.',
  },
  {
    number: '04',
    category: 'Runtime',
    symbol: 'No',
    name: 'Node.js',
    description: 'Event-driven, non-blocking I/O for real-time and streaming apps.',
  },
  {
    number: '05',
    category: 'Backend',
    symbol: 'Ns',
    name: 'NestJS',
    description: 'Modular, scalable server-side apps on top of Express or Fastify.',
  },
  {
    number: '06',
    category: 'Styling',
    symbol: 'Tw',
    name: 'Tailwind CSS',
    description: 'Utility-first styling on a consistent, fully customizable system.',
  },
  {
    number: '07',
    category: 'UI kit',
    symbol: 'Mu',
    name: 'Material UI',
    description: 'Accessible React components, themed to fit the product.',
  },
  {
    number: '08',
    category: 'AI',
    symbol: 'Ai',
    name: 'AI-first engineering',
    description: 'Coding agents do the legwork, my taste decides what ships.',
  },
];
