import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';

function App() {
  return (
    <div className="App">
      <SearchBar onSearch={onSearch} />
      
    </div>
  );
}

export default App;
