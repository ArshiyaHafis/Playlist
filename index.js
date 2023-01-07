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
    sqlconnect.query('SELECT * FROM playlists WHERE ID = ?',[req.params.id], (err, rows, fields) => {
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


//POST REQUEST

// app.post('/playlist', (req, res) => {
// 	const name = req.body.name;
// 	const  id = req.body.ID;
// 	const songs = req.body.songs;
// 	var sql = "SET @ID = ?;SET @NAME = ?;SET @SONGS = ?;CALL musicaddoredit(@ID,@NAME,@SONGS);";
// 	sqlconnect.query(sql, [name.Id, name.NAME, name.SONGS], (err, rows, fields) => {
// 	if (!err)
// 		rows.forEach(element => {
// 		if(element.constructor == Array)
// 		res.send('New sONG ID : '+ element[0].id);
// 		});
// 	else
// 		console.log(err);
// 	})
// });


//CREATE POST REQUEST

app.post('/playlist', (req, res) => {
	const data = req.body;
	var sql = "INSERT INTO PLAYLISTS SET?";
	sqlconnect.query(sql, data, (err, rows, fields) => {
		if (err)
			console.log(err);
		});
});

// SONGS TABLE
app.post('/song', (req, res) => {
	const data = req.body;
	var sql = "INSERT INTO SONGS SET?";
	sqlconnect.query(sql, data, (err, rows, fields) => {
		if (err)
			console.log(err);
		});
});


//DELETE REQUEST
//PLAYLISTS TABLE
app.delete('/playlist/:id', (req, res) => {
	sqlconnect.query('DELETE FROM playlists WHERE ID = ?', [req.params.id], (err, rows, fields) => {
	if (!err)
		res.send('Learner Record deleted successfully.');
	else
		console.log(err);
	})
});

//SONGS TABLE
app.delete('/songs/:id', (req, res) => {
	sqlconnect.query('DELETE FROM songs WHERE ID = ?', [req.params.id], (err, rows, fields) => {
	if (!err)
		res.send('Learner Record deleted successfully.');
	else
		console.log(err);
	})
});