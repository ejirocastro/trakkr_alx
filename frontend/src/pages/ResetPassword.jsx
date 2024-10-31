import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from '../config';
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import * as Yup from 'yup';

const ResetPassword = () =>
{
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const schema = Yup.object().shape({
    password: Yup.string().required("Please enter your new password").min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleInputChange = e =>
  {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e =>
  {
    e.preventDefault();
    setLoading(true);

    try
    {
      await schema.validate(formData, { abortEarly: false });

      const res = await fetch(`${BASE_URL}/users/reset-password/${token}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok)
      {
        toast.success(result.message, { className: "toast-message" });
        setLoading(false);
        navigate("/login");
      } else
      {
        toast.error(result.message, { className: "toast-message" });
        setLoading(false);
      }
    } catch (err)
    {
      if (err instanceof Yup.ValidationError)
      {
        const errors = {};
        err.inner.forEach(e =>
        {
          errors[e.path] = e.message;
        });
        setFormErrors(errors);
      } else
      {
        toast.error(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Reset Password
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                New Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg 
                         shadow-sm placeholder:text-slate-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         dark:bg-slate-700 dark:text-white transition-colors duration-200"
              />
              {formErrors && formErrors.password && (
                <p className="mt-2 text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Confirm New Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg 
                         shadow-sm placeholder:text-slate-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         dark:bg-slate-700 dark:text-white transition-colors duration-200"
              />
              {formErrors && formErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">{formErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium 
                       text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       dark:bg-blue-500 dark:hover:bg-blue-600
                       flex items-center justify-center"
            >
              {loading ? (
                <div className="py-1">
                  <HashLoader size={24} color="#ffffff" />
                </div>
              ) : (
                "Reset Password"
              )}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 
                         dark:hover:text-blue-300 transition-colors duration-200"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;