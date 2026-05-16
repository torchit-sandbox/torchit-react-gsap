export const NAV_LINKS = [
  {
    name: 'About',
    href: '#about-us',
  },
  {
    name: 'Services',
    href: '#services',
  },
  {
    name: 'Process',
    href: '#process',
  },
  {
    name: 'Reviews',
    href: '#reviews',
  },
  {
    name: 'Partners',
    href: '#partners',
  },
];

export const HERO_CONTENT = [
  {
    id: 1,
    image: {
      desktop: '/assets/images/hero/torchit-hero-desktop-v1.webp',
      mobile: '/assets/images/hero/torchit-hero-mobile-v1.webp',
      desktopWidth: 1672,
      desktopHeight: 941,
      mobileWidth: 941,
      mobileHeight: 1672,
    },
    title: 'Products That Work.',
    description:
      'TorchIT helps startups and growing teams design, build, and improve digital products with clear scope and reliable execution.',
    tab: 'About',
    anchor: '#about-us',
  },
  {
    id: 2,
    img: '/images/hero/slide-2.webp',
    title: 'From Idea to Launch.',
    description:
      'We define priorities, shape user experience, and build the right foundation from the start.',
    tab: 'Build',
    anchor: '#services',
  },
  {
    id: 3,
    img: '/images/hero/slide-3.mp4',
    title: 'Improve What Exists.',
    description:
      'We step into existing products to fix issues, improve maintainability, and keep development moving.',
    tab: 'Support',
    anchor: '#services',
  },
  {
    id: 4,
    img: '/images/hero/slide-4.webp',
    title: 'Clear Process. Predictable Delivery.',
    description:
      'Structured stages, visible progress, and direct communication keep projects under control.',
    tab: 'Process',
    anchor: '#process',
  },
  {
    id: 5,
    img: '/images/hero/slide-5.jpg',
    title: 'A Reliable Product Team.',
    description:
      'We work closely with founders and teams to reduce wasted effort and keep products moving forward.',
    tab: 'Partner',
    anchor: '#about-us',
  },
];

export const ABOUT_INTRO =
  'TorchIT helps startups and growing businesses build new products and improve existing ones.';

export const ABOUT_PARAGRAPHS = [
  'We begin with the product, the users, and the business goal. That gives the work direction before time and budget are spent in the wrong place.',

  'Our work combines product thinking, UX design, and engineering. We turn ideas, unclear requirements, and existing codebases into solutions that are clearer, more usable, and easier to grow.',

  'We keep the process straightforward: clear scope, realistic priorities, visible progress, and direct communication throughout the project.',

  'For us, success is not only launch. It is building something that works well, supports the business, and improves over time.',
];

export const SERVICES = [
  {
    id: 1,
    image: '/images/services/services-1.jpg',
    title: 'Product Discovery',
    description:
      'We clarify goals, user needs, priorities, and scope before development starts.',
  },
  {
    id: 2,
    image: '/images/services/services-2.jpg',
    title: 'UI/UX Design',
    description:
      'We design clear flows and interfaces built for usability, consistency, and product goals.',
  },
  {
    id: 3,
    image: '/images/services/services-3.jpg',
    title: 'Web & Mobile Development',
    description:
      'We build scalable digital products with clean implementation, strong performance, and reliable foundations.',
  },
  {
    id: 4,
    image: '/images/services/services-4.jpg',
    title: 'Support & Refactoring',
    description:
      'We improve existing products, fix weak codebases, and continue development with more stability.',
  },
];

export const PROCESS_COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        number: '001',
        title: 'Discovery & Scope',
        description:
          'Clarify business goals, user needs, priorities, and project scope before execution begins.',
      },
      {
        number: '002',
        title: 'UX & Interface Design',
        description:
          'Shape flows, wireframes, and interface decisions that make the product clear and usable.',
      },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        number: '003',
        title: 'Development',
        description:
          'Build the product with maintainable code, regular testing, and a focus on reliability and performance.',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        number: '004',
        title: 'Launch & Iteration',
        description:
          'Ship, review feedback, resolve issues, and continue improving the product after launch.',
      },
    ],
  },
];

export const MOBILE_PROCESS_DATA = [
  {
    id: 1,
    title: 'Discovery',
    description:
      'We define goals, user needs, priorities, and scope before design and development begin.',
    icon: '/images/process/discovery-icon.svg',
  },
  {
    id: 2,
    title: 'Design',
    description:
      'We shape flows and interfaces focused on clarity, usability, and product direction.',
    icon: '/images/process/design-icon.svg',
  },
  {
    id: 3,
    title: 'Development',
    description:
      'We turn approved decisions into working software with maintainable code and steady delivery.',
    icon: '/images/process/development-icon.svg',
  },
  {
    id: 4,
    title: 'Launch & Iteration',
    description:
      'We launch, review feedback, improve the experience, and support the next stage of growth.',
    icon: '/images/process/launch-icon.svg',
  },
];

export const REVIEWS = [
  {
    id: 1,
    text: "They understood our goals immediately and delivered a product that exceeded expectations. From the first call, they focused not only on what we wanted to build, but why. Their UX research helped simplify onboarding and improve key user flows. Communication was proactive, development was smooth, and the platform launched on time with excellent performance.",
    author: 'Sarah M.',
    role: 'Product Owner at FinSync',
    photo: '/images/review/review-icon.jpg',
  },
  {
    id: 2,
    text: 'Working with this team felt like having an extension of our own product department. Every design decision was backed by research and logic, and the engineering quality was top-level. We especially appreciated their post-launch involvement and continuous improvement mindset.',
    author: 'Daniel K.',
    role: 'Head of Product at Nexora',
    photo: '/images/review/review-icon.jpg',
  },
  {
    id: 3,
    text: 'The process was transparent, fast, and highly collaborative. They translated complex business requirements into a clean and intuitive user experience. Our engagement metrics improved significantly within weeks after launch.',
    author: 'Emily R.',
    role: 'CEO at BrightFlow',
    photo: '/images/review/review-icon.jpg',
  },
  {
    id: 4,
    text: 'Strong execution from strategy to delivery. The team balanced creativity with technical precision and helped us avoid costly mistakes early in the process. We would gladly work with them again.',
    author: 'Michael T.',
    role: 'Founder at ScaleLab',
    photo: '/images/review/review-icon.jpg',
  },
];

export const PARTNERS = [
  {
    id: 1,
    image: '/images/partners/partner-1.svg',
  },
  {
    id: 2,
    image: '/images/partners/partner-2.svg',
  },
  {
    id: 3,
    image: '/images/partners/partner-3.svg',
  },
  {
    id: 4,
    image: '/images/partners/partner-1.svg',
  },
  {
    id: 5,
    image: '/images/partners/partner-2.svg',
  },
  {
    id: 6,
    image: '/images/partners/partner-3.svg',
  },
];

export const FOOTER_MENU = [
  { name: 'About', href: '#about-us' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact', pending: true },
];

export const MODAL_FORM = '/images/modal/modal-picture.jpg';
