export const validation = (form, errors, setErrors, target) => {
    const regexURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

    const errorMessages = {
        name: {
            length: "El titulo es muy largo",
            empty: "Empty title is Favor de poner nombre a la receta",
        },
        summary: {
            length: "El resumen es muy largo",
            empty: "Debe haber resumen",
        },
        instructions: {
            empty: "Debe haber instrucciones",
        },
        healthScore: {
            limit: "Health score debe ser 100 o menor",
        },
        image: {
            invalid: "URL invalido",
        },
    };

    if (target === "name") {
        setErrors({
            ...errors,
            name: form.name.length > 30
                ? errorMessages.name.length : form.name
                    ? "" : errorMessages.name.empty,
        });
    }
    if (target === "summary") {
        setErrors({
            ...errors,
            summary: form.summary.length > 100
                ? errorMessages.summary.length : form.summary
                    ? "" : errorMessages.summary.empty,
        });
    }
    if (target === "instructions") {
        setErrors({
            ...errors,
            instructions: form.instructions.length
                ? "" : errorMessages.instructions.empty,
        });
    }
    if (target === "healthScore") {
        setErrors({
            ...errors,
            healthScore: form.healthScore > 100
                ? errorMessages.healthScore.limit : "",
        });
    }
    if (target === "image") {
        setErrors({
            ...errors,
            image: regexURL.test(form.image)
                ? "" : errorMessages.image.invalid,
        });
    }
};