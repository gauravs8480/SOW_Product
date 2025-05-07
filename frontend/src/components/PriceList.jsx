// src/components/PriceList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
import TopNavbar from "./TopNavbar";
import ProductTable from "./ProductTable";
import { translateText } from "../utils/translate";
import SideBar from "./SideBar";
import { FaTrash } from "react-icons/fa";

// ✅ Directly using your API URL
const API_URL = "https://sowbackend-production.up.railway.app/api/products";

const PriceList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleSearch, setArticleSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { language } = useLanguage();

  // ✅ Load Products on Mount
  useEffect(() => {
    loadProducts();
  }, [language]);

  // ✅ Fetch Products Function
  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search Products
  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.article_no?.toLowerCase().includes(articleSearch.toLowerCase()) &&
        p.name?.toLowerCase().includes(productSearch.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [articleSearch, productSearch, products]);

  // ✅ Add or Edit Product
  const handleAddEditProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productData = {
      article_no: form.article_no.value,
      name: form.name.value,
      in_price: Math.max(0, parseFloat(form.in_price.value)),
      price: Math.max(0, parseFloat(form.price.value)),
      unit: form.unit.value,
      stock: Math.max(0, parseInt(form.stock.value)),
      description: form.description.value,
    };

    try {
      if (editMode) {
        const res = await axios.put(`${API_URL}/${selectedProduct.id}`, productData);
        const updatedList = products.map((p) =>
          p.id === res.data.id ? res.data : p
        );
        setProducts(updatedList);
        setFilteredProducts(updatedList);
      } else {
        const res = await axios.post(API_URL, productData);
        setProducts((prev) => [...prev, res.data]);
        setFilteredProducts((prev) => [...prev, res.data]);
      }

      setShowForm(false);
      setSelectedProduct(null);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to save product", err);
      alert("Failed to save product");
    }
  };

  // ✅ Delete Product Directly in Edit Form
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedProduct.name}?`)) return;

    try {
      await axios.delete(`${API_URL}/${selectedProduct.id}`);
      const updated = products.filter((p) => p.id !== selectedProduct.id);
      setProducts(updated);
      setFilteredProducts(updated);
      setShowForm(false);
      setSelectedProduct(null);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Failed to delete product");
    }
  };

  // ✅ Close Form
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 px-6 py-4 overflow-auto">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search Article No ..."
                className="border rounded px-3 py-1 text-sm"
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search Product ..."
                className="border rounded px-3 py-1 text-sm"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setShowForm(true);
                setEditMode(false);
                setSelectedProduct(null);
              }}
            >
              + Add Product
            </button>
          </div>

          <ProductTable
            products={filteredProducts}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              setShowForm(true);
              setEditMode(true);
            }}
          />

          {/* Add/Edit Form */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  {editMode ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={handleAddEditProduct} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input name="article_no" placeholder="Article No" defaultValue={selectedProduct?.article_no || ""} required className="w-full border px-3 py-2" />
                    <input name="name" placeholder="Product Name" defaultValue={selectedProduct?.name || ""} required className="w-full border px-3 py-2" />
                    <input name="in_price" type="number" min="0" placeholder="In Price" defaultValue={Math.max(0, selectedProduct?.in_price || 0)} required className="w-full border px-3 py-2" />
                    <input name="price" type="number" min="0" placeholder="Price" defaultValue={Math.max(0, selectedProduct?.price || 0)} required className="w-full border px-3 py-2" />
                    <input name="unit" placeholder="Unit" defaultValue={selectedProduct?.unit || ""} required className="w-full border px-3 py-2" />
                    <input name="stock" type="number" min="0" placeholder="Stock" defaultValue={Math.max(0, selectedProduct?.stock || 0)} required className="w-full border px-3 py-2" />
                  </div>
                  <textarea name="description" placeholder="Description" defaultValue={selectedProduct?.description || ""} className="w-full border px-3 py-2 mt-2"></textarea>
                  <div className="mt-4 flex justify-end gap-3">
                    {editMode && (
                      <button type="button" className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDeleteProduct}>
                        <FaTrash /> Delete
                      </button>
                    )}
                    <button type="button" className="px-4 py-2 bg-gray-300 text-black rounded" onClick={handleCloseForm}>Close</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{editMode ? "Update Product" : "Add Product"}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PriceList;
