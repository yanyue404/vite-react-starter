import Home from "@/pages/Home/home";
import NotFound from "@/pages/NotFound/notFound";
import { useRoutes } from "react-router-dom";
const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};
export default Router;
