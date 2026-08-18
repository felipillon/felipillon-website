import {
  HeartPulse, Wind, HardHat, Cpu, Wrench, Package,
  Globe2, Bot, Rocket, Zap, Layers, Clock,
  Briefcase, Users, Code2, Cloud, Workflow, Search,
  TrendingUp, Megaphone, Database, Shield,
} from "lucide-react";

// ── Rich imagery — every page has its own authentic photo ──────────────────
export const MEDIA = {
  // Hero — cinematic team / city
  hero: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=85",
  heroAlt: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=85",

  // About — real office feel
  about: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
  aboutTeam: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85",
  aboutMission: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",

  // Staffing — human capital
  staffing: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=85",
  interview: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85",
  handshake: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",

  // Industries / Specialities
  healthcare: "https://images.pexels.com/photos/5452247/pexels-photo-5452247.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&dpr=2",
  healthcareWide: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=85",
  renewable: "https://images.pexels.com/photos/14468163/pexels-photo-14468163.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&dpr=2",
  renewableWide: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=85",
  construction: "https://images.pexels.com/photos/18078304/pexels-photo-18078304.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&dpr=2",
  constructionWide: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85",
  technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
  logistics: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
  trades: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1400&q=85",

  // Services / Technology
  software: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
  ai: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1400&q=85",
  servers: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1400&q=85",
  marketing: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1400&q=85",
  crm: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=85",

  // Team / People
  team: "https://images.pexels.com/photos/36733304/pexels-photo-36733304.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&dpr=2",
  teamMeeting: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
  teamWork: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85",
  ceo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85",

  // Offices / Locations
  berlin: "https://images.unsplash.com/photo-1587330979470-3595ac045ab0?auto=format&fit=crop&w=1400&q=85",
  berlinOffice: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
  india: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=85",
  philippines: "https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=1400&q=85",
  indiaLandmark: "/indialocation.jpg",
  philippinesLandmark: "/phillipines.jpg",
  italy: "/italy.jpg",
  office: "https://images.pexels.com/photos/13219418/pexels-photo-13219418.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&dpr=2",
  officeWide: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1920&q=85",

  // Blog / Misc
  blog1: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=85",
  blog2: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=85",
  blog3: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=85",
  blog4: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=85",
};

// ── Video background (hero) ─────────────────────────────────────────────────
// ── Video background ────────────────────────────────────────────────────────
// IMPORTANT: Place your video file at frontend/public/hero-bg.mp4
// Download a free business video from mixkit.co or pexels.com/videos
// See VIDEO_SETUP.md for full instructions
export const VIDEO_BG = "/hero-bg.mp4";
export const VIDEO_BG_2 = "/hero-bg.mp4";
export const VIDEO_BG_FALLBACK = "/hero-bg.mp4";
// Poster image — shows instantly before video loads (prevents blank screen)
export const VIDEO_POSTER = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80";
export const GLOBAL_VIDEO_BG = "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4";
export const GLOBAL_VIDEO_POSTER = "https://images.pexels.com/videos/3129957/free-video-3129957.jpg?auto=compress&cs=tinysrgb&w=1920";
export const ABOUT_VIDEO_BG = "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";
export const STAFFING_VIDEO_BG = "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4";

// ── Home hero video — Felipillon brand video, loops continuously ───────────
export const HERO_VIDEO = {
  src: "/felipillon-linkedin-hero.mp4",
  poster: "/felipillon-linkedin-hero-poster.jpg",
};

