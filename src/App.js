import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/auth/Login';
import { Authorized } from './views/Authorized';
import { ApplicationViews } from './views/ApplicationViews';
import { Register } from './components/auth/Register';

function App() {
  return (
    <Routes>
      <Route path='login' element={<Login />}/>
      <Route path='register' element={<Register />} />
      <Route 
        path='*'
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
        />
    </Routes>
  );
}

export default App;


