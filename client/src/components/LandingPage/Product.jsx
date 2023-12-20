import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts } from '../../features/products/productsSlice';
import LoadingSpinner from '../LoadingSpinner';
import { sliceText } from '../../utils/sliceText';
import { Link } from 'react-router-dom';

const Product = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container mx-auto py-8'>
            <div className='flex flex-col items-center justify-center pb-12'>
                <h2 className='text-2xl sm:text-4xl font-extrabold leading-tight text-center mb-2'>
                    <span className='text-primaryColor-gold'>Discover </span>
                    New Arrivals
                </h2>
                <p className='text-md w-full sm:w-2/3 text-gray-700 text-center'>
                    Elevate your wardrobe with our latest and trendiest
                    collection. Find the perfect pieces that suit your style and
                    make a statement.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {products.slice(0, 4).map((product) => (
                    <div key={product._id} className='group'>
                        <Link to={`/shop/product/${product._id}`}>
                            <div className='relative overflow-hidden rounded-lg aspect-w-3 aspect-h-4'>
                                <img
                                    className='object-cover w-full h-52 transition-transform transform group-hover:scale-105'
                                    src={product.product_images[0]}
                                    alt='product image'
                                />
                            </div>
                        </Link>
                        <div className='mt-4 p-4 border border-t-0 rounded-b-md'>
                            <Link to={`/shop/product/${product._id}`}>
                                <h5 className='text-lg font-bold'>
                                    {sliceText(product.product_name, 25)}
                                </h5>
                            </Link>
                            <p className='text-black/80 text-sm mt-2'>
                                {product.short_description}
                            </p>

                            <div className='mt-2 flex items-center justify-between'>
                                <span className='text-lg font-bold'>
                                    ${product.discount_price}
                                </span>
                                <span className='text-sm text-gray-400 line-through ml-2'>
                                    ${product.price}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
