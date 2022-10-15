import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import { deleteShippingAddress } from "features/cartSlice";
import logo from "../logo/logo.png";

const Header = ({ setSidebarOpenHandler }) => {
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
//  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const onLogout = () => {
    dispatch(deleteShippingAddress(shippingAddress));
    dispatch(logout());
    dispatch(reset());
	window.location.href = '/signin'
  };

  return (
    <Navbar className="navbar-color" variant="dark" expand="lg">
      <Container>
        <Button onClick={setSidebarOpenHandler}>
          <i className="fas fa-bars"></i>
        </Button>
        <LinkContainer to="/" className="navbar-text-color">
          <Navbar.Brand>
            <img
              src={logo}
              width="50"
              height="50"
              className=""
              alt="Brand logo"
            />
            {"  "}
            Coffees
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto  w-100  justify-content-end">
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="primary">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {user ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={onLogout}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
            {user && user.isAdmin && (
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
