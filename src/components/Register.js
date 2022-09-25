import React from 'react'
import { Link } from 'react-router-dom'


const Register = () => {
  return (
    <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Crear una Cuenta</h3></div>
                                    <div class="card-body">
                                        <form id="signup-form">
                                            <div class="form-group">
                                              <label for="exampleInputEmail1">Direccion Email</label>
                                              <input type="email" class="form-control" id="signup-email" aria-describedby="emailHelp" required />
                                              {/* <!--<small id="emailHelp" class="form-text text-muted">Tus datos son guardados seguramente.</small>--> */}
                                            </div>
                                            <div class="form-group">
                                              <label for="exampleInputPassword1">Clave</label>
                                              <input type="password" class="form-control" id="signup-password" required />
                                            </div>
                                            
                                            <button type="submit" class="btn btn-primary" >Registrarse</button>
                                          </form>
                                    </div>
                                    <div class="card-footer text-center">
                                        <div class="small"><Link to="/auth">¿Tienes una cuenta? Ingresa</Link></div>
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
  )
}

export default Register