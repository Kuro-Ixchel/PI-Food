import { Link } from "react-router-dom"

export default function Card({ name, id, image, summary, onClose }) {
    return (
        <div>
            <button onClick={() => onClose(id)}> X </button>
            <Link to={`/detail/${id}`} >
                <h1>Name: {name} </h1>
            </Link>
            <h2>Id: "{id}"</h2>
            <img src={image} alt={name} />
            <h2>Summary:</h2>
            <p>{summary}</p>
        </div>
    );
};