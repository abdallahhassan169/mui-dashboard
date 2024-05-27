import Dashboard from "layouts/dashboard";

import Users from "./layouts/MainData/Users/Users";
import Products from "./layouts/MainData/Products/Products";
import Campagines from "./layouts/MainData/Campagines/Campagines";
import ViewCampagine from "./layouts/MainData/Campagines/ViewCampagine";
import ViewProduct from "../src/layouts/MainData/Products/ProductDetails";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Orders from "../src/layouts/MainData/Orders/Orders";
import ViewOrder from "../src/layouts/MainData/Orders/OrdersDetails";
import AppSlider from "../src/layouts/MainData/AppSlider/AppSlider";
import {
  Category,
  Image,
  Person,
  ProductionQuantityLimits,
} from "@mui/icons-material";
const routes = [
  {
    type: "collapse",
    name: "dashboard",
    key: "dashboard",
    icon: <DashboardIcon fontSize="small"> </DashboardIcon>,
    route: "/dashboard",
    component: <Dashboard />,
    showInNav: true,
  },
  {
    type: "divider",
    key: "divider",
  },

  {
    type: "collapse",
    name: "Campagines",
    key: "Campagines",
    icon: <Category fontSize="small"> </Category>,
    route: "/Campagines",
    component: <Campagines />,
    showInNav: true,
  },

  {
    type: "collapse",
    name: "CampaginesView",
    key: "CampaginesView",
    icon: <Category fontSize="small"> </Category>,
    route: "/CampaginesView/:id",
    component: <ViewCampagine />,
  },
  {
    type: "collapse",
    name: "CampaginesView",
    key: "CampaginesView",
    icon: <Category fontSize="small"> </Category>,
    route: "/productsView/:id",
    component: <ViewProduct />,
  },
  {
    type: "collapse",
    name: "OrderView",
    key: "CampaginesView",
    icon: <Category fontSize="small"> </Category>,
    route: "/orderView/:id",
    component: <ViewOrder />,
  },
  {
    type: "divider",
    key: "divider",
  },
  {
    type: "title",
    key: "title",
    title: "products",
  },
  {
    type: "collapse",
    name: "products",
    key: "products",
    icon: (
      <ProductionQuantityLimits fontSize="small"> </ProductionQuantityLimits>
    ),
    route: "/products",
    component: <Products />,
    showInNav: true,
  },
  {
    type: "collapse",
    name: "productsView",
    key: "productsView",
    icon: (
      <ProductionQuantityLimits fontSize="small"> </ProductionQuantityLimits>
    ),
    route: "/productsView",
    component: <Products />,
  },
  {
    type: "divider",
    key: "divider",
  },
  {
    type: "title",
    key: "title",
    title: "orders",
  },

  {
    type: "collapse",
    name: "orders",
    key: "orders",
    icon: (
      <ProductionQuantityLimits fontSize="small"> </ProductionQuantityLimits>
    ),
    route: "/orders",
    component: <Orders />,
    showInNav: true,
  },
  {
    type: "collapse",
    name: "ordersView",
    key: "ordersView",
    icon: (
      <ProductionQuantityLimits fontSize="small"> </ProductionQuantityLimits>
    ),
    route: "/ordersView",
    component: <Products />,
  },

  {
    type: "divider",
    key: "divider",
  },
  {
    type: "title",
    key: "title",
    title: "users",
  },
  {
    type: "collapse",
    name: "users",
    key: "users",
    icon: <Person fontSize="small"> </Person>,
    route: "/users",
    showInNav: true,
    component: <Users />,
  },
  {
    type: "collapse",
    name: "عارض الصور",
    key: "slider",
    icon: <Image fontSize="small"> </Image>,
    route: "/slider",
    component: <AppSlider />,
    showInNav: true,
  },
];

export default routes;
