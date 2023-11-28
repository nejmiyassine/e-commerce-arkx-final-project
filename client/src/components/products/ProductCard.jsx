import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io';

const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : product.product_images.length - 1
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < product.product_images.length - 1 ? prevIndex + 1 : 0
        );
    };

    return (
        <div>
            <div className='relative group'>
                <img
                    src={
                        product.product_images.length
                            ? product.product_images[currentImageIndex]
                            : product.product_image
                    }
                    alt={`Product: ${product.product_name}`}
                    className={`h-[350px] w-full object-cover fade-out`}
                />

                {product.product_images.length > 0 && (
                    <div className='opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                        <button
                            onClick={handlePrevClick}
                            className='absolute top-1/2 left-4 transform -translate-y-1/2'
                        >
                            <IoIosArrowDropleftCircle className='text-primaryColor-blueCyan w-6 h-6' />
                        </button>
                        <button
                            onClick={handleNextClick}
                            className='absolute top-1/2 right-4 transform -translate-y-1/2'
                        >
                            <IoIosArrowDroprightCircle className='text-primaryColor-blueCyan w-6 h-6' />
                        </button>
                    </div>
                )}

                <div className='absolute w-full flex justify-center gap-2 px-2 py-1 text-white bottom-0 left-0 opacity-0 transition-opacity duration-200 bg-black/50 group-hover:opacity-100'>
                    {product.options.map((option, idx) => (
                        <span
                            className='cursor-pointer font-regular  transition duration-200 hover:font-semibold'
                            key={idx}
                        >
                            {option}
                        </span>
                    ))}
                </div>
            </div>

            <div className='flex items-center justify-between gap-2 py-2 font-semibold'>
                <h3 className='text-lg'>{product.product_name}</h3>
                <p className='text-sm text-right text-primary'>
                    ${product.price}
                </p>
            </div>

            <button className='font-semibold transition-all hover:bg-primaryColor-blueCyan hover:text-white py-2 border w-full mx-auto px-4'>
                Add to cart
            </button>
        </div>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    cols: PropTypes.number,
    product: PropTypes.object,
};
