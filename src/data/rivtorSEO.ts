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
  description: 'Rivtor turns your goals into finished work across your team and tools—without constant follow-ups. Set a goal. Rivtor plans, drives, and finishes the execution.',
  path: '/'
};

/**
 * How To Steps
 * Used for: How-it-works section, HowTo schema
 */
export const rivtorHowToSteps: string[] = [
  'Define your goal in plain language (e.g., "Increase user retention by 30%")',
  'Rivtor analyzes the goal and breaks it down into actionable steps',
  'Rivtor plans, assigns, and drives each step to completion',
  'Rivtor monitors results and tracks progress',
  'Based on outcomes, Rivtor adjusts and continues until the goal is achieved',
  'Achieve your goal without follow-ups, status checks, or management overhead'
];

/**
 * Why Execution Ownership Matters
 * Used for: Educational content section on landing page
 */
export const whyExecutionIntelligenceMatters: WhyImportantContent = {
  title: 'Why Execution Ownership Matters',
  content: `
    <p>Traditional execution is broken. Goals stall, teams misalign, and projects die in follow-up queues. The bottleneck is never the idea — it is execution.</p>

    <p>Rivtor fixes this by owning execution end-to-end. Unlike tools that help you work, Rivtor drives the work until it is finished.</p>

    <h3>The Execution Problem</h3>
    <ul>
      <li><strong>Coordination overhead:</strong> Teams spend 40% of time on alignment, not execution</li>
      <li><strong>Follow-up gaps:</strong> Tasks get assigned but no one drives them to completion</li>
      <li><strong>Context switching:</strong> Constant interruptions break flow and slow progress</li>
      <li><strong>Scaling friction:</strong> More people = more communication, less execution</li>
    </ul>

    <h3>Why Owning Execution Works</h3>
    <ul>
      <li><strong>Clear ownership:</strong> Someone owns driving every goal to completion</li>
      <li><strong>Continuity:</strong> Work progresses continuously without waiting for follow-ups</li>
      <li><strong>Iteration:</strong> Automatically adjusts based on real results</li>
      <li><strong>Scale:</strong> Execute multiple initiatives in parallel without adding headcount</li>
    </ul>

    <p>The result? Founders ship faster than teams. Startups operate without overhead. Companies scale execution without complexity.</p>
  `
};

/**
 * FAQs
 * Used for: FAQ section, FAQPage schema, long-tail keyword targeting
 *
 * Strategic, high-level positioning - focused on execution ownership
 */
export const rivtorFAQs: FAQItem[] = [
  {
    question: 'Will I lose control of my company?',
    answer: 'No. You set every goal. Rivtor reports to you. You approve all major decisions. Rivtor handles execution, not strategy. You remain in control of what matters.'
  },
  {
    question: 'What if Rivtor makes mistakes?',
    answer: 'You review every plan before execution. Rivtor provides transparent progress and observable proof at every step. You can pause, adjust, or redirect at any time.'
  },
  {
    question: 'How long until I see results?',
    answer: 'First execution begins within minutes of setting a goal. Unlike traditional projects that take weeks to kick off, Rivtor starts driving work immediately.'
  },
  {
    question: 'Do I need to learn a new tool?',
    answer: 'No. Rivtor works in Slack, email, and your existing systems. There is nothing new to learn and nothing to migrate.'
  },
  {
    question: 'Will my team actually use it?',
    answer: 'Yes. Rivtor works where your team already works. They do not need to adopt a new tool or change their workflow. Rivtor integrates with the tools they already use.'
  },
  {
    question: 'What type of companies do you work with?',
    answer: 'We work with teams who have urgent execution challenges and the mandate to solve them. Typically: high-growth companies who cannot hire fast enough, operations teams drowning in manual workflows, or technical teams blocked by coordination overhead. The common thread: you are actively building, not exploring, and you need outcomes now—not in six months.'
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
    description: 'Join early builders shaping the future of execution ownership. Get direct access to the Rivtor team and influence product direction.'
  },
  {
    name: 'How It Works',
    href: '#how-it-works',
    description: 'See how Rivtor transforms goals into finished work through continuous execution and follow-through.'
  },
  {
    name: 'What is Execution Ownership?',
    href: '#execution-ownership',
    description: 'Learn about the shift from tools that help you work to systems that drive work to completion.'
  }
];

/**
 * Keywords for different sections
 * Used for: Content optimization, internal linking strategy
 */
export const rivtorKeywords = {
  primary: [
    'execution ownership',
    'goal completion',
    'Rivtor',
    'work completion',
    'execution system'
  ],
  secondary: [
    'finish what you start',
    'execution without follow-ups',
    'goal-driven execution',
    'business execution',
    'operations automation',
    'workflow completion',
    'execution management',
    'team productivity'
  ],
  longTail: [
    'how to finish projects faster',
    'stop chasing status updates',
    'execution for founders',
    'goal execution system',
    'work that gets done',
    'execution without management',
    'finish goals automatically',
    'execution vs planning'
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
    'basics': ['what is execution', 'what is rivtor', 'who is rivtor for'],
    'comparison': ['how is rivtor different', 'vs chatgpt', 'vs copilot', 'is rivtor a saas', 'is rivtor an agency'],
    'technical': ['what kinds of goals', 'how does rivtor work', 'how long does', 'does rivtor integrate', 'what happens if'],
    'getting-started': ['do i need technical', 'how do i get started']
  };

  const keywords = topicMap[topicLower] || [];

  return rivtorFAQs.filter(faq =>
    keywords.some(keyword =>
      faq.question.toLowerCase().includes(keyword)
    )
  );
}
