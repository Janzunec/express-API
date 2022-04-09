const connection = () => {
	const mysql = require('mysql');
	const { status } = require('express/lib/response');
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'blog_user',
		password: 'bloguser1',
		database: 'blog',
	});
	return { connection, status };
};

module.exports = {
	connection,
};
