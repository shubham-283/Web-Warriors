import { useState, useEffect } from "react";
import { db } from "../firebase-config";  // Import Firestore instance
import { collection, getDocs } from "firebase/firestore";  // Firestore methods

const useFeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "featuredProducts"));
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });  // Adding doc id to the product
        });
        setFeaturedProducts(productsArray);
      } catch (err) {
        setError("Error fetching products: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { featuredProducts, loading, error };
};

export default useFeaturedProducts;
