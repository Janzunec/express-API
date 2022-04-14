const express = require('express');
const app = express();
const port = 4000;

const getPosts = require('./functions/GET/getPosts');
const postPosts = require('./functions/POST/postPosts');

// const argon2 = require('argon2');

app.use(express.json({ limit: 1000000 }));

app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,POST,DELETE,UPDATE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get('/post/all', getPosts.allPosts);

app.get('/post/:id', getPosts.postByID);

app.post('/post/add', postPosts.addPost);

app.post('/post/delete/:id', postPosts.deletePost);

app.post('/post/update/:id', postPosts.updatePost);
