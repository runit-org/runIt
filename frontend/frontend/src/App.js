import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Posts from "./components/Posts";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  console.log("this", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />

          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Header />
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
