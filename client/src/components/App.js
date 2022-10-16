import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import { Container, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cart from "pages/Cart";
import Signin from "pages/Signin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Shipping from "pages/Shipping";
import Signup from "pages/Signup";
import ProfilePage from "pages/ProfilePage";
import axios from "axios";
import { getError } from "../utils";
import SearchScreen from "pages/SearchPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "pages/AdminDashboard";
import AdminRoute from "./AdminRoute";
import AdminProductList from "pages/AdminProductList";
import SingleProductPage from "pages/SingleProductPage";
import AdminProductEdit from "pages/AdminProductEdit";
import UserLists from "pages/UserLists";
import UserEdit from "pages/UserEdit";
import Payment from "pages/Payment";
import PlaceOrder from "pages/PlaceOrder";
import OrderPageUser from "pages/OrderPageUser";
import OrderHistory from "pages/OrderHistory";
import SearchBox from "./SearchBox";
import AdminOrderList from "pages/AdminOrderList";

const App = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const setSidebarOpenHandler = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/v1/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <header>
          <Header setSidebarOpenHandler={setSidebarOpenHandler} />
        </header>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <Nav.Link
                  href={"/search?category=" + category}
                  onClick={() => setSidebarIsOpen(false)}
                  className="navbar-text-color"
                >
                  {category}
                </Nav.Link>
              </Nav.Item>
            ))}
            <SearchBox />
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<SingleProductPage />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/order/:id" element={<OrderPageUser />}></Route>
              <Route path="/orderhistory" element={<OrderHistory />}></Route>
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<SearchScreen />} />
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserLists />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <AdminOrderList />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProductList />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <AdminProductEdit />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEdit />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">
            All rights reserved &copy; Metin Gerçek
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};
export default App;
