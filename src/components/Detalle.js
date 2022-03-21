import React from 'react';
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


function Detalle() {
    //obtengo lo q viaja en URL con javascript
    let token = sessionStorage.getItem('token');//levanto token de localstorage,puede ser un string o nulo
    let query = new URLSearchParams(window.location.search);//obtengo lo q viajo en la query string en la URL
    let movieID =  query.get("movieID")//paso el identificad de URL//obtengo el id q viaja como query string en la URL
   
    useEffect(()=> {
        const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=e0cd83b465cb791c8444c563ec079dbf&language=es-ES`
        console.log(endpoint)
         axios.get(endpoint)
         .then(response => {
             const movieData = response.data;
             console.log(movieData);
         })
         .catch(error => {
             console.log(error);
         })
        
       },[movieID]);





return(
    <>
    { !token && <Redirect to= " / "/>  }
    <h2>Detalle de pelicula</h2>
    </>
)

}




export default Detalle;