import React from 'react'
import { FaFileInvoice } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoMdPricetag } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
const SideBar = () => {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block  ">
    <nav className="px-4 ">
      <h1 className="text-3xl text-center">Menu</h1>
      <hr className="p-[3px] my-4 bg-blue-500 border-0" />

      <ul className="space-y-5 text-sm font-medium mt-6 ">
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <FaFileInvoice className="mr-2" />
            <span>Invoices</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <IoPersonSharp className="mr-2" />
            <span>Customers</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <CiSettings className="mr-2" />
            <span>My Business</span>
          </a>
        </li>

        <li>
          <a
            href="#"
            className="flex items-center text-blue-600 font-semibold"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <IoMdPricetag className="mr-2" />
            <span>Price List</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <FaFileInvoice className="mr-2" />
            <span>Invoice Journal</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <FaFileInvoice className="mr-2" />
            <span>Multiple Invoicing</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <FaFileInvoice className="mr-2" />
            <span>Unpaid Invoices</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <BiSolidOffer className="mr-2" />
            <span>Offer</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center text-gray-600">
            <FaFileInvoice className="mr-2" />
            <span>Inventory Control</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center text-gray-600">
            <FaFileInvoice className="mr-2" />
            <span>Member Invoicing</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <FaCloudDownloadAlt className="mr-2" />
            <span>Import/Export</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-red-500 hover:text-red-600"
          >
            <CiLogout className="mr-2" />
            <span>Log out</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
  )
}

export default SideBar