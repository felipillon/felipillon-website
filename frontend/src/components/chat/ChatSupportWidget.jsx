import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, MessageCircle, Send, X, Linkedin, Mail, ArrowUpRight, Maximize2, Minimize2, RotateCcw } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/company/felipillon";
const BACKEND = process.env.REACT_APP_BACKEND_URL;

const STARTER_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hi. Ask me about Felipillon's services, locations, hiring support, open roles, or how to contact the team.",
  },
];

const QUICK_TOPICS = [
  "I need hiring support",
  "I'm looking for a job",
  "Which countries do you cover?",
  "What technology services do you offer?",
];

const normalize = (value) => value.toLowerCase().replace(/[^\p{L}0-9\s]/gu, " ").trim();

const getLanguage = (text) => {
  const q = normalize(text);
  if (/[çğıöşü]/i.test(text) || /\b(merhaba|turk|türk|hizmet|konum|ofis|iş|basvuru|başvuru|destek)\b/.test(q)) {
    return "tr";
  }
  if (/[äöüß]/i.test(text) || /\b(hallo|deutsch|standort|büro|buero|jobs|stellen|bewerben|kontakt|unterstützung|unterstuetzung)\b/.test(q)) {
    return "de";
  }
  if (/[а-яё]/i.test(text) || /\b(привет|работа|вакансия|офис|услуги|контакт|поддержка)\b/.test(q)) {
    return "ru";
  }
  if (/\b(ciao|lavoro|posizione|sede|servizi|contatto|supporto|assunzione|recruiting)\b/.test(q)) {
    return "it";
  }
  return "en";
};

