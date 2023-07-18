import { Link } from "react-router-dom"

export default function Card({ image, name, summary, id }) {
    return (
        <div>

            <button onClick={() => onClose(id)}> X </button>

            <Link to={`/detail/${id}`} >
                <h2>Name: {name} </h2>
            </Link>
            <h2>ID: "{id}"</h2>
            <img src={image} alt="Not found" />
            <h2>Summary: {summary}</h2>
        </div>
    );
};