import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm, placeholder = "Search..." }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
}