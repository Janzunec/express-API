const sql = require('../database/connection');

const allPosts = (req, res) => {
	sql.connection().connection.query(
		'SELECT * FROM posts',
		(err, rows, fields) => {
			if (err) throw err;

			console.log('Number of posts in database: ', rows.length);

			res.send(rows);
		}
	);
};

const postByID = async (req, res) => {
	const { id } = req.params;
	sql.connection().connection.query(
		`SELECT * FROM posts WHERE post_ID=${id}`,
		async (err, rows, fields) => {
			if (err) throw err;
			res.send(rows);
		}
	);
};

module.exports = {
	allPosts,
	postByID,
};
