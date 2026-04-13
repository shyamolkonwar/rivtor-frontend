/**
 * Rivtor SEO Data
 *
 * This file contains traditional SEO metadata and content for search engines.
 * Supports meta tags, schema markup, FAQ pages, and internal linking.
 */

export interface SEOContent {
  name: string;
  description: string;
  path: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedPage {
  name: string;
  href: string;
  description: string;
}

export interface WhyImportantContent {
  title: string;
  content: string;
}

/**
 * Core SEO Data
 */
export const rivtorSEOData: SEOContent = {
  name: 'Rivtor',
  description: 'Rivtor is execution intelligence — the first autonomous execution system that plans, executes, and iterates on goals autonomously. For founders, startups, and companies who need to execute faster.',
  path: '/'
};

/**
 * How To Steps
 * Used for: How-it-works section, HowTo schema
 */
export const rivtorHowToSteps: string[] = [
  'Define your goal in plain language (e.g., "Increase user retention by 30%")',
  'Rivtor analyzes the goal and breaks it down into actionable steps',
  'Autonomous agents execute each step without human intervention',
  'Rivtor monitors results and analyzes performance',
  'Based on outcomes, Rivtor automatically iterates and optimizes',
  'Achieve your goal without coordination, alignment, or management overhead'
];

/**
 * Why Execution Intelligence Matters
 * Used for: Educational content section on landing page
 */
export const whyExecutionIntelligenceMatters: WhyImportantContent = {
  title: 'Why Execution Intelligence Matters',
  content: `
    <p>Traditional execution is broken. Plans stall, teams misalign, and experiments die in decision queues. The bottleneck is never the idea — it's execution.</p>

    <p>Rivtor introduces a new category: <strong>Execution Intelligence</strong>. Unlike tools that help you work, or AI assistants that make suggestions, Rivtor is an autonomous system that executes.</p>

    <h3>The Execution Problem</h3>
    <ul>
      <li><strong>Coordination overhead:</strong> Teams spend 40% of time on alignment, not execution</li>
      <li><strong>Decision bottlenecks:</strong> Critical changes wait for approval loops</li>
      <li><strong>Context switching:</strong> Constant interruptions break flow and slow progress</li>
      <li><strong>Scaling friction:</strong> More people = more communication, less execution</li>
    </ul>

    <h3>Why Execution Intelligence Works</h3>
    <ul>
      <li><strong>Autonomy:</strong> No coordination, alignment meetings, or task assignments</li>
      <li><strong>Continuity:</strong> Operates 24/7 without breaks, sleep, or weekends</li>
      <li><strong>Iteration:</strong> Automatically optimizes based on real results</li>
      <li><strong>Scale:</strong> Execute multiple initiatives in parallel without adding headcount</li>
    </ul>

    <p>The result? Founders ship faster than teams. Startups operate without overhead. Companies scale execution without complexity.</p>
  `
};

/**
 * FAQs
 * Used for: FAQ section, FAQPage schema, long-tail keyword targeting
 *
 * Strategic, high-level positioning - Palantir-level engagement model
 */
export const rivtorFAQs: FAQItem[] = [
  {
    question: 'How does the design partner program work?',
    answer: 'We work with a small group of companies on real execution problems. You bring the challenge — we execute the solution together. This isn\'t a trial or a demo. It\'s a partnership where we build and deploy actual capabilities to solve your problems. Partners get direct access to our team, rapid iteration on real work, and shape how the system develops.'
  },
  {
    question: 'What type of companies do you work with?',
    answer: 'We work with teams who have urgent execution challenges and the mandate to solve them. Typically: high-growth companies who can\'t hire fast enough, operations teams drowning in manual workflows, or technical teams blocked by coordination overhead. The common thread: you\'re actively building, not exploring, and you need outcomes now — not in six months.'
  },
  {
    question: 'What does the engagement look like?',
    answer: 'We start by understanding what you\'re trying to achieve and the constraints you\'re operating under. Then we define scope and start executing. You work directly with our team — no account managers, no handoffs. Changes ship in days, not quarters. As we solve your initial challenges, we expand scope and tackle harder problems.'
  }
];

/**
 * Related Pages
 * Used for: Internal linking, navigation, related content suggestions
 */
export const rivtorRelatedPages: RelatedPage[] = [
  {
    name: 'Design Partner Program',
    href: '/design-partners',
    description: 'Join early builders shaping the future of autonomous execution. Get direct access to the Rivtor team and influence product direction.'
  },
  {
    name: 'How It Works',
    href: '#how-it-works',
    description: 'See how Rivtor transforms goals into executed outcomes through autonomous planning and iteration.'
  },
  {
    name: 'What is Execution Intelligence?',
    href: '#execution-intelligence',
    description: 'Learn about the new category of autonomous systems that plan, execute, and iterate without human coordination.'
  }
];

/**
 * Keywords for different sections
 * Used for: Content optimization, internal linking strategy
 */
export const rivtorKeywords = {
  primary: [
    'execution intelligence',
    'autonomous execution',
    'Rivtor',
    'autonomous AI',
    'AI execution system'
  ],
  secondary: [
    'AI agents for business',
    'agentic systems',
    'autonomous company',
    'goal-oriented AI',
    'AI automation platform',
    'business execution automation',
    'autonomous operations',
    'AI workflow automation'
  ],
  longTail: [
    'AI that executes autonomously',
    'autonomous AI for founders',
    'execution without management',
    'AI that plans and executes',
    'autonomous business execution',
    'AI for goal execution',
    'execution intelligence system',
    'autonomous AI vs copilot'
  ]
};

/**
 * Helper function to get related pages
 * Filters out nulls and ensures all pages have required fields
 */
export function getRelatedPagesData(currentPath?: string): RelatedPage[] {
  return rivtorRelatedPages.filter(page => {
    // Exclude current page from related pages
    if (currentPath && page.href === currentPath) return false;
    // Ensure all required fields exist
    return !!(page.name && page.href && page.description);
  });
}

/**
 * Helper function to get FAQs by category/topic
 */
export function getFAQsByTopic(topic: string): FAQItem[] {
  const topicLower = topic.toLowerCase();

  const topicMap: Record<string, string[]> = {
    'basics': ['what is execution intelligence', 'what is rivtor', 'who is rivtor for'],
    'comparison': ['how is rivtor different', 'vs chatgpt', 'vs copilot', 'is rivtor a saas', 'is rivtor an agency'],
    'technical': ['what kinds of goals', 'how does rivtor iterate', 'how long does', 'does rivtor integrate', 'what happens if'],
    'getting-started': ['do i need technical', 'how do i get started']
  };

  const keywords = topicMap[topicLower] || [];

  return rivtorFAQs.filter(faq =>
    keywords.some(keyword =>
      faq.question.toLowerCase().includes(keyword)
    )
  );
}
