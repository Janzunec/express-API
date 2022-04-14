const sql = require('../database/connection');
const conn = sql.connection;

const allPosts = (req, res) => {
	conn.query(
		'SELECT post_ID, title, body, image, uploaded, edited, User_ID, firstName, secondName, username, email  FROM posts, users WHERE posts.user = users.user_ID',
		(err, rows, fields) => {
			if (err) throw err;
			res.json(rows);
		}
	);
};

const postByID = async (req, res) => {
	const { id } = req.params;
	conn.query(
		`SELECT post_ID, title, body, image, uploaded, edited, firstName, secondName, username, email FROM users, posts WHERE posts.post_ID=${id} AND posts.user=users.user_ID`,
		async (err, rows, fields) => {
			if (err) throw err;
			res.json(rows);
		}
	);
};

module.exports = {
	allPosts,
	postByID,
};
