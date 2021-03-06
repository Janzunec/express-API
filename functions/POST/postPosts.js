const sql = require('../database/connection');
const conn = sql.connection;

const addPost = (req, res) => {
	const postData = req.body;
	const now = new Date();
	const today = now.toISOString();

	conn.query(
		`INSERT INTO posts(title, body, image, user, uploaded) VALUES("${postData.title}", "${postData.body}", "${postData.image}", ${postData.user}, '${today}')`,
		(err, result) => {
			if (err) throw err;
			res.json(result);
		}
	);
};

const deletePost = (req, res) => {
	const { id } = req.params;

	conn.query(`DELETE FROM posts WHERE post_ID=${id}`, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};

const updatePost = (req, res) => {
	const newPostData = req.body;
	const { id } = req.params;

	const now = new Date();
	const today = now.toISOString();

	conn.query(
		`UPDATE posts SET title="${newPostData.title}", body="${newPostData.body}", image="${newPostData.image}", uploaded='${today}', edited=true WHERE post_ID=${id}`,
		(err, result) => {
			if (err) throw err;
			res.json(result);
		}
	);
};

module.exports = {
	addPost,
	deletePost,
	updatePost,
};
