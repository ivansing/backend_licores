import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Alert } from "../components/Alert";


const Register = () => {
  // Authentication user
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  // Event Change
  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Correo Invalido");
      } else if (error.code === "auth/weak-password") {
        setError("Contraseña debe contener mas de 6 caracteres");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Este email ya esta en uso");
      }
    }
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Crear una Cuenta
                    </h3>
                    {error && <Alert message={error} />}
                  </div>
                  <div className="card-body">
                    <form id="signup-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Direccion Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="tucorreo@ejemplo.com"
                          aria-describedby="emailHelp"
                          onChange={handleChange}
                          required
                        />
                        {/* <!--<small id="emailHelp" className="form-text text-muted">Tus datos son guardados seguramente.</small>--> */}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="******"
                          name="password"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Registrarse
                      </button>
                    </form>
                  </div>
                  <div className="card-footer text-center">
                    <div className="small">
                      <Link to="/login">¿Tienes una cuenta? Ingresa</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">Derechos &copy; Tu pagina 2021</div>
              <div>
                <a href="#">Politica de privacidad</a>
                &middot;
                <a href="#">Terminos &amp; Condiciones</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Register;
