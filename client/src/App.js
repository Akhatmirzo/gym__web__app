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
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-[black] w-full h-screen flex items-center justify-center gap-5">
              <Link className="btn__primary" to={"/signup"}>Register</Link>
              <Link className="btn__primary" to={"/signin"}>Login</Link>
            </div>
          }
        />
        <Route path="/signin" element={<SignIn setLoading={setLoading} />} />
        <Route path="/signup" element={<SignUp setLoading={setLoading} />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard setLoading={setLoading} />} />
          <Route path=":id" element={<Member setLoading={setLoading} />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={2000} />
      <LoadingEllipse loading={loading} />

      
    </>
  );
}

export default App;
