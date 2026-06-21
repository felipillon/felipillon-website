// Centralized static content for Felipillon
import {
  HeartPulse, Wind, HardHat, Cpu, Globe2, Code2, Cloud, Bot, Workflow, Layers,
  Briefcase, Users, Rocket, Zap, ShieldCheck, Clock, Search,
} from "lucide-react";

export const MEDIA = {
  heroBg: "https://images.unsplash.com/photo-1758073519996-6d3c63b4922c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  healthcare: "https://images.pexels.com/photos/5452247/pexels-photo-5452247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
  renewable: "https://images.pexels.com/photos/14468163/pexels-photo-14468163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
  construction: "https://images.pexels.com/photos/18078304/pexels-photo-18078304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
  servers: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  team: "https://images.pexels.com/photos/36733304/pexels-photo-36733304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
  office: "https://images.pexels.com/photos/13219418/pexels-photo-13219418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
};

// Slow cinematic looping stock videos (Coverr / public CDN, royalty free)
export const VIDEOS = {
  hero: "https://cdn.coverr.co/videos/coverr-data-center-server-room-2643/1080p.mp4",
  code: "https://cdn.coverr.co/videos/coverr-programming-code-1573/1080p.mp4",
  network: "https://cdn.coverr.co/videos/coverr-abstract-network-of-lines-8957/1080p.mp4",
};

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Industries", path: "/industries" },
  { label: "Staffing", path: "/staffing" },
  { label: "Innovation", path: "/innovation" },
  { label: "Leadership", path: "/leadership" },
  { label: "Team", path: "/team" },
  { label: "Open Roles", path: "/open-roles" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Locations", path: "/locations" },
  { label: "Blog", path: "/blog" },
];

export const DIVISIONS = {
  staffing: {
    name: "Felipillon Staffing & Recruitment",
    tagline: "AI-driven human capital solutions",
    services: ["Healthcare", "Renewable Energy", "Construction", "Executive Search"],
  },
  innovation: {
    name: "Felipillon Innovation",
    tagline: "Custom software & AI engineering",
    services: ["AI Engineering", "Custom Software", "Web Applications", "Cloud Solutions", "Automation", "Next.js Platforms"],
  },
};

export const INDUSTRIES = [
  { id: "healthcare", name: "Healthcare", icon: HeartPulse, img: MEDIA.healthcare, color: "#10B981",
    desc: "Surgeons, specialists & clinical talent placed across leading hospital networks." },
  { id: "renewable", name: "Renewable Energy", icon: Wind, img: MEDIA.renewable, color: "#3B82F6",
    desc: "PV, battery storage and grid engineers powering the energy transition." },
  { id: "construction", name: "Construction", icon: HardHat, img: MEDIA.construction, color: "#F59E0B",
    desc: "Project leaders and skilled trades for large-scale infrastructure." },
  { id: "technology", name: "Technology", icon: Cpu, img: MEDIA.servers, color: "#8B5CF6",
    desc: "Elite software engineers, AI specialists and cloud architects on demand." },
];

export const WHY = [
  { icon: Globe2, title: "Global Reach", desc: "Talent networks across Europe, Asia & beyond from three strategic hubs." },
  { icon: Bot, title: "AI-Driven Recruitment", desc: "Proprietary matching engine that ranks candidates on real fit, not keywords." },
  { icon: Rocket, title: "Elite Engineers", desc: "Top 1% software & AI engineers vetted through rigorous technical screening." },
  { icon: Zap, title: "Rapid Delivery", desc: "Shortlists in days, production software in weeks — without cutting corners." },
  { icon: Layers, title: "Enterprise Solutions", desc: "Scalable architectures trusted by regulated, high-stakes organizations." },
  { icon: Clock, title: "24/7 Support", desc: "Follow-the-sun coverage across Berlin, Pune and Makati City time zones." },
];

