import React, { useEffect, useState } from "react";
import api from "../../services";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "14868672c6657c73a5236b83372a2e77",
          language: "pt-br",
          page: 1,
        },
      });

      setMovies(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="container-loading">
        <h2 className="title-loading">Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="listaFilmes">
        {movies.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
