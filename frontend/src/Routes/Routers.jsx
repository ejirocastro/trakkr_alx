import { Routes, Route } from 'react-router-dom';
import Landing from "../pages/Landing";
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/Signup';
import EmailVerificationSent from '../pages/EmailVerificationSent';
import EmailVerified from '../pages/EmailVerified';
import ResetPassword from '../pages/ResetPassword';
import PasswordForgot from '../pages/PasswordForgot';
import Dashboard from '../pages/Dashboard';



const Routers = () =>
{
    return <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<EmailVerificationSent />} />
        <Route path="/verified" element={<EmailVerified />} />
        <Route path="/forgotpassword" element={<PasswordForgot />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
};

export default Routers;