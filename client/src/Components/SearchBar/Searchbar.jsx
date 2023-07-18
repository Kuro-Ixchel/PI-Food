import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../../Redux/Actions";

const SearchBar = ({ paginaActual, setPaginaActual }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const handleChange = useCallback((event) => {
        const value = event.target.value;
        setSearch(value);
        setPaginaActual(1);
    }, [setPaginaActual]);

    const handleSearch = useCallback((event) => {
        event.preventDefault();
        if (search.trim() !== "") {
        dispatch(searchRecipe(search, { fuzzySearch: true }));
        };
    }, [search, dispatch]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (search.trim() !== "") {
                dispatch(searchRecipe(search));
            }
        }, 500);

        return () => {
            clearTimeout(delay);
        };
    }, [search, dispatch]);

    return (
        <div>
            <input
                onChange={handleChange}
                value={search}
                type="search"
                placeholder="Search"
                autoComplete="off"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;