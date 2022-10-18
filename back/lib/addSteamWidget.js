const mysql = require('mysql');

const conf = require('./conf');
const addSteamWidget = (params) => {
  return new Promise((resolve, reject) => {
        const mysqlClient = mysql.createConnection(conf);

        let stmt = `INSERT INTO steamWidget(username, playerId)VALUES(?,?)`
        let user = [params.name, params.playerId];
      
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

module.exports = addSteamWidget