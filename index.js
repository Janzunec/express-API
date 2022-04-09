const express = require('express');
const app = express();
const port = 3000;

const sql = require('./functions/database/connection');
const getPosts = require('./functions/GET/getPosts');
const postPosts = require('./functions/POST/postPosts');

// const argon2 = require('argon2');

app.use(express.json());

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	sql.connection().connection.connect();
});

app.get('/post/all', getPosts.allPosts);

app.get('/post/:id', getPosts.postByID);

app.post('/post/add', postPosts.addPost);
