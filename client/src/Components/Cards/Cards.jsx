import Card from "../Card/Card";

export default function Cards({ recipe, onClose }) {

    return (
        <div>
            {recipe.map(({ id, name, summary, diets, image }) => {
                return (
                    <Card
                        id={id}
                        name={name}
                        image={image}
                        sumarry={summary}
                        diets={diets}
                        onClose={onClose}

                    />);
            })}
        </div>
    );
}
