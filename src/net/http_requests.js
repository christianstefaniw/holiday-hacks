const https = require('https');

class HTTPRequests {
    static get(url) {
        return new Promise(function (resolve, reject) {
                https.get(url, (resp) => {
                    let data = '';

                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        resolve(data)
                    });

                }).on("error", (err) => {
                    reject(err)
                });
            }
        )
    }
}

export default HTTPRequests
