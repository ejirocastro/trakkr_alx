import { Routes, Route } from 'react-router-dom';
import Landing from "../pages/Landing";
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/Signup';



const Routers = () =>
{
    return <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
};

export default Routers;