const mysql = require('mysql');

const conf = require('./conf');
const addWeatherWidget = (params) => {
  return new Promise((resolve, reject) => {
        const mysqlClient = mysql.createConnection(conf);
        let stmt = `INSERT INTO weatherWidget( username, city)VALUES(?,?)`
        let user = [params.name, params.city];
      
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

module.exports = addWeatherWidget