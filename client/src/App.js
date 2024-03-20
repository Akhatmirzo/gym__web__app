import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/AuthForm/SignIn";
import SignUp from "./Pages/AuthForm/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Controller/Dashboard";
import Member from "./Pages/Controller/Member";
import LoadingEllipse from "./Components/Loadings/LoadingEllipse";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:8000/"
  // const url = "https://0f7f-178-218-201-17.ngrok-free.app/";
  // const url = "https://noding-jb6w.onrender.com/";
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-[black] w-full h-screen flex items-center justify-center gap-5">
              <Link className="btn__primary" to={"/signup"}>
                Register
              </Link>
              <Link className="btn__primary" to={"/signin"}>
                Login
              </Link>
            </div>
          }
        />
        <Route
          path="/signin"
          element={<SignIn setLoading={setLoading} url={url} />}
        />
        <Route
          path="/signup"
          element={<SignUp setLoading={setLoading} url={url} />}
        />
        <Route path="/dashboard">
          <Route
            index
            element={<Dashboard setLoading={setLoading} url={url} />}
          />
          <Route
            path=":id"
            element={<Member setLoading={setLoading} url={url} />}
          />
        </Route>
      </Routes>
      <ToastContainer autoClose={2000} />
      <LoadingEllipse loading={loading} />
    </>
  );
}

export default App;
