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
export const projects: Project[] = [
  {
    name: 'Splitsea',
    description:
      'Expense tracking for households, couples and groups: log shared expenses, split them fairly and keep balances clear across currencies.',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
  {
    name: 'Greenboom',
    stack: [],
  },
];

export function isComplete(project: Project): boolean {
  return Boolean(project.url && project.description && project.screenshot);
}

export const visibleProjects = projects.filter(isComplete);
