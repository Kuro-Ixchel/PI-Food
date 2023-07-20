import React from 'react';

const Paginado = ({
    recetasPorPagina = 10,
    paginaActual = 1,
    setPaginaActual,
    recetasTotales = 0,
}) => {
    if (
        typeof recetasPorPagina !== 'number' ||
        typeof paginaActual !== 'number' ||
        typeof recetasTotales !== 'number' ||
        recetasPorPagina <= 0 ||
        paginaActual <= 0 ||
        recetasTotales < 0
    ) {
        return <div>Error: Los valores de entrada no son válidos.</div>;
    }

    const numeroPaginas = Math.ceil(recetasTotales / recetasPorPagina);

    const irSiguientePagina = () => {
        if (paginaActual < numeroPaginas) {
            setPaginaActual(paginaActual + 1);
        } else {
            alert('Esta es la última página');
        }
    };

    const irPaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        } else {
            alert('Esta es la primera página');
        }
    };

    const irAPaginaX = (x) => {
        setPaginaActual(x);
    };

    const generarPaginas = () => {
        return Array.from({ length: numeroPaginas }, (_, index) => index + 1);
    };

    const renderizarPagina = (x) => {
        return (
            <li key={x}>
                <button
                    type="button"
                    aria-label={`Ir a la página ${x}`}
                    onClick={() => irAPaginaX(x)}
                    disabled={paginaActual === x}
                >
                    {x}
                </button>
            </li>
        );
    };

    return (
        <div>
            <button
                type="button"
                aria-label="Página anterior"
                disabled={paginaActual === 1}
                onClick={irPaginaAnterior}
            > Anterior
            </button>
            <ul>{generarPaginas().map(renderizarPagina)}</ul>
            <button
                type="button"
                aria-label="Siguiente página"
                disabled={paginaActual === numeroPaginas}
                onClick={irSiguientePagina}
            > Siguiente
            </button>
        </div>
    );
};

export default Paginado;