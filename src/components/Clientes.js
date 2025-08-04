import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MySwal = withReactContent(Swal);

const Clientes = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: '',
    name: '',
    email: '',
    disabled: false
  });

  // Ref to db firestore
  const usersCollection = collection(db, "users");

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching users from collection...");
      
      const data = await getDocs(usersCollection);
      console.log("Raw data from Firestore:", data);
      console.log("Number of documents:", data.docs.length);
      
      const userList = data.docs.map((doc) => {
        console.log("Document ID:", doc.id, "Data:", doc.data());
        return { ...doc.data(), id: doc.id };
      });
      
      console.log("Processed user list:", userList);
      setUsers(userList);
      
    } catch (err) {
      console.error("Error fetching users:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);
      
      let errorMessage = "Error al cargar los clientes. ";
      if (err.code === 'permission-denied') {
        errorMessage += "Sin permisos para acceder a los datos de usuarios.";
      } else if (err.code === 'unavailable') {
        errorMessage += "Servicio no disponible. Verifica tu conexión.";
      } else {
        errorMessage += `Error: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      getUsers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "No se pudo eliminar el usuario", "error");
    }
  };

  // Open view modal
  const openViewModal = (user) => {
    setViewingUser(user);
    setShowViewModal(true);
  };

  // Open edit modal
  const openEditModal = (user) => {
    setEditingUser(user);
    setEditForm({
      displayName: user.displayName || user.name || '',
      name: user.name || user.displayName || '',
      email: user.email || '',
      disabled: user.disabled || false
    });
    setShowEditModal(true);
  };

  // Update user
  const updateUser = async () => {
    try {
      const userDoc = doc(db, "users", editingUser.id);
      await updateDoc(userDoc, {
        displayName: editForm.displayName.trim(),
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        disabled: editForm.disabled
      });
      
      setShowEditModal(false);
      setEditingUser(null);
      getUsers(); // Refresh the list
      Swal.fire("Actualizado", "El usuario ha sido actualizado correctamente", "success");
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "No se pudo actualizar el usuario", "error");
    }
  };

  // Handle form input changes
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Confirm delete alert
  const confirmDelete = (id, userName) => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar al usuario ${userName}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
        Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        <Header />

        <div id="layoutSidenav">
          <Sidebar />

          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid">
                <h1 className="mt-4">Clientes</h1>

                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            {/* Error State */}
                            {error && (
                              <div className="alert alert-danger" role="alert">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                {error}
                                <button 
                                  className="btn btn-outline-danger btn-sm ms-2"
                                  onClick={getUsers}
                                >
                                  Reintentar
                                </button>
                              </div>
                            )}

                            {/* Loading State */}
                            {loading ? (
                              <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2 text-muted">Cargando clientes...</p>
                              </div>
                            ) : (
                              <>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <h5 className="mb-0">
                                    <i className="fas fa-users me-2"></i>
                                    Lista de Clientes ({users.length})
                                  </h5>
                                  <div>
                                    <button 
                                      className="btn btn-outline-secondary btn-sm me-2"
                                      onClick={getUsers}
                                    >
                                      <i className="fas fa-sync me-2"></i>
                                      Refrescar
                                    </button>
                                    <a href="/register" className="btn btn-primary btn-sm">
                                      <i className="fas fa-user-plus me-2"></i>
                                      Nuevo Cliente
                                    </a>
                                  </div>
                                </div>

                                {users.length === 0 ? (
                                  <div className="text-center py-5">
                                    <i className="fas fa-users fa-3x text-muted mb-3"></i>
                                    <h5 className="text-muted">No hay clientes registrados</h5>
                                    <p className="text-muted">Los clientes aparecerán aquí cuando se registren en la aplicación.</p>
                                    <a href="/register" className="btn btn-primary">
                                      <i className="fas fa-user-plus me-2"></i>
                                      Registrar Primer Cliente
                                    </a>
                                  </div>
                                ) : (
                                  <div className="table-responsive">
                                    <table className="table table-hover">
                                      <thead className="table-light">
                                        <tr>
                                          <th scope="col">
                                            <i className="fas fa-user me-2"></i>
                                            Nombre
                                          </th>
                                          <th scope="col">
                                            <i className="fas fa-envelope me-2"></i>
                                            Email
                                          </th>
                                          <th scope="col">
                                            <i className="fas fa-calendar me-2"></i>
                                            Fecha Registro
                                          </th>
                                          <th scope="col">
                                            <i className="fas fa-info-circle me-2"></i>
                                            Estado
                                          </th>
                                          <th scope="col">
                                            <i className="fas fa-cogs me-2"></i>
                                            Acciones
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {users.map((user) => (
                                          <tr key={user.id}>
                                            <td>
                                              <div className="d-flex align-items-center">
                                                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                                                  <i className="fas fa-user text-white"></i>
                                                </div>
                                                <div>
                                                  <div className="fw-bold">
                                                    {user.displayName || user.name || user.firstName || 
                                                     (user.email ? user.email.split('@')[0] : 'Usuario sin nombre')}
                                                  </div>
                                                  {user.uid && (
                                                    <small className="text-muted">ID: {user.uid.substring(0, 8)}...</small>
                                                  )}
                                                  {!user.displayName && !user.name && !user.firstName && (
                                                    <small className="text-warning">Sin nombre configurado</small>
                                                  )}
                                                </div>
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                {user.email || 'Sin email'}
                                                {user.emailVerified === false && (
                                                  <small className="badge bg-warning text-dark ms-2">No verificado</small>
                                                )}
                                                {user.emailVerified === true && (
                                                  <small className="badge bg-success ms-2">Verificado</small>
                                                )}
                                              </div>
                                            </td>
                                            <td>
                                              {(() => {
                                                // Handle different date formats
                                                if (user.createdAt) {
                                                  // Firestore Timestamp
                                                  if (user.createdAt.seconds) {
                                                    return new Date(user.createdAt.seconds * 1000).toLocaleDateString('es-ES');
                                                  }
                                                  // Regular date string
                                                  return new Date(user.createdAt).toLocaleDateString('es-ES');
                                                }
                                                if (user.creationTime) {
                                                  return new Date(user.creationTime).toLocaleDateString('es-ES');
                                                }
                                                if (user.dateCreated) {
                                                  return new Date(user.dateCreated).toLocaleDateString('es-ES');
                                                }
                                                if (user.signupDate) {
                                                  return new Date(user.signupDate).toLocaleDateString('es-ES');
                                                }
                                                return (
                                                  <span className="text-muted">
                                                    <i className="fas fa-calendar-times me-1"></i>
                                                    Fecha no registrada
                                                  </span>
                                                );
                                              })()}
                                            </td>
                                            <td>
                                              {user.disabled ? (
                                                <span className="badge bg-danger">Deshabilitado</span>
                                              ) : (
                                                <span className="badge bg-success">Activo</span>
                                              )}
                                            </td>
                                            <td>
                                              <div className="btn-group" role="group">
                                                <button 
                                                  className="btn btn-outline-info btn-sm"
                                                  title="Ver detalles"
                                                  onClick={() => openViewModal(user)}
                                                >
                                                  <i className="fas fa-eye"></i>
                                                </button>
                                                <button 
                                                  className="btn btn-outline-warning btn-sm"
                                                  title="Editar usuario"
                                                  onClick={() => openEditModal(user)}
                                                >
                                                  <i className="fas fa-edit"></i>
                                                </button>
                                                <button 
                                                  className="btn btn-outline-danger btn-sm"
                                                  title="Eliminar usuario"
                                                  onClick={() => confirmDelete(
                                                    user.id, 
                                                    user.displayName || user.name || user.firstName || 
                                                    (user.email ? user.email.split('@')[0] : 'Usuario')
                                                  )}
                                                >
                                                  <i className="fas fa-trash"></i>
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}

                                <div className="mt-4">
                                  <div className="card bg-light">
                                    <div className="card-body">
                                      <h6><i className="fas fa-info-circle me-2"></i>Información</h6>
                                      <p className="mb-2 small">
                                        Esta lista muestra los usuarios almacenados en la colección "users" de Firestore.
                                        Para gestión completa de usuarios, también puedes acceder a:
                                      </p>
                                      <a 
                                        href="https://console.firebase.google.com/project/ecommerce-flutter-e9282/authentication/users" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-primary btn-sm"
                                      >
                                        <i className="fas fa-external-link-alt me-2"></i>
                                        Firebase Authentication Console
                                      </a>
                                    </div>
                                  </div>
                                </div>

                                {/* Debug Information */}
                                {process.env.NODE_ENV === 'development' && (
                                  <div className="mt-3">
                                    <div className="card border-warning">
                                      <div className="card-header bg-warning text-dark">
                                        <h6 className="mb-0">
                                          <i className="fas fa-bug me-2"></i>
                                          Debug Info (Solo en desarrollo)
                                        </h6>
                                      </div>
                                      <div className="card-body">
                                        <p><strong>Colección:</strong> "users"</p>
                                        <p><strong>Estado de carga:</strong> {loading ? 'Cargando' : 'Completado'}</p>
                                        <p><strong>Error:</strong> {error || 'Ninguno'}</p>
                                        <p><strong>Número de usuarios:</strong> {users.length}</p>
                                        <p><strong>Datos en consola:</strong> Revisa la consola del navegador (F12) para más detalles</p>
                                        <button 
                                          className="btn btn-warning btn-sm"
                                          onClick={() => console.log('Current users state:', users)}
                                        >
                                          Log Users to Console
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>

      {/* View User Modal */}
      {showViewModal && viewingUser && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-user me-2"></i>
                  Detalles del Usuario
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* User Avatar and Basic Info */}
                  <div className="col-md-4 text-center mb-4">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="fas fa-user fa-2x text-white"></i>
                    </div>
                    <h5 className="mb-1">
                      {viewingUser.displayName || viewingUser.name || viewingUser.firstName || 'Sin nombre'}
                    </h5>
                    <p className="text-muted mb-2">{viewingUser.email || 'Sin email'}</p>
                    <span className={`badge ${viewingUser.disabled ? 'bg-danger' : 'bg-success'}`}>
                      {viewingUser.disabled ? 'Deshabilitado' : 'Activo'}
                    </span>
                  </div>

                  {/* User Details */}
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="text-primary mb-3">
                          <i className="fas fa-info-circle me-2"></i>
                          Información Personal
                        </h6>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label text-muted small">NOMBRE PARA MOSTRAR</label>
                        <div className="border rounded p-2 bg-light">
                          {viewingUser.displayName || <em className="text-muted">No especificado</em>}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label text-muted small">NOMBRE</label>
                        <div className="border rounded p-2 bg-light">
                          {viewingUser.name || <em className="text-muted">No especificado</em>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label text-muted small">EMAIL</label>
                        <div className="border rounded p-2 bg-light">
                          {viewingUser.email || <em className="text-muted">No especificado</em>}
                          {viewingUser.emailVerified === true && (
                            <small className="badge bg-success ms-2">Verificado</small>
                          )}
                          {viewingUser.emailVerified === false && (
                            <small className="badge bg-warning text-dark ms-2">No verificado</small>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label text-muted small">ID DE USUARIO</label>
                        <div className="border rounded p-2 bg-light small font-monospace">
                          {viewingUser.id || <em className="text-muted">No disponible</em>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <h6 className="text-primary mb-3 mt-3">
                          <i className="fas fa-calendar me-2"></i>
                          Información de Registro
                        </h6>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label text-muted small">FECHA DE REGISTRO</label>
                        <div className="border rounded p-2 bg-light">
                          {(() => {
                            if (viewingUser.createdAt) {
                              if (viewingUser.createdAt.seconds) {
                                return new Date(viewingUser.createdAt.seconds * 1000).toLocaleString('es-ES');
                              }
                              return new Date(viewingUser.createdAt).toLocaleString('es-ES');
                            }
                            if (viewingUser.creationTime) {
                              return new Date(viewingUser.creationTime).toLocaleString('es-ES');
                            }
                            if (viewingUser.dateCreated) {
                              return new Date(viewingUser.dateCreated).toLocaleString('es-ES');
                            }
                            if (viewingUser.signupDate) {
                              return new Date(viewingUser.signupDate).toLocaleString('es-ES');
                            }
                            return <em className="text-muted">Fecha no registrada</em>;
                          })()}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label text-muted small">ÚLTIMO ACCESO</label>
                        <div className="border rounded p-2 bg-light">
                          {viewingUser.lastLoginAt ? 
                            new Date(viewingUser.lastLoginAt).toLocaleString('es-ES') : 
                            <em className="text-muted">No disponible</em>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Additional Fields */}
                    {Object.keys(viewingUser).some(key => 
                      !['id', 'displayName', 'name', 'email', 'disabled', 'emailVerified', 'createdAt', 'creationTime', 'dateCreated', 'signupDate', 'lastLoginAt', 'uid'].includes(key)
                    ) && (
                      <>
                        <div className="row">
                          <div className="col-12">
                            <h6 className="text-primary mb-3 mt-3">
                              <i className="fas fa-plus-circle me-2"></i>
                              Campos Adicionales
                            </h6>
                          </div>
                        </div>
                        <div className="row">
                          {Object.entries(viewingUser)
                            .filter(([key]) => !['id', 'displayName', 'name', 'email', 'disabled', 'emailVerified', 'createdAt', 'creationTime', 'dateCreated', 'signupDate', 'lastLoginAt', 'uid'].includes(key))
                            .map(([key, value]) => (
                              <div className="col-sm-6 mb-3" key={key}>
                                <label className="form-label text-muted small">{key.toUpperCase()}</label>
                                <div className="border rounded p-2 bg-light">
                                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  <i className="fas fa-times me-2"></i>
                  Cerrar
                </button>
                <button 
                  type="button" 
                  className="btn btn-warning"
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(viewingUser);
                  }}
                >
                  <i className="fas fa-edit me-2"></i>
                  Editar Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-edit me-2"></i>
                  Editar Usuario
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre para mostrar</label>
                    <input
                      type="text"
                      className="form-control"
                      name="displayName"
                      value={editForm.displayName}
                      onChange={handleEditFormChange}
                      placeholder="Nombre completo del usuario"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditFormChange}
                      placeholder="Nombre del usuario"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditFormChange}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="disabledCheck"
                      name="disabled"
                      checked={editForm.disabled}
                      onChange={handleEditFormChange}
                    />
                    <label className="form-check-label" htmlFor="disabledCheck">
                      Usuario deshabilitado
                    </label>
                  </div>

                  <div className="alert alert-info" role="alert">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Nota:</strong> Los cambios se aplicarán solo a los datos almacenados en Firestore. 
                    Para cambios en la autenticación (email/contraseña), usa Firebase Authentication Console.
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={updateUser}
                >
                  <i className="fas fa-save me-2"></i>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Clientes;