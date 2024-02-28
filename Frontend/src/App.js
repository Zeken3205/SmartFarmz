
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import LoginState from './Context/LoginState';
import SmartFarm from "./components/SmartFarm"
import Soilprofiles from './components/Soilprofiles';
import Profilestate from './Context/Profilestate';
import TogoState from './Context/TogoState';
import SmartFertilizer from './components/SmartFertilizer';
import ProfileidState from './Context/ProfileidState';
import Newprofile from './components/Newprofile';
import Services from './components/Services';
function App() {
  return (
    <BrowserRouter>
      <LoginState>
        <Profilestate>
          <TogoState>
            <ProfileidState>
              <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/soilprofile" element={<Soilprofiles />} />
                <Route path="/services" element={<Services />} />
                <Route path="/smartfarm" element={<SmartFarm />} />
                <Route path="/smartfertilizer" element={<SmartFertilizer />} />
                <Route path="/newprofile" element={<Newprofile />} />
              </Routes>
            </ProfileidState>
          </TogoState>
        </Profilestate>
      </LoginState>
    </BrowserRouter>
  );
}

export default App;
