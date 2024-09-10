import logo from "./logo.svg";
import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import CheckoutPage from "./pages/CheckoutPage";

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
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
