import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web'; // Import lottie from the installed library
import animationData from '../Assets/Logo.json'; // Replace with the path to your JSON animation file

function LogoAnimation() {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
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

export default LogoAnimation;
