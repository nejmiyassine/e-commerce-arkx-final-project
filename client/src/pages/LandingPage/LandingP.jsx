import Head from '../../components/LandingPage/Head';
import Navbar from '../../layouts/Navbar';
import Hero from '../../components/LandingPage/Hero';
import Features from '../../components/LandingPage/Features';
import Product from '../../components/LandingPage/Product';
import Footer from '../../components/LandingPage/Footer';
import SubCat from '../../components/LandingPage/SubCat';
import Trending from '../../components/LandingPage/Trending';

const LandingP = () => {
    return (
        <div>
            <Head />
            <Navbar />
            <Hero />
            <Features />
            <Product />

            <SubCat />
            <Trending />
            <Footer />
        </div>
    );
};

export default LandingP;
