import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import "./App.css";

export default function API() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);
    async function getProducts(){
        let response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();//parses the JSON response and converts it into a JavaScript object or array, depending on the structure of the JSON data returned by the API. In this case, since the API returns an array of products, data will be an array of product objects.
        setProducts(data);
        console.log(data);
        // fetch("https://fakestoreapi.com/products")

    // Sends a request to the API endpoint.
    // Returns a Response object (not the actual data yet).
    // await response.json()
    // Reads the response body stream.
    // Converts it into a JavaScript object/array (depending on the JSON structure).
    // In your case, the API returns an array of product objects, so data will be an array.
    // setProducts(data)
    // Updates your React state with the parsed JSON data.
    // Now you can use products in your component to render the list.
    }
    if (products.length === 0) {
        return (
            <motion.div
                className="loading-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
            >
                <h1>Loading products...</h1>
            </motion.div>
        );
    }

    return (
        <div className="app-wrapper">
            <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                All Products from the Fake Store API
            </motion.h1>

            <motion.div
                className="product-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {products.map((p, index) => (
                    <ProductCard {...p} key={p.id} index={index} />
                ))}
            </motion.div>
        </div>
    );
}
