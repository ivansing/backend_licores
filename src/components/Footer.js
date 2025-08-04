import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Derechos &copy; Pagina Web 2022</div>
          <div>
            <a href="#">Politica de privacidad</a>
            &middot;
            <a href="#">Terminos &amp; Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
