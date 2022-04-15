const sql = require('../database/connection');
const conn = sql.connection;

const bcrypt = require('bcrypt');

const addUser = (req, res) => {
	const data = req.body;
	bcrypt.hash(data.password, 10, (err, hash) => {
		if (err) throw err;
		conn.query(
			`INSERT INTO users (firstName, secondName, username, password, email) VALUES('${data.firstName}','${data.secondName}','${data.username}','${hash}','${data.email}')`,
			(err, result) => {
				if (err) throw err;
				res.send(result);
			}
		);
	});
};

module.exports = {
	addUser,
};