export const HERO_VIDEOS = [
  {
    label: "Felipillon",
    src: HERO_VIDEO.src,
    poster: HERO_VIDEO.poster,
    maxDuration: 7, // stop before logo appears at bottom
  },
  {
    label: "Construction",
    src: "https://videos.pexels.com/video-files/1197802/1197802-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/1197802/free-video-1197802.jpg?auto=compress&cs=tinysrgb&w=1920",
    maxDuration: 7,
  },
  {
    label: "Renewable Energy",
    src: "https://videos.pexels.com/video-files/9789926/9789926-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/9789926/4-k-aerial-shot-battery-bird-eye-view-9789926.jpeg?auto=compress&cs=tinysrgb&w=1920",
    maxDuration: 7,
  },
  {
    label: "Technology",
    src: "https://videos.pexels.com/video-files/6804109/6804109-uhd_2732_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/6804109/pexels-photo-6804109.jpeg?auto=compress&cs=tinysrgb&w=1920",
    maxDuration: 7,
  },
];

// ── Per-speciality videos (used on the Specialities page — one clip per
// card, matched to that speciality's line of work). ────────────────────────
export const SPECIALITY_VIDEOS = {
  "healthcare": {
    src: "https://videos.pexels.com/video-files/5722215/5722215-uhd_2732_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/5722215/pexels-photo-5722215.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  "skilled-trades": {
    src: "https://videos.pexels.com/video-files/6079420/6079420-uhd_2560_1440_24fps.mp4",
    poster: "https://images.pexels.com/videos/6079420/pexels-photo-6079420.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  "logistics": {
    src: "https://videos.pexels.com/video-files/2745883/2745883-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/2745883/free-video-2745883.jpg?auto=compress&cs=tinysrgb&w=1920",
  },
  "construction": {
    src: "https://videos.pexels.com/video-files/1197802/1197802-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/1197802/free-video-1197802.jpg?auto=compress&cs=tinysrgb&w=1920",
  },
  "renewable": {
    src: "https://videos.pexels.com/video-files/9789926/9789926-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/9789926/4-k-aerial-shot-battery-bird-eye-view-9789926.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  "technology": {
    src: "https://videos.pexels.com/video-files/6804109/6804109-uhd_2732_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/6804109/pexels-photo-6804109.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
};

// ── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "home", path: "/" },
  { label: "about", path: "/about" },
  { label: "services", path: "/services" },
  { label: "specialities", path: "/specialities" },
  { label: "staffing", path: "/staffing" },
  { label: "team", path: "/team" },
  { label: "openRoles", path: "/open-roles" },
  { label: "caseStudies", path: "/case-studies" },
  { label: "testimonials", path: "/testimonials" },
  { label: "locations", path: "/locations" },
  { label: "blog", path: "/blog" },
];

