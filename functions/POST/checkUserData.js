const sql = require('../database/connection');
const conn = sql.connection;

const bcrypt = require('bcrypt');

const checkCredentials = (req, res) => {
	const enteredCredentials = req.body;
	const enteredUsername = enteredCredentials.username;
	const enteredPassword = enteredCredentials.password;

	conn.query(
		`SELECT firstName, secondName, username, email, password FROM users WHERE username="${enteredUsername}"`,
		(err, rows, fields) => {
			if (!rows[0]) {
				res.json({
					userExists: false,
					passwordMatch: false,
				});
				return;
			}
			bcrypt.compare(
				enteredPassword,
				rows[0].password,
				function (err, result) {
					if (result) {
						res.json({
							userExists: true,
							passwordMatch: true,
							firstName: rows[0].firstName,
							secondName: rows[0].secondName,
							username: rows[0].username,
							email: rows[0].email,
						});
						return;
					}
					res.json({
						userExists: true,
						passwordMatch: false,
					});
				}
			);
		}
	);
};

module.exports = {
	checkCredentials,
};
