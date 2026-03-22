import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function ProductCard({ title, price, image, description, rating, index = 0 }) {
    const delay = index * 0.06;
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHover, setIsHover] = useState(false);

    const handleMouseMove = (event) => {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
        const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 12;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setIsHover(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <motion.div
            className="card"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, rotateX: rotation.x, rotateY: rotation.y, scale: isHover ? 1.08 : 1 }}
            transition={{ duration: 0.35, delay, type: "spring", damping: 18, stiffness: 120 }}
        >
            <div className="card-content">
                <h1>{title}</h1>
                <h2>${price}</h2>
                <img src={image} alt={title} />
                <p>{description}</p>
                <h3>Rating : {rating?.rate ?? "N/A"} ⭐</h3>
            </div>
        </motion.div>
    );
}
