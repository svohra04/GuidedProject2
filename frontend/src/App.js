import './App.css';
import Home from './components/home';
import { Route, Routes, Navigate, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" /> } />
        <Route path="/home" element={<Home /> } />
      </Routes>
    </div>
  );
}

export default App;
