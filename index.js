const express = require("express");
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());
// set your preferred server port
const port = 3080;
// root endpoint response
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

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

app.listen(port, () => {
  console.log(`Your server ⚡ is running 🏃‍♂️ on http://localhost:${port}`);
});


//GET REQUEST
//MUSIC TABLE 
app.get('/playlist' , (req, res) => {
  	sqlconnect.query('SELECT * FROM playlists', (err, rows, fields) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//SONGS TABLE
app.get('/songs', (req, res) => {
	sqlconnect.query('SELECT * FROM songs', (err, rows, fields) => {
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
    sqlconnect.query('SELECT * FROM songs WHERE ID = ?',[req.params.id], (err, rows, fields) => {
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
		res.send('Learner Details Updated Successfully');
	else
		console.log(err);
	});
});

// SONGS TABLE
app.post('/songs', (req, res) => {
	let id = req.body.ID;
	let pid=req.body.PID;
	let title = req.body.TITLE;
	let artist = req.body.ARTIST;
	let album = req.body.ALBUM;
	var sql = "INSERT INTO SONGS VALUES(?,?,?,?,?)";
	sqlconnect.query(sql, [id, pid, title, artist, album], (err, rows, fields) => {
	if (!err)
		res.send('Learner Details Updated Successfully');
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
		res.send('Learner Details Updated Successfully');
	else
		console.log(err);
	})
});
//SONGS TABLE 
app.put('/songs/:id', (req, res) => {
	let title = req.body.TITLE;
	let artist = req.body.ARTIST;
	let pid = req.body.PID;
	let album = req.body.ALBUM;
	var sql = "UPDATE songs SET pid = ?, title=?, artist=?, album=? WHERE ID=?;";
	sqlconnect.query(sql, [pid, title, artist, album, Number(req.params.id)], (err, rows, fields) => {
	if (!err)
		res.send('Learner Details Updated Successfully');
	else
		console.log(err);
	})
});