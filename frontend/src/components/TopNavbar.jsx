// src/components/TopNavbar.jsx
const TopNavbar = () => {
  return (
    <div className="flex justify-between items-center bg-blue-500 px-6 py-3 text-white shadow-md">
      <div>
        <h1 className="font-bold text-lg">John Andre</h1>
        <p className="text-sm opacity-80">Storfjord AS</p>
      </div>

      {/* ✅ Google Translate Dropdown goes here */}
      <div id="google_translate_element" className="text-black bg-white px-2 py-1 rounded"></div>
    </div>
  );
};

export default TopNavbar;

