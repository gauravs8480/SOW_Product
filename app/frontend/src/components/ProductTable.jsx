import React, { useState } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltDown } from 'react-icons/fa';

const ProductTable = ({ products, onSelectProduct, onAddProduct }) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  return (
    <table className="table-auto text-sm text-center bg-white rounded shadow-md w-full">
      <thead className="bg-blue-100 text-gray-700 sticky top-0 z-10">
        <tr>
          <th className="pe-4 px-2 py-2 hidden lg:table-cell">
            <div className="flex items-center justify-start">
              <span>Article No</span>
              <FaLongArrowAltDown className="ms-1" />
            </div>
          </th>
          <th className="px-4 py-2">
            <div className="flex items-center justify-center">
              <span>Product/Service</span>
              <FaLongArrowAltDown className="ms-1" />
            </div>
          </th>
          <th className="px-4 py-2 hidden md:table-cell">In Price</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2 hidden lg:table-cell">Unit</th>
          <th className="px-4 py-2 hidden lg:table-cell">In Stock</th>
          <th className="px-4 py-2 hidden xl:table-cell">Description</th>
          <th className="px-4 py-2">
            <span className="text-blue-500 font-bold cursor-pointer" onClick={onAddProduct}>+</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index} className="hover:bg-blue-50 group">
            <td className="pe-4 px-2 py-2 hidden lg:table-cell align-middle">
              <div className="flex items-center gap-2 justify-start">
                <FaLongArrowAltRight className="hidden group-hover:block text-green-500" />
                {product.article_no || '-'}
              </div>
            </td>
            <td className="px-4 py-2 align-middle">{product.name || '-'}</td>
            <td className="px-4 py-2 hidden md:table-cell align-middle">{product.in_price || '-'}</td>
            <td className="px-4 py-2 align-middle">{product.price || '-'}</td>
            <td className="px-4 py-2 hidden lg:table-cell align-middle">{product.unit || '-'}</td>
            <td className="px-4 py-2 hidden lg:table-cell align-middle">{product.stock || '-'}</td>
            <td className="px-4 py-2 hidden xl:table-cell align-middle">{product.description || '-'}</td>
            <td className="px-4 py-2 relative align-middle">
              <span
                className="text-blue-500 font-bold cursor-pointer"
                onClick={() =>
                  setActiveMenuIndex(activeMenuIndex === index ? null : index)
                }
              >
                &#8942;
              </span>
              {activeMenuIndex === index && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10 text-left">
                  <button
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      onSelectProduct(product);
                      setActiveMenuIndex(null);
                    }}
                  >
                    👁 View
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
