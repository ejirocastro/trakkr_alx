import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import RotateLoader from "react-spinners/RotateLoader";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from '../context/AuthContext';

const PasswordForgot = () =>
{

    const [formErrors, setFormErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
    })

    const navigate = useNavigate();
    const { dispatch } = useContext(authContext);

    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email!")
            .required("Please enter your email!"),
    });

    const handleInputChange = e =>
    {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async e =>
    {

        e.preventDefault()
        setLoading(true);

        try
        {
            await schema.validate(formData, { abortEarly: false });

            const res = await fetch(`${BASE_URL}/users/forgot-password`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json();

            if (res.ok)
            {
                setLoading(false);

                toast.success(result.message, { className: "toast-message" })
                navigate("/login");
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
        <section className='min-h-[500px] flex items-center justify-center'>
            <div className="bg-white border text-base border-blue-400 w-[90%] sm:w-[70%] lg:w-[50%]  p-6 md:p-10 rounded-lg shadow-lg ">
                <p className=' !text-4xl text-center font-semibold text-gray-800 dark:text-slate-100 mb-10'>Reset Password</p>
                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={submitHandler}>
                    <div className='relative mb-4'>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 mr-4 m pointer-events-none">
                            <svg
                                className="w-5 h-5 text-blue-700"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 16"
                            >
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-transparent border placeholder:!text-2xl  focus:outline-none border-blue-400 text-gray-900 dark:text-slate-50 text-2xl font-medium rounded-lg  block w-full pl-10 py-4"
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    {formErrors && formErrors.email && (
                        <span className="text-red-500 pt-2 block">{formErrors.email}</span>
                    )}

                    <button
                        type="submit"
                        className=" text-white !text-2xl font-bold  bg-[#0070f3] p-3 w-[70%] md:w-[50%] lg:w-[30%] rounded-full"
                    >
                        {loading ? <RotateLoader size={35} color="#ffffff" /> : "Send Link"}
                    </button>
                </form>

            </div>
        </section>

    );
};

export default PasswordForgot;
