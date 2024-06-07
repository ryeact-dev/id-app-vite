const mysql = require('mysql2/promise');

// create the connection to database
const mySqlPool = mysql.createPool({
  host: '172.16.255.251',
  user: 'umtc',
  password: 'umtc1218',
  database: 'sgis',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

exports.mySqlPool = mySqlPool;
