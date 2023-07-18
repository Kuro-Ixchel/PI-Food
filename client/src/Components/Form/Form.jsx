import { validation } from "./Validation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../Redux/Actions";

const Form = () => {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    const [form, setForm] = useState({
        name: "",
        image: "",
        diets: [],
        summary: "",
        healthScore: 0,
        instructions: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        diets: "",
        summary: "",
        healthScore: "",
        instructions: "",
    });

    const handleChange = (event) => {
        const value = event.target.value;
        const target = event.target.name;

        const regexNum = /^([0-9])*$/;
        if (regexNum.test(target)) {
            if (!form.diets.includes(parseInt(target))) {
                setForm({ ...form, diets: [...form.diets, parseInt(target)] });
            } else {
                setForm({
                    ...form,
                    diets: [...form.diets.filter((diet) => diet !== parseInt(target))],
                });
            }
        } else {
            setForm({ ...form, [target]: value });

            validation({ ...form, [target]: value }, errors, setErrors, target);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Receta creada exitosamente");
        dispatch(postRecipe(form));
        setForm({
            name: "",
            image: "",
            diets: [],
            summary: "",
            healthScore: 0,
            instructions: "",
        });
    };

    return (
        <div>
            <h2>Crea tu propia receta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                        onChange={handleChange}
                        placeholder="Ingresa el nombre"
                        type="text"
                        name="name"
                        value={form.name}
                        className={errors.name ? "error" : ""}
                    />
                    {errors.name && <span>{errors.name}</span>}

                    <label htmlFor="summary">Resumen</label>
                    <textarea
                        onChange={handleChange}
                        placeholder="Ingresa el resumen"
                        type="text"
                        name="summary"
                        value={form.summary}
                        className={errors.summary ? "error" : ""}
                    ></textarea>
                    {errors.summary && <span>{errors.summary}</span>}

                    <label htmlFor="healthScore">Puntuación de salud</label>
                    <input
                        onChange={handleChange}
                        placeholder="Ingresa la puntuación de salud"
                        type="number"
                        name="healthScore"
                        value={form.healthScore}
                        className={errors.healthScore ? "error" : ""}
                    />
                    {errors.healthScore && <span>{errors.healthScore}</span>}

                    <label htmlFor="instructions">Instrucciones</label>
                    <textarea
                        onChange={handleChange}
                        placeholder="Ingresa las instrucciones"
                        type="text"
                        name="instructions"
                        value={form.instructions}
                        className={errors.instructions ? "error" : ""}
                    ></textarea>
                    {errors.instructions && <span>{errors.instructions}</span>}

                    <label htmlFor="image">Imagen</label>
                    <input
                        onChange={handleChange}
                        placeholder="Ingresa la URL de la imagen"
                        type="text"
                        name="image"
                        value={form.image}
                        className={errors.image ? "error" : ""}
                    />
                    {errors.image && <span>{errors.image}</span>}
                </div>
                <div>
                    <h2>Selecciona las dietas a las que pertenece tu receta:</h2>
                    {errors.diets && <span>{errors.diets}</span>}
                    {diets.map((diet) => {
                        return (
                            <div key={diet.id}>
                                <label htmlFor={diet.id}>{diet.name.toUpperCase()}</label>
                                <input
                                    type="checkbox"
                                    name={diet.id}
                                    id={diet.id}
                                    checked={form.diets.includes(diet.id)}
                                    onChange={handleChange}
                                />
                            </div>
                        );
                    })}
                    <button
                        text="Enviar"
                        disabled={
                            !form.name ||
                            !form.summary ||
                            !form.instructions ||
                            errors.name ||
                            errors.diets||
                            errors.image ||
                            errors.summary ||
                            errors.instructions 
                        }
                    >Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;