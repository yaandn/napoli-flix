import React from "react";
import "./error.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="error-container">
      <h2 className="error-title">Erro 404</h2>
      <h3 className="error-description">Página não encontrada</h3>
      <Link to="/" className="error-button">Ir para Filmes</Link>
    </div>
  );
}
