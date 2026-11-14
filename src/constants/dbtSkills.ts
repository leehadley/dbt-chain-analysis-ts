export const DBT_SKILL_CATEGORIES = {
  DISTRESS_TOLERANCE: 'Distress Tolerance',
  EMOTION_REGULATION: 'Emotion Regulation',
  MINDFULNESS: 'Mindfulness',
  INTERPERSONAL: 'Interpersonal Effectiveness',
} as const;

export interface DBTSkill {
  id: string;
  name: string;
  category: string;
  icon: string;
  summary: string;
  steps: string[];
  bestFor: string[];
}

export const DEFAULT_DBT_SKILLS: DBTSkill[] = [
  {
    id: 'stop',
    name: 'STOP Skill',
    category: DBT_SKILL_CATEGORIES.DISTRESS_TOLERANCE,
    icon: 'OctagonAlert',
    summary: 'Pause before acting impulsively when emotions run high.',
    steps: [
      'S - Stop! Do not react immediately. Freeze.',
      'T - Take a step back. Take a deep breath.',
      'O - Observe what is happening inside and outside.',
      'P - Proceed mindfully with awareness of your goals.'
    ],
    bestFor: ['Urges', 'Impulsive actions', 'High emotional arousal']
  },
  {
    id: 'tipp',
    name: 'TIPP Skills',
    category: DBT_SKILL_CATEGORIES.DISTRESS_TOLERANCE,
    icon: 'Thermometer',
    summary: 'Rapidly lower extreme physiological arousal.',
    steps: [
      'T - Temperature: Cold water on face or ice pack on eyes/cheeks.',
      'I - Intense Exercise: 10-15 minutes of rapid jumping jacks or brisk walking.',
      'P - Paced Breathing: Slow down breath (e.g., inhale 4s, exhale 6s).',
      'P - Paired Muscle Relaxation: Tense muscles on inhale, release on exhale.'
    ],
    bestFor: ['Extreme panic', 'Overwhelming rage', 'Crisis moments (8-10 emotion intensity)']
  },
  {
    id: 'check-facts',
    name: 'Check the Facts',
    category: DBT_SKILL_CATEGORIES.EMOTION_REGULATION,
    icon: 'Search',
    summary: 'Examine if your emotion or its intensity matches reality.',
    steps: [
      '1. What is the emotion I am feeling?',
      '2. What is the prompting event?',
      '3. What assumptions or interpretations am I making?',
      '4. Am I assuming a threat? What is the actual threat?',
      '5. What is the catastrophe? How likely is it really?',
      '6. Does my emotion fit the actual facts?'
    ],
    bestFor: ['Catastrophizing', 'Cognitive distortions'],
  },
  {
    id: 'wise-mind',
    name: 'Wise Mind',
    category: DBT_SKILL_CATEGORIES.MINDFULNESS,
    icon: 'Compass',
    summary: 'Find the synthesis between Emotion Mind and Reason Mind.',
    steps: [
      '1. Pause and turn attention inward.',
      '2. Breathe in: "Wise", breathe out: "Mind".',
      '3. Ask yourself: "Is this coming from Wise Mind?"',
      '4. Listen to intuitive inner knowing without reacting purely on feelings or cold logic.'
    ],
    bestFor: ['Dilemmas', 'Emotional reactivity', 'Overthinking vs impulsive choices']
  },
  {
    id: 'dear-man',
    name: 'DEAR MAN',
    category: DBT_SKILL_CATEGORIES.INTERPERSONAL,
    icon: 'MessageSquare',
    summary: 'Assertively request something or set a boundary while preserving relationships.',
    steps: [
      'D - Describe the situation objectively.',
      'E - Express your feelings using "I" statements.',
      'A - Assert your request clearly.',
      'R - Reinforce positive outcomes.',
      'M - Mindful: Stay focused on your goal.',
      'A - Appear confident.',
      'N - Negotiate: Be open to compromise.'
    ],
    bestFor: ['Conflict resolution', 'Setting boundaries', 'Asking for help or change']
  },
  {
    id: 'self-soothe',
    name: 'Self-Soothe with 5 Senses',
    category: DBT_SKILL_CATEGORIES.DISTRESS_TOLERANCE,
    icon: 'Sparkles',
    summary: 'Comfort yourself through sight, sound, smell, taste, and touch.',
    steps: [
      'Sight: Look at soothing imagery or nature.',
      'Sound: Soft music, rainfall sounds, comforting podcast.',
      'Smell: Essential oils, warm tea, scented candle.',
      'Taste: Sip warm beverage slowly, savor dark chocolate.',
      'Touch: Wrap in soft blanket, pet an animal, warm bath.'
    ],
    bestFor: ['High stress', 'Physical tension', 'Need for self-compassion']
  },
  {
    id: 'wave-skill',
    name: 'Wave Skill (Urge Surfing)',
    category: DBT_SKILL_CATEGORIES.EMOTION_REGULATION,
    icon: 'Waves',
    summary: 'Observe an emotion or urge rise and crest like a wave without acting on it.',
    steps: [
      '1. Notice the urge/emotion rising.',
      '2. Do not fight or suppress it; imagine yourself riding on top of the wave.',
      '3. Remember every wave peaks and eventually subsides.',
      '4. Breathe steadily while observing bodily sensations.'
    ],
    bestFor: ['Cravings', 'Severe behavioral urges', 'Intense waves of sadness/anger']
  },
  {
    id: 'please',
    name: 'PLEASE Skills',
    category: DBT_SKILL_CATEGORIES.EMOTION_REGULATION,
    icon: 'HeartPulse',
    summary: 'Maintain physical body health to build emotional resilience.',
    steps: [
      'PL - Treat Physical iLness',
      'E - Balance Eating (nutritious regular meals)',
      'A - Avoid mood-altering substances',
      'S - Balance Sleep (7-9 hours)',
      'E - Exercise regularly'
    ],
    bestFor: ['Preventing future breakdowns', 'Reducing vulnerability factors']
  },
  {
    id: 'post-mortem-gatekeeper',
    name: 'Post-Mortem Gatekeeper (Audit Block)',
    category: DBT_SKILL_CATEGORIES.EMOTION_REGULATION,
    icon: 'ShieldCheck',
    summary: 'Block the ADHD hyperfocus + ASD post-event memory replay loop upon returning home.',
    steps: [
      '1. Recognize when returning home after social interaction.',
      '2. Immediately engage in a non-negotiable sensory/cognitive redirect (tactile hobby, instrument practice, headphones, mechanical task).',
      '3. Do not engage with memory replays; treat the audit urge as a neurological habit, not real insight.',
      '4. Protect cognitive bandwidth and transition directly into rest or special interest.'
    ],
    bestFor: ['Post-social memory audit', 'ADHD hyperfocus loop', 'ASD bottom-up over-analysis']
  },
  {
    id: 'delink-ambiguity',
    name: 'De-linking Ambiguity from Defectiveness',
    category: DBT_SKILL_CATEGORIES.EMOTION_REGULATION,
    icon: 'Search',
    summary: 'Reframe social ambiguity as normal non-algorithmic human noise, not personal failure.',
    steps: [
      '1. Notice thoughts saying: "I made a mistake. I breached the code."',
      '2. Reframe: "My autistic brain wants bottom-up certainty, but human interaction is naturally ambiguous."',
      '3. Identify CPTSD threat alarm: "Ambiguity is NOT danger or abandonment."',
      '4. Remind yourself: Social slip-ups are normal, survivable, and rarely noticed by others.'
    ],
    bestFor: ['Social shame collapse', 'RSD flare-ups', 'CPTSD threat neuroception']
  },
  {
    id: 'sensory-routine-protection',
    name: 'Sensory & Routine Bandwidth Shield',
    category: DBT_SKILL_CATEGORIES.DISTRESS_TOLERANCE,
    icon: 'Sparkles',
    summary: 'Front-load sensory accommodations and protect predictable routines before social events.',
    steps: [
      '1. Prepare sensory gear in advance (noise-canceling headphones, loop earplugs, dim glasses).',
      '2. Set a strict non-negotiable time limit on social demands (e.g. 60-90 minutes).',
      '3. Anchor social demand tightly between solid, predictable routines.',
      '4. Plan post-event recovery time with zero social obligations.'
    ],
    bestFor: ['Sensory depletion', 'Social masking fatigue', 'Routine disruption anxiety']
  }
];

