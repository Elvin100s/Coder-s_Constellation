export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubRepo?: string;
  owner: {
    name: string;
    avatar: string;
    githubUsername: string;
    country: string;
    email: string;
  };
  createdAt: string;
}

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Agriculture Platform',
    description: 'Building a mobile app that uses machine learning to help African farmers detect crop diseases early and get real-time farming advice.',
    techStack: ['React Native', 'TensorFlow', 'Python', 'Firebase'],
    githubRepo: 'https://github.com/tensorflow/tensorflow',
    owner: {
      name: 'Amara Okafor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
      githubUsername: 'amaraokafor',
      country: 'Nigeria',
      email: 'amara.okafor@example.com'
    },
    createdAt: '2024-11-20T10:30:00Z'
  },
  {
    id: '2',
    title: 'Pan-African E-Learning Platform',
    description: 'Creating an accessible online learning platform with courses in multiple African languages. Looking for frontend and backend developers.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    githubRepo: 'https://github.com/vercel/next.js',
    owner: {
      name: 'Kwame Mensah',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame',
      githubUsername: 'kwamemensah',
      country: 'Ghana',
      email: 'kwame.mensah@example.com'
    },
    createdAt: '2024-11-19T14:20:00Z'
  },
  {
    id: '3',
    title: 'Mobile Money Integration API',
    description: 'Open-source API to simplify mobile money integrations across Africa. Need developers familiar with payment systems.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    githubRepo: 'https://github.com/nodejs/node',
    owner: {
      name: 'Fatima Hassan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      githubUsername: 'fatimahassan',
      country: 'Kenya',
      email: 'fatima.hassan@example.com'
    },
    createdAt: '2024-11-18T09:15:00Z'
  },
  {
    id: '4',
    title: 'Community Health Tracker',
    description: 'Web app for tracking community health metrics and connecting patients with nearby clinics. Healthcare tech for Africa.',
    techStack: ['Vue.js', 'Django', 'PostgreSQL', 'Mapbox'],
    githubRepo: 'https://github.com/vuejs/vue',
    owner: {
      name: 'Thabo Ndlovu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thabo',
      githubUsername: 'thabon',
      country: 'South Africa',
      email: 'thabo.ndlovu@example.com'
    },
    createdAt: '2024-11-17T16:45:00Z'
  },
  {
    id: '5',
    title: 'Decentralized Identity System',
    description: 'Blockchain-based digital identity solution for Africans without traditional IDs. Looking for blockchain and smart contract developers.',
    techStack: ['Solidity', 'Ethereum', 'React', 'Web3.js'],
    githubRepo: 'https://github.com/ethereum/go-ethereum',
    owner: {
      name: 'Zainab Diallo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab',
      githubUsername: 'zainabdiallo',
      country: 'Senegal',
      email: 'zainab.diallo@example.com'
    },
    createdAt: '2024-11-16T11:00:00Z'
  },
  {
    id: '6',
    title: 'Local Language Translation Tool',
    description: 'NLP tool for translating between African languages. Currently supporting Swahili, Yoruba, and Amharic. Need ML engineers.',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
    githubRepo: 'https://github.com/pytorch/pytorch',
    owner: {
      name: 'Elvin Cyubahiro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elvin',
      githubUsername: 'elvincyubahiro',
      country: 'Rwanda',
      email: 'elvin.cyubahiro@example.com'
    },
    createdAt: '2024-11-15T13:30:00Z'
  },
  {
    id: '7',
    title: 'Smart City Traffic Management',
    description: 'IoT-based traffic monitoring system for African cities. Using sensors and AI to optimize traffic flow and reduce congestion.',
    techStack: ['IoT', 'Python', 'TensorFlow', 'React', 'AWS'],
    githubRepo: 'https://github.com/tensorflow/models',
    owner: {
      name: 'Aisha Kamara',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
      githubUsername: 'aishakamara',
      country: 'Sierra Leone',
      email: 'aisha.kamara@example.com'
    },
    createdAt: '2024-11-14T08:20:00Z'
  },
  {
    id: '8',
    title: 'Renewable Energy Marketplace',
    description: 'Platform connecting solar panel providers with rural communities. Building a marketplace for clean energy solutions.',
    techStack: ['Angular', 'Spring Boot', 'MySQL', 'Stripe'],
    githubRepo: 'https://github.com/angular/angular',
    owner: {
      name: 'Kofi Asante',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi',
      githubUsername: 'kofiasante',
      country: 'Ghana',
      email: 'kofi.asante@example.com'
    },
    createdAt: '2024-11-13T15:10:00Z'
  },
  {
    id: '9',
    title: 'Artisan Marketplace App',
    description: 'Mobile marketplace for African artisans to sell handmade crafts globally. Need mobile developers and UI/UX designers.',
    techStack: ['Flutter', 'Firebase', 'Stripe', 'Figma'],
    githubRepo: 'https://github.com/flutter/flutter',
    owner: {
      name: 'Naledi Moyo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naledi',
      githubUsername: 'naledimoyo',
      country: 'Botswana',
      email: 'naledi.moyo@example.com'
    },
    createdAt: '2024-11-12T12:00:00Z'
  },
  {
    id: '10',
    title: 'Open Source Weather API',
    description: 'Free weather API with African-specific data. Aggregating data from local weather stations across the continent.',
    techStack: ['Go', 'PostgreSQL', 'Redis', 'Docker'],
    githubRepo: 'https://github.com/golang/go',
    owner: {
      name: 'Ibrahim Musa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim',
      githubUsername: 'ibrahimmusa',
      country: 'Ethiopia',
      email: 'ibrahim.musa@example.com'
    },
    createdAt: '2024-11-11T09:45:00Z'
  },
  {
    id: '11',
    title: 'African Music Streaming Platform',
    description: 'Spotify alternative focused on African artists. Fair revenue sharing and support for local languages. Need full-stack developers.',
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Stripe'],
    githubRepo: 'https://github.com/facebook/react',
    owner: {
      name: 'Chioma Nwosu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma',
      githubUsername: 'chiomanwosu',
      country: 'Nigeria',
      email: 'chioma.nwosu@example.com'
    },
    createdAt: '2024-11-10T14:30:00Z'
  },
  {
    id: '12',
    title: 'Ride-Sharing for Rural Areas',
    description: 'Connecting rural communities with affordable transportation. Works offline-first with SMS integration.',
    techStack: ['React Native', 'Firebase', 'Twilio', 'Google Maps'],
    owner: {
      name: 'Tendai Moyo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tendai',
      githubUsername: 'tendaimoyo',
      country: 'Zimbabwe',
      email: 'tendai.moyo@example.com'
    },
    createdAt: '2024-11-09T11:20:00Z'
  },
  {
    id: '13',
    title: 'Blockchain Supply Chain Tracker',
    description: 'Track agricultural products from farm to market using blockchain. Ensuring transparency and fair pricing for farmers.',
    techStack: ['Solidity', 'Hardhat', 'React', 'IPFS', 'Polygon'],
    githubRepo: 'https://github.com/ethereum/solidity',
    owner: {
      name: 'Youssef El-Amin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef',
      githubUsername: 'youssefamin',
      country: 'Egypt',
      email: 'youssef.elamin@example.com'
    },
    createdAt: '2024-11-08T16:45:00Z'
  },
  {
    id: '14',
    title: 'Mental Health Support Chatbot',
    description: 'AI chatbot providing mental health support in African languages. Free, anonymous, and culturally sensitive.',
    techStack: ['Python', 'Rasa', 'NLP', 'FastAPI', 'PostgreSQL'],
    owner: {
      name: 'Amina Juma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
      githubUsername: 'aminajuma',
      country: 'Tanzania',
      email: 'amina.juma@example.com'
    },
    createdAt: '2024-11-07T09:15:00Z'
  },
  {
    id: '15',
    title: 'Freelance Platform for African Creatives',
    description: 'Connecting African designers, writers, and developers with global clients. Lower fees than Upwork/Fiverr.',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind'],
    githubRepo: 'https://github.com/prisma/prisma',
    owner: {
      name: 'Kwesi Boateng',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwesi',
      githubUsername: 'kwesiboateng',
      country: 'Ghana',
      email: 'kwesi.boateng@example.com'
    },
    createdAt: '2024-11-06T13:00:00Z'
  },
  {
    id: '16',
    title: 'Open Source ERP for SMEs',
    description: 'Affordable ERP system tailored for African small businesses. Inventory, accounting, and HR management.',
    techStack: ['Laravel', 'Vue.js', 'MySQL', 'Docker'],
    githubRepo: 'https://github.com/laravel/laravel',
    owner: {
      name: 'Lindiwe Khumalo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lindiwe',
      githubUsername: 'lindiwekhumalo',
      country: 'South Africa',
      email: 'lindiwe.khumalo@example.com'
    },
    createdAt: '2024-11-05T10:30:00Z'
  },
  {
    id: '17',
    title: 'Virtual Reality Tourism App',
    description: 'VR tours of African landmarks and cultural sites. Promoting tourism and preserving heritage digitally.',
    techStack: ['Unity', 'C#', 'WebXR', 'Three.js', 'Blender'],
    owner: {
      name: 'Jabari Omondi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jabari',
      githubUsername: 'jabariomondi',
      country: 'Kenya',
      email: 'jabari.omondi@example.com'
    },
    createdAt: '2024-11-04T15:20:00Z'
  },
  {
    id: '18',
    title: 'Peer-to-Peer Lending Platform',
    description: 'Connecting lenders and borrowers directly. Microloans for entrepreneurs without bank access.',
    techStack: ['Django', 'React', 'PostgreSQL', 'Celery', 'Redis'],
    githubRepo: 'https://github.com/django/django',
    owner: {
      name: 'Fatoumata Diop',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatoumata',
      githubUsername: 'fatoumadiop',
      country: 'Mali',
      email: 'fatoumata.diop@example.com'
    },
    createdAt: '2024-11-03T08:45:00Z'
  },
  {
    id: '19',
    title: 'Smart Irrigation System',
    description: 'IoT sensors and ML to optimize water usage for farms. Combating drought and improving crop yields.',
    techStack: ['Arduino', 'Python', 'MQTT', 'InfluxDB', 'Grafana'],
    owner: {
      name: 'Abebe Tadesse',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abebe',
      githubUsername: 'abebetadesse',
      country: 'Ethiopia',
      email: 'abebe.tadesse@example.com'
    },
    createdAt: '2024-11-02T12:10:00Z'
  },
  {
    id: '20',
    title: 'African News Aggregator',
    description: 'Curated news from across Africa with AI-powered fact-checking. Fighting misinformation.',
    techStack: ['Python', 'Scrapy', 'NLP', 'React', 'Elasticsearch'],
    githubRepo: 'https://github.com/scrapy/scrapy',
    owner: {
      name: 'Nia Mensah',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nia',
      githubUsername: 'niamensah',
      country: 'Ghana',
      email: 'nia.mensah@example.com'
    },
    createdAt: '2024-11-01T14:55:00Z'
  },
  {
    id: '21',
    title: 'Telemedicine Platform',
    description: 'Connect patients in remote areas with doctors via video calls. Prescription delivery integration.',
    techStack: ['Flutter', 'WebRTC', 'Firebase', 'Stripe', 'Twilio'],
    owner: {
      name: 'Sekou Traore',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sekou',
      githubUsername: 'sekoutraore',
      country: 'Ivory Coast',
      email: 'sekou.traore@example.com'
    },
    createdAt: '2024-10-31T09:30:00Z'
  },
  {
    id: '22',
    title: 'Coding Bootcamp Management System',
    description: 'Platform for managing coding bootcamps across Africa. Student tracking, curriculum, and job placement.',
    techStack: ['Ruby on Rails', 'PostgreSQL', 'React', 'Heroku'],
    githubRepo: 'https://github.com/rails/rails',
    owner: {
      name: 'Thandiwe Dube',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thandiwe',
      githubUsername: 'thandiwedube',
      country: 'Zambia',
      email: 'thandiwe.dube@example.com'
    },
    createdAt: '2024-10-30T11:15:00Z'
  },
  {
    id: '23',
    title: 'Wildlife Conservation Tracker',
    description: 'Using drones and AI to track endangered species. Real-time alerts for poaching prevention.',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'ROS', 'React'],
    owner: {
      name: 'Mandla Nkosi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mandla',
      githubUsername: 'mandlankosi',
      country: 'South Africa',
      email: 'mandla.nkosi@example.com'
    },
    createdAt: '2024-10-29T16:40:00Z'
  },
  {
    id: '24',
    title: 'Decentralized Social Network',
    description: 'Privacy-focused social network built on blockchain. Users own their data. No ads.',
    techStack: ['Rust', 'IPFS', 'React', 'WebAssembly', 'Substrate'],
    githubRepo: 'https://github.com/rust-lang/rust',
    owner: {
      name: 'Amara Nwosu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmaraN',
      githubUsername: 'amaranwosu',
      country: 'Nigeria',
      email: 'amara.nwosu@example.com'
    },
    createdAt: '2024-10-28T13:25:00Z'
  },
  {
    id: '25',
    title: 'Food Delivery for Street Vendors',
    description: 'Helping street food vendors reach more customers. Simple app with SMS ordering option.',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Twilio'],
    owner: {
      name: 'Zuri Mwangi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zuri',
      githubUsername: 'zurimwangi',
      country: 'Kenya',
      email: 'zuri.mwangi@example.com'
    },
    createdAt: '2024-10-27T10:50:00Z'
  },
  {
    id: '26',
    title: 'Waste Management Optimization',
    description: 'Route optimization for waste collection trucks using AI. Reducing costs and improving sanitation.',
    techStack: ['Python', 'Google OR-Tools', 'FastAPI', 'Vue.js'],
    owner: {
      name: 'Yara Abdallah',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yara',
      githubUsername: 'yaraabdallah',
      country: 'Egypt',
      email: 'yara.abdallah@example.com'
    },
    createdAt: '2024-10-26T14:35:00Z'
  },
  {
    id: '27',
    title: 'Digital Library for Schools',
    description: 'Free digital library with textbooks and educational resources. Works offline with periodic syncing.',
    techStack: ['Electron', 'React', 'SQLite', 'IndexedDB'],
    githubRepo: 'https://github.com/electron/electron',
    owner: {
      name: 'Chidi Okonkwo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chidi',
      githubUsername: 'chidiokonkwo',
      country: 'Nigeria',
      email: 'chidi.okonkwo@example.com'
    },
    createdAt: '2024-10-25T09:20:00Z'
  },
  {
    id: '28',
    title: 'Crowdfunding for Community Projects',
    description: 'Platform for funding local community initiatives. Water wells, schools, solar installations.',
    techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'Vercel'],
    owner: {
      name: 'Akosua Mensah',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Akosua',
      githubUsername: 'akosuamensah',
      country: 'Ghana',
      email: 'akosua.mensah@example.com'
    },
    createdAt: '2024-10-24T15:45:00Z'
  },
  {
    id: '29',
    title: 'AI-Powered Legal Assistant',
    description: 'Chatbot providing basic legal advice in African languages. Helping people understand their rights.',
    techStack: ['Python', 'GPT-4', 'LangChain', 'FastAPI', 'React'],
    owner: {
      name: 'Olusegun Adeyemi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olusegun',
      githubUsername: 'olusegunadeye mi',
      country: 'Nigeria',
      email: 'olusegun.adeyemi@example.com'
    },
    createdAt: '2024-10-23T11:30:00Z'
  },
  {
    id: '30',
    title: 'Renewable Energy Grid Simulator',
    description: 'Simulating solar/wind energy grids for African cities. Helping governments plan sustainable infrastructure.',
    techStack: ['Python', 'NumPy', 'Pandas', 'Plotly', 'Streamlit'],
    githubRepo: 'https://github.com/streamlit/streamlit',
    owner: {
      name: 'Lerato Molefe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lerato',
      githubUsername: 'leratomolefe',
      country: 'South Africa',
      email: 'lerato.molefe@example.com'
    },
    createdAt: '2024-10-22T08:15:00Z'
  }
];
