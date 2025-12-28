import { useState, useEffect, use } from 'react'
import MovieCard from '../components/MovieCard'
import { searchMovies, getPopularMovies } from '../services/api';

function Home(){
    const [searchQuery,setSearchQuery] = useState("");
    
    const [movies,setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadPopularMovies = async () => {
        try{
          const popularMovies = await getPopularMovies()
          setMovies(popularMovies)
        } 
        catch(err){
               console.log(err)
               setError("failed error occuered")
        }
        finally{
          setLoading(false)
        }
      }
      loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
      e.preventDefault();
      if(!searchQuery.trim()) return
      if(loading) return

      setLoading(true)
      try{
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)

      }
      catch(err){
        setError("Failed to search movie")
      }
      finally{
        setLoading(false)
      }
      setSearchQuery("")
    }
   return(
   

    <div className="home">
        <form className='search-form' onSubmit={handleSearch}>
            <input type="text" name="" id="" placeholder='Type a movie...'
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type='submit' className='search-button' >Search</button>
        </form>

        {error && <div className=''>{error}</div>}

      {loading ? <div className=''>Loading</div> :<div className="movie-grid">
        {movies.map((movie) => (
            movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id}/>
            ))}
      </div> }
      
    </div>
   )
}

export default Home;