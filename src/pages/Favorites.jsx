import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    if (!email) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/favorites?email=${email}`
        );
        const data = await res.json();
        setFavorites(data);
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };

    fetchFavorites();
  }, [email]);

  if (!email) {
    return (
      <div className="favorites-empty">
        <h2>Please Login</h2>
        <p>You must be logged in to view favorites</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites ❤️</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {favorites.map((fav) => (
        <MovieCard
          key={fav.id}
          movie={{
            id: fav.movieId,
            title: fav.title,
            poster_path: fav.poster_path,
          }}
        />
      ))}
    </div>
  );
}

export default Favorites;
