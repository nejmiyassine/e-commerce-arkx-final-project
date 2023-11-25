import AuthLoginForm from '../../../components/authLoginForm';

const AdminLogin = () => {
    return (
        <div className='flex items-center min-h-screen bg-white text-primary-light dark:bg-primary-deepDark dark:text-primary-dark'>
            <div className='w-full lg:w-1/2 p-20'>
                <div className='px-8 py-6 md:px-16'>
                    <div className='mb-6 text-center'>
                        <h2 className='font-bold text-3xl mb-1'>
                            Welcome back!
                        </h2>
                        <p className='text-sm text-slate-400 dark:text-slate-500'>
                            Please enter your details
                        </p>
                    </div>

                    <AuthLoginForm account_type={'user'} />
                </div>
            </div>

            <div
                className={`flex hidden lg:flex lg:w-1/2 h-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden bg-no-repeat bg-center`}
            >
                <img
                    className='w-full h-full object-cover'
                    src='https://images.unsplash.com/photo-1485518882345-15568b007407?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='background login'
                />
            </div>
        </div>
    );
};

export default AdminLogin;