// ── Specialities (6 sectors from PDF) ──────────────────────────────────────
export const SPECIALITIES = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    img: MEDIA.healthcare,
    imgWide: MEDIA.healthcareWide,
    color: "#C9973A",
    desc: "Surgeons, specialists and clinical professionals placed across leading hospital networks — permanent, locum and executive roles.",
    services: ["Surgical Teams", "ICU & Critical Care", "Medical Directors", "Allied Health", "Pharmacy & Lab"],
    markets: ["Germany", "India", "Philippines"],
    stat: "120+",
    statLabel: "Clinicians placed",
  },
  {
    id: "skilled-trades",
    name: "Skilled Trades",
    icon: Wrench,
    img: MEDIA.trades,
    imgWide: MEDIA.trades,
    color: "#F59E0B",
    desc: "Certified tradespeople and technical specialists placed across manufacturing, maintenance and industrial sectors.",
    services: ["Electricians", "Welders", "HVAC Technicians", "Mechanics", "Industrial Operators"],
    markets: ["Germany", "India", "Philippines"],
    stat: "200+",
    statLabel: "Tradespeople placed",
  },
  {
    id: "logistics",
    name: "Logistics & Warehouse",
    icon: Package,
    img: MEDIA.logistics,
    imgWide: MEDIA.logistics,
    color: "#10B981",
    desc: "Supply chain professionals and logistics coordinators driving operational efficiency at scale.",
    services: ["Supply Chain Managers", "Warehouse Supervisors", "Logistics Coordinators", "Fleet Managers", "Procurement"],
    markets: ["Germany", "India", "Philippines"],
    stat: "80+",
    statLabel: "Operations roles filled",
  },
  {
    id: "construction",
    name: "Construction",
    icon: HardHat,
    img: MEDIA.construction,
    imgWide: MEDIA.constructionWide,
    color: "#EF4444",
    desc: "Project leaders, site managers and skilled trades for large-scale infrastructure and commercial construction.",
    services: ["Project Directors", "Site Managers", "Civil Engineers", "Quantity Surveyors", "HSE Specialists"],
    markets: ["Germany", "India", "Philippines"],
    stat: "60+",
    statLabel: "Projects staffed",
  },
  {
    id: "renewable",
    name: "Renewable Energy",
    icon: Wind,
    img: MEDIA.renewable,
    imgWide: MEDIA.renewableWide,
    color: "#3B82F6",
    desc: "PV, BESS and grid engineers powering the global energy transition. Roles from field technician to project director.",
    services: ["Solar PV Engineers", "Battery Storage", "Grid Engineers", "Wind Technicians", "Energy PMs"],
    markets: ["Germany", "India", "Philippines"],
    stat: "45+",
    statLabel: "Energy engineers placed",
  },
  {
    id: "technology",
    name: "Technology Solutions",
    icon: Cpu,
    img: MEDIA.technology,
    imgWide: MEDIA.servers,
    color: "#8B5CF6",
    desc: "Software development, digital marketing, AI applications and CRM platforms — elite technical talent and custom-built solutions.",
    services: ["Software Development", "Digital Marketing", "AI Applications", "CRM Platforms", "IT Administration"],
    markets: ["Germany", "India", "Philippines"],
    stat: "50+",
    statLabel: "Tech projects delivered",
  },
];

export const INDUSTRIES = SPECIALITIES;

// ── Why Felipillon ──────────────────────────────────────────────────────────
export const WHY = [
  { icon: Globe2, title: "Global Reach", desc: "Talent networks across Europe and Asia-Pacific from four locations in Germany, India, the Philippines and Italy." },
  { icon: Bot, title: "People Match AI", desc: "Proprietary AI engine scanning 50+ platforms: LinkedIn, SEEK, Indeed, Naukri, XING, HireEZ and more." },
  { icon: Rocket, title: "Speed to Hire", desc: "Shortlists in days. We move faster than any competitor without cutting corners on quality." },
  { icon: Zap, title: "Affordable Quality", desc: "Enterprise-grade talent and software without the enterprise price tag. Long-term value, not short-term fees." },
  { icon: Shield, title: "95% Retention", desc: "Our placements stay. Rigorous cultural and skills screening means the right person, not just the available person." },
  { icon: Clock, title: "24/7 Operations", desc: "Follow-the-sun across Germany (CET), India (IST) and Philippines (PHT). Someone is always on." },
];

export const METRICS = [
  { value: 500, suffix: "+", label: "placements" },
  { value: 50, suffix: "+", label: "projects" },
  { value: 4, suffix: "", label: "offices" },
  { value: 95, suffix: "%", label: "satisfaction" },
];

// ── Services ────────────────────────────────────────────────────────────────
export const SERVICES = [
  { icon: Users, title: "Staffing & Recruitment", desc: "Healthcare, Skilled Trades, Logistics, Construction and Renewable Energy talent placed globally.", img: MEDIA.staffing },
  { icon: Code2, title: "Software Development", desc: "Bespoke web and mobile platforms built on modern, maintainable stacks.", img: MEDIA.software },
  { icon: Megaphone, title: "Digital Marketing", desc: "Performance marketing, SEO, content and brand strategy to grow your business.", img: MEDIA.marketing },
  { icon: Bot, title: "AI Applications", desc: "LLM apps, RAG pipelines, computer vision and ML model deployment.", img: MEDIA.ai },
  { icon: Database, title: "CRM Platforms", desc: "Custom CRM and ATS builds — or we configure Manatal, Zoho and Salesforce for you.", img: MEDIA.crm },
  { icon: TrendingUp, title: "Business Development", desc: "Market entry, partner sourcing and growth strategy for new geographies.", img: MEDIA.teamMeeting },
];