const copy = {
  en: {
    founder: "Felipillon was founded by Ketan Bhanudas Barve in Berlin, Germany. The site does not list a specific founding year.",
    history: "Felipillon launched in Berlin as a specialist healthcare recruitment firm. The website timeline lists the Technology Division in 2021, the India Hub in Pune in 2023, the Philippines expansion in Makati City in 2024, and People Match AI in 2026.",
    peopleMatch: "People Match AI is Felipillon's proprietary AI recruitment platform. The site says it scans more than 50 global job platforms to support AI-assisted sourcing.",
    team: "Felipillon is led by Ketan Bhanudas Barve, Founder & CEO, with leadership and teams across recruitment, business development, software, administration, marketing, and talent acquisition.",
    values: "Felipillon's positioning focuses on fast delivery, quality, global reach, follow-the-sun operations, and combining human recruitment expertise with AI-assisted sourcing.",
    industries: "Felipillon supports healthcare, skilled trades, logistics and warehouse, construction, renewable energy, and technology roles.",
    detailed: "That needs a support conversation so the team can give you an accurate answer. Share your details here and Felipillon can follow up directly.",
    company: "Felipillon is a global professional services and technology firm. The company works across staffing, recruitment, software development, AI applications, CRM platforms, and digital solutions.",
    services: "Felipillon offers staffing and recruitment, software development, digital marketing, AI applications, CRM platforms, and broader technology solutions.",
    staffing: "Felipillon helps companies find talent across healthcare, skilled trades, logistics, construction, renewable energy, and technology.",
    locations: "Felipillon is headquartered in Berlin, with hubs in Pune, India, Makati City in the Philippines, and a new Italy office for European operations.",
    jobs: "You can view and apply for current opportunities on the Open Roles page. Open a role there, then use the Apply button to submit your details and CV.",
    contact: "For support, share your details in this chat, use the contact page, email hello@felipillon.com, or connect with Felipillon on LinkedIn.",
    fallback: "I can help with quick company questions about services, locations, hiring, jobs, and contact details. For anything specific, support can help directly.",
    noJobs: "I could not load current roles right now, but you can still visit the Open Roles page.",
  },
  de: {
    founder: "Felipillon wurde von Ketan Bhanudas Barve in Berlin gegründet. Auf der Website wird kein genaues Gründungsjahr genannt.",
    history: "Felipillon startete in Berlin als spezialisiertes Recruiting-Unternehmen im Gesundheitswesen. Die Website nennt die Technologiesparte 2021, den Indien-Standort in Pune 2023, die Expansion auf die Philippinen in Makati City 2024 und People Match AI 2026.",
    peopleMatch: "People Match AI ist Felipillons eigene KI-Recruiting-Plattform. Laut Website durchsucht sie mehr als 50 globale Jobplattformen zur Unterstützung des AI-gestützten Sourcings.",
    team: "Felipillon wird von Ketan Bhanudas Barve, Gründer & CEO, geführt. Das Team arbeitet in Recruiting, Business Development, Software, Administration, Marketing und Talent Acquisition.",
    values: "Felipillon steht für schnelle Umsetzung, Qualität, globale Reichweite, Follow-the-Sun-Operations und die Verbindung menschlicher Recruiting-Expertise mit KI-gestütztem Sourcing.",
    industries: "Felipillon unterstützt Healthcare, Handwerk, Logistik und Lager, Bau, erneuerbare Energien und Technologierollen.",
    detailed: "Dafür sollte das Support-Team direkt antworten, damit Sie eine genaue Auskunft bekommen. Hinterlassen Sie hier Ihre Daten und Felipillon meldet sich.",
    company: "Felipillon ist ein globales Professional-Services- und Technologieunternehmen. Das Unternehmen arbeitet in Recruiting, Softwareentwicklung, KI-Anwendungen, CRM-Plattformen und digitalen Lösungen.",
    services: "Felipillon bietet Staffing und Recruiting, Softwareentwicklung, digitales Marketing, KI-Anwendungen, CRM-Plattformen und weitere Technologielösungen.",
    staffing: "Felipillon hilft Unternehmen, Fachkräfte in Healthcare, Handwerk, Logistik, Bau, erneuerbaren Energien und Technologie zu finden.",
    locations: "Felipillon hat den Hauptsitz in Berlin sowie Hubs in Pune, Indien, Makati City auf den Philippinen und einen neuen Standort in Italien für europäische Aktivitäten.",
    jobs: "Aktuelle Stellen finden Sie auf der Open-Roles-Seite. Öffnen Sie dort eine Rolle und nutzen Sie den Bewerben-Button, um Ihre Daten und Ihren Lebenslauf einzureichen.",
    contact: "Für Support können Sie Ihre Daten hier im Chat hinterlassen, die Kontaktseite nutzen, hello@felipillon.com schreiben oder Felipillon auf LinkedIn kontaktieren.",
    fallback: "Ich kann kurze Fragen zu Services, Standorten, Recruiting, Jobs und Kontaktdaten beantworten. Für spezifische Anliegen hilft der Support direkt.",
    noJobs: "Ich konnte aktuelle Rollen gerade nicht laden, aber Sie können weiterhin die Open-Roles-Seite besuchen.",
  },
  it: {
    founder: "Felipillon è stata fondata da Ketan Bhanudas Barve a Berlino, in Germania. Il sito non indica un anno esatto di fondazione.",
    history: "Felipillon nasce a Berlino come agenzia specializzata nel recruiting sanitario. La timeline del sito indica la divisione tecnologica nel 2021, l'hub in India a Pune nel 2023, l'espansione nelle Filippine a Makati City nel 2024 e People Match AI nel 2026.",
    peopleMatch: "People Match AI è la piattaforma proprietaria di recruiting AI di Felipillon. Il sito indica che analizza oltre 50 piattaforme di lavoro globali per supportare il sourcing assistito dall'AI.",
    team: "Felipillon è guidata da Ketan Bhanudas Barve, Founder & CEO, con team in recruiting, business development, software, amministrazione, marketing e talent acquisition.",
    values: "Felipillon si posiziona su consegna rapida, qualità, presenza globale, operazioni follow-the-sun e combinazione tra esperienza umana nel recruiting e sourcing assistito dall'AI.",
    industries: "Felipillon supporta ruoli in sanità, mestieri specializzati, logistica e magazzino, edilizia, energie rinnovabili e tecnologia.",
    detailed: "Per questa richiesta serve un confronto diretto con il team, così possiamo darti una risposta accurata. Lascia i tuoi dati qui e Felipillon ti ricontatterà.",
    company: "Felipillon è una società globale di servizi professionali e tecnologia. Opera in staffing, recruiting, sviluppo software, applicazioni AI, piattaforme CRM e soluzioni digitali.",
    services: "Felipillon offre staffing e recruiting, sviluppo software, marketing digitale, applicazioni AI, piattaforme CRM e soluzioni tecnologiche più ampie.",
    staffing: "Felipillon aiuta le aziende a trovare talenti in sanità, mestieri specializzati, logistica, edilizia, energie rinnovabili e tecnologia.",
    locations: "Felipillon ha sede a Berlino, con hub a Pune in India, Makati City nelle Filippine e una nuova sede in Italia per le operazioni europee.",
    jobs: "Puoi vedere e candidarti alle opportunità attuali nella pagina Posizioni aperte. Apri un ruolo e usa il pulsante Candidati per inviare i tuoi dati e il CV.",
    contact: "Per supporto puoi lasciare i tuoi dati in questa chat, usare la pagina contatti, scrivere a hello@felipillon.com o contattare Felipillon su LinkedIn.",
    fallback: "Posso aiutarti con domande rapide su servizi, sedi, recruiting, lavoro e contatti. Per richieste specifiche, il supporto può aiutarti direttamente.",
    noJobs: "Non riesco a caricare i ruoli attuali in questo momento, ma puoi comunque visitare la pagina Posizioni aperte.",
  },
  ru: {
    founder: "Felipillon была основана Кетаном Бханудасом Барве в Берлине, Германия. На сайте не указан точный год основания.",
    history: "Felipillon начала работу в Берлине как специализированная рекрутинговая компания в сфере здравоохранения. В timeline сайта указаны технологическое направление в 2021 году, хаб в Пуне, Индия, в 2023 году, расширение на Филиппины в Макати-Сити в 2024 году и People Match AI в 2026 году.",
    peopleMatch: "People Match AI, собственная AI-платформа Felipillon для рекрутинга. На сайте указано, что она сканирует более 50 глобальных job-платформ для AI-assisted sourcing.",
    team: "Felipillon возглавляет Ketan Bhanudas Barve, Founder & CEO. Команды работают в рекрутинге, business development, software, administration, marketing и talent acquisition.",
    values: "Felipillon делает акцент на быстрой и качественной delivery, глобальном охвате, follow-the-sun операциях и сочетании человеческой рекрутинговой экспертизы с AI-assisted sourcing.",
    industries: "Felipillon поддерживает подбор в healthcare, skilled trades, logistics and warehouse, construction, renewable energy и technology.",
    detailed: "Для этого вопроса лучше подключить команду поддержки, чтобы дать точный ответ. Оставьте свои данные здесь, и Felipillon свяжется с вами напрямую.",
    company: "Felipillon, глобальная компания в сфере профессиональных услуг и технологий. Компания работает в подборе персонала, рекрутинге, разработке ПО, AI-приложениях, CRM-платформах и цифровых решениях.",
    services: "Felipillon предлагает подбор персонала и рекрутинг, разработку ПО, цифровой маркетинг, AI-приложения, CRM-платформы и другие технологические решения.",
    staffing: "Felipillon помогает компаниям находить специалистов в здравоохранении, квалифицированных рабочих профессиях, логистике, строительстве, возобновляемой энергетике и технологиях.",
    locations: "Главный офис Felipillon находится в Берлине, также есть хабы в Пуне, Индия, Макати-Сити на Филиппинах и новый офис в Италии для европейских операций.",
    jobs: "Актуальные вакансии доступны на странице Open Roles. Откройте вакансию и нажмите Apply, чтобы отправить свои данные и CV.",
    contact: "Для поддержки оставьте данные в этом чате, используйте страницу контактов, напишите на hello@felipillon.com или свяжитесь с Felipillon в LinkedIn.",
    fallback: "Я могу ответить на короткие вопросы об услугах, офисах, рекрутинге, вакансиях и контактах. По конкретным запросам команда поддержки поможет напрямую.",
    noJobs: "Сейчас не удалось загрузить актуальные роли, но вы можете перейти на страницу вакансий.",
  },
  tr: {
    founder: "Felipillon, Berlin'de Ketan Bhanudas Barve tarafından kuruldu. Web sitesinde belirli bir kuruluş yılı belirtilmiyor.",
    history: "Felipillon Berlin'de uzman bir sağlık işe alım firması olarak başladı. Web sitesi zaman çizelgesi 2021'de Teknoloji Bölümü'nü, 2023'te Pune'daki Hindistan merkezini, 2024'te Makati City'deki Filipinler genişlemesini ve 2026'da People Match AI'ı listeler.",
    peopleMatch: "People Match AI, Felipillon'un özel yapay zeka işe alım platformudur. Siteye göre AI destekli aday bulma için 50'den fazla küresel iş platformunu tarar.",
    team: "Felipillon'a Kurucu ve CEO Ketan Bhanudas Barve liderlik eder. Ekipler işe alım, iş geliştirme, yazılım, idari işler, pazarlama ve talent acquisition alanlarında çalışır.",
    values: "Felipillon hızlı teslimat, kalite, küresel erişim, follow-the-sun operasyonlar ve insan işe alım uzmanlığını AI destekli sourcing ile birleştirme üzerine konumlanır.",
    industries: "Felipillon sağlık, teknik işler, lojistik ve depo, inşaat, yenilenebilir enerji ve teknoloji rolleri için destek sağlar.",
    detailed: "Bu konu için ekibin doğru yanıt verebilmesi adına destek görüşmesi gerekir. Bilgilerinizi burada bırakın, Felipillon sizinle doğrudan iletişime geçebilir.",
    company: "Felipillon global bir profesyonel hizmetler ve teknoloji şirketidir. Staffing, işe alım, yazılım geliştirme, yapay zeka uygulamaları, CRM platformları ve dijital çözümler alanlarında çalışır.",
    services: "Felipillon staffing ve işe alım, yazılım geliştirme, dijital pazarlama, yapay zeka uygulamaları, CRM platformları ve teknoloji çözümleri sunar.",
    staffing: "Felipillon şirketlerin sağlık, teknik işler, lojistik, inşaat, yenilenebilir enerji ve teknoloji alanlarında yetenek bulmasına yardımcı olur.",
    locations: "Felipillon'un merkezi Berlin'dedir; Pune Hindistan, Makati City Filipinler ve Avrupa operasyonları için yeni İtalya ofisi bulunur.",
    jobs: "Güncel fırsatları Open Roles sayfasında görebilir ve başvurabilirsiniz. Bir rolü açıp Apply düğmesiyle bilgilerinizi ve CV'nizi gönderebilirsiniz.",
    contact: "Destek için bilgilerinizi bu sohbette bırakabilir, iletişim sayfasını kullanabilir, hello@felipillon.com adresine yazabilir veya LinkedIn'den ulaşabilirsiniz.",
    fallback: "Hizmetler, lokasyonlar, işe alım, işler ve iletişim bilgileri hakkında kısa soruları yanıtlayabilirim. Spesifik konularda destek ekibi yardımcı olur.",
    noJobs: "Güncel rolleri şu anda yükleyemedim, ancak Open Roles sayfasını ziyaret edebilirsiniz.",
  },
};

