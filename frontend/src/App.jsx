import { Routes, Route } from 'react-router-dom';

import TermsandCondition from './components/TermsandCondidtion';

import PriceList from './components/PriceList';


const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<TermsandCondition />} />
        <Route path="/pricelist" element={<PriceList/>} /> {/* ✅ Add this */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </>
  );
};

export default App;
