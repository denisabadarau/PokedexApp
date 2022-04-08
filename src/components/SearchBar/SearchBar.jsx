import { React } from "react";
import './SearchBar.css';

export default function SearchBar(props) {
    const { placeholder, handleChange } = props;
    return (
        <input
            className="searchBar"
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
}