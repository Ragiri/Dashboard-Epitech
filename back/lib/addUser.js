const mysql = require('mysql');
var md5 = require('md5');
let conf = require('./conf')
//(type VARCHAR(20), facebookId  VARCHAR(20), name VARCHAR(20), email VARCHAR(40), pass PASSWORD(), googleId VARCHAR(20))
const addUser = (params) => {
  return new Promise((resolve, reject) => {
    const mysqlClient = mysql.createConnection(conf);

        let stmt = `INSERT INTO user( type, facebookId ,name, email, pass, googleId)VALUES(?,?,?,?,?,?)`
        let user = [params.types, params.fbId, params.name , params.email, md5(params.pass), params.gId];
      
        mysqlClient.query(stmt, user, (err, results, fields) => {
                if (err) {
                  console.log(err)
                  resolve(err.message);
                }
                // get inserted id
                console.log(results);
                console.log(fields);
                resolve("Success");
              });
        mysqlClient.end();
        })
}

module.exports = addUser