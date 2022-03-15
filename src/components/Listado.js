import React from 'react';
import {useEffect, useState} from "react" 
import { Link, Redirect} from "react-router-dom";
import axios from "axios";


function Listado() {
 
    const token = localStorage.getItem('token');//levanto token de localstorage,puede ser un string o nulo
    
    const [moviesList, setMoviesList]=useState([]);




   useEffect(()=> {
     const endpoint="https://api.themoviedb.org/3/discover/movie?api_key=e0cd83b465cb791c8444c563ec079dbf&language=es-ES&page=1"
    axios.get(endpoint)
    .then(response => {
      const apiData=response.data;//paso esta info a un estado de react useState
      console.log(apiData);
      setMoviesList(apiData.results);
    })

   },[setMoviesList]); 
   console.log(moviesList);   


return (//hago una fila con row es bootstrap /y en linea 23 por c/fila columna de bootstrap   
 <>
   { !token && <Redirect to= " / "/>  }

    <div className="row">
        {/*estructura base*/}
       {moviesList.map((movie, idx) => {
        return (
          <div className="col-3" key= {idx}>
          <div className="card my-3 ">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{movie.title.substring(0,40)}...</h5>
            <p className="card-text">{movie.overview.substring(0,100)}... </p>
            <Link to="#" className="btn btn-primary">View Detail</Link>
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