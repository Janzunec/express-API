const sql = require('../database/connection');
const conn = sql.connection;

const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
	const data = req.body;

	const writeUserInDB = () => {
		bcrypt.hash(data.password, 10, (err, hash) => {
			if (err) throw err;
			conn.query(
				`INSERT INTO users (firstName, secondName, username, password, email) VALUES('${data.firstName}','${data.secondName}','${data.username}','${hash}','${data.email}')`,
				(err, result) => {
					if (err) throw err;
					res.json({
						response: 'success',
					});
				}
			);
		});
	};

	const checkUser = conn.query(
		`SELECT username, email FROM users WHERE users.username='${data.username}' OR users.email='${data.email}'`,
		(err, rows, fields) => {
			if (err) throw err;
			if (!rows[0]) {
				writeUserInDB();
				return;
			}

			if (rows[0].email === data.email) {
				res.json({ response: 'User with that email already exists!' });
				return;
			}
			if (rows[0].username === data.username) {
				res.json({
					response: 'User with that username already exists!',
				});
			}
		}
	);
};

module.exports = {
	addUser,
};
