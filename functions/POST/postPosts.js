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

module.exports = {
	addPost,
};
