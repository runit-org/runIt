import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Posts from "./components/Posts";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="posts"
            element={
              <div className="content">
                <Header />
                <Posts />
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
