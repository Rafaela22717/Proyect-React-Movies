import React from 'react';


function Favoritos(props) {//recibe por props los favorites

  return (
    <div className="row">
      {/*estructura base*/}
      <h2 className="colorDetalle"> Favorites</h2>
      {!props.favorites.length && <div className="col-12 text-danger">Not favorites</div>}
      {props.favorites.map((movie, idx) => {
        console.log(props.favorites);
        return (
          <div className="col-lg-3 col-md-4 col-sm-6" key={idx}>
            <div className="card my-3 card-textE">
              <img src={movie.imgURL} className="card-img-top" alt="..." />
              <button
                className="favourite-btn1"
                onClick={props.addOrRemoveFromFavs}
                data-movie-id={movie.id}>
                ❤️</button>
              <div className="card-body">
                <h5 className="card-title">{movie.title.substring(0, 40)}...</h5>
                <p className="card-text">{movie.overview.substring(0, 100)}... </p>
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}




export default Favoritos;