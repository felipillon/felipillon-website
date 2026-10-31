const GREETING = /^(?:(?:hi+|hello+|hey+|hiya|howdy|greetings|good\s+(?:morning|afternoon|evening|day)|hallo|guten\s+(?:morgen|tag|abend)|ciao|salve|buongiorno|buonasera|привет|здравствуйте|добрый\s+(?:день|вечер)|merhaba|selam|günaydın|iyi\s+(?:günler|akşamlar)|hola|bonjour|namaste|salaam)(?:\s+(?:there|everyone|team|felipillon))?)(?:\s+(?:how\s+are\s+you(?:\s+doing)?|how\s+is\s+it\s+going|what\s+s\s+up))?$/u;

const REPLIES = {
  en: "Hello! Welcome to Felipillon. It's lovely to hear from you. How can I help today—are you looking for a job, hiring talent, or exploring our technology services?",
  de: "Hallo! Willkommen bei Felipillon. Schön, dass Sie da sind! Wie kann ich Ihnen heute helfen: Suchen Sie einen Job, Fachkräfte oder Informationen zu unseren Technologiedienstleistungen?",
  it: "Ciao! Benvenuto in Felipillon, è un piacere sentirti! Come posso aiutarti oggi: cerchi lavoro, vuoi assumere talenti o scoprire i nostri servizi tecnologici?",
  ru: "Здравствуйте! Добро пожаловать в Felipillon. Рады вам! Чем помочь: вы ищете работу, сотрудников или информацию о наших технологических услугах?",
  tr: "Merhaba! Felipillon'a hoş geldiniz. Sizi burada görmek güzel! Bugün nasıl yardımcı olabilirim: iş mi arıyorsunuz, çalışan mı arıyorsunuz, yoksa teknoloji hizmetlerimizi mi keşfetmek istiyorsunuz?",
};

export const getGreetingReply = (text, language = "en") => {
  const normalized = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  return GREETING.test(normalized) ? REPLIES[language] || REPLIES.en : null;
};
