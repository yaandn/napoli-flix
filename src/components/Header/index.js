import React, { useEffect, useState } from "react";
import "./header.css";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Napoli<span>Flix</span>
      </Link>
      <Link className="favoritos" to="/favoritos">
        Meus filmes
      </Link>
    </header>
  );
}