// ── Leadership (real from PDF) ──────────────────────────────────────────────
export const LEADERSHIP = [
  { name: "Ketan Bhanudas Barve", role: "Chief Executive Officer", office: "Germany", initials: "KB", img: null },
  { name: "Anna Angold", role: "Business Development Manager", office: "Germany", initials: "AA", img: null },
  { name: "Poulomi Ghosh", role: "Head of Operations", office: "India", initials: "PG", img: null },
  { name: "Kojo Quansah", role: "Head of Administration", office: "Germany", initials: "KQ", img: null },
];

// ── Team (real from PDF) ────────────────────────────────────────────────────
export const TEAMS = [
  {
    dept: "Business Development",
    count: 2,
    color: "#C9973A",
    icon: TrendingUp,
    members: ["Anna Angold", "Naresh Malake"],
  },
  {
    dept: "Talent Acquisition",
    count: 8,
    color: "#3B82F6",
    icon: Search,
    members: ["Harrison Coviello", "Krupashree Kannan", "Niharika Singh", "Priyanka Das", "Razan Anwar", "Saurabh Gaikwad", "Savani Redkar", "Yaren Akin"],
  },
  {
    dept: "HR Operations",
    count: 3,
    color: "#EC4899",
    icon: Users,
    members: ["Meltem Özer", "Neslihan Ünlükurt", "Öykü Usumu"],
  },
  {
    dept: "Marketing",
    count: 1,
    color: "#F59E0B",
    icon: Megaphone,
    members: ["Ketaki Malwade"],
  },
  {
    dept: "IT & Administration",
    count: 4,
    color: "#8B5CF6",
    icon: Code2,
    members: ["Kojo Quansah", "Prince Goti", "Muzaffar Mirzaliev", "Dereck Boateng"],
  },
];

// ── Roles ───────────────────────────────────────────────────────────────────
export const ROLES = [
  { id: 1, title: "Orthopaedic Surgeon", department: "Healthcare", location: "Germany", type: "Permanent" },
  { id: 2, title: "PV Battery Specialist", department: "Renewable Energy", location: "India", type: "Contract" },
  { id: 3, title: "Senior Software Engineer", department: "Technology", location: "Philippines", type: "Permanent" },
  { id: 4, title: "AI/ML Research Engineer", department: "Technology", location: "Germany", type: "Permanent" },
  { id: 5, title: "Civil Project Manager", department: "Construction", location: "Philippines", type: "Contract" },
  { id: 6, title: "ICU Registered Nurse", department: "Healthcare", location: "India", type: "Permanent" },
  { id: 7, title: "Cloud DevOps Architect", department: "Technology", location: "Remote", type: "Permanent" },
  { id: 8, title: "Wind Turbine Engineer", department: "Renewable Energy", location: "Germany", type: "Contract" },
  { id: 9, title: "Warehouse Operations Manager", department: "Logistics", location: "Germany", type: "Permanent" },
  { id: 10, title: "Electrical Engineer", department: "Skilled Trades", location: "India", type: "Contract" },
  { id: 11, title: "Business Development Executive", department: "Business Development", location: "Germany", type: "Permanent" },
  { id: 12, title: "Talent Acquisition Executive", department: "Talent Acquisition", location: "Philippines", type: "Permanent" },
];

export const DEPARTMENTS = ["All", "Healthcare", "Renewable Energy", "Construction", "Technology", "Skilled Trades", "Logistics", "Business Development", "Talent Acquisition"];
export const LOCATIONS_FILTER = ["All", "Germany", "India", "Philippines", "Remote"];

