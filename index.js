const express = require("express");
const mysql = require('mysql');
const app = express();
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

app.get('/music' , (req, res) => {
  	sqlconnect.query('SELECT * FROM playlists', (err, rows, fields) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
	} );

  
app.get('/music/:id' , (req, res) => {
    sqlconnect.query('SELECT * FROM playlists WHERE ID = ?',[req.params.id], (err, rows, fields) => {
		if (!err)
		res.send(rows);
		else
		console.log(err);
		})
    });
app.post('/music', (req, res) => {
	let name = req.body;
	var sql = "SET @ID = ?;SET @NAME = ?;SET @SONGS = ?;CALL musicaddoredit(@ID,@NAME,@SONGS);";
	sqlconnect.query(sql, [name.ID, name.NAME, name.SONGS], (err, rows, fields) => {
	if (!err)
		rows.forEach(element => {
		if(element.constructor == Array)
		res.send('New sONG ID : '+ element[0].learner_id);
		});
	else
		console.log(err);
	})
	});
app.delete('/music/:id', (req, res) => {
	sqlconnect.query('DELETE FROM playlists WHERE ID = ?', [req.params.id], (err, rows, fields) => {
	if (!err)
		res.send('Learner Record deleted successfully.');
	else
		console.log(err);
	})
	});