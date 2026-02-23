import { RootLayout } from "layout";
import { ErrorPage } from "page";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    index: true,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
  },
]);
