// pages/MovieDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "819f333491d27df044d082df9899522e";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="movie-details">
        <div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      </div>
       <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <p>⭐ Rating: {movie.vote_average}</p>
      <p>📅 Release: {movie.release_date}</p>
      <p>⏱ Runtime: {movie.runtime} min</p>
      <p>❤️Popularity: {movie.popularity}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
