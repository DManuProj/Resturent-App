import logo from "./logo.svg";
import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import CheckoutPage from "./pages/CheckoutPage";
import QueryPage from "./pages/QuaryPage";
import ReservationPage from "./pages/ReservationPage";
import ProfilePage from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import MealsManagement from "./pages/dashboard/MealsManagement";
import QueryManagement from "./pages/dashboard/QueryManagement";
import OfferManagement from "./pages/dashboard/OfferManagement";
import UserManagment from "./pages/dashboard/UserManagment";
import OrderManagement from "./pages/dashboard/OrderManagement";
import ReservationManagement from "./pages/dashboard/ReservationManagement";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomeLayout>
          <HomePage />
        </HomeLayout>
      ),
    },
    {
      path: "/log-in",
      element: <LoginPage />,
    },
    {
      path: "/sign-up",
      element: <SignInPage />,
    },
    {
      path: "/menu",
      element: <MenuPage />,
    },
    {
      path: "/checkout",
      element: <CheckoutPage />,
    },
    {
      path: "/make-query",
      element: <QueryPage />,
    },
    {
      path: "/reservation",
      element: <ReservationPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/my-orders",
      element: <MyOrders />,
    },
    {
      path: "/dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/dashboard",
      element: <AdminDashboard />,
      children: [
        {
          path: "/dashboard",
          element: <Navigate to="all-orders" replace />,
          // errorElement: <PageNotFound />,
        },

        {
          path: "all-orders",
          element: <OrderManagement />,
        },
        {
          path: "queries",
          element: <QueryManagement />,
        },
        {
          path: "offers",
          element: <OfferManagement />,
        },
        {
          path: "users",
          element: <UserManagment />,
        },

        {
          path: "meals",
          element: <MealsManagement />,
        },
        {
          path: "reservation",
          element: <ReservationManagement />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
