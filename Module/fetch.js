/**
 * Created by Administrator on 2018/2/20.
 */
const http = require('http');
const https = require('https');//由于现在大多网站是https的

module.exports = (url, callback) => {
    //可以用http 或https
    https.get(url, (response) => {
        var rawContent = '';
        response.on('data', (chunk) => {
            rawContent += chunk.toString();
        });
        response.on('end', () => {
            callback(null, rawContent);
        });
        response.on('error', (err) => {
            callback(err);
        })
    });

};