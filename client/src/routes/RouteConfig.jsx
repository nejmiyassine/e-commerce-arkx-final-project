import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import AdminLogin from '../pages/admin/Login/AdminLogin';
import Products from '../pages/admin/Products/Products';
import Categories from '../pages/admin/Categories/Categories';
import Subcategories from '../pages/admin/SubCategories/Subcategories';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import CustomerDetails from '../pages/admin/customers/CustomerDetails';
import ViewAllCustomers from '../pages/admin/customers/ViewAllCustomers';
import Users from '../pages/admin/users/Users';
import UserDetails from '../pages/admin/users/UserDetails';
import Orders from '../pages/admin/Orders/Orders';
import ProtectedRoutes from './ProtectedRoutes';
import AuthLogin from '../pages/auth/AuthLogin';
import AuthRegister from '../pages/auth/AuthRegister';
import Unauthorized from '../pages/Unauthorized';
import Catalog from '../pages/catalog/Catalog';
// import HomeTest from '../components/cart/HomeTest';

import UpdateCustomerInfo from '../pages/FrontCustomers/UpdateCustomerInfo';
// testing cart
import HomeTest from './../components/cart/HomeTest';
import Cart from './../components/cart/cart';
import Checkout from '../components/cart/Checkout';
import CheckoutSuccess from '../components/cart/CheckoutSuccess';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                {/* Unauthorized */}
                <Route path='/unauthorized' element={<Unauthorized />} />

                <Route exact path='/' element={<Home />} />
                <Route path='/catalog' element={<Catalog />} />

                {/* Authentication */}
                <Route path='/register' element={<AuthRegister />} />
                <Route path='/login' element={<AuthLogin />} />
                <Route path='/admin/login' element={<AdminLogin />} />

                {/* Admin Protected Routes */}
                <Route
                    element={
                        <ProtectedRoutes allowedRoles={['admin', 'manager']} />
                    }
                >
                    <Route path='/admin/products' element={<Products />} />
                    <Route path='/admin/categories' element={<Categories />} />
                    <Route path='/admin/orders' element={<Orders />} />
                    <Route
                        path='/admin/subcategories'
                        element={<Subcategories />}
                    />

                    <Route
                        path='/admin/customers'
                        element={<ViewAllCustomers />}
                    />

                    <Route
                        path='/admin/customers/:customerId'
                        element={<CustomerDetails />}
                    />

                    <Route
                        path='/admin/dashboard'
                        element={<AdminDashboard />}
                    />

                    <Route path='/admin/users' element={<Users />} />
                    <Route
                        path='/admin/users/:userId'
                        element={<UserDetails />}
                    />
                </Route>

                {/* front-store */}
                <Route
                    path='/customersProfile/:customerId'
                    element={<UpdateCustomerInfo />}
                />
                <Route
                    path='/hometest'
                    element={<HomeTest/>}
                />
                <Route
                    path='/cart'
                    element={<Cart/>}
                />
                <Route
                    path='/checkout-success'
                    element={<CheckoutSuccess/>}
                />
                <Route
                    path='/Checkout'
                    element={<Checkout/>}
                />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
