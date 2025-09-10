import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwiperVerticalRouter from "./swiper-router"

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        {/* 使用通配符匹配所有路径 */}
        <Route path="*" element={<SwiperVerticalRouter />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

