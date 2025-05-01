import React, { useState } from 'react';

const ProductTable = ({ products, onSelectProduct, onAddProduct }) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  return (
    <table className="table-auto text-sm text-center bg-white border border-gray-200 rounded shadow-md w-full">
      <thead className="bg-blue-100 text-gray-700 sticky top-0 z-10">
        <tr>
          <th className="px-4 py-2 hidden lg:table-cell">Article No</th>
          <th className="px-4 py-2">Product/Service</th>
          <th className="px-4 py-2 hidden md:table-cell">In Price</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2 hidden lg:table-cell">Unit</th>
          <th className="px-4 py-2 hidden lg:table-cell">In Stock</th>
          <th className="px-4 py-2 hidden xl:table-cell">Description</th>
          <th className="px-4 py-2">
            <span
              className="text-blue-500 font-bold cursor-pointer"
              onClick={onAddProduct}
            >
              +
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index} className="border-t hover:bg-blue-50 relative">
            <td className="px-4 py-2 hidden lg:table-cell">{product.article_no || '-'}</td>
            <td className="px-4 py-2">{product.name || '-'}</td>
            <td className="px-4 py-2 hidden md:table-cell">{product.in_price || '-'}</td>
            <td className="px-4 py-2">{product.price || '-'}</td>
            <td className="px-4 py-2 hidden lg:table-cell">{product.unit || '-'}</td>
            <td className="px-4 py-2 hidden lg:table-cell">{product.stock || '-'}</td>
            <td className="px-4 py-2 hidden xl:table-cell">{product.description || '-'}</td>
            <td className="px-4 py-2 relative">
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
