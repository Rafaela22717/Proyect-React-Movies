import React from 'react';
import { useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import sweetAlert from '@sweetalert/with-react';


function Listado(props) {

  const token = sessionStorage.getItem('token');//levanto token de localstorage,puede ser un string o nulo

  const [moviesList, setMoviesList] = useState([]);



  useEffect(() => {
    const endpoint = "https://api.themoviedb.org/3/discover/movie?api_key=e0cd83b465cb791c8444c563ec079dbf&page=1"
    axios.get(endpoint)
      .then(response => {
        const apiData = response.data;//paso esta info a un estado de react useState
        console.log(apiData);
        setMoviesList(apiData.results);
      })
      .catch(error => {
        sweetAlert(<h2>Error,try again later</h2>);
      })
  }, [setMoviesList]);
  console.log(moviesList);


  return (//hago una fila con row es bootstrap /y en linea 23 por c/fila columna de bootstrap   
    <>
      {!token && <Redirect to=" / " />}

      <div className="row">
        {/*estructura base*/}
        {moviesList.map((movie, idx) => {

          return (
            <div className="col-lg-3 col-md-4 col-sm-6 col " key={idx}>
              <div className="card my-3 card-personaliz ">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />
                <button
                  className="favourite-btn "
                  onClick={props.addOrRemoveFromFavs}

                  data-movie-id={movie.id}>
                  🤍
                </button>

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

    </>
  )
}



export default Listado;