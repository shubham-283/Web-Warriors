import React, { useEffect } from "react";
import { db } from '../firebase-config.js';  // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";  // Firestore methods

const UploadProducts = () => {
  useEffect(() => {
    // Dummy Product Data
    // Dummy Indian Female Dress Data
const products = [
  {
    id: "1",
    name: "Adaa Jaipur SAANJH Silk Crep Floral Printed And Hand Embroidery Work Kurti & Salwar With Dupatta (Green)",
    price: 2999,
    description: "Experience the realm of understated elegance with our latest Pakistani Schiffli Anarkali Suit ensemble.",
    colors: ["#4B0082", "#6A5ACD", "#FFD700"],
    sizes: ["S", "M", "L", "XL","XXL"],
    image: "https://i.ibb.co/LzM92bqG/Adaa-01.webp",
  },
  {
    id: "2",
    name: "Adaa Jaipur RIMJHIM Rayon Frontslit Straight Kurti With Pocket for (Black)",
    price: 1499,
    description: "Introducing our Basic Kurtas! Our kurtas come in an array of colors and styles and are perfect for any occasion.",
    colors: ["#808080", "#FF4500"],
    sizes: ["S","M", "L", "XL","XXL"],
    image: "https://i.ibb.co/27KfPcbz/Adaa-02.webp",
  },
  {
    id: "3",
    name: "Adaa Jaipur Long Gown With Malmal Dupatta Embroidery Work With Sequence Mirror Work (Yellow)",
    price: 4595,
    description: "Experience the realm of understated elegance with our latest Pakistani Schiffli Anarkali Suit ensemble.",
    colors: ["#000000", "#FFFFFF"],
    sizes: ["S","M", "L", "XL","XXL"],
    image: "https://i.ibb.co/zVvDbjLL/Adaa-03.webp",
  },
  {
    id: "4",
    name: "Adaa Jaipur Women Olive Cotton Kurta With Trousers & With Dupatta Set",
    price: 1895,
    description: "Deck up for any function wearing the elegantly crafted lilac suit set to look traditional.",
    colors: ["#FF69B4", "#FFD700"],
    sizes: ["S","M", "L", "XL","XXL"],
    image: "https://i.ibb.co/1tGngW7d/Adaa-04.webp",
  },
  {
    id: "5",
    name: "Copy of Adaa Jaipur Women Printed Co-ords Set",
    price: 2899,
    description: "Introducing the perfect co-ord attire for women - designed to turn heads and stand out from the crowd.",
    colors: ["#2E8B57", "#A52A2A"],
    sizes: ["S","M", "L", "XL","XXL"],
    image: "https://i.ibb.co/PvnZCvjk/Adaa-05.webp",
  },
  {
    id: "6",
    name: "Women Navy Blue Floral Printed Kurta With Trousers & With Dupatta",
    price: 3399,
    description: "Elevate your ethnic wardrobe with our Kurta Pants & Dupatta set.",
    colors: ["#2E8B57", "#A52A2A"],
    sizes: ["S","M", "L", "XL","XXL"],
    image: "https://i.ibb.co/ZpCSDPV4/Adaa-06.webp",
  },
  {
    id: "7",
    name: "Adaa Jaipur Women Floral Print Rayon Straight Kurta",
    price: 1980,
    description: "For a look that will wow everyone, go for this sleek and stylish straight kurta.",
    colors: ["#FF6347", "#FFD700", "#8A2BE2"],
    sizes: ["S","M", "L", "XL","XXL"],
    image: "https://i.ibb.co/KxHfHnLp/Adaa-07.webp", // Repeated image link
  },
  {
    id: "8",
    name: "Adaa Jaipur Women Floral Print Rayon Straight Kurta",
    price: 1980,
    description: "For a look that will wow everyone, go for this sleek and stylish straight kurta .",
    colors: ["#FF4500", "#800000", "#00008B"],
    sizes: ["S","M", "L", "XL","XXL"],
    image: "https://i.ibb.co/tTsvkV3G/Adaa-08.webp", // Repeated image link
  },
];


    // Function to upload products
    const uploadProducts = async () => {
      try {
        // Reference to Firestore collection
        const productsCollection = collection(db, "featuredProducts");

        // Loop through each product and upload it
        for (const product of products) {
          await addDoc(productsCollection, product);
          console.log(`Product ${product.name} uploaded successfully!`);
        }
      } catch (error) {
        console.error("Error uploading products: ", error);
      }
    };

    // Upload products when the component is mounted
    uploadProducts();
  }, []);

  return (
    <div>
      <h1>Uploading Products to Firestore...</h1>
    </div>
  );
};

export default UploadProducts;
