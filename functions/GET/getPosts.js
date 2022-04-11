const sql = require('../database/connection');

const allPosts = (req, res) => {
	const now = new Date();
	sql.connection().connection.query(
		'SELECT * FROM posts, users WHERE posts.user = users.user_ID',
		(err, rows, fields) => {
			if (err) throw err;
			res.json(rows);
		}
	);
};

const postByID = async (req, res) => {
	const { id } = req.params;
	sql.connection().connection.query(
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
