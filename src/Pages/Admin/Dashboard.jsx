import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    id: "",
    price: "",
    stock: "",
    type: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const deleteAlert = (product) => {
    Swal.fire({
      title: `Are you sure you want to delete ${product.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        handleDelete(products.indexOf(product));
      }
    });
  };

  const statusColors = {
    Pending: "badge bg-warning",
    Active: "badge bg-success",
    Inactive: "badge bg-danger",
    "On Sale": "badge bg-primary",
    Bouncing: "badge bg-info",
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      const fetchedProducts = response.data.data.map((product) => {
        const nameParts = product.title.split(" ").slice(0, 2).join(" ");
        return {
          name: nameParts,
          id: product._id,
          price: `EGP ${product.priceAfterDiscount || product.price}`,
          stock: `${product.quantity || "N/A"} pcs`,
          type: product.category.name,
          status: "Active",
        };
      });
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddOrUpdateProduct = () => {
    if (Object.values(newProduct).some((field) => field === "")) return;
    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
    } else {
      setProducts([newProduct, ...products]);
    }
    setShowModal(false);
    setNewProduct({
      name: "",
      id: "",
      price: "",
      stock: "",
      type: "",
      status: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
      }}
    >
      <div className="row d-flex align-items-center justify-content-between gap-3 mb-5">
        <input
          className="col-12 col-sm-6"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: "20px",
            border: "1px solid #ccc",
            padding: "10px 16px",
            backgroundColor: "white",
          }}
        />
        <div className="col-12 col-sm-3">
          <button
            className="btn w-100"
            style={{ backgroundColor: "#651214ff", color: "#efefefff" }}
            onClick={() => setShowModal(true)}
          >
            Add Product
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h4
            style={{ margin: 0, color: "rgb(101, 18, 20)", fontWeight: "bold" }}
          >
            Products
          </h4>
        </div>

        <div style={{ overflowX: "auto", width: "100%" }}>
          <table className="table table-striped" style={{ minWidth: "1000px" }}>
            <thead>
              <tr>
                <th style={{ color: "rgb(101, 18, 20)" }}>Product Name</th>
                <th style={{ color: "rgb(101, 18, 20)" }}>Product ID</th>
                <th style={{ color: "rgb(101, 18, 20)" }}>Price</th>
                <th style={{ color: "rgb(101, 18, 20)" }}>Stock</th>
                <th style={{ color: "rgb(101, 18, 20)" }}>Type</th>
                <th style={{ color: "rgb(101, 18, 20)" }}>Status</th>
                <th style={{ color: "rgb(101, 18, 20)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.name}</td>
                  <td>{p.id}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>{p.type}</td>
                  <td>
                    <span
                      className={statusColors[p.status] || "badge bg-secondary"}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="d-flex align-items-center">
                    <button
                      className="btn btn-sm me-2"
                      style={{
                        backgroundColor: "rgb(89, 92, 95)",
                        color: "#efefefff",
                      }}
                      onClick={() => handleEdit(idx)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#651214ff",
                        color: "#efefefff",
                      }}
                      onClick={() => deleteAlert(p)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "450px",
              boxShadow: "5px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h5 className="mb-4">
              {editIndex !== null ? "Update Product" : "Add New Product"}
            </h5>
            <input
              className="form-control mb-3"
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            <input
              className="form-control mb-3"
              type="text"
              name="id"
              placeholder="Product ID"
              value={newProduct.id}
              onChange={handleInputChange}
            />
            <input
              className="form-control mb-3"
              type="text"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <input
              className="form-control mb-3"
              type="text"
              name="stock"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={handleInputChange}
            />
            <input
              className="form-control mb-3"
              type="text"
              name="type"
              placeholder="Type"
              value={newProduct.type}
              onChange={handleInputChange}
            />
            <select
              className="form-control mb-4"
              name="status"
              value={newProduct.status}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Sale">On Sale</option>
              <option value="Bouncing">Bouncing</option>
            </select>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => {
                  setShowModal(false);
                  setEditIndex(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddOrUpdateProduct}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