const getCopy = (text) => copy[getLanguage(text)] || copy.en;

const INTENTS = {
  FOUNDER: "FOUNDER",
  HISTORY: "HISTORY",
  PEOPLE_MATCH: "PEOPLE_MATCH",
  TEAM: "TEAM",
  VALUES: "VALUES",
  INDUSTRIES: "INDUSTRIES",
  SERVICES: "SERVICES",
  STAFFING: "STAFFING",
  LOCATIONS: "LOCATIONS",
  OPEN_ROLES: "OPEN_ROLES",
  JOB_APPLICATION: "JOB_APPLICATION",
  CONTACT: "CONTACT",
  COMPANY: "COMPANY",
};

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "at", "can", "do", "does", "for", "how", "i", "in", "is", "it", "me", "my", "of", "on", "or", "page", "the", "to", "what", "where", "you", "your",
]);

const KNOWLEDGE_ACTIONS = {
  openRoles: { label: "View open roles", to: "/open-roles" },
  contact: { label: "Contact page", to: "/contact" },
  services: { label: "View services", to: "/specialities" },
  locations: { label: "View locations", to: "/locations" },
  linkedIn: { label: "LinkedIn", href: LINKEDIN_URL },
};

const INTENT_RULES = {
  [INTENTS.OPEN_ROLES]: {
    topic: "careers",
    phrases: ["open roles", "open role", "jobs page", "job page", "careers page", "career page", "current roles", "open positions", "current opportunities", "are you hiring"],
    keywords: ["job", "jobs", "role", "roles", "career", "careers", "vacancy", "vacancies", "position", "positions", "opening", "openings", "hiring", "stellen", "karriere", "lavoro", "posizione", "вакансия", "ilan"],
    negative: ["office", "headquarters", "located", "location"],
  },
  [INTENTS.JOB_APPLICATION]: {
    topic: "careers",
    phrases: ["how do i apply", "where can i apply", "send my cv", "submit cv", "submit resume", "apply for a job", "apply for a role", "sign up", "join the team"],
    keywords: ["apply", "application", "applying", "cv", "resume", "join", "signup", "bewerben", "bewerbung", "candidati", "basvuru", "başvuru"],
  },
  [INTENTS.CONTACT]: {
    topic: "contact",
    phrases: ["contact you", "contact the team", "talk to", "speak with", "get in touch", "reach out"],
    keywords: ["contact", "support", "email", "phone", "call", "linkedin", "reach", "message", "kontakt", "contatto"],
  },
  [INTENTS.LOCATIONS]: {
    topic: "locations",
    phrases: ["where are you located", "where is your office", "office locations", "headquarters", "which countries"],
    keywords: ["location", "locations", "office", "offices", "headquarters", "located", "country", "countries", "berlin", "pune", "makati", "italy", "standort", "büro", "buero", "sede", "ofis"],
    negative: ["job", "jobs", "role", "roles", "career", "careers", "apply", "application", "open"],
  },
  [INTENTS.SERVICES]: {
    topic: "services",
    phrases: ["what does felipillon do", "what do you do", "what services", "services do you offer", "what do you offer"],
    keywords: ["service", "services", "offer", "offers", "provide", "development", "marketing", "software", "ai", "crm", "hizmet", "servizi"],
  },
  [INTENTS.STAFFING]: {
    topic: "services",
    phrases: ["hiring support", "find talent", "need staff", "recruitment support"],
    keywords: ["staff", "staffing", "recruit", "recruitment", "hire", "hiring", "talent", "personal"],
  },
  [INTENTS.COMPANY]: {
    topic: "company",
    phrases: ["about felipillon", "tell me about felipillon", "what is felipillon"],
    keywords: ["company", "firm", "business", "unternehmen", "firma"],
  },
  [INTENTS.FOUNDER]: {
    topic: "company",
    phrases: ["who founded", "who started", "who created", "who launched", "who is the founder", "who is ceo"],
    keywords: ["founder", "founded", "established", "started", "created", "launched", "ceo", "gründer", "fondatore", "основатель", "kurdu"],
  },
  [INTENTS.HISTORY]: {
    topic: "company",
    keywords: ["history", "timeline", "journey", "milestone", "growth", "geschichte", "storia", "история", "tarih"],
  },
  [INTENTS.PEOPLE_MATCH]: {
    topic: "technology",
    phrases: ["people match", "peoplematch", "ai platform", "job platforms"],
    keywords: ["sourcing", "platform"],
  },
  [INTENTS.TEAM]: {
    topic: "company",
    phrases: ["who works at", "who works for", "who is on the team", "people behind"],
    keywords: ["team", "leader", "leadership", "employee", "employees", "people", "works", "équipe", "команд", "lider"],
  },
  [INTENTS.INDUSTRIES]: {
    topic: "services",
    phrases: ["what sectors", "which sectors", "what industries", "which industries", "find work", "help people find work", "help me get a job", "help me find a job"],
    keywords: ["industry", "industries", "sector", "sectors", "field", "fields", "speciality", "specialities", "healthcare", "construction", "renewable", "logistics", "trade", "branche", "sektor"],
  },
  [INTENTS.VALUES]: {
    topic: "company",
    phrases: ["why felipillon", "global reach", "follow the sun"],
    keywords: ["value", "values", "different", "quality", "fast", "principle", "warum", "neden"],
  },
};