// ── Case Studies ────────────────────────────────────────────────────────────
export const CASE_STUDIES = [
  {
    id: 1, category: "Healthcare Recruitment",
    title: "120 clinicians placed across a 3-country hospital network in 6 months",
    metric: "120", metricLabel: "Clinicians placed", sub: "in 6 months",
    color: "#C9973A", img: MEDIA.healthcare,
    desc: "A growing European hospital group needed to rapidly staff new facilities in Germany, India and the Philippines. Felipillon deployed a dedicated team using People Match AI to source and screen candidates across all three markets simultaneously.",
  },
  {
    id: 2, category: "AI Platform",
    title: "LLM knowledge assistant cut enterprise support resolution time by 62%",
    metric: "62%", metricLabel: "Faster resolution", sub: "avg ticket handling",
    color: "#8B5CF6", img: MEDIA.ai,
    desc: "An enterprise cloud company needed to reduce support ticket resolution time without growing headcount. Felipillon Innovation built a custom RAG-based LLM assistant trained on their product documentation.",
  },
  {
    id: 3, category: "Construction Staffing",
    title: "Full site management team assembled for a €40M infrastructure project",
    metric: "28", metricLabel: "Specialists placed", sub: "in 3 weeks",
    color: "#EF4444", img: MEDIA.construction,
    desc: "A construction firm won a major infrastructure contract and needed a complete site management team within weeks. Felipillon staffed project directors, civil engineers, site managers and HSE specialists across Germany and the Philippines.",
  },
  {
    id: 4, category: "Process Automation",
    title: "End-to-end onboarding automation saves 1,200 hours per quarter",
    metric: "1,200", metricLabel: "Hours saved", sub: "per quarter",
    color: "#F59E0B", img: MEDIA.software,
    desc: "A fast-growing staffing firm's manual onboarding process was collapsing under volume. Felipillon Innovation automated the entire workflow — from offer letter to Clockify setup — eliminating manual steps for the HR team.",
  },
];

// ── Testimonials ────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote: "Felipillon placed three surgeons in a single quarter — and every one of them stayed. Their screening is on another level.",
    name: "Dr. Elena Vogt", title: "Chief Medical Officer, NordHealth", img: null,
  },
  {
    quote: "The AI assistant Felipillon built cut our support resolution time by more than half. Flawless delivery, on time and on budget.",
    name: "Marcus Lin", title: "VP Operations, Helix Cloud", img: null,
  },
  {
    quote: "From brief to shortlist in 4 days. Felipillon understands enterprise hiring better than anyone we've worked with.",
    name: "Priya Nair", title: "Head of Talent, Solaris Energy", img: null,
  },
  {
    quote: "They don't feel like a vendor. They feel like part of our team. Exceptional people, exceptional work.",
    name: "Tomas Reyes", title: "CTO, BuildWorks", img: null,
  },
];

// ── Locations (real from PDF) ───────────────────────────────────────────────
export const LOCATIONS = [
  {
    city: "Berlin", country: "Germany", role: "Global Headquarters",
    entity: "Felipillon UG (haftungsbeschränkt)",
    tz: "CET", addr: "Franz-Ehrlich-Straße 12, 12489 Berlin, Germany",
    lat: 52.52, lng: 13.405, flag: "🇩🇪", img: MEDIA.berlin,
  },
  {
    city: "Pune", country: "India", role: "Technology Hub",
    entity: "Felipillon Innovation Pvt. Ltd.",
    tz: "IST", addr: "S. No. 97/2, Ghule Colony, Manjari BK, Haveli, Pune 412307",
    lat: 18.52, lng: 73.85, flag: "🇮🇳", img: MEDIA.indiaLandmark,
  },
  {
    city: "Makati City", country: "Philippines", role: "Asia-Pacific Operations",
    entity: "Felipillon OPC",
    tz: "PHT", addr: "3rd Floor, Salcedo One Center, 170 Salcedo Street, Makati City",
    lat: 14.55, lng: 121.02, flag: "🇵🇭", img: MEDIA.philippinesLandmark,
  },
  {
    city: "Italy", country: "Italy", role: "European Operations",
    entity: "New Office",
    tz: "CET", addr: "Italy office details coming soon",
    lat: 41.9, lng: 12.5, flag: "🇮🇹", img: MEDIA.italy,
  },
];

