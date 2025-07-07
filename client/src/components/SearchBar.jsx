import React, { useEffect, useState } from "react";
import searchIcon from "../assets/Search.svg";

export const SearchBar = () => {
  //   const [searchTerm, setSearchTerm] = useState("");

  //   const handleInputChange = (e) => {
  //     setSearchTerm(e.target.value);
  //   };

  //   const handleSearch = () => {
  //     console.log("Search Term:", searchTerm);
  //   };

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [debounceInputValue, setDebouncedInputValue] = useState("");
  const debounceDuration = 500;

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue), debounceDuration;
    });

    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, debounceDuration]);

  useEffect(() => {
    console.log(debounceInputValue);
  }, [debounceInputValue]);

  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder="Search For a Product"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="search-button">
        <img src={searchIcon} alt="Search" />
      </div>
    </div>
  );
};
