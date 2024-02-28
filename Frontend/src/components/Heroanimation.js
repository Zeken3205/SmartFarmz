import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from '../Assets/heroanimation.json'; // Replace with the path to your Lottie JSON file

function Heroanimation() {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: containerRef.current,
            animationData: animationData, // Your animation data
            renderer: 'svg', // You can choose 'svg', 'canvas', or 'html' as the renderer
            loop: true, // Set to true if you want the animation to loop
            autoplay: true, // Set to true if you want the animation to play automatically
        });

        return () => {
            anim.destroy(); // Clean up when the component unmounts
        };
    }, []);

    return <div ref={containerRef}></div>;
}

export default Heroanimation;
