import { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "@/pages/api/axios";

import { AiOutlineWarning } from "react-icons/ai";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [response, setResponse] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setRegisterData((oldData) => {
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
        "/user/register",
        JSON.stringify(registerData),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(response);

      setRegisterData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setResponse(error.response);
    }
  }

  useEffect(() => {
    if (response.status === 409) {
      setErrorMessage(
        (prevData) => `Account with ${registerData.email} email already exist`
      );
    }

    if (response.status === 201) {
      setSuccessMessage((prevData) => `Account has been successfully created`);
    }
  }, [response]);

  return (
    <section className="w-full">
      <div className="max-w-sm mx-auto mt-12">
        <h1 className="mb-8 text-center font-bold text-2xl">
          Register your account here
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="profile-label">
              User name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="input-style"
              autoComplete="off"
              onChange={handleChange}
              value={registerData.username}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="profile-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="input-style"
              autoComplete="off"
              onChange={handleChange}
              value={registerData.email}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="profile-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input-style"
              onChange={handleChange}
              value={registerData.password}
            />
          </div>

          <button className="w-full py-3 px-4 bg-green-500 text-white font-medium text-sm rounded-lg">
            continue
          </button>

          <p className="mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>

        {response.status === 409 && (
          <div className="flex items-center gap-2 my-12 p-4 bg-red-300/80 border-l-8 border-red-600 text-red-600 text-sm font-medium rounded-lg">
            <AiOutlineWarning />
            <div>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {response.status === 201 && (
          <div className="flex items-center gap-2 my-12 p-4 bg-green-300/80 border-l-8 border-green-600 text-green-600 text-sm font-medium rounded-lg">
            <div>
              <p>{successMessage}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
