
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import MyRequest from './Component/MyRequest';
import Login from './Pages/Login';
import Messages from './Pages/Messages';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='Signup' element={<Signup></Signup>}></Route>
        {/* <Route path='MyRequest' element={<MyRequest></MyRequest>}></Route> */}
        <Route path='Messages' element={<Messages></Messages>}></Route>
      </Routes>
   
    </div>
  );
}

export default App;
