import { useDispatch } from "react-redux";
import CreateShipping from "./components/createShipping/CreateShipping";
import { useContext, useEffect } from "react";
import { fetchShipping } from "./redux/ShippingSlice";
import ShippingTable from "./page/shippingTable/ShippingTable";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { fetchUsers } from "./redux/usersSlice";
import Login from "./page/login/Login";
import { AuthContext } from "./context/AuthContext";
import Page from "./components/pageA4/Page";
import ProgressSent from "./components/ProgressSent/ProgressSent";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchShipping());
    dispatch(fetchUsers());
  }, []);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            index
            element={
              <ProtectedRoute>
                <ShippingTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <CreateShipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shippingDocument"
            element={
              <ProtectedRoute>
                <Page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/beingsent"
            element={
              <ProtectedRoute>
                <ProgressSent />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
