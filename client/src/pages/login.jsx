import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "@/pages/api/axios";

/* react icons */
import { AiOutlineWarning } from "react-icons/ai";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/user/auth",
        JSON.stringify(loginData),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(response);

      setLoginData({
        email: "",
        password: "",
      });
    } catch (error) {
      setResponse(error?.response);
    }
  }

  useEffect(() => {
    if (response.status === 401) {
      setErrorMessage((prevData) => "email or password is invalid");
    }

    if (response.status === 404) {
      setErrorMessage((prevData) => "account does not exist");
    }
  }, [response]);

  if (response.status === 200) {
    return <Navigate to="/" />;
  }

  return (
    <section className="w-full">
      <div className="max-w-sm mx-auto mt-8">
        <h1 className="mb-8 text-center text-2xl font-bold">
          Login to your account here
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="profile-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input-style"
              onChange={handleChange}
              value={loginData.email}
              autoComplete="off"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="email" className="profile-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input-style"
              onChange={handleChange}
              value={loginData.password}
            />
          </div>

          <button className="w-full py-3 px-4 bg-green-500 text-white font-medium text-sm rounded-lg">
            Continue
          </button>
        </form>

        <p className="mt-3">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>

        {response.status === 401 && (
          <div className="flex items-center gap-2 mt-12 p-4 bg-red-300/80 border-l-8 border-red-600 text-red-600 text-sm font-medium rounded-lg">
            <AiOutlineWarning className="" />
            <div>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {response.status === 404 && (
          <div className="flex items-center gap-2 mt-12 p-4 bg-red-300/80 border-l-8 border-red-600 text-red-600 text-sm font-medium rounded-lg">
            <AiOutlineWarning className="" />
            <div>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
