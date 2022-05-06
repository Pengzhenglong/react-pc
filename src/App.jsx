import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HistoryRouter, history } from "./utils/history";
import Login from "@/pages/Login/index.jsx";
import GeekLayout from "@/pages/Layout/index.jsx";
import { AuthComponent } from "./components/AuthComponents";
import Article from "@/pages/Article/index.jsx";
import Home from "@/pages/Home/index.jsx";
import Publish from "@/pages/Publish/index.jsx";
function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/* 需要鉴权的路由 */}
          <Route
            path="/"
            element={
              <AuthComponent>
                <GeekLayout />
              </AuthComponent>
            }
          >
            {/* 二级路由默认页面 */}
            {/* index 索引路由 */}
            <Route index element={<Home />} />
            <Route path="/article" element={<Article />} />
            <Route path="/publish" element={<Publish />} />
          </Route>
          {/* 不需要鉴权的路由 */}
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
