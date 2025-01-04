import logo from './logo.svg';
import './App.css';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Sidebar from './Sidebar/Sidebar';


function App() {
  return (
    <BrowserRouter >
      <NavBar />
     <div className='d-flex  '>
     <Sidebar />
     <Router></Router>
    
     </div>

    </BrowserRouter>
  );
}

export default App;
