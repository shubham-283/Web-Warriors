import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from './SectionHeading';

const FeaturedCategories = ({ productData }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();

    const categoryImages = {
        "Bottoms": "/Assets/Bottom.jpg",
        "Gowns": "/Assets/Gowns.jpg",
        "Kurtas": "/Assets/Kurta.jpg",
        "Kurtas Sets": "/Assets/kurtaSets.jpg",
        "Saanjh": "/Assets/Sanjah.jpg",
        "Tops": "/Assets/Tops.jpg",
        "Najarah": "/Assets/Najarah.jpg",
        "Rim Jhim": "/Assets/RimJhim.jpg"
    };

    useEffect(() => {
        if (productData && productData.length > 0) {
            const uniqueCategories = [
                ...new Set(productData.map((product) => product.Category)),
            ];
            if (uniqueCategories.length > 0) {
                const shuffledCategories = uniqueCategories.sort(() => Math.random() - 0.5).slice(0, 6);
                setCategories(shuffledCategories);
                setError("");
            } else {
                setError("No categories available.");
            }
        } else {
            setError("No products available.");
        }
    }, [productData]);

    const handleShopNowClick = (category) => {
        navigate('/products', { state: { selectedCategory: category } });
    };

    if (error) return <div>{error}. Please check back later!</div>;

    return (
        <section className="py-24 px-6 lg:px-12 text-center relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
                style={{
                    backgroundImage: 'url("/pngwing.com[1].png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",
                }}
            ></div>
            <div className="relative z-10">
                <SectionHeader title="Shop by Category" backgroundColor="" flourishColor="#6B1E3C" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
                    {categories.map((category, index) => (
                        <div
                            key={category}
                            className={`card-container relative w-64 h-96 mx-auto transition-all duration-700 ${hoveredCard === index ? 'is-flipped' : ''}`}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="card-inner relative w-full h-full transition-transform duration-700 preserve-3d">
                                {/* Front Side */}
                                <div
                                    className={`card-front absolute w-full h-full backface-hidden rounded-3xl shadow-xl bg-white py-16 px-6`}
                                >
                                    <div
                                        className="absolute inset-0 z-0"
                                        style={{
                                            backgroundImage: 'url("/frame[1].png")',
                                            backgroundSize: 'auto 100%',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            opacity: 0.5,
                                        }}
                                    />
                                    <div className="relative z-10 h-full flex flex-col items-center justify-end pb-4 gap-6">
                                        <h3 className="text-4xl font-semibold font-yatra-one text-[#A67B5B]">{category}</h3>
                                        <button
                                            className="px-8 py-3 bg-[#6B1E3C] text-white rounded-full hover:bg-[#FF5C8D] transition-all duration-300 font-quicksand"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShopNowClick(category);
                                            }}
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                </div>

                                {/* Back Side */}
                                <div
                                    className={`card-back absolute w-full h-full backface-hidden rounded-3xl shadow-xl`}
                                    style={{
                                        backgroundImage: `url(${categoryImages[category] || '/Assets/default.jpg'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-25 flex flex-col items-center justify-end pb-4 gap-6 rounded-3xl">
                                        <h3 className="text-4xl font-semibold font-yatra-one text-white">{category}</h3>
                                        <button
                                            className="px-8 py-3 bg-[#6B1E3C] text-white rounded-full hover:bg-[#FF5C8D] transition-all duration-300 font-quicksand"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShopNowClick(category);
                                            }}
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .card-container { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        
        .card-front { transform: rotateY(0deg); }
        .card-back { 
          transform: rotateY(180deg); 
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .is-flipped .card-inner {
          transform: rotateY(180deg);
        }
        .is-flipped .card-back {
            z-index: 10; /* Ensure back face is on top when flipped */
        }
      `}</style>
        </section>
    );
};

export default FeaturedCategories;
