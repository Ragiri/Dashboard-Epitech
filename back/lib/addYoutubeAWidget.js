const mysql = require('mysql');

const conf = require('./conf');
const addYoutubeAWidget = (params) => {
  return new Promise((resolve, reject) => {
        const mysqlClient = mysql.createConnection(conf);
        let stmt = `INSERT INTO YoutubeWidget( username, videoId)VALUES(?,?)`
        let user = [params.name, params.videoId];
      
        mysqlClient.query(stmt, user, (err, results, fields) => {
                if (err) {
                  console.log(err)
                  resolve(err.message);
                }
                console.log(results);
                console.log(fields);
                resolve("Success");
              });
        mysqlClient.end();
        })
}

module.exports = addYoutubeAWidget