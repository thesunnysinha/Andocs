// Import necessary dependencies
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";

// Lazy-loaded components for code splitting
const Home = lazy(() => import("./components/Home/Home"));
const LoginSignup = lazy(() => import("./components/Auth/LoginSignup"));
const Aboutus = lazy(() => import("./components/AboutUs/Aboutus"));
const Contactus = lazy(() => import("./components/ContactUs/Contactus"));
const Services = lazy(() => import("./components/Services/Services"));
const Team = lazy(() => import("./components/AboutUs/Team"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const SendPasswordResetEmail = lazy(() =>
  import("./components/Auth/SendPasswordResetEmail")
);
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"));
const Address = lazy(() => import("./components/Address/Address"));
const VerifyAccount = lazy(() => import("./components/Auth/VerifyAccount"));
const ProductDetail = lazy(() =>
  import("./components/ProductDetail/ProductDetail")
);
const Wishlist = lazy(() => import("./components/Wishlist/Wishlist"));
const Orders = lazy(() => import("./components/Orders/Orders"));
const ChangePassword = lazy(() => import("./components/Auth/ChangePassword"));
const Cosmetics = lazy(() =>
  import("./components/Products/Cosmetics/Cosmetics")
);

// PrivateRoute component for handling private routes
const PrivateRoute = ({ element }) => {
  const { access_token } = useSelector((state) => state.auth);

  return access_token ? element : <Navigate to="/login" />;
};

// ErrorBoundary component for error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginSignup />} />
              <Route path="products" element={<Cosmetics />} />
              <Route path="aboutus" element={<Aboutus />} />
              <Route path="contactus" element={<Contactus />} />
              <Route path="team" element={<Team />} />
              <Route path="services" element={<Services />} />
              <Route path="verify_account" element={<VerifyAccount />} />
              <Route
                path="profile"
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route
                path="cart"
                element={<PrivateRoute element={<Cart />} />}
              />
              <Route
                path="wishlist"
                element={<PrivateRoute element={<Wishlist />} />}
              />
              <Route path="orders" element={<Orders />} />
              <Route path="address" element={<Address />} />
              <Route path="change_password" element={<ChangePassword />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="comments/:id" element={<ProductDetail />} />
              <Route
                path="sendpasswordresetemail"
                element={<SendPasswordResetEmail />}
              />
              <Route
                path="api/user/reset-password/:id/:token"
                element={<ResetPassword />}
              />
            </Route>
            <Route path="*" element={<h1>Error 404 Page Not Found !!</h1>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
