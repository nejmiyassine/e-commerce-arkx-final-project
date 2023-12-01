import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerProfile } from '../../features/customers/frontCustomerSlice';

import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';

const CustomerProfile = () => {
    const { customerId } = useParams();
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.frontCustomers);
    console.log('data from customerProfile', data);

    useEffect(() => {
        dispatch(getCustomerProfile(customerId));
        console.log('dispatch' , dispatch(getCustomerProfile(customerId)))
        
    }, [dispatch, customerId]);


    if (loading) {
        return <LoadingSpinner />;
    }
    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

  console.log('data' , data)
    
    return (
        <div>
            
            {data._id ? (
                <NavbarCustomers customer={data} />
            ) : (
                <div>no customer found</div>
            )}
        </div>
    );
};
export default CustomerProfile;
