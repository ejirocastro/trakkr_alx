import React, { useContext, useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import * as Yup from 'yup';
import { BASE_URL } from '../../config';
import PasswordForgot from '../../pages/PasswordForgot';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function Login()
{

    const [showPassword, setShowPassword] = useState(false);

    const [formErrors, setFormErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const { dispatch } = useContext(authContext);

    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email!")
            .required("Please enter your email!"),
        password: Yup.string().required("Please enter your password!").min(6)
    });


    const handleInputChange = e =>
    {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e =>
    {

        e.preventDefault()
        setLoading(true);

        try
        {
            await schema.validate(formData, { abortEarly: false });

            const res = await fetch(`${BASE_URL}/users/login`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json();

            if (res.ok)
            {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user: result.user,
                        accessToken: result.accessToken,
                    }
                })
                setLoading(false);

                toast.success("Log in successful", { className: "toast-message" })
                navigate("/");
            }
            else
            {
                // throw new Error(result.Error)
                toast.error(result.message, { className: "toast-message" });
                setLoading(false);
                console.log(result);
            }

        }
        catch (err)
        {
            if (err instanceof Yup.ValidationError)
            {
                const errors = {};
                err.inner.forEach(e =>
                {
                    errors[e.path] = e.message;
                });
                setFormErrors(errors);
            }
            else
            {
                // toast.error(err.data.message);
                console.log(err);
            }
            setLoading(false)
        }

    }


    return (
        <section className="login-section" id="login">
            <div className={`login-container`}>
                <h2 className="login-title">Welcome Back</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            minLength="8"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button type="submit" className="login-button flex justify-center items-center">
                        {loading ? <HashLoader size={35} color="#ffffff" /> : "Login"}
                    </button>
                </form>
                <div className="login-footer">
                    <button className="forgot-password"><a href='/forgotpassword'>Forgot Password?</a></button>
                    <p>Don't have an account? <a href="/signup" className="signup-link">Sign Up</a></p>
                </div>
            </div>
        </section>
    );
}

export default Login;