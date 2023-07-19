import Card from "../Card/Card";

export default function Cards({recipe}) { 
    return (
        <div>
            {recipe.map(({ id, name, summary, diets, image , onClose}) => {
                return (
                    <Card
                        onClose={onClose}
                        key={id}
                        id={id}
                        name={name}
                        image={image}
                        sumarry={summary}
                        diets={diets}
                    />);
            })}
        </div>
    );
}
