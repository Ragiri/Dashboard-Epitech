//
// ─── LIB MODULES - THE SERVER LOGIC ──────────────────────────────────────────
//

let lib = {}

lib.addUser = require('./addUser')
lib.passportInit = require('../passport/passport')
lib.getAccount = require('./getAccount')
lib.getAccountG = require('./getAccountG')
lib.getAccountF = require('./getAccountF')
lib.errorManager = require('./errorManage')
lib.response = require('./response')
lib.mailing = require('./mailing')

lib.addWeatherWidget = require('./addWeatherWidget')
lib.addSteamWidget = require('./addSteamWidget')
lib.addYoutubeAWidget = require('./addYoutubeAWidget')


module.exports = lib