const getTokens = (text) => normalize(text).split(/\s+/).filter((token) => token && !STOP_WORDS.has(token));

const levenshtein = (a, b) => {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const next = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = next;
    }
  }
  return row[b.length];
};

const extractEntities = (text) => {
  const q = normalize(text);
  const rolePhrases = ["software developer", "developer", "engineer", "recruiter", "nurse", "marketing", "crm", "ai"];
  const locationPhrases = ["berlin", "germany", "pune", "india", "makati", "philippines", "italy"];
  return {
    role: rolePhrases.find((role) => q.includes(role)),
    location: locationPhrases.find((location) => q.includes(location)),
  };
};

const scoreIntent = (text, intent, context, entities) => {
  const q = normalize(text);
  const tokens = getTokens(text);
  const rule = INTENT_RULES[intent];
  let score = 0;

  (rule.phrases || []).forEach((phrase) => {
    if (q.includes(normalize(phrase))) score += phrase.split(/\s+/).length > 1 ? 8 : 5;
  });

  (rule.keywords || []).forEach((keyword) => {
    const normalizedKeyword = normalize(keyword);
    if (tokens.includes(normalizedKeyword)) score += 3;
    else if (normalizedKeyword.length > 4 && tokens.some((token) => token.length > 4 && levenshtein(token, normalizedKeyword) <= 1)) score += 1;
  });

  (rule.negative || []).forEach((keyword) => {
    if (q.includes(normalize(keyword))) score -= 5;
  });

  if (context?.topic && context.topic === rule.topic && tokens.length <= 3) score += 2;
  if (context?.lastIntent && context.lastIntent === intent && tokens.length <= 3) score += 1;
  if (entities.role && [INTENTS.OPEN_ROLES, INTENTS.JOB_APPLICATION].includes(intent)) score += 3;
  if (entities.location && intent === INTENTS.LOCATIONS) score += 3;

  return score;
};

