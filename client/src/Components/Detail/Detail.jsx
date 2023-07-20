import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addRecipeDetail, cleanDetail } from "../../Redux/Actions";

const Detail = () => {
    const { recipeDetail } = useSelector((state) => state);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addRecipeDetail(id));
        return () => {
            dispatch(cleanDetail());
        };
    }, [id, dispatch]);

    const { name, image, healthScore, diets, summary, steptostep } = recipeDetail;

    return (
        <div>
            <NavLink to="/home">
                <button>Home</button>
            </NavLink>
            <h1>Detalles de la receta</h1>
            {!name ? (
                <h1>Cargando</h1>
            ) : (
                <div>
                    <div>
                        <h1>{name}</h1>

                        <h4>Health Score: {healthScore}</h4>

                        <img src={image} alt={name} />

                        <ul>
                            {diets.map((element) => (
                                <li key={element.id}>{element.name.toUpperCase()}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h2>Summary</h2>

                        <p>{summary.replace(/<[^>]*>/g, "")}</p>
                        <h2>Step to step</h2>

                        <p>{steptostep.replace(/<[^>]*>/g, "")}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;