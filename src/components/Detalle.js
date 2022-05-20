import React from 'react';
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function Detalle() {
    //obtengo lo q viaja en URL con javascript
    let token = sessionStorage.getItem('token');//levanto token de localstorage,puede ser un string o nulo
    let query = new URLSearchParams(window.location.search);//obtengo lo q viajo en la query string en la URL
    let movieID = query.get("movieID")//paso el identificad de URL//obtengo el id q viaja como query string en la URL

    const [movie, setMovie] = useState(null);


    useEffect(() => {
        const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=e0cd83b465cb791c8444c563ec079dbf&language=es-ES`
        console.log(endpoint)
        axios.get(endpoint)
            .then(response => {
                const movieData = response.data;
                setMovie(movieData);
            })
            .catch(error => {
                console.log(error);
            })

    }, [movieID]);





    return (
        <>
            {!token && <Redirect to=" / " />}
            {!movie && <p>Cargando...</p>}
            {movie &&// si tengo info en movie renderiza//renderizado condicional
                <>
                    <h2 className="colorDetalle">Titulo: {movie.title}</h2>
                    <div className='row'>
                        <div className='col-4'>
                       
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster" />
                        </div>
                        <div className='col-8'>
                            <h5 className="colorDetalle">Fecha de estreno: {movie.release_date}</h5>
                            <h5 className="colorDetalle">Reseña:</h5>
                            <p className="colorDetalle">{movie.overview}</p>

                            <h5 className="colorDetalle">Rating: {movie.vote_average}</h5>
                            <h5 className="colorDetalle">Release date : {movie.release_date}</h5>
                            <h5 className="colorDetalle">Popularity: {movie.popularity}</h5>
                            <h5 className="colorDetalle">Generos:</h5>
                            <ul className="colorDetalle">
                                {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </>
            }

        </>
    )

}




export default Detalle;