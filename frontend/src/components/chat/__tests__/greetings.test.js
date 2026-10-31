import { getGreetingReply } from "../greetings";

test.each(["hi", "Hello!", "HEY 👋", "Good morning", "Hi there!", "Hello, how are you?", "Hi team", "hola", "bonjour"])("welcomes greeting: %s", (text) => {
  expect(getGreetingReply(text)).toMatch(/How can I help/);
});

test.each(["Hi, I need hiring support", "Hello, what jobs are available?", "pricing", "this is urgent", "high salary"])("keeps substantive requests in the normal reply flow: %s", (text) => {
  expect(getGreetingReply(text)).toBeNull();
});

test.each([["Hallo!", "de", "Willkommen"], ["Ciao", "it", "Benvenuto"], ["привет", "ru", "Добро пожаловать"], ["Merhaba", "tr", "hoş geldiniz"]])("localizes %s", (text, language, expected) => {
  expect(getGreetingReply(text, language)).toContain(expected);
});
