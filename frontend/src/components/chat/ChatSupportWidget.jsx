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
    jobs: "You can view current opportunities on the Open Roles page. I can also show a few current roles when the jobs feed is available.",
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
    jobs: "Aktuelle Stellen finden Sie auf der Open-Roles-Seite. Wenn der Stellen-Feed verfügbar ist, kann ich auch einige aktuelle Rollen anzeigen.",
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
    jobs: "Puoi vedere le opportunità attuali nella pagina Posizioni aperte. Se il feed è disponibile, posso anche mostrarti alcuni ruoli qui.",
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
    jobs: "Актуальные возможности доступны на странице вакансий. Если лента вакансий доступна, я также могу показать несколько ролей здесь.",
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
    jobs: "Güncel fırsatları Open Roles sayfasında görebilirsiniz. İş ilanı akışı uygunsa birkaç güncel rolü de burada gösterebilirim.",
    contact: "Destek için bilgilerinizi bu sohbette bırakabilir, iletişim sayfasını kullanabilir, hello@felipillon.com adresine yazabilir veya LinkedIn'den ulaşabilirsiniz.",
    fallback: "Hizmetler, lokasyonlar, işe alım, işler ve iletişim bilgileri hakkında kısa soruları yanıtlayabilirim. Spesifik konularda destek ekibi yardımcı olur.",
    noJobs: "Güncel rolleri şu anda yükleyemedim, ancak Open Roles sayfasını ziyaret edebilirsiniz.",
  },
};

const getCopy = (text) => copy[getLanguage(text)] || copy.en;

const isJobQuestion = (text) => {
  const q = normalize(text);
  return /\b(job|jobs|role|roles|career|careers|apply|opening|openings|stelle|stellen|bewerben|karriere|iş|is|ilan|basvuru|başvuru|kariyer)\b/.test(q);
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

const isFounderQuestion = (text) => {
  const q = normalize(text);
  return /\b(founder|founded|established|started|created|launched|ceo|gründ|grunder|gründer|fondat|fondata|fondatore|основал|основатель|kurdu|kurulus|kuruluş)\b/.test(q);
};

const includesAny = (text, terms) => terms.some((term) => text.includes(term));

const getReply = (text) => {
  const q = normalize(text);
  const c = getCopy(text);

  if (isFounderQuestion(text)) {
    return {
      content: c.founder,
    };
  }

  if (includesAny(q, ["history", "timeline", "journey", "milestone", "growth", "when", "founded", "geschichte", "verlauf", "storia", "cronologia", "история", "tarih", "geçmiş"])) {
    return {
      content: c.history,
    };
  }

  if (includesAny(q, ["people match", "peoplematch", "ai platform", "sourcing", "platform", "job platforms", "ki plattform", "yapay zeka platformu"])) {
    return {
      content: c.peopleMatch,
    };
  }

  if (includesAny(q, ["team", "leader", "leadership", "employee", "people behind", "wer leitet", "team", "équipe", "команд", "lider"])) {
    return {
      content: c.team,
    };
  }

  if (includesAny(q, ["industry", "industries", "sector", "sectors", "specialit", "healthcare", "construction", "renewable", "logistics", "trade", "branche", "industrie", "sektor"])) {
    return {
      content: c.industries,
    };
  }

  if (includesAny(q, ["value", "values", "why", "different", "quality", "fast", "global reach", "follow the sun", "principle", "warum", "neden"])) {
    return {
      content: c.values,
    };
  }

  if (isDetailedQuestion(text)) {
    return {
      content: c.detailed,
      support: true,
    };
  }

  if (q.includes("service") || q.includes("offer") || q.includes("do") || q.includes("hizmet") || q.includes("angebot")) {
    return {
      content: c.services,
    };
  }

  if (q.includes("what") || q.includes("about") || q.includes("company") || q.includes("firma") || q.includes("unternehmen")) {
    return {
      content: c.company,
    };
  }

  if (q.includes("staff") || q.includes("recruit") || q.includes("hire") || q.includes("talent") || q.includes("işe") || q.includes("personal")) {
    return {
      content: c.staffing,
    };
  }

  if (q.includes("location") || q.includes("office") || q.includes("where") || q.includes("standort") || q.includes("büro") || q.includes("buero") || q.includes("konum") || q.includes("ofis")) {
    return {
      content: c.locations,
    };
  }

  if (isJobQuestion(text)) {
    return {
      content: c.jobs,
      jobs: true,
    };
  }

  if (q.includes("contact") || q.includes("support") || q.includes("email") || q.includes("linkedin")) {
    return {
      content: c.contact,
      support: true,
    };
  }

  return {
    content: c.fallback,
    support: true,
  };
};

const fetchJobPreview = async (text) => {
  if (!BACKEND || !isJobQuestion(text)) return [];
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
    const reply = getReply(text);
    const jobPreview = reply.jobs ? await fetchJobPreview(text) : [];
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
      setMessages((current) => [...current, { role: "assistant", ...reply }]);
    } catch {
      const fallback = getReply(text);
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
