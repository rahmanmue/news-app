import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import News from "./components/News/News";
import HistoryNews from "./components/HistoryNews/HistoryNews";

const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <News />,
      },
      {
        path: "history",
        element: <HistoryNews />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
