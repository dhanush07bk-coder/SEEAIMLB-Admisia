import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabaseClient";

function Signup() {

  const navigate = useNavigate();


  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [confirmPassword, setConfirmPassword] =
    useState("");


  const [message, setMessage] =
    useState("");


  async function handleSubmit(event) {

    event.preventDefault();

    setMessage("");


    if (
      email.trim() === "" ||
      password === "" ||
      confirmPassword === ""
    ) {

      setMessage(
        "⚠️ Please fill all fields."
      );

      return;
    }


    if (email.length > 100) {

      setMessage(
        "⚠️ Email cannot exceed 100 characters."
      );

      return;
    }


    if (password.length < 6) {

      setMessage(
        "⚠️ Password must contain at least 6 characters."
      );

      return;
    }


    if (password.length > 20) {

      setMessage(
        "⚠️ Password cannot exceed 20 characters."
      );

      return;
    }


    if (password !== confirmPassword) {

      setMessage(
        "⚠️ Passwords do not match."
      );

      return;
    }


    const {
      data: existingStudent,
      error: searchError
    } = await supabase
      .from("students")
      .select("id")
      .eq(
        "email",
        email.trim()
      )
      .maybeSingle();


    if (searchError) {

      console.log(searchError);

      setMessage(
        "❌ Unable to check account."
      );

      return;
    }


    if (existingStudent) {

      setMessage(
        "⚠️ This email is already registered."
      );

      return;
    }


    const {
      error
    } = await supabase
      .from("students")
      .insert({

        email:
          email.trim(),

        password:
          password

      });


    if (error) {

      console.log(error);

      setMessage(
        "❌ Account creation failed."
      );

      return;
    }


    setMessage(
      "✅ Account created successfully!"
    );


    setEmail("");

    setPassword("");

    setConfirmPassword("");


    setTimeout(() => {

      navigate("/login");

    }, 1200);

  }


  return (
    <div className="page">

      <div className="form-container">

        <h1>
          📝 Join Admisia
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


          <small>
            Maximum 100 characters
          </small>


          <label>
            Password
          </label>


          <input
            type="password"
            placeholder="Enter password"
            value={password}
            minLength="6"
            maxLength="20"
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
          />


          <small>
            6–20 characters
          </small>


          <label>
            Confirm Password
          </label>


          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            maxLength="20"
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
          />


          <button type="submit">
            Create Admisia Account
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

          Already have an account?


          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
            style={{
              background: "none",
              color: "#166534",
              padding: "5px",
              marginLeft: "5px"
            }}
          >
            Login
          </button>

        </p>

      </div>

    </div>
  );
}

export default Signup;