const express = require('express');
const app = express();

const path = require('path'); 
const PORT = 3000;
let cultMovies = [];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

cultMovies = [
  {title: 'Arrete de ramer tu touches le fond', year: 2012},
  {title: 'Arrete de ramer le lac est a sec', year: 2013},
  {title: 'Arrete de ramer le bateau coule', year: 2014},
  {title: 'Arrete de ramer t\'as pas de bras', year: 2015},
];


app.use('/public', express.static(__dirname+'/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/movies', (req, res) => {

  const title = 'the cult films list';


  res.render('movies', {movies: cultMovies, title : title});
} );

app.post('/movies', urlencodedParser, (req, res) => {
 console.log(req.body);  
 const tempMovie = {
   title: req.body.movietitle,
   year:  req.body.movieyear,
 };
 cultMovies = [...cultMovies, tempMovie] ;
 console.log(cultMovies);
 res.sendStatus(201);
});  

app.get('/movies/add', (req, res) => res.send(`add movies`));

app.get('/movies/:id/:name', (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  res.render('movies-details', {movieId: id, movieName :name});
} );

app.listen(PORT, () => console.log(`listen on port ${PORT}`));
      