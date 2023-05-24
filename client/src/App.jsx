import "./styles/App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import RootLayout from "@/layouts/rootLayout";
import ProductLayout from "@/layouts/productLayout";
import InvoiceLayout from "@/layouts/invoiceLayout";

import Dashboard from "@/pages/dashboard";
import ProductList from "@/pages/product/product";
import ProductDetails, { ProductDetailsLoader } from "@/pages/product/details";
import AddProduct from "@/pages/add-product";
import Invoice from "@/pages/invoice/invoice";
import CreateInvoice from "@/pages/invoice/createInvoice";
import Profile from "@/pages/profile";
import Login from "@/pages/login";
import NotFound from "@/pages/notFound";
import Register from "@/pages/register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="product" element={<ProductLayout />}>
          <Route index element={<ProductList />} />
          <Route
            path="details/:pid"
            element={<ProductDetails />}
            loader={ProductDetailsLoader}
          />
        </Route>

        <Route element={<InvoiceLayout />}>
          <Route path="invoice" element={<Invoice />} />
          <Route path="create_invoice" element={<CreateInvoice />} />
        </Route>

        <Route path="profile" element={<Profile />} />
        <Route path="add-product" element={<AddProduct />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
