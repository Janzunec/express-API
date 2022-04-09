const express = require('express');
const app = express();
const port = 3000;

const argon2 = require('argon2');

app.use(express.json());

const mysql = require('mysql');
const { status } = require('express/lib/response');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'blog_user',
	password: 'bloguser1',
	database: 'blog',
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	connection.connect();
});

app.get('/post/all', (req, res) => {
	connection.query('SELECT * FROM posts', (err, rows, fields) => {
		if (err) throw err;

		console.log('Number of posts in database: ', rows.length);

		res.status(200).send(rows);
	});
});

app.get('/post/:id', (req, res) => {
	const { id } = req.params;
	connection.query(
		`SELECT * FROM posts WHERE post_ID=${id}`,
		(err, rows, fields) => {
			if (err) throw err;

			res.send(rows);
		}
	);
});

app.post('/post/add', (req, res) => {
	const postData = req.body;

	const now = new Date();
	const today = now.toISOString();

	connection.query(
		`INSERT INTO posts(title, body, image, user, uploaded) VALUES("${postData.title}", "${postData.body}", "${postData.image}", ${postData.user}, '${today}')`,
		(err, result) => {
			if (err) throw err;

			console.log(result);
			res.send(result);
		}
	);
});
