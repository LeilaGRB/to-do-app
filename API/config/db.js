var mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'todo',
  password: 'admin'
});
setInterval(() => {
  pool.query('SELECT 1', (err, rows) => {
    if (err) throw err;
  });
}, 1000);


module.exports = pool;
