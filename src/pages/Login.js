import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { useAuth } from "../context/authContext";

const Login = () => {
  // Authentication user
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
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
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("La contraseña no es correcta");
      } else if (error.code === "auth/user-not-found") {
        setError("El usuario no existe");
      }
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    if (!user.email) return setError("Ingresa tu email");

    try {
      await resetPassword()
      setError("Te enviamos un link para reponer tu contraseña")
    } catch (error) {
      setError(error.message)
    }
    
  }

  // Google signing
  const handleGoogleSigning = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.code);
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
                    <h3 className="text-center font-weight-light my-4">Ingresar</h3>
                    {error && <Alert message={error} />}
                  </div>
                  <div className="card-body">
                    <form id="login-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="login-email">Direccion Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="login-password">Contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                          Mantener ingresado
                        </label>
                      </div>
                      <br></br>

                      <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                          Ingresar
                        </button>

                        <div className="inline-block align-baseline text-sm hover:text-blue-800">
                          <Link onClick={handleResetPassword} >¿Olvidaste tu Contraseña?</Link>
                        </div>
                      </div>
                    </form>
                    <br></br>
                    <div>
                      <button
                        type="submit"
                        onClick={handleGoogleSigning}
                        className="btn btn-primary"
                      >
                        Ingreso con Google
                      </button>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <div className="small">
                      <Link to="/register">
                        ¿No tienes una cuenta? Registrate
                      </Link>
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

export default Login;
