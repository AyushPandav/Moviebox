import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  async function Onclickfav(e) {
    e.preventDefault(); // prevent Link navigation

    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    if (!email) {
      alert("Please login to add favorites");
      return;
    }

    try {
      // 🔍 Check if movie already exists for this user
      const checkRes = await fetch(
        `http://localhost:3000/favorites?email=${email}&movieId=${movie.id}`
      );
      const existing = await checkRes.json();

      if (existing.length > 0) {
        alert("Movie already in favorites");
        return;
      }

      // ❤️ Add to favorites
      const favoriteData = {
        email,
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      };

      await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteData),
      });

      alert("Added to favorites ❤️");
    } catch (error) {
      alert("Failed to add favorite");
      console.error(error);
    }
  }

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="moviecard">
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="overlay">
            <button className="fav-btn" onClick={Onclickfav}>
              ❤️
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
