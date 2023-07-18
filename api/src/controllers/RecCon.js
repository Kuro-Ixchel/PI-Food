const { Recipe, Diets } = require('../db');
const { Sequelize } = require('sequelize');
const { API_KEY, URL_BASE } = require('../../env');
const axios = require('axios');
require('dotenv').config();
console.log();

const getRecipesById = async (res, req) => {
    try {
        const { searchedId } = req.params;
        if (searchedId.toString().includes("-")) {
            // Busca la receta en la base de datos por searcheId
            const searchInDB = await Recipe.findOne({
                where: { id: searchedId },
                include: { model: Diet, attributes: ['name'] },
            });
            if (searchInDB) {
                // Extrae los datos relevantes de la receta y crea un objeto diet
                const { id, name, image, summary, healthScore, steps } = searchedId;
                const diet = createDietObject({ id, name, image, summary, healthScore, steps, diets: Diets });
                return res.status(200).json(diet);
            }
        };

        // Si no se encuentra la receta en la base de datos, se realiza una solicitud a una API externa
        const { data } = await axios(`${URL_BASE}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
        // Filtra la receta correspondiente al searchedId de los resultados obtenidos de la API
        const foundRecipe = data.results.find(diet => diet.id === +searchedId);
        //Si no se encuentra manda mensaje de error
        if (!foundRecipe) {
            return res.status(400).send(`No hay recetas con el id: ${searchedId}`);
        }

        const outTags = foundRecipe.summary.replace(/<[^>]*>/g, '');
        // Traen los pasos de la receta de la funcion getStep...
        const stepByStep = getStepByStep(foundRecipe);
        //Se crea el objeto con la receta
        const assocDietFromAPI = createAssocDietObj({
            id: foundRecipe.id,
            name: foundRecipe.title,
            healthScore: foundRecipe.healthScore,
            image: foundRecipe.image,
            steps: stepByStep,
            summary: outTags,
            diets: foundRecipe.diets
        });
        return res.status(200).json(assocDietFromAPI);

        // Si ocurre algún error, se devuelve un estado 500 con un mensaje de error
    } catch (error) {
        res.status(500).send('Ocurrió un error en el servidor');
    }
};

// Obtiene los pasos de la receta filtrada
const getStepByStep = (foundRecipe) => {
    return foundRecipe ? foundRecipe.analyzedInstructions[0].steps.map(step => step.step) : [];
};

// Crea un objeto associatedDiet con los datos proporcionados
const createAssocDietObj = ({ id, name, image, summary, healthScore, steps, diets }) => {
    return {
        id,
        name,
        healthScore,
        image,
        steps,
        summary,
        diets: diets.map((diet) => diet.name)
    };
};
//__________________________________________________________________________________________

const getRecipesByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).send('Parámetro incorrecto');
        }

        // Obtener resultados de la API externa
        const { data: { results: apiResults } } = await axios.get(`${API_URL}/recipes/complexSearch`, {
            params: {
                apiKey: API_KEY,
                addRecipeInformation: true,
                query: name
            }
        });

        const apiRecipes = apiResults.map(apiRecipe => ({
            id: apiRecipe.id,
            name: apiRecipe.title,
            healthScore: apiRecipe.healthScore,
            image: apiRecipe.image,
            summary: apiRecipe.summary.replace(/<[^>]*>/g, ''),
            steps: apiRecipe.analyzedInstructions?.[0]?.steps?.map(step => step.step) || [],
            diets: apiRecipe.diets || apiRecipe.diets?.map(diet => diet.name)
        }));

        // Obtener recetas de la base de datos local
        const dbRecipes = await Recipe.findAll({
            attributes: ['id', 'name', 'image', 'summary', 'healthScore', 'steps'],
            where: {
                name: { [Sequelize.Op.iLike]: `%${name}%` }
            },
            include: { model: Diet, attributes: ['name'] }
        });

        const dbRecipesAll = dbRecipes.map(dbRecipe => ({
            id: dbRecipe.id,
            name: dbRecipe.name,
            healthScore: dbRecipe.healthScore,
            image: dbRecipe.image,
            summary: dbRecipe.summary,
            steps: dbRecipe.steps,
            diets: dbRecipe.diets || dbRecipe.diets.map(diet => diet.name)
        }));

        // Combinar las recetas de la API y la base de datos
        const allRecipes = apiRecipes.concat(dbRecipesAll);

        // Verificar si se encontraron recetas
        if (allRecipes.length === 0) {
            return res.status(404).send(`No se encontraron recetas con el nombre: ${name}`);
        }

        return res.status(200).json(allRecipes);
    } catch (error) {
        return res.status(404).send(`No se encontraron resultados para la búsqueda: ${name}`);
    }
};
//_______________________________________________________________________________________________

const postRecipes = async (req, res) => {
    const { name, image, summary, healthScore, steps, diets } = req.body;


    // Se desestructuran los campos necesarios del cuerpo de la solicitud (req.body).
    if (!name || !image || !summary || !healthScore || !steps || !diets || healthScore < 0 || healthScore > 100) {
        // Se verifica si hay datos faltantes o inválidos.
        return res.status(400).send("Datos inválidos o faltantes");
    }

    try {
        const existingRecipe = await Recipe.findOne({ where: { name } });
        if (existingRecipe) {
            // Se busca en la base de datos si ya existe una receta con el mismo nombre.
            // Si se encuentra una receta existente, se devuelve una respuesta de error.
            return res.status(400).send(`Ya existe una receta con el nombre: ${name}`);
        }

        const createRecipe = await sequelize.transaction(async (transaction) => {
            // Crea una nueva receta y se asocian las dietas en una transacción para garantizar la integridad de los datos.
            const recipe = await Recipe.create({ name, image, summary, healthScore, steps }, { transaction });
            const dietInstances = await Diet.findOrCreate({ where: { name: diets }, transaction });
            // Se buscan o crean las instancias de las dietas asociadas a la receta.

            await recipe.addDiets(dietInstances, { transaction });
            return recipe;
        });

        const response = {
            id: createRecipe.id,
            name: createRecipe.name,
            image: createRecipe.image,
            summary: createRecipe.summary,
            healthScore: createRecipe.healthScore,
            steps: createRecipe.steps,
            diets: diets,
        };
        return res.status(201).json(response);
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
};
module.exports = {
    getRecipesById,
    getRecipesByName,
    postRecipes
}