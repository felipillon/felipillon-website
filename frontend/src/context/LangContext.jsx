import { createContext, useContext, useState } from "react";
import { TRANSLATIONS } from "../data/i18n";

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("felipillon-lang") || "en");

  const switchLang = (code) => {
    setLang(code);
    localStorage.setItem("felipillon-lang", code);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <LangContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};