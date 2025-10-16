import { Routes, Route } from "react-router-dom";
import ITRReturn from "../services/ITRReturn";
import CompanyRegistration from "../services/CompanyRegistration";
import ImportPage from "../services/Import";
import ExportPage from "../services/Export";
import Ecommerce from "../services/E-commerce";
import Finance from "../services/Finance";
import GSTRegistration from "../services/gst";
import Msme from "../services/msme";
import Consultancy from "../services/Consultancy";
import Manpower from "../services/Manpower";
import Customs from "../services/CustomsPage"

const Service = () => {
  return (
    <div className="min-h-screen ">
    <Routes>
      <Route path="itr-return" element={<ITRReturn />} />
      <Route path="company" element={<CompanyRegistration />} />
      <Route path="import" element={<ImportPage />} />
      <Route path="export" element={<ExportPage />} />
      <Route path="ecommerce" element={<Ecommerce />} />
      <Route path="finance" element={<Finance />} />
      <Route path="gst" element={<GSTRegistration />} /> {/* ✅ here */}
      <Route path="msme" element={<Msme />} /> {/* ✅ here */}
      <Route path="consultancy" element={<Consultancy />} />
      <Route path="manpower" element={<Manpower />} />
      <Route path="customs" element={<Customs/>}/>
    </Routes>
  </div>
  );
};

export default Service;
