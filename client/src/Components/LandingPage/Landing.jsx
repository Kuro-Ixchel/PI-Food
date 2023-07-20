import HenryFood from "../Assets/Henry food.png"
import { Link } from "react-router-dom";

const Landing = () => {
    return (
    <div>
        <h1>Landig Page</h1>
        <img src={HenryFood} alt="Heenry Food"/>


        <p>
        Aplicacion web de recetas de comida sana. 
        Busca y guarda recetas, consulta API y bases de datos, y comparte tus datos en tarjetas. 
        </p> 
        <Link to="/home">
            <button>Home</button>
        </Link>

    </div>
    );
};

export default Landing;