const classifyIntent = (text, context = {}) => {
  const entities = extractEntities(text);
  const scores = Object.values(INTENTS)
    .map((intent) => ({ intent, score: scoreIntent(text, intent, context, entities) }))
    .sort((a, b) => b.score - a.score);
  const [best, second] = scores;
  const confidence = best.score >= 8 && best.score - (second?.score || 0) >= 2 ? "high" : best.score >= 5 ? "medium" : "low";
  return { intent: best.intent, score: best.score, confidence, entities };
};

const isDetailedQuestion = (text) => {
  const q = normalize(text);
  const detailWords = [
    "price", "pricing", "cost", "quote", "proposal", "contract", "partnership",
    "visa", "relocation", "salary", "guarantee", "timeline", "custom", "specific",
    "integration", "api", "legal", "compliance", "data", "security", "enterprise",
    "preis", "kosten", "angebot", "vertrag", "gehalt", "zeitplan", "recht", "sicherheit",
    "fiyat", "ucret", "ücret", "teklif", "sozlesme", "sözleşme", "maas", "maaş", "guvenlik", "güvenlik",
  ];
  return q.length > 120 || detailWords.some((word) => q.includes(word));
};

const buildActions = (...actions) => actions.filter(Boolean);

const getReply = (text, context = {}) => {
  const c = getCopy(text);
  const result = classifyIntent(text, context);
  const nextContext = {
    topic: INTENT_RULES[result.intent]?.topic,
    lastIntent: result.intent,
    role: result.entities.role || context.role,
    location: result.entities.location || context.location,
    lastUpdated: Date.now(),
  };

  if (isDetailedQuestion(text)) {
    return {
      content: c.detailed,
      support: true,
      actions: buildActions(KNOWLEDGE_ACTIONS.contact),
      nextContext,
    };
  }

  if (result.confidence === "low") {
    return {
      content: "I could not determine exactly what you are looking for. I can help with services, open roles, job applications, office locations, or contact information.",
      support: true,
      actions: buildActions(KNOWLEDGE_ACTIONS.services, KNOWLEDGE_ACTIONS.openRoles, KNOWLEDGE_ACTIONS.contact),
      nextContext,
    };
  }

  const responses = {
    [INTENTS.FOUNDER]: { content: c.founder },
    [INTENTS.HISTORY]: { content: c.history },
    [INTENTS.PEOPLE_MATCH]: { content: c.peopleMatch },
    [INTENTS.TEAM]: { content: c.team },
    [INTENTS.VALUES]: { content: c.values },
    [INTENTS.INDUSTRIES]: { content: c.industries, actions: buildActions(KNOWLEDGE_ACTIONS.services) },
    [INTENTS.COMPANY]: { content: c.company, actions: buildActions(KNOWLEDGE_ACTIONS.services) },
    [INTENTS.SERVICES]: { content: c.services, actions: buildActions(KNOWLEDGE_ACTIONS.services, KNOWLEDGE_ACTIONS.contact) },
    [INTENTS.STAFFING]: { content: c.staffing, actions: buildActions(KNOWLEDGE_ACTIONS.contact, KNOWLEDGE_ACTIONS.services) },
    [INTENTS.LOCATIONS]: { content: c.locations, actions: buildActions(KNOWLEDGE_ACTIONS.locations, KNOWLEDGE_ACTIONS.contact) },
    [INTENTS.OPEN_ROLES]: { content: c.jobs, jobs: true, actions: buildActions(KNOWLEDGE_ACTIONS.openRoles) },
    [INTENTS.JOB_APPLICATION]: { content: c.jobs, jobs: true, actions: buildActions(KNOWLEDGE_ACTIONS.openRoles) },
    [INTENTS.CONTACT]: { content: c.contact, support: true, actions: buildActions(KNOWLEDGE_ACTIONS.contact, KNOWLEDGE_ACTIONS.linkedIn) },
  };

  if (result.confidence === "medium" && [INTENTS.OPEN_ROLES, INTENTS.JOB_APPLICATION].includes(result.intent)) {
    return {
      content: "Are you asking about open roles or how to apply for a job?",
      actions: buildActions(KNOWLEDGE_ACTIONS.openRoles, KNOWLEDGE_ACTIONS.contact),
      nextContext,
    };
  }

  return {
    ...responses[result.intent],
    nextContext,
  };
};

