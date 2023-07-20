import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, getDiets, getRecipes, order } from "../../Redux/Actions";
import Cards from "../Cards/Cards";
import Paginado from "../Pagination/Paginado";

const Home = ({ paginaActual, setPaginaActual }) => {
    const dispatch = useDispatch();
    const { recipes, diets } = useSelector((state) => state);

    const [recetasPorPagina] = useState(9);
    const recetasTotales = recipes.length;
    const lastIndex = paginaActual * recetasPorPagina;
    const firstIndex = lastIndex - recetasPorPagina;

    const handleOrder = (event) => {
        const selectedValue = event.target.value;
        dispatch(order(selectedValue));
        setPaginaActual(1);
    };

    const handleFilter = (event) => {
        const selectedValue = event.target.value;
        dispatch(filter(selectedValue));
        setPaginaActual(1);
    };

    useEffect(() => {
        dispatch(getDiets());
        dispatch(getRecipes());
    }, [dispatch]);

    return (
        <div>
            <h1> Recetas </h1>

            <div>
                <select name="order" onChange={handleOrder}>
                    <option>Orden</option>
                    <option value="AtoZ">A to Z</option>
                    <option value="ZtoA">Z to A</option>
                    <option value="HS asendente">+ Health score</option>
                    <option value="HS descendente">- Health score</option>
                </select>
                <select name="filter" onChange={handleFilter}>
                    <option>Todo</option>
                    {diets.length ? (
                        diets.map((diet) => (
                            <option key={diet.id}>{diet.name}</option>
                        ))
                    ) : null}
                    <option value="db">Data Base</option>
                    <option value="api"> API</option>
                </select>
            </div>

            <Paginado
                recetasPorPagina={recetasPorPagina}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
                recetasTotales={recetasTotales}
            />

            {recipes.length ? (
                <Cards recipes={recipes.slice(firstIndex, lastIndex)}></Cards>
            ) : (
                <h1>Cargando</h1>
            )}
        </div>
    );
};

export default Home;