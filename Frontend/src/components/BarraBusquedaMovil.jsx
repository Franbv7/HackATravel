import { useState } from "react";

import "../Styles/BuscadorMovil.css";

export const SearchBarMovil = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="buscador-movil">
      <form>
        <input
          className="input-movil"
          type="search"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <button className="recom" onClick={handleSearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="lupa"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};
