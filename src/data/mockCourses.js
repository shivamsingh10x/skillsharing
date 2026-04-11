/**
 * Mock courses — all FREE platform (no pricing).
 * Images: Unsplash free-to-use license.
 * Photo credits in comments per course.
 */
export const mockCourses = [
  {
    id:'1', title:'Complete Web Development Bootcamp',
    description:'Master HTML, CSS, JavaScript, React and Node.js. Build 5 real-world projects and become a job-ready full-stack developer from scratch.',
    category:'Coding', level:'Beginner', price:0, rating:4.8, studentsCount:12,
    duration:'42 hours', isFree:true,
    // Unsplash: Luca Bravo — https://unsplash.com/photos/4hbJ-eymZ1o
    thumbnail:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m1',name:'Alex Johnson',avatar:'https://i.pravatar.cc/40?img=1'},
    lessons:[
      {id:'l1',title:'Introduction to HTML',duration:'15 min'},
      {id:'l2',title:'CSS Fundamentals',duration:'20 min'},
      {id:'l3',title:'JavaScript Basics',duration:'30 min'},
      {id:'l4',title:'React Components',duration:'45 min'},
      {id:'l5',title:'Node.js & Express',duration:'40 min'},
    ],
    tags:['html','css','javascript','react'],
    upcomingClass:{date:'2025-02-10',time:'6:00 PM',platform:'Zoom',link:'https://zoom.us/j/123456'},
  },
  {
    id:'2', title:'Guitar for Absolute Beginners',
    description:'Start your guitar journey today. Learn chords, strumming patterns, and play your first songs within weeks — no experience needed.',
    category:'Guitar', level:'Beginner', price:0, rating:4.9, studentsCount:8,
    duration:'18 hours', isFree:true,
    // Unsplash: Jefferson Santos — https://unsplash.com/photos/1510915361894-db8b60106cb1
    thumbnail:'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m2',name:'Maria Garcia',avatar:'https://i.pravatar.cc/40?img=5'},
    lessons:[
      {id:'l1',title:'Holding the Guitar Correctly',duration:'10 min'},
      {id:'l2',title:'Your First Chord: G Major',duration:'15 min'},
      {id:'l3',title:'Basic Strumming Patterns',duration:'20 min'},
      {id:'l4',title:'Playing Your First Song',duration:'25 min'},
    ],
    tags:['guitar','music','beginner'],
    upcomingClass:{date:'2025-02-12',time:'5:00 PM',platform:'Google Meet',link:'https://meet.google.com/abc-defg'},
  },
  {
    id:'3', title:'Contemporary Dance Masterclass',
    description:'Explore contemporary dance techniques, improvisation, and choreography with a professional dancer. Suitable for intermediate movers.',
    category:'Dance', level:'Intermediate', price:0, rating:4.7, studentsCount:5,
    duration:'24 hours', isFree:true,
    // Unsplash: Ahmad Odeh — https://unsplash.com/photos/1547153760-18fc86324498
    thumbnail:'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m3',name:'Sophie Lee',avatar:'https://i.pravatar.cc/40?img=9'},
    lessons:[
      {id:'l1',title:'Warm-up Routine',duration:'20 min'},
      {id:'l2',title:'Floor Work Basics',duration:'25 min'},
      {id:'l3',title:'Improvisation Techniques',duration:'30 min'},
    ],
    tags:['dance','contemporary'],
    upcomingClass:{date:'2025-02-14',time:'4:00 PM',platform:'Zoom',link:'https://zoom.us/j/789012'},
  },
  {
    id:'4', title:'UI/UX Design with Figma',
    description:'Master Figma and core design principles to create stunning user interfaces and experiences for web and mobile apps.',
    category:'Design', level:'Intermediate', price:0, rating:4.6, studentsCount:9,
    duration:'30 hours', isFree:true,
    // Unsplash: Balázs Kétyi — https://unsplash.com/photos/1561070791-2526d30994b5
    thumbnail:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m4',name:'David Kim',avatar:'https://i.pravatar.cc/40?img=12'},
    lessons:[
      {id:'l1',title:'Figma Interface Tour',duration:'12 min'},
      {id:'l2',title:'Design Principles & Typography',duration:'18 min'},
      {id:'l3',title:'Building Your First Screen',duration:'35 min'},
      {id:'l4',title:'Prototyping & Handoff',duration:'28 min'},
    ],
    tags:['figma','ui','ux','design'],
    upcomingClass:{date:'2025-02-15',time:'7:00 PM',platform:'Zoom',link:'https://zoom.us/j/345678'},
  },
  {
    id:'5', title:'Piano Fundamentals',
    description:'Learn to read sheet music and play piano from zero. Covers scales, chords, and popular songs in a structured, fun way.',
    category:'Music', level:'Beginner', price:0, rating:4.8, studentsCount:7,
    duration:'22 hours', isFree:true,
    // Unsplash: Jordan Whitfield — https://unsplash.com/photos/1520523839897-bd0b52f945a0
    thumbnail:'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m5',name:'Emma Wilson',avatar:'https://i.pravatar.cc/40?img=20'},
    lessons:[
      {id:'l1',title:'Piano Keys Overview',duration:'10 min'},
      {id:'l2',title:'Reading Sheet Music',duration:'20 min'},
      {id:'l3',title:'Playing Your First Song',duration:'25 min'},
    ],
    tags:['piano','music'],
    upcomingClass:{date:'2025-02-16',time:'3:00 PM',platform:'Google Meet',link:'https://meet.google.com/xyz-abcd'},
  },
  {
    id:'6', title:'Python & Data Science Bootcamp',
    description:'Deep dive into Python, pandas, numpy, matplotlib, and machine learning. Build real data science projects from scratch.',
    category:'Coding', level:'Advanced', price:0, rating:4.9, studentsCount:15,
    duration:'55 hours', isFree:true,
    // Unsplash: Markus Spiske — https://unsplash.com/photos/1526374965328-7f61d4dc18c5
    thumbnail:'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m1',name:'Alex Johnson',avatar:'https://i.pravatar.cc/40?img=1'},
    lessons:[
      {id:'l1',title:'Python Refresher',duration:'25 min'},
      {id:'l2',title:'Intro to Pandas & NumPy',duration:'30 min'},
      {id:'l3',title:'Data Visualization',duration:'35 min'},
      {id:'l4',title:'Intro to Machine Learning',duration:'50 min'},
    ],
    tags:['python','data science','ml'],
    upcomingClass:{date:'2025-02-18',time:'8:00 PM',platform:'Zoom',link:'https://zoom.us/j/901234'},
  },
  {
    id:'7', title:'Photography Masterclass',
    description:'Learn composition, lighting, and editing to take stunning photos with any camera. From DSLR to smartphone photography.',
    category:'Photography', level:'Beginner', price:0, rating:4.7, studentsCount:6,
    duration:'20 hours', isFree:true,
    // Unsplash: Terje Sollie — https://unsplash.com/photos/1452587996403-9d8d9a8c1b1a
    thumbnail:'https://images.unsplash.com/photo-1452587996403-9d8d9a8c1b1a?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m6',name:'James Park',avatar:'https://i.pravatar.cc/40?img=15'},
    lessons:[
      {id:'l1',title:'Camera Basics',duration:'15 min'},
      {id:'l2',title:'Composition Rules',duration:'20 min'},
      {id:'l3',title:'Lighting Techniques',duration:'25 min'},
    ],
    tags:['photography','camera','editing'],
    upcomingClass:{date:'2025-02-20',time:'5:30 PM',platform:'Zoom',link:'https://zoom.us/j/567890'},
  },
  {
    id:'8', title:'Digital Marketing Fundamentals',
    description:'Master SEO, social media marketing, email campaigns, and paid ads. Build a complete digital marketing strategy from scratch.',
    category:'Business', level:'Beginner', price:0, rating:4.5, studentsCount:11,
    duration:'28 hours', isFree:true,
    // Unsplash: Campaign Creators — https://unsplash.com/photos/qCi_MzVODoU
    thumbnail:'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m7',name:'Priya Sharma',avatar:'https://i.pravatar.cc/40?img=25'},
    lessons:[
      {id:'l1',title:'Intro to Digital Marketing',duration:'18 min'},
      {id:'l2',title:'SEO Fundamentals',duration:'30 min'},
      {id:'l3',title:'Social Media Strategy',duration:'25 min'},
    ],
    tags:['marketing','seo','social media'],
    upcomingClass:{date:'2025-02-22',time:'6:30 PM',platform:'Google Meet',link:'https://meet.google.com/mno-pqrs'},
  },
  {
    id:'9', title:'Spanish for Beginners',
    description:'Learn conversational Spanish from zero. Master greetings, everyday phrases, grammar basics, and start speaking confidently.',
    category:'Language', level:'Beginner', price:0, rating:4.8, studentsCount:14,
    duration:'16 hours', isFree:true,
    // Unsplash: Romain Vignes — https://unsplash.com/photos/ywqa9IZB-dU
    thumbnail:'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m8',name:'Carlos Rivera',avatar:'https://i.pravatar.cc/40?img=30'},
    lessons:[
      {id:'l1',title:'Greetings & Introductions',duration:'12 min'},
      {id:'l2',title:'Numbers & Colors',duration:'15 min'},
      {id:'l3',title:'Basic Grammar',duration:'20 min'},
    ],
    tags:['spanish','language','beginner'],
    upcomingClass:{date:'2025-02-24',time:'4:30 PM',platform:'Zoom',link:'https://zoom.us/j/112233'},
  },
  {
    id:'10', title:'Yoga & Mindfulness',
    description:'Build strength, flexibility, and mental clarity through guided yoga sessions and mindfulness practices for all levels.',
    category:'Fitness', level:'Beginner', price:0, rating:4.9, studentsCount:18,
    duration:'14 hours', isFree:true,
    // Unsplash: Conscious Design — https://unsplash.com/photos/r3pIy-3Xgmg
    thumbnail:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m9',name:'Aisha Patel',avatar:'https://i.pravatar.cc/40?img=35'},
    lessons:[
      {id:'l1',title:'Breathing Techniques',duration:'10 min'},
      {id:'l2',title:'Sun Salutation',duration:'20 min'},
      {id:'l3',title:'Mindfulness Meditation',duration:'15 min'},
    ],
    tags:['yoga','fitness','mindfulness'],
    upcomingClass:{date:'2025-02-25',time:'7:00 AM',platform:'Zoom',link:'https://zoom.us/j/445566'},
  },
  {
    id:'11', title:'Italian Cooking Masterclass',
    description:'Learn authentic Italian recipes from pasta to tiramisu. Master techniques used by professional chefs in Italian kitchens.',
    category:'Cooking', level:'Intermediate', price:0, rating:4.7, studentsCount:9,
    duration:'12 hours', isFree:true,
    // Unsplash: Eaters Collective — https://unsplash.com/photos/rS1GogPLVHk
    thumbnail:'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m10',name:'Marco Rossi',avatar:'https://i.pravatar.cc/40?img=40'},
    lessons:[
      {id:'l1',title:'Fresh Pasta from Scratch',duration:'30 min'},
      {id:'l2',title:'Classic Tomato Sauce',duration:'20 min'},
      {id:'l3',title:'Tiramisu',duration:'25 min'},
    ],
    tags:['cooking','italian','recipes'],
    upcomingClass:{date:'2025-02-26',time:'5:00 PM',platform:'Google Meet',link:'https://meet.google.com/tuv-wxyz'},
  },
  {
    id:'12', title:'Academic Writing & Research',
    description:'Master essay writing, research methodology, citations, and academic argumentation. Essential for students and researchers.',
    category:'Academic', level:'Intermediate', price:0, rating:4.6, studentsCount:10,
    duration:'18 hours', isFree:true,
    // Unsplash: Thought Catalog — https://unsplash.com/photos/505eectW54k
    thumbnail:'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop&auto=format',
    mentor:{id:'m4',name:'David Kim',avatar:'https://i.pravatar.cc/40?img=12'},
    lessons:[
      {id:'l1',title:'Essay Structure',duration:'15 min'},
      {id:'l2',title:'Research Methods',duration:'25 min'},
      {id:'l3',title:'Citations & References',duration:'20 min'},
    ],
    tags:['writing','academic','research'],
    upcomingClass:{date:'2025-02-28',time:'6:00 PM',platform:'Zoom',link:'https://zoom.us/j/778899'},
  },
];
