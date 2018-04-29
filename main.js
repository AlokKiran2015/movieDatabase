
$(document).ready(function(){
  $('#searchForm').on('submit', function(e){
    let searchText = $('#searchText').val();
    getMovies(searchText);
	e.preventDefault();
 
  });
});





function getMovies(searchText){
 axios.get("http://www.omdbapi.com/?apikey=ab9c36ae&s="+searchText)
    .then(function(response){

      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}" style="border-radius:10px;">
              <h5 style="color: green;">${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch(function(err){
    alert(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get("http://www.omdbapi.com/?apikey=ab9c36ae&i="+movieId)
    .then(function(response) {

      let movie = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group" >
              <li class="list-group-item list-group-item-success"><strong style="color:blue;">Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item list-group-item-success"><strong style="color:blue;">Released:</strong> ${movie.Released}</li>
              <li class="list-group-item list-group-item-success"><strong style="color:blue;">Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item list-group-item-success"><strong style="color:blue;">IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item list-group-item-success"><strong style="color:blue;">Director:</strong> ${movie.Director}</li>
              <li class="list-group-item list-group-item-success"><strong style="color:blue;">Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item list-group-item-success"><strong style="color:blue;">Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
    
            <a href="index.html" class="btn btn-primary">Home</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch(function(err){
      console.log(err);
    });
}
