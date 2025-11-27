export interface User {
  id: string;
  name: string;
  email: string;
  githubUsername: string;
  avatar: string;
  country: string;
  bio: string;
  skills: string[];
  joinedAt: string;
  projectsCount: number;
  isActive: boolean;
}

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Amara Okafor',
    email: 'amara.okafor@gmail.com',
    githubUsername: 'amaraokafor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
    country: 'Nigeria',
    bio: 'Full-stack developer passionate about AI and agriculture tech. Building solutions for African farmers.',
    skills: ['React Native', 'TensorFlow', 'Python', 'Firebase', 'Machine Learning'],
    joinedAt: '2024-01-15T10:30:00Z',
    projectsCount: 3,
    isActive: true
  },
  {
    id: '2',
    name: 'Kwame Mensah',
    email: 'kwame.mensah@outlook.com',
    githubUsername: 'kwamemensah',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame',
    country: 'Ghana',
    bio: 'Frontend developer and UI/UX designer. Love creating beautiful, accessible web experiences.',
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'React'],
    joinedAt: '2024-02-20T14:20:00Z',
    projectsCount: 2,
    isActive: true
  },
  {
    id: '3',
    name: 'Fatima Hassan',
    email: 'fatima.hassan@yahoo.com',
    githubUsername: 'fatimahassan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    country: 'Kenya',
    bio: 'Backend engineer specializing in payment systems and fintech solutions for Africa.',
    skills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'AWS'],
    joinedAt: '2024-01-08T09:15:00Z',
    projectsCount: 4,
    isActive: true
  },
  {
    id: '4',
    name: 'Thabo Ndlovu',
    email: 'thabo.ndlovu@gmail.com',
    githubUsername: 'thabon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thabo',
    country: 'South Africa',
    bio: 'Healthcare tech developer. Building digital solutions to improve healthcare access in rural areas.',
    skills: ['Vue.js', 'Django', 'PostgreSQL', 'Mapbox', 'Python'],
    joinedAt: '2024-03-10T16:45:00Z',
    projectsCount: 2,
    isActive: false
  },
  {
    id: '5',
    name: 'Zainab Diallo',
    email: 'zainab.diallo@protonmail.com',
    githubUsername: 'zainabdiallo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab',
    country: 'Senegal',
    bio: 'Blockchain developer working on decentralized identity solutions for Africa.',
    skills: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'Smart Contracts'],
    joinedAt: '2024-02-05T11:00:00Z',
    projectsCount: 1,
    isActive: true
  },
  {
    id: '6',
    name: 'Elvin Cyubahiro',
    email: 'elvin.cyubahiro@alu.edu',
    githubUsername: 'elvincyubahiro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elvin',
    country: 'Rwanda',
    bio: 'ML engineer and NLP researcher. Building language tools for African languages.',
    skills: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'NLP'],
    joinedAt: '2024-01-20T13:30:00Z',
    projectsCount: 2,
    isActive: true
  },
  {
    id: '7',
    name: 'Aisha Kamara',
    email: 'aisha.kamara@gmail.com',
    githubUsername: 'aishakamara',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
    country: 'Sierra Leone',
    bio: 'IoT developer and smart city enthusiast. Creating connected solutions for African cities.',
    skills: ['IoT', 'Python', 'TensorFlow', 'React', 'AWS'],
    joinedAt: '2024-03-01T08:20:00Z',
    projectsCount: 1,
    isActive: true
  },
  {
    id: '8',
    name: 'Kofi Asante',
    email: 'kofi.asante@hotmail.com',
    githubUsername: 'kofiasante',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi',
    country: 'Ghana',
    bio: 'Full-stack developer focused on renewable energy and sustainability tech.',
    skills: ['Angular', 'Spring Boot', 'MySQL', 'Stripe', 'Java'],
    joinedAt: '2024-02-15T15:10:00Z',
    projectsCount: 1,
    isActive: true
  },
  {
    id: '9',
    name: 'Naledi Moyo',
    email: 'naledi.moyo@gmail.com',
    githubUsername: 'naledimoyo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naledi',
    country: 'Botswana',
    bio: 'Mobile developer and entrepreneur. Building marketplace apps for African artisans.',
    skills: ['Flutter', 'Firebase', 'Stripe', 'Figma', 'Dart'],
    joinedAt: '2024-01-25T12:00:00Z',
    projectsCount: 1,
    isActive: false
  },
  {
    id: '10',
    name: 'Ibrahim Musa',
    email: 'ibrahim.musa@outlook.com',
    githubUsername: 'ibrahimmusa',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim',
    country: 'Ethiopia',
    bio: 'Backend developer specializing in APIs and microservices. Weather data enthusiast.',
    skills: ['Go', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    joinedAt: '2024-02-28T09:45:00Z',
    projectsCount: 1,
    isActive: true
  },
  {
    id: '11',
    name: 'Chioma Nwosu',
    email: 'chioma.nwosu@gmail.com',
    githubUsername: 'chiomanwosu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma',
    country: 'Nigeria',
    bio: 'Music tech developer building streaming platforms for African artists.',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Stripe'],
    joinedAt: '2024-03-05T14:30:00Z',
    projectsCount: 1,
    isActive: true
  },
  {
    id: '12',
    name: 'Tendai Moyo',
    email: 'tendai.moyo@protonmail.com',
    githubUsername: 'tendaimoyo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tendai',
    country: 'Zimbabwe',
    bio: 'Mobile developer focused on offline-first apps for rural communities.',
    skills: ['React Native', 'Firebase', 'Twilio', 'Google Maps', 'SQLite'],
    joinedAt: '2024-01-12T11:20:00Z',
    projectsCount: 1,
    isActive: true
  }
];