const sql = require('../database/connection');

const addPost = (req, res) => {
	const postData = req.body;
	const now = new Date();
	const today = now.toISOString();

	sql.connection().connection.query(
		`INSERT INTO posts(title, body, image, user, uploaded) VALUES("${postData.title}", "${postData.body}", "${postData.image}", ${postData.user}, '${today}')`,
		(err, result) => {
			if (err) throw err;

			console.log(result);
			res.send(result);
		}
	);
};

const deletePost = (req, res) => {
	const { id } = req.params;
	sql.connection().connection.query(
		`DELETE FROM posts WHERE post_ID=${id}`,
		(err, result) => {
			if (err) throw err;

			res.send(result);
		}
	);
};

const updatePost = (req, res) => {
	const newPostData = req.body;
	const { id } = req.params;

	const now = new Date();
	const today = now.toISOString();

	sql.connection().connection.query(
		`UPDATE posts SET title="${newPostData.title}", body="${newPostData.body}", image="${newPostData.image}", uploaded='${today}', edited=true WHERE post_ID=${id}`,
		(err, result) => {
			if (err) throw err;

			console.log(result);
			res.send(result);
		}
	);
};

module.exports = {
	addPost,
	deletePost,
	updatePost,
};
