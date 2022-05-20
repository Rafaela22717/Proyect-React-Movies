import React from 'react';
import { Link } from "react-router-dom";
import Search from "./Search";


function Header(props) {

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container container-nav">
                    <div>
                        <h1 className=' titulo' >MoviesApp</h1>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className='nav-link' to="/listado">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to="/favoritos">Favorites</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <span className="text-secondary text">
                                    {props.favorites.length > 0 && <>Movies in favorites: {props.favorites.length}</>}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <Search />
                </div>
            </nav>
        </header>
    )
}



export default Header;