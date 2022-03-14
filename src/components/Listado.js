import React from 'react';
 
import { Link, Redirect} from "react-router-dom";



function Listado() {
 
    const token = localStorage.getItem('token');//levanto token de localstorage,puede ser un string o nulo





return (//hago una fila con row es bootstrap /y en linea 23 por c/fila columna de bootstrap   
 <>
   { !token && <Redirect to= " / "/>  }

    <div className="row">
        {/*estructura base*/}
      <div className="col-3" >
       <div className="card ">
         <img src="..." className="card-img-top" alt="..."/>
         <div className="card-body">
         <h5 className="card-title">Movie Tittle</h5>
         <p className="card-text">Review Movie</p>
         <Link href="#" className="btn btn-primary">View Detail</Link>
     </div>
    </div>
   </div>
   
 </div>
 </>
)
}



export default Listado;