import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  // Authentication user
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
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
     console.log(error.code)
    }
  };

  return (
    
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-7">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header">
                      <h3 class="text-center font-weight-light my-4">
                        Ingresar
                      </h3>
                      {error && <p>{error}</p>} 
                    </div>
                    <div class="card-body">
                      <form id="login-form" onSubmit={handleSubmit}>
                        <div class="form-group">
                           
                          <label for="login-email">Direccion Email</label>
                          <input
                            type="email"
                            class="form-control"
                            name="email"
                            onChange={handleChange}
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="login-password">Contraseña</label>
                          <input
                            type="password"
                            class="form-control"
                            name="password"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div class="form-group form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="exampleCheck1"
                          />
                          <label class="form-check-label" for="exampleCheck1">
                            Mantener ingresado
                          </label>
                        </div>
                        <button type="submit" class="btn btn-primary">
                          Ingresar
                        </button>
                      </form>
                    </div>
                    <div class="card-footer text-center">
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
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Derechos &copy; Tu pagina 2021</div>
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
