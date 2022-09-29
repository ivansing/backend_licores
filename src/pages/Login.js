import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  let navigate = useNavigate();

  const [user, userState] = useState({ email: "", password: "" });

  return (
    <>
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
                    </div>
                    <div class="card-body">
                      <form id="loginForm">
                        <div class="form-group">
                          <label for="login-email">Direccion Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="login-email"
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="login-password">Clave</label>
                          <input
                            type="password"
                            class="form-control"
                            id="login-password"
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
                        <button
                          type="submit"
                          class="btn btn-primary"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          {" "}
                          Ingresar
                        </button>
                      </form>
                    </div>
                    <div class="card-footer text-center">
                      <div className="small">
                        <Link to="/register">
                          ¿No tienes una cuenta? Ingresa
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
    </>

    // TODO logut
  );
};

export default Login;
