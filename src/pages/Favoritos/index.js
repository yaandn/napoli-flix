import React, { useState, useEffect } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Favoritos() {
  const [favoritesMovies, setFavoritesMovies] = useState([]);

  useEffect(() => {
    function getFavorites() {
      let list = localStorage.getItem("@primeFlix");
      let listConvert = JSON.parse(list) || [];
      setFavoritesMovies(listConvert);
      console.log(favoritesMovies);
    }

    getFavorites();
  }, []);

  function removeMovie(id) {
    let filterMovies = favoritesMovies.filter((item) => {
      return item.id != id;
    });
    setFavoritesMovies(filterMovies);
    localStorage.setItem("@primeFlix", JSON.stringify(filterMovies));
    toast.success("Filme removido com sucesso!");
  }

  if (favoritesMovies.length == 0) {
    return (
      <div className="error-container">
        <h2 className="error-title">Ops...</h2>
        <h3 className="error-description">Você não salvou nenhum filme :(</h3>

        <Link to="/" className="error-button">
          Ir para Filmes
        </Link>
      </div>
    );
  }
  return (
    <div className="fav-container">
      <h1 className="fav-title">Meus Filmes</h1>

      <ul className="fav-list">
        {favoritesMovies.map((movie) => {
          return (
            <li className="fav-item" key={movie.id}>
              <span className="fav-name">{movie.title}</span>
              <div className="area-btn">
                <Link className="fav-btn" to={`/filme/${movie.id}`}>
                  Ver detalhes
                </Link>
                <button
                  className="fav-btn"
                  onClick={() => {
                    removeMovie(movie.id);
                  }}
                >
                  Excluir
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
