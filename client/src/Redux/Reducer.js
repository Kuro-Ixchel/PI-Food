import { ORDER, ADD_RECIPE_DETAIL, CLEAN_DETAIL, FILTER, GET_DIETS, GET_RECIPES, SEARCH_RECIPE } from "./Actions";

const initialState = {
    diets: [],
    recipes: [],
    recipeDetail: {},
    allRecipes: [],
};


const AtoZ = (x, y) => {
    const lowerX = x.toLowerCase();
    const lowerY = y.toLowerCase();

    if (lowerX < lowerY) {
        return -1;
    };
    if (lowerX > lowerY) {
        return 1;
    };
    return 0;
};

const ZtoA = (x, y) => {
    const lowerX = x.toLowerCase();
    const lowerY = y.toLowerCase();

    if (lowerX < lowerY) {
        return 1;
    };
    if (lowerX > lowerY) {
        return -1;
    };
    return 0;
};

const reducer = (State = initialState, action) => {
    switch (action.type) {
        case ORDER:
            const orderMap = {
                AtoZ: (x, y) => AtoZ(x.name, y.name),
                ZtoA: (x, y) => ZtoA(x.name, y.name),
                AtoZ: (x, y) => x.healthScore - y.healthScore,
                ZtoA: (x, y) => y.healthScore - x.healthScore,
            };

            if (action.payload in orderMap) {
                const orderFunction = orderMap[action.payload];
                return {
                    ...State,
                    recipes: [...State.recipes.sort(orderFunction)],
                };
            };

            return { ...State };

        case FILTER:
            const validUUID =
                /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

            const filterMap = {
                All: () => [...State.allRecipes],
                db: () =>
                    State.allRecipes.filter((recipe) => validUUID.test(recipe.id)),
                api: () =>
                    State.allRecipes.filter((recipe) => !validUUID.test(recipe.id)),
            };

            if (action.payload in filterMap) {
                const filterFunction = filterMap[action.payload];
                return {
                    ...State,
                    recipes: [...filterFunction()],
                };
            };

            return {
                ...State,
                recipes: [
                    ...State.allRecipes.filter((recipe) =>
                        recipe.diets.find((element) => element.name === action.payload)
                    ),
                ],
            };

        case GET_RECIPES:
            return {
                ...State,
                allRecipes: [...action.payload],
                recipes: [...action.payload],
            };

        case GET_DIETS:
            return {
                ...State,
                diets: [...action.payload],
            };

        case SEARCH_RECIPE:
            return {
                ...State,
                allRecipes: [...State.recipes],
                recipes: [...action.payload],
            };

        case ADD_RECIPE_DETAIL:
            const {
                id,
                name,
                summary,
                healthScore,
                instructions,
                image,
                diets,
            } = action.payload;

            return {
                ...State,
                recipeDetail: {
                    id,
                    name,
                    summary,
                    healthScore,
                    instructions,
                    image,
                    diets,
                },
            };

        case CLEAN_DETAIL:
            return {
                ...State,
                recipeDetail: {},
            };
        default:
            return { ...State };
    };
};

export default reducer;