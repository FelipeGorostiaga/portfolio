export type Project = {
  name: string;
  url?: string;
  /** Shown in the preview's URL bar, e.g. "splitsea.com". */
  domain?: string;
  year?: string;
  description?: string;
  stack: string[];
  /** Path under /public, 16:10. */
  screenshot?: string;
};

// A project only shows on the site once it has a URL, a description and a screenshot.
// Screenshots: 1600×1000 WebP of the live landing page (the card shows them in a 16:10 frame).
export const projects: Project[] = [
  {
    name: 'Greenboom',
    url: 'https://www.greenboom.xyz/',
    domain: 'greenboom.xyz',
    description:
      'Greenboom keeps every watering, feeding and growth note in one calm place, so your plants get what they need, on the day they need it.',
    stack: ['Next.js', 'Tailwind CSS'],
    screenshot: '/projects/greenboom.webp',
  },
  {
    name: 'Splitsea',
    url: 'https://www.splitsea.dev/',
    domain: 'splitsea.dev',
    description:
      'Track expenses and split them, effortlessly. Splitsea helps groups track shared expenses, split bills fairly and stay on top of balances, across currencies and across time. An AI feature reads your credit card statements and generates the month’s expenses, built with strong security measures.',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Claude / Gemini'],
    screenshot: '/projects/splitsea.webp',
  },
];

export function isComplete(project: Project): boolean {
  return Boolean(project.url && project.description && project.screenshot);
}

export const visibleProjects = projects.filter(isComplete);
