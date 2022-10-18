'use strict';

var _http = require('../utils/http.js');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


class Services {

    constructor({ serverUrl }) {
        this.serverUrl = serverUrl;
    }

    async singup(body, callback) {
        return await _http2.default.postParameters(this.serverUrl, 'user/singup', {}, body, callback);
    }

}

module.exports = Services;