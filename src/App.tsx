import { Route, Routes } from "react-router-dom";
import Header from "./Layout/Header/Header";
import HomePage from "./screens/HomePage/HomePage";
import LoanPage from "./screens/LoanPage/LoanPage";
import NotFoundPage from "./screens/NotFoundPage/NotFoundPage";
import Footer from "./Layout/Footer/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loan" element={<LoanPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