export const TRUSTED = ["NORDHEALTH", "SOLARIS ENERGY", "HELIX CLOUD", "BUILDWORKS", "VANTAGE CORP", "AETHER", "MERIDIAN", "QUANTA"];

export const BLOG_CATEGORIES = ["All", "AI", "Recruitment", "Healthcare", "Renewable Energy", "Software Engineering"];

export const BLOG = [
  { id: 1, category: "AI", title: "How RAG Is Reshaping Enterprise Knowledge Work", excerpt: "Retrieval-augmented generation moves from hype to production. Here's what we've learned shipping it for regulated clients.", date: "Jun 12, 2026", read: "7 min", featured: true, img: MEDIA.blog1 },
  { id: 2, category: "Recruitment", title: "The AI-Augmented Recruiter: A New Operating Model", excerpt: "Why the best recruiters aren't replaced by AI — they're amplified by it.", date: "Jun 04, 2026", read: "5 min", img: MEDIA.blog2 },
  { id: 3, category: "Healthcare", title: "Closing the Clinical Talent Gap in Europe", excerpt: "Cross-border clinician mobility, credentialing and retention strategies that work.", date: "May 28, 2026", read: "6 min", img: MEDIA.blog3 },
  { id: 4, category: "Renewable Energy", title: "Hiring for the Battery Storage Boom", excerpt: "PV and BESS specialists are the new bottleneck. How to build the team.", date: "May 19, 2026", read: "4 min", img: MEDIA.blog4 },
  { id: 5, category: "Software Engineering", title: "Shipping Platforms at Enterprise Scale", excerpt: "Architecture patterns for performance, security and developer velocity.", date: "May 09, 2026", read: "8 min", img: MEDIA.blog1 },
  { id: 6, category: "AI", title: "Evaluating LLMs Beyond the Leaderboard", excerpt: "Task-specific evals that actually predict production quality.", date: "Apr 30, 2026", read: "6 min", img: MEDIA.ai },
];

// ── Values (from PDF) ───────────────────────────────────────────────────────
export const VALUES = [
  { title: "Real Business Focus", desc: "We focus on real business problems, not just services. Solution-oriented, long-term value over short-term fees." },
  { title: "Affordable Quality", desc: "Enterprise-grade talent and technology without compromising on quality. The quickest and most reliable service possible." },
  { title: "People First", desc: "Prompt, active and supportive with our team and our clients. Flexible, diverse and multicultural by design." },
  { title: "Ownership Culture", desc: "Speed over perfection. Consistency over motivation. Execution over overthinking. Communication over silence." },
];

export const TIMELINE = [
  { year: "2019", title: "Founded in Germany", desc: "Felipillon launches as a specialist healthcare recruitment firm in Berlin." },
  { year: "2021", title: "Technology Division", desc: "Software development, digital marketing and AI practice established." },
  { year: "2023", title: "India Hub Opens", desc: "Felipillon Innovation Pvt. Ltd. opens in Pune — engineering and delivery centre." },
  { year: "2024", title: "Philippines Expansion", desc: "Felipillon OPC opens in Makati City — Asia-Pacific operations hub." },
  { year: "2026", title: "People Match AI", desc: "Proprietary AI recruitment platform deployed across 50+ global job platforms." },
];

export const WHY_WIN = [
  "We focus on real business problems, not just services",
  "Solution and business oriented — focused on long-term value, not just fees",
  "Affordable services without compromising quality",
  "The quickest and most reliable service possible",
  "Prompt, active and supportive with our employees",
  "Diverse and multicultural environment",
  "Flexible — we take care of our people like a team",
];
