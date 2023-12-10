import delivery from '../../assets/delivery.png';
import refund from '../../assets/refund.png';
import support from '../../assets/support.png';

const Features = () => {
    return (
        <div className='container mx-auto py-16'>
            <div className='w-full max-w-screen-lg mx-auto grid grid-cols-3 gap-6 justify-center'>
                <div className='border border rounded-sm p-4 flex flex-col items-center'>
                    <img
                        src={delivery}
                        className='w-12 h-12 object-cover mb-2'
                        alt='Delivery Icon'
                    />
                    <h4 className='font-medium capitalize text-lg'>
                        Free Shipping
                    </h4>
                    <p className='text-gray-500 text-sm'>Order Over 500 MAD</p>
                </div>
                <div className='border border rounded-sm p-4 flex flex-col items-center'>
                    <img
                        src={refund}
                        className='w-12 h-12 object-cover mb-2'
                        alt='Refund Icon'
                    />
                    <h4 className='font-medium capitalize text-lg'>
                        Money Return
                    </h4>
                    <p className='text-gray-500 text-sm'>
                        15 Days Money Returns
                    </p>
                </div>
                <div className='border border rounded-sm p-4 flex flex-col items-center'>
                    <img
                        src={support}
                        className='w-12 h-12 object-cover mb-2'
                        alt='Support Icon'
                    />
                    <h4 className='font-medium capitalize text-lg'>
                        24/7 Support
                    </h4>
                    <p className='text-gray-500 text-sm'>Customer Support</p>
                </div>
            </div>
        </div>
    );
};

export default Features;
