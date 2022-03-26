//Libraries
import React from 'react';
import { Switch, Route } from "react-router-dom";

//Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from './components/Header';
import Footer from './components/Footer';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';

//Styles
import "./css/bootstrap.min.css";
import "./css/app.css";


function App() {
 
  const favMovies = localStorage.getItem("favs");//levanto lo q tengo en el localStorage
  let tempMoviesInFavs;
  
  if(favMovies === null) {//si no tengo nada
     tempMoviesInFavs = [];//no tengo nada en los favoritos del localStorage
  } else {
    tempMoviesInFavs = JSON.parse(favMovies);
  }

const addOrRemoveFromFavs = (e)=> {//esta funcion esta en comp padre para luego tenerla en Listado y Resultados
const btn=e.currentTarget;//capturo el boton q disparo el evento
const parent=btn.parentElement;//capturo el elem padre del btn//seria el div/el q contiene al btn
const imgURL= parent.querySelector("img").getAttribute("src")//del padre obtengo la imagen y de ella el atrib src
const title= parent.querySelector("h5").innerText;//capturo el titulo q esta dentro del h5
const overview=parent.querySelector("p").innerText;
const movieData = {//obtengo el objeto literal c esas propiedades//levanto la info q me interesa
    imgURL, title, overview,
    id:btn.dataset.movieId//obtengo el id//dataset permite acceder a los atributos data
}

let movieIsArray = tempMoviesInFavs.find(movie => {
  return movie.id === movieData.id;
})

if(!movieIsArray) {
  tempMoviesInFavs.push(movieData);//cuand click en btn inserto en el[] la pelicula
  localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));//convierte en JSON
  console.log("se agrego la pelicula");
} else {
  let deleteMovie = tempMoviesInFavs.filter(movie => {//si la pelic esta, filtro el [],
    return movie.id !== movieData.id//saco la pelic
  });
  localStorage.setItem("favs", JSON.stringify(deleteMovie));//seteo el localStorage con las pelic q quedaron menos esa
  console.log("se elimino la pelicula");
}



}
  return (
    <div>

      <Header/>
     <div className="container mt-3"> 
       
       <Switch>
         <Route exact path="/" component={Login}/>
         <Route path="/Listado" render={(props)=><Listado addOrRemoveFromFavs={addOrRemoveFromFavs} {...props}/>}/>
         <Route path="/detalle" component={Detalle}/>
         <Route path="/resultados" component={Resultados}/>
     
       </Switch>
      </div>     
      <Footer/>
      </div>       
  );
}

export default App;