const fetchJobPreview = async (reply) => {
  if (!BACKEND || !reply.jobs) return [];
  try {
    const res = await fetch(`${BACKEND}/api/jobs?size=3`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.jobs || []).slice(0, 3).map((job) => ({
      id: job.id,
      title: job.title,
      location: job.location,
      department: job.department,
    }));
  } catch {
    return [];
  }
};

const transcriptText = (messages, latestInput = "") =>
  [...messages, latestInput ? { role: "user", content: latestInput } : null]
    .filter(Boolean)
    .slice(-10)
    .map((message) => `${message.role}: ${message.content}`)
    .join("\n");

export const ChatSupportWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", company: "" });
  const [leadStatus, setLeadStatus] = useState("idle");
  const [leadError, setLeadError] = useState("");
  const [conversationContext, setConversationContext] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const canSend = input.trim().length > 0 && !isTyping;
  const latestNeedsSupport = useMemo(
    () => messages.some((message) => message.role === "assistant" && message.support),
    [messages],
  );

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, isTyping, expanded]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const buildLocalReply = async (text) => {
    const reply = getReply(text, conversationContext);
    const jobPreview = await fetchJobPreview(reply);
    return { ...reply, jobPreview };
  };

  const sendMessage = async (value = input) => {
    const text = value.trim();
    if (!text || isTyping) return;
    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    try {
      const [reply] = await Promise.all([
        buildLocalReply(text),
        new Promise((resolve) => window.setTimeout(resolve, 650)),
      ]);
      setConversationContext(reply.nextContext || {});
      setMessages((current) => [...current, { role: "assistant", ...reply }]);
    } catch {
      const fallback = getReply(text, conversationContext);
      setConversationContext(fallback.nextContext || {});
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          ...fallback,
          jobPreview: [],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const resetChat = () => {
    setMessages(STARTER_MESSAGES);
    setInput("");
    setIsTyping(false);
    setHandoffOpen(false);
    setLeadStatus("idle");
    setLeadError("");
    setConversationContext({});
  };

  const submitLead = async (event) => {
    event.preventDefault();
    setLeadError("");
    if (!lead.name.trim() || !lead.email.trim()) {
      setLeadError("Please add your name and email.");
      return;
    }
    if (!BACKEND) {
      setLeadError("The contact service is not configured. Please email hello@felipillon.com.");
      return;
    }

    setLeadStatus("submitting");
    try {
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          company: lead.company,
          service: "Chat support",
          message: `Chat support request\n\n${transcriptText(messages)}`,
        }),
      });
      if (!res.ok) throw new Error("Lead submit failed");
      setLeadStatus("sent");
      setHandoffOpen(false);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Thanks. Your details were sent to Felipillon support, and the team will follow up within one business day.",
        },
      ]);
    } catch {
      setLeadStatus("idle");
      setLeadError("Could not send this right now. Please email hello@felipillon.com.");
    }
  };

  return (
    <div className="chat-support-widget fixed bottom-5 right-5 z-[90] pointer-events-auto">
      {open && (
        <div
          className={`mb-4 overflow-hidden rounded-2xl border border-brown-500/[0.12] bg-[#FBF8F3] shadow-[0_24px_70px_-32px_rgba(61,35,20,0.55)] ${
            expanded
              ? "w-[min(calc(100vw-2.5rem),620px)]"
              : "w-[min(calc(100vw-2.5rem),440px)]"
          }`}
        >
          <div className="flex items-center justify-between border-b border-brown-500/[0.08] bg-white px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B1410] text-gold">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#231911]">Felipillon Support</p>
                <p className="text-xs text-brown-500/55">Site-trained answers</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                className="rounded-full p-2 text-brown-500/55 transition-colors hover:bg-brown-500/[0.06] hover:text-[#231911]"
                aria-label="Start a new support chat"
                title="New chat"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="rounded-full p-2 text-brown-500/55 transition-colors hover:bg-brown-500/[0.06] hover:text-[#231911]"
                aria-label={expanded ? "Make support chat smaller" : "Make support chat bigger"}
                title={expanded ? "Smaller" : "Bigger"}
              >
                {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-brown-500/55 transition-colors hover:bg-brown-500/[0.06] hover:text-[#231911]"
                aria-label="Close support chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            className={`space-y-3 overflow-y-auto px-4 py-4 ${expanded ? "max-h-[560px] min-h-[420px]" : "max-h-[460px] min-h-[260px]"}`}
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block max-w-[86%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-[#C9973A] text-[#1A0E08]"
                      : "bg-white text-brown-500 shadow-[0_10px_28px_-24px_rgba(61,35,20,0.5)]"
                  }`}
                >
                  {message.content}
                </div>
                {message.jobs && (
                  <div className="mt-2 space-y-2">
                    {message.jobPreview?.length > 0 && (
                      <div className="space-y-1.5">
                        {message.jobPreview.map((job) => (
                          <Link
                            key={job.id || job.title}
                            to="/open-roles"
                            className="block rounded-xl border border-brown-500/[0.1] bg-white px-3 py-2 text-left text-xs text-brown-500 shadow-[0_10px_24px_-24px_rgba(61,35,20,0.45)]"
                          >
                            <span className="block font-semibold text-[#231911]">{job.title}</span>
                            <span className="block text-brown-500/55">{[job.department, job.location].filter(Boolean).join(" · ")}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    <Link to="/open-roles" className="inline-flex items-center gap-1 text-xs font-semibold text-gold-700">
                      View open roles <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
                {message.actions?.filter((action) => !(message.jobs && action.to === "/open-roles")).length > 0 && (
                  <div className="mt-2 flex flex-wrap justify-start gap-2">
                    {message.actions
                      .filter((action) => !(message.jobs && action.to === "/open-roles"))
                      .map((action) =>
                        action.to ? (
                          <Link
                            key={`${action.label}-${action.to}`}
                            to={action.to}
                            className="inline-flex items-center gap-1 rounded-full border border-brown-500/[0.14] bg-white px-3 py-1.5 text-xs font-semibold text-brown-500"
                          >
                            {action.label} <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        ) : (
                          <a
                            key={`${action.label}-${action.href}`}
                            href={action.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-brown-500/[0.14] bg-white px-3 py-1.5 text-xs font-semibold text-brown-500"
                          >
                            {action.label} <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ),
                      )}
                  </div>
                )}
                {message.support && (
                  <div className="mt-2 flex flex-wrap justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => setHandoffOpen(true)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#C9973A] px-3 py-1.5 text-xs font-semibold text-[#1A0E08]"
                    >
                      Send details here
                    </button>
                    <Link to="/contact" className="inline-flex items-center gap-1 rounded-full bg-brown-500 px-3 py-1.5 text-xs font-semibold text-white">
                      Contact page
                    </Link>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-brown-500/[0.14] bg-white px-3 py-1.5 text-xs font-semibold text-brown-500"
                    >
                      <Linkedin className="h-3 w-3" /> LinkedIn
                    </a>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <div className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-[0_10px_28px_-24px_rgba(61,35,20,0.5)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-brown-500/45 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brown-500/45 animate-bounce [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brown-500/45 animate-bounce [animation-delay:240ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => sendMessage(topic)}
                  className="rounded-full border border-brown-500/[0.12] bg-white px-3 py-1.5 text-xs text-brown-500 transition-colors hover:border-gold/40 hover:text-[#231911]"
                >
                  {topic}
                </button>
              ))}
            </div>
          )}

          {handoffOpen && (
            <form onSubmit={submitLead} className="border-t border-brown-500/[0.08] bg-[#FFFDF8] px-4 py-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-[#231911]">Send your details to support</p>
                <button
                  type="button"
                  onClick={() => setHandoffOpen(false)}
                  className="text-xs text-brown-500/55 hover:text-[#231911]"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <input
                  value={lead.name}
                  onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Name"
                  className="min-w-0 rounded-xl border border-brown-500/[0.12] bg-white px-3 py-2 text-xs text-[#231911] outline-none focus:border-gold/45"
                />
                <input
                  value={lead.email}
                  onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Email"
                  type="email"
                  className="min-w-0 rounded-xl border border-brown-500/[0.12] bg-white px-3 py-2 text-xs text-[#231911] outline-none focus:border-gold/45"
                />
                <input
                  value={lead.company}
                  onChange={(event) => setLead((current) => ({ ...current, company: event.target.value }))}
                  placeholder="Company"
                  className="min-w-0 rounded-xl border border-brown-500/[0.12] bg-white px-3 py-2 text-xs text-[#231911] outline-none focus:border-gold/45"
                />
              </div>
              {leadError && <p className="mt-2 text-xs text-red-700">{leadError}</p>}
              {leadStatus === "sent" && <p className="mt-2 text-xs text-green-700">Sent. The team will follow up soon.</p>}
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[10px] leading-relaxed text-brown-500/45">
                  Your chat summary and contact details will be sent to Felipillon support.
                </p>
                <button
                  type="submit"
                  disabled={leadStatus === "submitting"}
                  className="shrink-0 rounded-full bg-brown-500 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-55"
                >
                  {leadStatus === "submitting" ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          )}

          <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-brown-500/[0.08] bg-white px-3 py-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask a quick question..."
              rows={2}
              className="min-h-[54px] min-w-0 flex-1 resize-none rounded-2xl border border-brown-500/[0.12] px-4 py-3 text-sm text-[#231911] outline-none placeholder:text-brown-500/35 focus:border-gold/45"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9973A] text-[#1A0E08] transition-opacity disabled:opacity-45"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          {latestNeedsSupport && (
            <div className="flex items-center gap-2 bg-[#1B1410] px-4 py-2 text-xs text-white/75">
              <Mail className="h-3.5 w-3.5 text-gold" />
              <span>Support email: hello@felipillon.com</span>
            </div>
          )}
          <div className="border-t border-white/5 bg-[#1B1410] px-4 py-2 text-[10px] leading-relaxed text-white/45">
            Messages are answered from Felipillon site knowledge. Contact details are sent only when you submit the support form.
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#C9973A] text-[#1A0E08] shadow-[0_18px_44px_-18px_rgba(201,151,58,0.75)] transition-transform hover:scale-105"
        aria-label="Open support chat"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-[#C9973A]/45 animate-ping" />}
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
};
