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
 * Technical positioning — capabilities, reliability, and architecture principles.
 */
export const rivtorFAQs: FAQItem[] = [
  {
    question: 'How does the system ensure execution is reproducible?',
    answer: 'Every action is recorded as an immutable event in a cryptographically chained log. State is never overwritten; it is reconstructed by replaying events from the beginning of time. This means any execution can be replayed identically, enabling deterministic debugging and full auditability of every decision and action taken.'
  },
  {
    question: 'How does the multi-agent decision process work?',
    answer: 'When a complex goal is submitted, the system frames the problem, generates structurally diverse options, and routes them to specialist agents for parallel review. Each agent evaluates feasibility from its domain perspective. An intelligence layer scores options across taste alignment, outcome simulation, and risk assessment. The highest-scoring option is compiled into an execution plan and linked to a dependency-aware task graph.'
  },
  {
    question: 'How are tasks scheduled and executed?',
    answer: 'Tasks are modeled as a directed acyclic graph with explicit dependency edges. The system automatically detects which tasks have satisfied dependencies, groups independent work for parallel execution, and detects cycles before runtime. Each atomic task includes built-in verification and retry logic, ensuring partial failures do not corrupt downstream work.'
  },
  {
    question: 'How does the system maintain context across long-running workflows?',
    answer: 'A context manager assembles relevant history using priority scoring and token budgeting. It integrates codebase indexes, prior decision traces, and live system state. Automatic summarization preserves continuity across sessions, enabling multi-hour autonomous execution loops without losing track of intent or repeating work.'
  },
  {
    question: 'What happens when something fails during execution?',
    answer: 'Failed tasks trigger automatic retry with exponential backoff. If retry fails, the system reassigns the work to a fallback agent and restores state from the last known checkpoint. Because every action is event-sourced, partial executions can be resumed deterministically from the exact point of failure without manual intervention.'
  },
  {
    question: 'How is code execution isolated and secured?',
    answer: 'All code runs inside ephemeral sandboxes— isolated environments with no access to the host system. Each sandbox is created on demand, used for a single execution, and destroyed immediately after. This containment model prevents runtime errors or malicious code from affecting the broader system or leaking data.'
  },
  {
    question: 'How are third-party integrations managed?',
    answer: 'Connections to external services use standard OAuth flows with encrypted credential storage. Webhook endpoints verify cryptographic signatures from the source provider. A background sync process keeps connected data fresh, and all integration activity is logged to the event stream for audit and replay.'
  },
  {
    question: 'What visibility is available into system behavior?',
    answer: 'Distributed tracing follows every request from goal ingestion through decision, planning, and execution. Metrics cover latency percentiles, error rates, active agent counts, queue depth, and decision confidence. Structured logs attach component names, event types, and correlation IDs, making it possible to trace any outcome back to its exact origin.'
  },
  {
    question: 'How does the knowledge graph stay current with execution?',
    answer: 'A background worker continuously projects new events into a live knowledge graph of entities and relationships. Agents query this graph for real-time context instead of relying on static snapshots. This means decisions are always grounded in the current state of the system, not stale data from when the session started.'
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
