import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, MessageCircle, Send, X, Linkedin, Mail, ArrowUpRight, Maximize2, Minimize2 } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/company/felipillon";
const BACKEND = process.env.REACT_APP_BACKEND_URL;

const STARTER_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hi. I can answer quick questions about Felipillon. For detailed requests, I can point you to support.",
  },
];

const QUICK_TOPICS = [
  "What does Felipillon do?",
  "Where are you located?",
  "What services do you offer?",
  "How can I contact support?",
];

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();

const isDetailedQuestion = (text) => {
  const q = normalize(text);
  const detailWords = [
    "price", "pricing", "cost", "quote", "proposal", "contract", "partnership",
    "visa", "relocation", "salary", "guarantee", "timeline", "custom", "specific",
    "integration", "api", "legal", "compliance", "data", "security", "enterprise",
  ];
  return q.length > 120 || detailWords.some((word) => q.includes(word));
};

const getReply = (text) => {
  const q = normalize(text);

  if (isDetailedQuestion(text)) {
    return {
      content:
        "That needs a support conversation so the team can give you an accurate answer. You can contact Felipillon directly or connect on LinkedIn.",
      support: true,
    };
  }

  if (q.includes("what") || q.includes("about") || q.includes("company")) {
    return {
      content:
        "Felipillon is a global professional services and technology firm. The company works across staffing, recruitment, software development, AI applications, CRM platforms, and digital solutions.",
    };
  }

  if (q.includes("service") || q.includes("offer") || q.includes("do")) {
    return {
      content:
        "Felipillon offers staffing and recruitment, software development, digital marketing, AI applications, CRM platforms, and technology solutions.",
    };
  }

  if (q.includes("staff") || q.includes("recruit") || q.includes("hire") || q.includes("talent")) {
    return {
      content:
        "Felipillon helps companies find talent across healthcare, skilled trades, logistics, construction, renewable energy, and technology.",
    };
  }

  if (q.includes("location") || q.includes("office") || q.includes("where")) {
    return {
      content:
        "Felipillon has a headquarters presence in Berlin, with hubs in Pune, India and Makati City, Philippines.",
    };
  }

  if (q.includes("job") || q.includes("role") || q.includes("career") || q.includes("apply")) {
    return {
      content:
        "You can view current opportunities on the Open Roles page. If a role needs more detail, support can help.",
      jobs: true,
    };
  }

  if (q.includes("contact") || q.includes("support") || q.includes("email") || q.includes("linkedin")) {
    return {
      content:
        "For support, you can use the contact page, email hello@felipillon.com, or connect with Felipillon on LinkedIn.",
      support: true,
    };
  }

  return {
    content:
      "I can help with quick company questions about services, locations, hiring, jobs, and contact details. For anything specific, support can help directly.",
    support: true,
  };
};

export const ChatSupportWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const canSend = input.trim().length > 0 && !isTyping;
  const latestNeedsSupport = useMemo(
    () => messages.some((message) => message.role === "assistant" && message.support),
    [messages],
  );

  const fetchAiReply = async (text) => {
    if (!BACKEND) return getReply(text);
    const history = messages
      .filter((message) => message.role === "user" || message.role === "assistant")
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    const res = await fetch(`${BACKEND}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history }),
    });

    if (!res.ok) throw new Error("Chat request failed");
    const data = await res.json();
    return {
      content: data.reply,
      support: !!data.support,
      jobs: !!data.jobs,
    };
  };

  const sendMessage = async (value = input) => {
    const text = value.trim();
    if (!text || isTyping) return;
    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    try {
      const [reply] = await Promise.all([
        fetchAiReply(text),
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
          content: `${fallback.content} The live assistant is temporarily unavailable.`,
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
                <p className="text-xs text-brown-500/55">Quick company answers</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
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

          <div className={`space-y-3 overflow-y-auto px-4 py-4 ${expanded ? "max-h-[560px] min-h-[420px]" : "max-h-[460px] min-h-[260px]"}`}>
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
                  <div className="mt-2">
                    <Link to="/open-roles" className="inline-flex items-center gap-1 text-xs font-semibold text-gold-700">
                      View open roles <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
                {message.support && (
                  <div className="mt-2 flex flex-wrap justify-start gap-2">
                    <Link to="/contact" className="inline-flex items-center gap-1 rounded-full bg-brown-500 px-3 py-1.5 text-xs font-semibold text-white">
                      Contact support
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

          <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-brown-500/[0.08] bg-white px-3 py-3">
            <textarea
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
