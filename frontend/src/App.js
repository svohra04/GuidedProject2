import './App.css';
import Character from './components/character';
import Home from './components/home';
import { Route, Routes, Navigate, Link} from 'react-router-dom';
import Planet from './components/planet';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" /> } />
        <Route path="/home" element={<Home /> } />
        <Route path="/character/:id" element={<Character /> } />
        <Route path="/planet/:id" element={<Planet />} />
      </Routes>
    </div>
  );
}

export default App;
