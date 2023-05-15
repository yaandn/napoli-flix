import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./movie.css";

import api from "../../services";

export default function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  function addFavorite() {
    const list = localStorage.getItem("@primeFlix");

    let savedMovies = JSON.parse(list) || [];

    const hasFilme = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (hasFilme) {
      toast.warn("Esse filme já está na sua lista");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@primeFlix", JSON.stringify(savedMovies));
    toast.success("Filme salvo com sucesso!");
  }

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "14868672c6657c73a5236b83372a2e77",
            language: "pt-br",
          },
        })
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch((err) => {
          navigate("/", { replace: true });
        });
    }

    loadMovie();

    return () => {
      console.log("Componente desmontado");
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container-loading">
        <h1 className="title-loading">Carregando filmes...</h1>
      </div>
    );
  }
  return (
    <div className="info-container">
      <h1 className="info-title">{movie.title}</h1>
      <img
        className="info-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h3 className="info-subtitle">Sinopse</h3>
      <span className="info-description">{movie.overview}</span>
      <strong className="info-average">
        Avaliação: {movie.vote_average} /10
      </strong>

      <div className="area-buttons">
        <button
          className="btn"
          onClick={() => {
            addFavorite();
          }}
        >
          Salvar
        </button>
        <button className="btn">
          <a
            target="_blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${movie.title} trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
