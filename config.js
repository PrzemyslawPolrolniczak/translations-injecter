const os = require("os");
const path = require("path");

const BASE_LOCALES_PATH = path.join(
  os.homedir(),
  "Lulu/upp/platform/services/auth_service/keycloak-theme-v2/src/i18n/locales",
);

const LOCALES_PATH = {
  DE: `${BASE_LOCALES_PATH}/messages-de-copy.po`,
  ES: `${BASE_LOCALES_PATH}/messages-es-copy.po`,
  FR: `${BASE_LOCALES_PATH}/messages-fr-copy.po`,
  IT: `${BASE_LOCALES_PATH}/messages-it-copy.po`,
};

module.exports = {
  LOCALES_PATH,
};
