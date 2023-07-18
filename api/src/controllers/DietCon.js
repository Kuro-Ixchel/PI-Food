const { Recipe, Diets } = require('../db');
const { API_KEY, URL_BASE } = require('../../env');
const axios = require('axios');
require('dotenv').config();

const getAllDiets = async (req, res) => {
    try {
        let dietsApi = [];
        let dietsDbAll = [];
        let diets = await Diet.findAll(); // Obtener todas las dietas de la base de datos

        let dietsDb = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }
        }); // Obtener todas las recetas y sus respectivas dietas de la base de datos

        dietsDbAll = dietsDb.flatMap(({ Diets }) =>
            Diets.map(({ id, name }) => ({ id, name, db: true }))
        ).filter(
            (diet, index, self) =>
                index ===
                self.findIndex((d) => d.id === diet.id && d.name === diet.name)
        ); // Mapear las recetas y las dietas de la base de datos a un array plano, eliminando duplicados

        if (diets.length === 0) {
            const { data } = await axios.get(
                `${URL_BASE}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
            ); // Obtener datos de recetas de la API

            let idCounter = 0;
            dietsApi = [...new Set(data.results.flatMap(({ diets }) => diets))].map(
                (diet) => ({ id: idCounter++, diet, api: true })
            ); // Mapear las recetas y las dietas de la API a un array plano, eliminando duplicados

            diets = [...new Set(data.results.flatMap(({ diets }) => diets))]; // Obtener todas las dietas sin duplicados

            await Promise.all(
                diets.map(async (diet) => {
                    await Diet.create({ name: diet }); // Crear las dietas faltantes en la base de datos
                })
            );

            diets = await Diet.findAll(); // Obtener todas las dietas actualizadas de la base de datos
        } else {
            const { data } = await axios.get(
                `${URL_BASE}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
            ); // Obtener datos de recetas de la API

            let idCounter = 0;
            dietsApi = [...new Set(data.results.flatMap(({ diets }) => diets))].map(
                (diet) => ({ id: idCounter++, diet, api: true })
            ); // Mapear las recetas y las dietas de la API a un array plano, eliminando duplicados
        }
        const combinedDiets = [...dietsApi, ...dietsDbAll]; // Combinar las dietas de la API y las dietas de la base de datos
        return res.status(200).json(combinedDiets); // Devolver las dietas combinadas como respuesta exitosa
    } catch (error) {
        return res.status(404).json({ error: 'No se pudo obtener la lista de dietas' }); 
    }
};

module.exports = {
    getAllDiets
}