import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sweetAlert from '@sweetalert/with-react';

function Resultados(props) {

  let query = new URLSearchParams(window.location.search);//obtengo lo q viajo en la query string en la URL
  let keyword = query.get("keyword")//paso el identificad de URL//obtengo el keyword q viaja como query string en la URL

  // https://api.themoviedb.org/3/search/movie?api_key=e0cd83b465cb791c8444c563ec079dbf&language=es-ES&query=????
  const [moviesResults, setMoviesResults] = useState([]);


  useEffect(() => {
    const endpoint = ` https://api.themoviedb.org/3/search/movie?api_key=e0cd83b465cb791c8444c563ec079dbf&language=es-ES&query=${keyword}`
    console.log(endpoint)
    axios.get(endpoint)
      .then(response => {
        const moviesArray = response.data.results;//responde un array
        if (moviesArray.length === 0) {
          sweetAlert(<h4>Tu busqueda no arrojo resultados</h4>);
        }
        setMoviesResults(moviesArray);

      })
      .catch(error => {
        console.log(error);
      })

  }, [keyword])


  return (
    <div className="row">
      {/*estructura base*/}
      {moviesResults.map((movie, idx) => {
        return (
          <div className="col-lg-3 col-md-4 col-sm-6 " key={idx}>
            <div className="card my-3 card-personaliz ">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />
              <button
                className="favourite-btn"
                onClick={props.addOrRemoveFromFavs}
                data-movie-id={movie.id}>
                🤍</button>
              <div className="card-body">
                <h5 className="card-title">{movie.title.substring(0, 40)}...</h5>
                <p className="card-text">{movie.overview.substring(0, 70)}... </p>
                <Link to={`/detalle?movieID=${movie.id}`} className="btn">Detail</Link>
                {/* en el query string mando el id de la pelicula */}
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}


export default Resultados;