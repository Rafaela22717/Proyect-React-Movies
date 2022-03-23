import React from 'react';
import sweetAlert from '@sweetalert/with-react';
import { useHistory } from "react-router-dom"

function Search() {
  const history = useHistory();

    const handlerSubmit = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();//capturo el formulario q disparo el evento//trim corta al principio y al final
        //validacion:
        if (keyword.length ===0) {
            sweetAlert(<h5>Ingresa un nombre</h5>)
        } else if (keyword.length<3){
            sweetAlert(<h5>Escribe tres o mas caracteres</h5>)
        } else { 
            e.currentTarget.keyword.value = "";//antes del push dejalo vacio
            history.push(`/resultados?keyword=${keyword}`);//redirecciono a resultados con la palabra clave
        }
    }




    return (
        <form className='d-flex align-items-center' onSubmit={handlerSubmit}>
            <label className='form-label mb-0 mx-2'>
                <input className='form-control' type="text" name="keyword" placeholder='Search..' />
            </label>
            <button className='btn btn-success' type="submit">Buscar</button>
        </form>

    )
}



export default Search;