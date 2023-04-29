import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Generate from './components/generate/Generate';

function App() {
  return (
    <div className="App">
    <div className='container2 mx-auto'>
     <Routes>
         <Route path='/' element={<Home />} />
         <Route path='generate/' element={<Generate />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