export interface Vulnerability {
  id: string;
  text: string;
  category: string;
}

export interface TargetBehavior {
  description: string;
  intensity: number;
  category: string;
  location: string;
  context: string;
}

export interface PromptingEvent {
  text: string;
  time: string;
  type: string;
}

export interface ChainLink {
  id: string;
  type: string;
  text: string;
  intensity: number;
}

export interface Consequence {
  shortTerm: string;
  longTerm: string;
}

export interface SkillIntervention {
  id: string;
  linkId: string;
  skillId: string;
  customSkillName: string;
  note: string;
}

export interface ChainAnalysis {
  id: string;
  title: string;
  date: string;
  time: string;
  targetBehavior: TargetBehavior;
  vulnerabilities: Vulnerability[];
  promptingEvent: PromptingEvent;
  links: ChainLink[];
  consequences: Consequence;
  skills: SkillIntervention[];
  preventionPlan: string;
  repairPlan: string;
  therapistNotes: string;
  createdAt: string;
  updatedAt: string;
}

export const EMPTY_CHAIN_ANALYSIS: ChainAnalysis = {
  id: '',
  title: 'New Chain Analysis',
  date: new Date().toISOString().split('T')[0],
  time: new Date().toTimeString().slice(0, 5),

  targetBehavior: {
    description: '',
    intensity: 7,
    category: 'Urge / Action',
    location: '',
    context: ''
  },

  vulnerabilities: [
    { id: 'v1', text: 'Lack of restful sleep (< 6 hours)', category: 'Physical' },
    { id: 'v2', text: 'Skipped meal / Hunger', category: 'Physical' }
  ],

  promptingEvent: {
    text: '',
    time: '',
    type: 'External'
  },

  links: [],

  consequences: {
    shortTerm: '',
    longTerm: ''
  },

  skills: [],

  preventionPlan: '',
  repairPlan: '',

  therapistNotes: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const SAMPLE_CHAIN_ANALYSIS: ChainAnalysis = {
  id: 'sample-dbt-chain-1',
  title: 'Workplace Conflict & Overwhelmed Outburst',
  date: new Date().toISOString().split('T')[0],
  time: '15:30',

  targetBehavior: {
    description: 'Yelled harshly at coworker and slammed laptop shut in meeting',
    intensity: 9,
    category: 'Anger Outburst',
    location: 'Conference Room B',
    context: 'During team project review session'
  },

  vulnerabilities: [
    { id: 'v1', text: 'Slept only 4 hours due to anxiety night before', category: 'Sleep' },
    { id: 'v2', text: 'Skipped lunch; low blood sugar', category: 'Physical' },
    { id: 'v3', text: 'Accumulated stress from 3 tight project deadlines', category: 'Workload' }
  ],

  promptingEvent: {
    text: 'Coworker critically questioned my budget breakdown in front of the team',
    time: '15:20',
    type: 'External'
  },

  links: [
    {
      id: 'link-1',
      type: 'Thought',
      text: 'Thought: "She is intentionally trying to undermine me and make me look incompetent!"',
      intensity: 7
    },
    {
      id: 'link-2',
      type: 'Body Sensation',
      text: 'Chest tightened, face felt hot, heart rate spiked rapidly',
      intensity: 8
    },
    {
      id: 'link-3',
      type: 'Emotion',
      text: 'Intense shame mixed with intense anger',
      intensity: 9
    },
    {
      id: 'link-4',
      type: 'Thought',
      text: 'Thought: "I can\'t take this disrespect any longer. I need to defend myself!"',
      intensity: 9
    },
    {
      id: 'link-5',
      type: 'Action / Impulse',
      text: 'Strong urge to attack back verbally',
      intensity: 9
    }
  ],

  consequences: {
    shortTerm: 'Immediate sense of power & relief of tension, stopping the coworker\'s critique instantly.',
    longTerm: 'Felt intense embarrassment later, strained professional relationship with coworker, manager requested formal 1-on-1 meeting.'
  },

  skills: [
    {
      id: 'sk-1',
      linkId: 'v1',
      skillId: 'please',
      customSkillName: 'PLEASE Skill (Sleep Hygiene)',
      note: 'Prioritize 7-8 hours sleep and regular meal before major review meetings.'
    },
    {
      id: 'sk-2',
      linkId: 'link-2',
      skillId: 'tipp',
      customSkillName: 'TIPP - Paced Breathing & Cold Water',
      note: 'Take a sip of ice water at table, exhale slowly for 6 seconds to calm nervous system.'
    },
    {
      id: 'sk-3',
      linkId: 'link-4',
      skillId: 'check-facts',
      customSkillName: 'Check the Facts',
      note: 'Ask: "Is she undermining me, or just asking standard budget questions?"'
    },
    {
      id: 'sk-4',
      linkId: 'link-5',
      skillId: 'stop',
      customSkillName: 'STOP Skill',
      note: 'Pause, freeze, take a deep breath, call a 5-minute break before speaking.'
    }
  ],

  preventionPlan: 'Establish consistent bedtime routine. Keep healthy snacks at desk. Practice 5-minute mindfulness before team presentations.',
  repairPlan: 'Apologize sincerely to coworker for raising my voice; arrange a quiet 1-on-1 to review the budget questions professionally.',
  therapistNotes: 'Great job identifying the link between low blood sugar, sleep loss, and catastrophizing thoughts.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const NEURODIVERGENT_SOCIAL_AVOIDANCE_CHAIN: ChainAnalysis = {

  id: 'nd-cptsd-social-avoidance-template',
  title: 'Social Avoidance & Post-Event Memory Audit (ASD/ADHD/CPTSD)',
  date: new Date().toISOString().split('T')[0],
  time: new Date().toTimeString().slice(0, 5),

  targetBehavior: {
    description: 'Chronic avoidance and preemptive withdrawal from social contact; in-the-moment panic escape / shutdown during perceived mistakes.',
    intensity: 9,
    category: 'Avoidance',
    location: 'Social settings / Gatherings / Workplace',
    context: 'Unpredictable group or 1-on-1 social demands'
  },

  vulnerabilities: [
    { id: 'v1', text: 'Sensory Depletion: Environmental sensory load (unpredictable noise, harsh lighting, visual chaos, tactile discomfort)', category: 'ASD' },
    { id: 'v2', text: 'Routine Disruption: High neurological transition cost of breaking fixed routines or leaving controlled environments', category: 'ASD' },
    { id: 'v3', text: 'Masking Exhaustion (ASD): High-bandwidth manual translation of tone, posture, facial expressions & timing', category: 'ASD' },
    { id: 'v4', text: 'Executive Fatigue & Rejection Sensitivity (ADHD): Dopamine depletion & RSD emotional reactivity', category: 'ADHD' },
    { id: 'v5', text: 'Relational Trauma History (CPTSD): Nervous system equating social friction/ambiguity with danger or abandonment', category: 'CPTSD' },
    { id: 'v6', text: 'Cumulative Sleep Debt: Existing insomnia reducing prefrontal executive inhibition and raising amygdala reactivity', category: 'Sleep' }
  ],

  promptingEvent: {
    text: 'Micro-moment of social ambiguity (awkward pause, unclear facial expression, comment that didn\'t land with mathematical precision, or reaching sensory saturation)',
    time: 'During or preceding social encounter',
    type: 'External'
  },

  links: [
    {
      id: 'link-1',
      type: 'Body Sensation',
      text: 'Link 1 - Sensory & Executive Over-saturation: Environmental stimuli collide with manual masking effort; working memory caps out.',
      intensity: 7
    },
    {
      id: 'link-2',
      type: 'Thought',
      text: 'Link 2 - Neuroception of Threat (CPTSD Alarm): "Something went wrong. I made a mistake. I breached the code." (Autistic error detection + CPTSD danger threat)',
      intensity: 8
    },
    {
      id: 'link-3',
      type: 'Body Sensation',
      text: 'Link 3 - Acute Physiological Surge: Sympathetic surge (fight/flight/freeze), adrenaline, racing heart, throat/chest constriction, heat/sweating, muscle bracing, harsher audio perception.',
      intensity: 9
    },
    {
      id: 'link-4',
      type: 'Action / Impulse',
      text: 'Link 4 - Acute Coping Escape / Freeze: Abrupt physical exit, sudden excuse to leave, or checking out mentally (dissociation/shutdown). Short-term relief reinforces: "Leaving saved my life."',
      intensity: 9
    },
    {
      id: 'link-5',
      type: 'Thought',
      text: 'Link 5 - Post-Event Memory Audit (ADHD Hyperfocus + ASD Rule Check): Replaying event repeatedly, scanning every phrase/glance/pause to locate exact flaw without finding algorithmic closure.',
      intensity: 9
    },
    {
      id: 'link-6',
      type: 'Emotion',
      text: 'Link 6 - Defectiveness & Shame Collapse: Audit "confirms" mistake; anxiety collapses into toxic shame: "I am fundamentally flawed, socially inept, and incapable of doing this right."',
      intensity: 10
    },
    {
      id: 'link-7',
      type: 'Body Sensation',
      text: 'Link 7 - Autonomic Dysregulation & Neurodivergent Burnout: Cortisol elevation, delayed melatonin, insomnia, severe sleep deficit, low mood—true autistic/trauma burnout.',
      intensity: 9
    }
  ],

  consequences: {
    shortTerm: 'Complete avoidance prevents sensory overload, masking fatigue, and panic spike. Instant negative reinforcement: brain learns staying away is the only safety.',
    longTerm: 'Compounded isolation, deepened sensory intolerance from lack of exposure, zero chance to disconfirm catastrophic beliefs, solidification of core trauma belief.'
  },

  skills: [
    {
      id: 'sk-nd-1',
      linkId: 'v1',
      skillId: 'sensory-routine-protection',
      customSkillName: 'Sensory & Routine Protection Shield',
      note: 'Front-load sensory defenses (noise reduction, dim environments) & schedule social contact only around solid routines to preserve bandwidth.'
    },
    {
      id: 'sk-nd-2',
      linkId: 'link-4',
      skillId: 'post-mortem-gatekeeper',
      customSkillName: 'The Post-Mortem Gatekeeper (Immediate Redirect)',
      note: 'Establish an immediate non-negotiable sensory/cognitive redirect upon returning home (tactile hobbies, coding, music with headphones) to block the memory audit before it starts.'
    },
    {
      id: 'sk-nd-3',
      linkId: 'link-5',
      skillId: 'delink-ambiguity',
      customSkillName: 'De-linking Ambiguity from Defectiveness',
      note: 'Label audit as an autistic brain attempting bottom-up error correction on non-algorithmic human interaction, distorted by CPTSD threat detection.'
    }
  ],

  preventionPlan: 'Pre-plan sensory accommodations (sunglasses, loop earplugs). Set strict boundaries on social duration (e.g. 60-90 min max). Post-event transition routine immediately after returning home.',
  repairPlan: 'Compassionate self-talk acknowledging neurodivergent nervous system capacity. Re-engage gently in low-stakes interest-based online/quiet spaces without forcing high-masking demands.',
  therapistNotes: 'Comprehensive neurodivergent profile integration (ASD bottom-up audit + ADHD hyperfocus + CPTSD relational threat neuroception). Focus on blocking Link 5 post-mortem audit and front-loading Link 1 sensory defenses.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export interface VulnerabilityPreset {
  label: string;
  text: string;
  category: string;
}

export const VULNERABILITY_PRESETS: VulnerabilityPreset[] = [

  // ADHD / Executive Functioning
  { label: '⚡ ADHD: Sensory Overload', text: 'Sensory overload from loud environment or multitasking', category: 'ADHD' },
  { label: '⚡ ADHD: Executive Dysfunction', text: 'Overwhelmed by task paralysis and decision fatigue', category: 'ADHD' },
  { label: '⚡ ADHD: Rejection Sensitivity (RSD)', text: 'Perceived rejection or criticism trigger (RSD flare-up)', category: 'ADHD' },
  { label: '⚡ ADHD: Dopamine Depletion / Burnout', text: 'Low dopamine & cognitive exhaustion from hyperfocusing', category: 'ADHD' },
  { label: '⚡ ADHD: Medication Rebound Crash', text: 'Stimulant medication wear-off / rebound crash', category: 'ADHD' },

  // ASD / Autism Spectrum
  { label: '🧩 ASD: Social Masking Burnout', text: 'Exhaustion from prolonged social masking', category: 'ASD' },
  { label: '🧩 ASD: Routine Disruption', text: 'Sudden unexpected change in routine or plan', category: 'ASD' },
  { label: '🧩 ASD: Tactile / Auditory Sensitivity', text: 'Discomfort from lighting, textures, or background hums', category: 'ASD' },
  { label: '🧩 ASD: Alexithymia', text: 'Difficulty identifying or labeling internal emotional states', category: 'ASD' },
  { label: '🧩 ASD: Monotropic Focus Interruption', text: 'Forced rapid switching away from deep special interest focus', category: 'ASD' },

  // CPTSD / Complex Trauma
  { label: '🛡️ CPTSD: Emotional Flashback State', text: 'Slipped into emotional flashback (feeling helpless, unsafe, small)', category: 'CPTSD' },
  { label: '🛡️ CPTSD: Hypervigilance / Threat Scanning', text: 'High baseline hypervigilance and physiological threat scanning', category: 'CPTSD' },
  { label: '🛡️ CPTSD: Perceived Loss of Control', text: 'Feeling cornered, trapped, or micromanaged', category: 'CPTSD' },
  { label: '🛡️ CPTSD: Trauma Nightmares / Poor Sleep', text: 'Fragmented sleep from trauma nightmares or nocturnal panic', category: 'CPTSD' },
  { label: '🛡️ CPTSD: Abandonment / Isolation Trigger', text: 'Fear of impending abandonment or being deeply misunderstood', category: 'CPTSD' },

  // General / Physical
  { label: '💤 Physical: Sleep Deprivation', text: 'Slept less than 5 hours / Poor sleep quality', category: 'Sleep' },
  { label: '🍎 Physical: Low Blood Sugar / Hangry', text: 'Skipped meal / Low blood sugar', category: 'Physical' },
  { label: '🤒 Physical: Chronic Pain / Illness', text: 'Physical pain or illness flare-up', category: 'Physical' },
  { label: '☕ Physical: Caffeine / Sugar Crash', text: 'High caffeine intake or sudden sugar/caffeine withdrawal', category: 'Physical' },
  { label: '💊 Physical: Medication Changes', text: 'Missed medication dose or new medication side effects', category: 'Physical' },
  { label: '🩸 Physical: Hormonal Changes', text: 'Menstrual cycle, hormonal medications, or hormone-related mood shifts', category: 'Physical' },

  // Relationships & Social
  { label: '💔 Social: Relationship Conflict', text: 'Tension, argument, or unresolved conflict with someone close', category: 'Social' },
  { label: '😔 Social: Loneliness / Isolation', text: 'Feeling alone, disconnected, or lacking meaningful connection', category: 'Social' },
  { label: '🗣️ Social: Feeling Misunderstood', text: 'Sense that others don\'t understand or value your perspective', category: 'Social' },
  { label: '👥 Social: Difficult Social Obligation', text: 'Forced social interaction, unwanted event, or obligatory gathering', category: 'Social' },

  // Work / School / Performance
  { label: '📚 Work/School: Deadline Pressure', text: 'Looming deadlines, time crunch, or high-stakes project', category: 'Work' },
  { label: '📈 Work/School: Performance Pressure', text: 'High expectations, perfectionism, or fear of failure', category: 'Work' },
  { label: '😫 Work/School: Overwhelming Workload', text: 'Too many tasks, conflicting priorities, or feeling behind', category: 'Work' },
  { label: '⚖️ Work/School: Work-Life Imbalance', text: 'No boundary between work and personal time; always "on"', category: 'Work' },

  // Environmental & Life Events
  { label: '🌧️ Environmental: Weather / Seasonal Changes', text: 'Seasonal affective disorder, weather sensitivity, or seasonal transitions', category: 'Environment' },
  { label: '💰 Environmental: Financial Stress', text: 'Money worries, unexpected expenses, or financial uncertainty', category: 'Environment' },
  { label: '🏠 Environmental: Housing / Living Instability', text: 'Moving, housing problems, or living situation conflict', category: 'Environment' },
  { label: '😢 Environmental: Grief / Loss / Anniversary', text: 'Loss of loved one, anniversary of trauma, or major life change', category: 'Environment' },
  { label: '✈️ Environmental: Travel / Routine Disruption', text: 'Travel, time zone change, or break from normal routine', category: 'Environment' },

  // Substance & Behavioral
  { label: '📱 Behavioral: Excessive Screen Time', text: 'Spending too much time online, gaming, or doomscrolling', category: 'Behavioral' },
  { label: '🎮 Behavioral: Boredom / Lack of Stimulation', text: 'Understimulated, restless, or lacking engaging activities', category: 'Behavioral' },
  { label: '⏰ Behavioral: Rushing / Time Pressure', text: 'Feeling rushed, running late, or time-constrained', category: 'Behavioral' },
  { label: '🚫 Behavioral: Avoidance Backlog', text: 'Tasks piling up due to avoidance; mounting sense of dread', category: 'Behavioral' },

  // Emotional / Psychological
  { label: '😰 Emotional: Anticipatory Anxiety', text: 'Worry about future events, "what-if" thinking, or catastrophizing', category: 'Emotional' },
  { label: '😔 Emotional: Low Mood / Anhedonia', text: 'Depression, loss of interest in activities, or lack of motivation', category: 'Emotional' },
  { label: '🔄 Emotional: Rumination / Obsessive Thoughts', text: 'Stuck in thought loops, intrusive thoughts, or repetitive worry', category: 'Emotional' },
  { label: '😞 Emotional: Low Self-Esteem / Shame', text: 'Self-criticism, feeling inadequate, or internalized shame', category: 'Emotional' },
  { label: '🤝 Emotional: Feeling Unworthy of Help', text: 'Shame spiral, believing you don\'t deserve support or care', category: 'Emotional' }
];
