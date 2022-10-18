'use strict';

var _crossFetch = require('cross-fetch')

var _crossFetch2 = _interopRequireDefault(_crossFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


const http = async (baseUrl, url, body, successFn, method) => {
    const response = await (0, _crossFetch2.default)(appendSlash(baseUrl) + url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: { 'content-type': 'application/json' },
        credentials: 'omit'
    });
    const json = await response.json();
    if (response.ok) {
        return successFn ? successFn(json) : json;
    }
    return Promise.reject(JSON.stringify(json));
};

const post = async (baseUrl, url, body, successFn) => {
    return await postParameters(baseUrl, url, undefined, body, successFn);
};

const postParameters = async (baseUrl, url, parameters, body, successFn) => {
    let paramsToString = stringParams(parameters);

    return await http(baseUrl, url + paramsToString, body, successFn, 'POST');
};

const getParameters = async (baseUrl, url, parameters, successFn) => {
    let paramsToString = stringParams(parameters);

    return await http(baseUrl, url + paramsToString, undefined, successFn, 'GET');
};

const stringParams = parameters => {
    const objectKeys = Object.keys(parameters);
    let paramsToString = objectKeys.map(key => key + '=' + parameters[key]).join('&');
    return (objectKeys.length === 0 ? '' : '?') + paramsToString;
};

const appendSlash = url => {
    return url.substr(-1) === '/' ? url : url + '/';
};

module.exports = {
    post,
    postParameters,
    getParameters
};