const mysql = require('mysql2');

const pool = mysql.createPool({
	host: '198.57.247.146',
	user: 'bernardo_wallup',
	password: '88R.Rsg~[}F9',
	database: 'bernardo_wallup_jobsite'
});

module.exports = pool.promise();
