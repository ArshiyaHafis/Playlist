//dependecies 
const express = require("express");
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());


//port connection
const port = 3080;

app.listen(port, () => {
	console.log(`Your server ⚡ is running 🏃‍♂️ on http://localhost:${port}`);
  });
  
app.get("/", (req, res) => {
  res.send("Hello, World!");
});



//sql connection 
var sqlconnect= mysql.createConnection({
  host : 'localhost',
  user:'root',
  password : 'mysqlpython3.764',
  database : 'music',
  multipleStatements : true
});

sqlconnect.connect((err)=> {
  if(!err)
  console.log('Connection Established Successfully');
  else
  console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
  });


//GET REQUEST
//MUSIC TABLE 
app.get('/playlists' , (req, res) => {
  	sqlconnect.query('SELECT * FROM playlists', (err, rows, fields) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//SONGS TABLE
app.get('/songs', (req, res) => {
	sqlconnect.query('SELECT songs.id, songs.title, songs.artist, songs.album FROM songs', (err, rows, fields) => {
	  if (!err)
		  res.send(rows);
	  else
		  console.log(err);
  })
});

//GET ID
//playlists table
app.get('/playlists/:id' , (req, res) => {
    sqlconnect.query('SELECT playlists.id, playlists.name, songs.id,songs.title, songs.artist, songs.album, songs.pid FROM playlists JOIN songs WHERE playlists.id=songs.pid AND songs.pid=?',[req.params.id], (err, rows, fields) => {
		if (!err)
		res.send(rows);
		else
		console.log(err);
		})
});

//SONGS TABLE
app.get('/songs/:id' , (req, res) => {
    sqlconnect.query('SELECT songs.id, songs.title, songs.artist, songs.album FROM songs WHERE ID = ?',[req.params.id], (err, rows, fields) => {
		if (!err)
		res.send(rows);
		else
		console.log(err);
		})
});

//CREATE POST REQUEST


app.post('/playlists', (req, res) => {
	let id = req.body.ID;
	let name = req.body.NAME;
	let songs = req.body.SONGS;
	var sql = "INSERT INTO PLAYLISTS VALUES(?,?,?)";
	sqlconnect.query(sql, [id, name, songs], (err, rows, fields) => {
	if (!err)
		res.send('PLAYLISTS DETAILS ADDED');
	else
		console.log(err);
	});
});

// SONGS TABLE
app.post('/songs', (req, res) => {
	let id = req.body.id;
	let pid=req.body.pid;
	let title = req.body.title;
	let artist = req.body.artist;
	let album = req.body.album;
	var sql = "INSERT INTO SONGS VALUES(?,?,?,?,?)";
	sqlconnect.query(sql, [id, pid, title, artist, album], (err, rows, fields) => {
	if (!err)
		res.send('SONGS DETAILS ADDED');
	else
		console.log(err);
	});
});

//DELETE REQUEST
//PLAYLISTS TABLE
app.delete('/playlists/:id', (req, res) => {
	sqlconnect.query('DELETE FROM playlists WHERE ID = ?', [req.params.id], (err, rows, fields) => {
	if (!err)
		res.send('Data deleted successfully.');
	else
		console.log(err);
	})
});

//SONGS TABLE
app.delete('/songs/:id', (req, res) => {
	sqlconnect.query('DELETE FROM songs WHERE ID = ?', [req.params.id], (err, rows, fields) => {
	if (!err)
		res.send('Data deleted successfully.');
	else
		console.log(err);
	})
});


//UPDATE
//PLAYLISTS TABLE
app.put('/playlists/:id', (req, res) => {
	let name = req.body.NAME;
	let songs = req.body.SONGS;
	var sql = "UPDATE playlists SET name=?, songs=? WHERE ID=?;";
	sqlconnect.query(sql, [name, songs, Number(req.params.id)], (err, rows, fields) => {
	if (!err)
		res.send('Playlists Updated Successfully');
	else
		console.log(err);
	})
});
//SONGS TABLE 
app.put('/songs/:id', (req, res) => {
	let title = req.body.title;
	let artist = req.body.artist;
	let pid = req.body.pid;
	let album = req.body.album;
	var sql = "UPDATE songs SET pid = ?, title=?, artist=?, album=? WHERE ID=?;";
	sqlconnect.query(sql, [pid, title, artist, album, Number(req.params.id)], (err, rows, fields) => {
	if (!err)
		res.send('Songs Updated Successfully');
	else
		console.log(err);
	})
});
var axios = require("axios");
app.get("/data", async function(req,res) {
    const data = await axios.get("https://playlist-app.herokuapp.com");
    console.log(data.data);
    res.send(data.data);
})