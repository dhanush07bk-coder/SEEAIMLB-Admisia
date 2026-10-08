import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabaseClient";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  async function handleSubmit(event) {

    event.preventDefault();

    setMessage("");


    if (email.trim() === "") {

      setMessage(
        "⚠️ Please enter your email."
      );

      return;
    }


    if (password === "") {

      setMessage(
        "⚠️ Please enter your password."
      );

      return;
    }


    const {
      data,
      error
    } = await supabase
      .from("students")
      .select("*")
      .eq("email", email.trim())
      .eq("password", password)
      .maybeSingle();


    if (error) {

      console.log(error);

      setMessage(
        "❌ Login failed."
      );

      return;
    }


    if (!data) {

      setMessage(
        "❌ Invalid email or password."
      );

      return;
    }


    sessionStorage.setItem(
      "studentId",
      String(data.id)
    );


    sessionStorage.setItem(
      "studentEmail",
      data.email
    );


    setMessage(
      "✅ Login successful!"
    );


    setTimeout(() => {

      navigate("/");

    }, 500);

  }


  return (
    <div className="page">

      <div className="form-container">

        <h1>
          🔐 Login to Admisia
        </h1>


        <form onSubmit={handleSubmit}>

          <label>
            Email
          </label>


          <input
            type="email"
            placeholder="Enter your Gmail"
            value={email}
            maxLength="100"
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
          />


          <label>
            Password
          </label>


          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            maxLength="20"
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
          />


          <button type="submit">
            Login
          </button>

        </form>


        {message !== "" && (

          <p className="form-message">
            {message}
          </p>

        )}


        <p
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >

          Don't have an account?


          <button
            type="button"
            onClick={() =>
              navigate("/signup")
            }
            style={{
              background: "none",
              color: "#166534",
              padding: "5px",
              marginLeft: "5px"
            }}
          >
            Sign Up
          </button>

        </p>

      </div>

    </div>
  );
}

export default Login;