import { createRoutesFromChildren, createBrowserRouter, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";


export default createBrowserRouter(createRoutesFromChildren(
    <Route path="/" element={<BaseLayout/>}>
        <Route path="auth" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/main" element={<MainLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="invoice/:invoiceId?" element={<Invoice/>}/>
        </Route>
    </Route>
))

