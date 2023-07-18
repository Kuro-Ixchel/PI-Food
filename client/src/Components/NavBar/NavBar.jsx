import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({ paginaActual, setPaginaActual }) => {
    const menuItems = [
        { path: "/home", text: "Home" },
        { path: "/form", text: "Form" },
        { path: "/about", text: "About" },
        { path: "/landind", text: "Landind"}
    ];

    return (
        <div>
            <div>
                <SearchBar 
                PaginaActual={paginaActual} 
                setPaginaActual={setPaginaActual} />
            </div>
            <div>
                {menuItems.map(({ path, text }) => (
                    <NavLink 
                    key={path} 
                    to={path}>
                        {text}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default NavBar;