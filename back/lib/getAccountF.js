//Get facebook account 

const mysql = require('mysql');
const conf = require('./conf');
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

const getAccountF = (FacebookID) => {
  return new Promise((resolve, reject) => {
        //connection to database
        const mysqlClient = mysql.createConnection(conf);
        let stmt = `SELECT * FROM user WHERE facebookId = ?`
        let user = [FacebookID];
        mysqlClient.query(stmt, user, (err, results, fields) => {
          if (err) {
            console.log(err)
            resolve(err.message);
          }
          console.log(isEmpty(results));
          if (isEmpty(results)) {
            resolve("Not exist");
          } else {
            resolve(results[0].name);
          }
        });
          mysqlClient.end();
    })
}
module.exports = getAccountF