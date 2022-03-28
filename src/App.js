import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test/test";
// import Footer from "./layout/footer";
// import Header from './layout/header'
import CalendarHome from "./views/calendarHome";
import Home from "./views/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {/* <Header /> */}
          <div className="body">
            <Routes>
              <Route path="/" element={<CalendarHome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/test" element={<Test />} />
              {/* <Route path="/form" element={<BasicMenu />} /> */}
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
