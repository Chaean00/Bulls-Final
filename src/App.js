import "./App.css";

import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Inquiry } from "./pages/Inquiry";
import { TeamRegistration } from "./pages/TeamRegistration";
import { Footer } from "./components/Footer";
import { MatchRegistration } from "./pages/MatchRegistration";
import {User} from "./pages/User";

function App() {
  return (
      <>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/inquiry" element={<Inquiry />}></Route>
                  <Route
                      path="/teamregistration"
                      element={<TeamRegistration />}
                  ></Route>
                  <Route
                      path="/matchregistration"
                      element={<MatchRegistration />}
                  ></Route>
                  <Route path="/user/info" element={<User />}></Route>
              </Routes>
              <Footer />
          </BrowserRouter>
      </>
  );
}

export default App;
