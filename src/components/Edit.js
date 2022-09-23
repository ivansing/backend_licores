import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Edit = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const product = doc(db, "products", id);
    const data = {
      name: name,
      category: category,
      price: price,
      imageUrl: imageUrl,
    };
    await updateDoc(product, data);
    navigate("/");
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "products", id));
    if (product.exists()) {
      //console.log(product.data())
      setName(product.data().name);
      setCategory(product.data().category);
      setPrice(product.data().price);
      setImageUrl(product.data().imageUrl);
    } else {
      console.log("El producto no existe");
    }
  };

  useEffect(() => {
    getProductById(id);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Edit Product</h1>
          <form onSubmit={update}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Categoria</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">URL Imagen</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
