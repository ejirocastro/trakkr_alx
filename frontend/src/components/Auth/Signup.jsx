import React, { useContext, useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const SignUp = () =>
{
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

    const [formErrors, setFormErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const { dispatch } = useContext(authContext);


    const schema = Yup.object().shape({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string()
            .email("Invalid email!")
            .required("Please enter your email!"),
        password: Yup.string().required("Please enter your password!").min(6),
        confirmPassword: Yup.string()
            .required("Please confirm Your password")
            .oneOf([Yup.ref("password")], "Passwords must match"),
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

            const res = await fetch(`${BASE_URL}/users/verify-email`, {
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
                    type: "ACTIVATE_USER",
                    payload: {
                        activationToken: result.verificationToken,
                        activation_Code: result.activationCode
                    }
                })

                console.log(result.activationCode)

                setLoading(false);
                // toast.success(result.message)
                navigate("/verify");
            }
            else
            {
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
                toast.error(err.message);
            }
            setLoading(false)
        }

    }

    return (
        <section className="login-section" id="login">
            <div className="login-container">
                <h2 className="login-title">Welcome Back</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Username"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
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
                        {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="login-button flex justify-center items-center">
                        {loading ? <HashLoader size={35} color="#ffffff" /> : "Sign Up"}
                    </button>
                </form>
                <div className="login-footer">
                    {/* <a href="#forgot-password" className="forgot-password">Forgot Password?</a> */}
                    <p>Already have an account? <a href="/login" className="signup-link">Login</a></p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;