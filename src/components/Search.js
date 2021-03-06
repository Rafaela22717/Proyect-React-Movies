import React from 'react';
import sweetAlert from '@sweetalert/with-react';
import { useHistory } from "react-router-dom"

function Search(props, movie) {
    const history = useHistory();

    const handlerSubmit = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();//capturo el formulario q disparo el evento//trim corta al principio y al final
        //validacion:
        if (keyword.length === 0) {
            sweetAlert({
                title: "Enter a name",
                icon: "info",
                button: false,
                className: "sweet",
                timer: 2500
            });
        } else if (keyword.length < 3) {
            sweetAlert({
                title: "Enter more characters",
                icon: "error",
                button: false,
                className: "sweetA",
                timer: 2500
            });
        } else {
            e.currentTarget.keyword.value = "";//antes del push dejalo vacio
            history.push(`/resultados?keyword=${keyword}`);//redirecciono a resultados con la palabra clave
        }
    }

    return (
        <form className="d-flex align-items-center" onSubmit={handlerSubmit}>
            <label className='form-label mb-0 mx-2'>
                <input className='form-control' type="text" name="keyword" placeholder='Enter movie..' />
            </label>
            <button type="submit buttonS"
                onClick={props.addOrRemoveFromFavs}
                data-movie-id={movie.id}>Search</button>
        </form>
    )
}



export default Search;