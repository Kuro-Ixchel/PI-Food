export default function SearchBar(props){
    const {onSearch} = props;
    return(
        <div>
            <input type="search"/>
            <button onClick={onSearch}>Search</button>
        </div>
    );
};