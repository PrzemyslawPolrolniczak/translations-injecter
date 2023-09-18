const fs = require("fs");
const { LOCALES_PATH } = require("./config");

const NUMBER_OF_SUPPORTED_LANGUAGES = 5;

const data = fs.readFileSync("inject.txt", "utf8");
const splittedByLine = data
  .substring(data[0] === "\n" ? 1 : 0)
  .split("\n\n")
  .map((line) => line.replace(/\n/g, " "))
  .filter(Boolean);

const mappedTranslationsToLocales = splittedByLine.reduce((acc, curr, idx) => {
  if (idx < NUMBER_OF_SUPPORTED_LANGUAGES) {
    return {
      ...acc,
      [curr]: [],
    };
  }

  const languageTarget = Object.keys(acc)[idx % NUMBER_OF_SUPPORTED_LANGUAGES];

  acc[languageTarget].push(curr);

  return acc;
}, {});

Object.keys(mappedTranslationsToLocales).forEach((key) => {
  if (key === "EN") return;

  const parsedTranslations = mappedTranslationsToLocales[key].map(
    (text, index) => {
      return {
        original: `msgid "${mappedTranslationsToLocales.EN[index]}"`,
        translation: `msgstr "${text}"`,
      };
    },
  );

  const messagesFileContent = fs.readFileSync(LOCALES_PATH[key], "utf8");
  const messagesSplittedByLine = messagesFileContent.split("\n");

  messagesSplittedByLine.forEach((line, idx, arr) => {
    if (!line.startsWith("msgid") || line === 'msgid ""') return line;

    const foundTranslation = parsedTranslations.find(
      (item) => line === item.original,
    );

    if (foundTranslation) {
      arr[idx + 1] = foundTranslation.translation;
    }
  });

  const output = messagesSplittedByLine.join("\n");

  fs.writeFileSync(LOCALES_PATH[key], output, "utf8");
});

console.log("done");
