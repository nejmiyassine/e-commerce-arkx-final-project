import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/login/Login';
import Logout from '../pages/login/logout';
import Products from '../pages/Products/Products';
import Categories from '../pages/Categories/Categories';
import Subcategories from '../pages/SubCategories/Subcategories';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import CustomerDetails from '../pages/customers/CustomerDetails';
import DisplayCustomerDetails from '../components/Customers/DisplayCustomerDetails';
import ViewAllCustomers from '../pages/customers/ViewAllCustomers';
import Users from '../pages/admin/users/Users';
import UserDetails from '../pages/admin/users/UserDetails';
import Orders from '../pages/Orders/Orders';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/admin/login' element={<Login />} />
                <Route path='/admin/logout' element={<Logout />} />
                <Route path='/admin/products' element={<Products />} />
                <Route path='/admin/categories' element={<Categories />} />
                <Route path='/admin/orders' element={<Orders />} />
                <Route
                    path='/admin/subcategories'
                    element={<Subcategories />}
                />

                <Route path='/admin/customers' element={<ViewAllCustomers />} />
                <Route
                    path='/admin/customer/:id'
                    element={<CustomerDetails />}
                />
                {/* test */}
                <Route
                    path='/admin/details'
                    element={<DisplayCustomerDetails />}
                />

                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<Users />} />
                <Route path='/admin/users/:userId' element={<UserDetails />} />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
