// src/components/PriceList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import TopNavbar from './TopNavbar';
import ProductTable from './ProductTable';
import { translateText } from '../utils/translate';

const PriceList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleSearch, setArticleSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/api/products')
      .then(async res => {
        const data = res.data;

        if (language === 'sv') {
          const translated = await Promise.all(data.map(async (p) => {
            const name = await translateText(p.name, 'sv');
            const desc = await translateText(p.description || '', 'sv');
            return { ...p, name, description: desc };
          }));
          setProducts(translated);
          setFilteredProducts(translated);
        } else {
          setProducts(data);
          setFilteredProducts(data);
        }
      })
      .catch(err => {
        console.error('Failed to load products', err);
        setError('Failed to load products');
      })
      .finally(() => setLoading(false));
  }, [language]);

  useEffect(() => {
    const filtered = products.filter(p =>
      p.article_no?.toLowerCase().includes(articleSearch.toLowerCase()) &&
      p.name?.toLowerCase().includes(productSearch.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [articleSearch, productSearch, products]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      article_no: form[0].value,
      name: form[1].value,
      in_price: form[2].value,
      price: form[3].value,
      unit: form[4].value,
      stock: form[5].value,
      description: form[6].value,
    };

    try {
      const res = await axios.post('http://127.0.0.1:3001/api/products', newProduct);
      setProducts(prev => [...prev, res.data]);
      setFilteredProducts(prev => [...prev, res.data]);
      setShowAddProduct(false);
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://127.0.0.1:3001/api/products/${selectedProduct.id}`);
      const updated = products.filter(p => p.id !== selectedProduct.id);
      setProducts(updated);
      setFilteredProducts(updated);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProduct = {
      article_no: form[0].value,
      name: form[1].value,
      in_price: form[2].value,
      price: form[3].value,
      unit: form[4].value,
      stock: form[5].value,
      description: form[6].value,
    };

    try {
      const res = await axios.put(`http://127.0.0.1:3001/api/products/${selectedProduct.id}`, updatedProduct);
      const updatedList = products.map(p => p.id === res.data.id ? res.data : p);
      setProducts(updatedList);
      setFilteredProducts(updatedList);
      setEditMode(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Failed to update product', err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopNavbar />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <nav className="p-4">
            <ul className="space-y-2 text-sm font-medium">
              <li className="text-blue-600 font-semibold">Price List</li>
              <li className="text-gray-600">Invoices</li>
              <li className="text-gray-600">Customers</li>
              <li className="text-gray-600">Invoice Journal</li>
              <li className="text-gray-600">Multiple Invoicing</li>
              <li className="text-gray-600">Unpaid Invoices</li>
              <li className="text-gray-600">Offer</li>
              <li className="text-gray-400">Inventory Control</li>
              <li className="text-gray-400">Member Invoicing</li>
              <li className="text-gray-600">Import/Export</li>
              <li className="text-red-500">Log out</li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 px-6 py-4 overflow-auto">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Search Article No ..."
                className="border rounded px-3 py-1 text-sm w-60"
                value={articleSearch}
                onChange={e => setArticleSearch(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search Product ..."
                className="border rounded px-3 py-1 text-sm w-60"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
              />
            </div>
          </div>

          <ProductTable
            products={filteredProducts}
            onSelectProduct={setSelectedProduct}
            onAddProduct={() => {
              setEditMode(false);
              setShowAddProduct(true);
            }}
          />

          {selectedProduct && !editMode && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                <ul className="text-sm space-y-2">
                  <li><strong>Article No:</strong> {selectedProduct.article_no}</li>
                  <li><strong>Product Name:</strong> {selectedProduct.name}</li>
                  <li><strong>In Price:</strong> {selectedProduct.in_price}</li>
                  <li><strong>Price:</strong> {selectedProduct.price}</li>
                  <li><strong>Unit:</strong> {selectedProduct.unit}</li>
                  <li><strong>In Stock:</strong> {selectedProduct.stock}</li>
                  <li><strong>Description:</strong> {selectedProduct.description}</li>
                </ul>
                <div className="mt-4 flex justify-between">
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => setEditMode(true)}>Edit</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDeleteProduct}>Delete</button>
                  <button className="px-4 py-2 bg-gray-300 text-black rounded" onClick={() => setSelectedProduct(null)}>Close</button>
                </div>
              </div>
            </div>
          )}

          {(showAddProduct || editMode) && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={editMode ? handleEditProduct : handleAddProduct}>
                  <div className="space-y-3">
                    <input type="text" placeholder="Article No" defaultValue={selectedProduct?.article_no || ''} required className="border rounded px-3 py-1 w-full" />
                    <input type="text" placeholder="Product Name" defaultValue={selectedProduct?.name || ''} required className="border rounded px-3 py-1 w-full" />
                    <input type="number" placeholder="In Price" defaultValue={selectedProduct?.in_price || ''} required className="border rounded px-3 py-1 w-full" />
                    <input type="number" placeholder="Price" defaultValue={selectedProduct?.price || ''} required className="border rounded px-3 py-1 w-full" />
                    <input type="text" placeholder="Unit" defaultValue={selectedProduct?.unit || ''} required className="border rounded px-3 py-1 w-full" />
                    <input type="number" placeholder="In Stock" defaultValue={selectedProduct?.stock || ''} required className="border rounded px-3 py-1 w-full" />
                    <textarea placeholder="Description" defaultValue={selectedProduct?.description || ''} className="border rounded px-3 py-1 w-full" />
                  </div>
                  <div className="mt-4 text-right">
                    <button type="button" className="px-4 py-2 bg-gray-300 text-black rounded mr-2" onClick={() => { setShowAddProduct(false); setEditMode(false); setSelectedProduct(null); }}>Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{editMode ? 'Update' : 'Add Product'}</button>
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