export const METRICS = [
  { value: 500, suffix: "+", label: "Placements" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "", label: "Global Offices" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
];

export const SERVICES = [
  { icon: Briefcase, title: "Executive Search", desc: "C-suite and leadership placement for high-growth and enterprise clients." },
  { icon: Users, title: "Contingent Staffing", desc: "Flexible, scalable workforce solutions across four core industries." },
  { icon: Code2, title: "Custom Software", desc: "Bespoke web & mobile platforms built on modern, maintainable stacks." },
  { icon: Bot, title: "AI Engineering", desc: "LLM apps, RAG pipelines, computer vision and ML model deployment." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Cloud-native architecture, migration and DevOps on AWS, GCP & Azure." },
  { icon: Workflow, title: "Automation", desc: "Workflow automation and integrations that remove operational friction." },
];

export const LEADERSHIP = [
  { name: "Felix Bauer", role: "Chief Executive Officer", office: "Berlin HQ", initials: "FB" },
  { name: "Aarav Mehta", role: "Managing Director", office: "Pune", initials: "AM" },
  { name: "Sofia Ricci", role: "Chief Technology Officer", office: "Berlin HQ", initials: "SR" },
  { name: "Liam O'Connor", role: "Head of Recruitment", office: "Makati City", initials: "LO" },
  { name: "Hana Suzuki", role: "Head of AI Engineering", office: "Pune", initials: "HS" },
];

export const TEAMS = [
  { dept: "Recruitment Team", count: 24, color: "#10B981", icon: Search },
  { dept: "Engineering Team", count: 38, color: "#3B82F6", icon: Code2 },
  { dept: "Operations Team", count: 16, color: "#8B5CF6", icon: Workflow },
  { dept: "Sales Team", count: 19, color: "#F59E0B", icon: Briefcase },
  { dept: "HR Team", count: 11, color: "#EC4899", icon: Users },
];

export const ROLES = [
  { id: 1, title: "Orthopaedic Surgeon", department: "Healthcare", location: "Berlin, DE", type: "Permanent" },
  { id: 2, title: "PV Battery Specialist", department: "Renewable Energy", location: "Pune, IN", type: "Contract" },
  { id: 3, title: "Senior Software Engineer", department: "Technology", location: "Makati City, PH", type: "Permanent" },
  { id: 4, title: "AI/ML Research Engineer", department: "Technology", location: "Berlin, DE", type: "Permanent" },
  { id: 5, title: "Civil Project Manager", department: "Construction", location: "Makati City, PH", type: "Contract" },
  { id: 6, title: "ICU Registered Nurse", department: "Healthcare", location: "Pune, IN", type: "Permanent" },
  { id: 7, title: "Cloud DevOps Architect", department: "Technology", location: "Remote", type: "Permanent" },
  { id: 8, title: "Wind Turbine Engineer", department: "Renewable Energy", location: "Berlin, DE", type: "Contract" },
  { id: 9, title: "Executive Talent Partner", department: "Technology", location: "Pune, IN", type: "Permanent" },
];

export const DEPARTMENTS = ["All", "Healthcare", "Renewable Energy", "Construction", "Technology"];
export const LOCATIONS_FILTER = ["All", "Berlin, DE", "Pune, IN", "Makati City, PH", "Remote"];

export const CASE_STUDIES = [
  { id: 1, category: "Recruitment Success", title: "Scaling a Hospital Network Across 3 Countries",
    metric: "120", metricLabel: "Clinicians placed", sub: "in 6 months", color: "#10B981" },
  { id: 2, category: "AI Platform", title: "LLM Knowledge Assistant for Enterprise Support",
    metric: "62%", metricLabel: "Faster resolution", sub: "ticket handling", color: "#3B82F6" },
  { id: 3, category: "Healthcare Solution", title: "Patient Scheduling Platform Rebuild",
    metric: "40%", metricLabel: "Less no-shows", sub: "after launch", color: "#8B5CF6" },
  { id: 4, category: "Automation Project", title: "End-to-End Onboarding Automation",
    metric: "1,200", metricLabel: "Hours saved", sub: "per quarter", color: "#F59E0B" },
];

export const TESTIMONIALS = [
  { quote: "Felipillon placed three surgeons in a single quarter — and every one of them stayed. Their screening is on another level.", name: "Dr. Elena Vogt", title: "Chief Medical Officer, NordHealth" },
  { quote: "The AI assistant Felipillon Innovation built cut our support resolution time by more than half. Flawless delivery.", name: "Marcus Lin", title: "VP Operations, Helix Cloud" },
  { quote: "From brief to shortlist in 4 days. Felipillon understands enterprise hiring better than anyone we've worked with.", name: "Priya Nair", title: "Head of Talent, Solaris Energy" },
  { quote: "They feel less like a vendor and more like our internal engineering team. Exceptional craftsmanship.", name: "Tomas Reyes", title: "CTO, BuildWorks" },
];

export const LOCATIONS = [
  { city: "Berlin", country: "Germany", role: "Global Headquarters", tz: "CET", addr: "Friedrichstraße 100, 10117 Berlin", lat: 52.52, lng: 13.405 },
  { city: "Pune", country: "India", role: "Engineering & Delivery", tz: "IST", addr: "Baner Road, Pune 411045", lat: 18.52, lng: 73.85 },
  { city: "Makati City", country: "Philippines", role: "APAC Operations", tz: "PHT", addr: "Ayala Avenue, Makati 1226", lat: 14.55, lng: 121.02 },
];

export const TRUSTED = ["NORDHEALTH", "SOLARIS", "HELIX", "BUILDWORKS", "VANTAGE", "AETHER", "MERIDIAN", "QUANTA"];

export const BLOG_CATEGORIES = ["All", "AI", "Recruitment", "Healthcare", "Renewable Energy", "Software Engineering"];

export const BLOG = [
  { id: 1, category: "AI", title: "How RAG Is Reshaping Enterprise Knowledge Work", excerpt: "Retrieval-augmented generation moves from hype to production. Here's what we've learned shipping it for regulated clients.", date: "Jun 12, 2026", read: "7 min", featured: true, img: MEDIA.servers },
  { id: 2, category: "Recruitment", title: "The AI-Augmented Recruiter: A New Operating Model", excerpt: "Why the best recruiters aren't replaced by AI — they're amplified by it.", date: "Jun 04, 2026", read: "5 min", img: MEDIA.team },
  { id: 3, category: "Healthcare", title: "Closing the Clinical Talent Gap in Europe", excerpt: "Cross-border clinician mobility, credentialing and retention strategies that work.", date: "May 28, 2026", read: "6 min", img: MEDIA.healthcare },
  { id: 4, category: "Renewable Energy", title: "Hiring for the Battery Storage Boom", excerpt: "PV and BESS specialists are the new bottleneck. How to build the team.", date: "May 19, 2026", read: "4 min", img: MEDIA.renewable },
  { id: 5, category: "Software Engineering", title: "Shipping Next.js Platforms at Enterprise Scale", excerpt: "Architecture patterns for performance, security and developer velocity.", date: "May 09, 2026", read: "8 min", img: MEDIA.servers },
  { id: 6, category: "AI", title: "Evaluating LLMs Beyond the Leaderboard", excerpt: "Task-specific evals that actually predict production quality.", date: "Apr 30, 2026", read: "6 min", img: MEDIA.servers },
];

export const VALUES = [
  { title: "Precision", desc: "We obsess over fit — for talent and for code. Mediocre is never shipped." },
  { title: "Integrity", desc: "Transparent, honest partnerships built to last across decades, not deals." },
  { title: "Velocity", desc: "Enterprise quality at startup speed. Momentum is a competitive advantage." },
  { title: "Innovation", desc: "We bet on what's next — AI, automation and the future of work." },
];

export const TIMELINE = [
  { year: "2019", title: "Founded in Berlin", desc: "Felipillon launches as a specialist healthcare recruitment firm." },
  { year: "2021", title: "Innovation Division", desc: "Custom software & AI engineering practice established." },
  { year: "2023", title: "Pune Hub Opens", desc: "Engineering & delivery center launches in India." },
  { year: "2024", title: "APAC Expansion", desc: "Makati City office opens to serve the Asia-Pacific region." },
  { year: "2026", title: "AI Matching Engine", desc: "Proprietary AI recruitment platform reaches 500+ placements." },
];
