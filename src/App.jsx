import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Navbar
  from "./components/Navbar";


import Home
  from "./pages/Home";


import Login
  from "./pages/Login";


import Signup
  from "./pages/Signup";


import Application
  from "./pages/Application";


import Status
  from "./pages/Status";


import Profile
  from "./pages/Profile";


import "./App.css";


function App() {

  return (

    <BrowserRouter>

      <Navbar />


      <Routes>

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/signup"
          element={<Signup />}
        />


        <Route
          path="/application"
          element={<Application />}
        />


        <Route
          path="/status"
          element={<Status />}
        />


        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;