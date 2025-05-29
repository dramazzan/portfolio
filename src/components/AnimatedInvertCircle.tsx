'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedInvertCircleProps {
    text: string;
}

const AnimatedInvertCircle: React.FC<AnimatedInvertCircleProps> = ({ text }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [circlePos, setCirclePos] = useState({ x: 300, y: 175 });

    useEffect(() => {
        let angle = 0;
        const radiusX = 120;
        const radiusY = 60;
        const size = 150;

        const animate = () => {
            if (containerRef.current) {
                const container = containerRef.current.getBoundingClientRect();
                const centerX = container.width / 2;
                const centerY = container.height / 2;

                const x = centerX + radiusX * Math.sin(angle) - size / 2;
                const y = centerY + radiusY * Math.sin(angle * 1.5) - size / 2;

                setCirclePos({ x, y });
                angle += 0.01;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-[600px] h-[350px] bg-red-500 rounded-xl overflow-hidden flex items-center justify-center"
        >
            <div className="absolute inset-0 bg-red-500 flex items-center justify-center z-10">
                <h1 className="text-white text-6xl font-bold select-none">{text}</h1>
            </div>

            {/* Инверсный слой с белым фоном, оранжевым текстом, с clip-path */}
            <div
                className="absolute inset-0 bg-white flex items-center justify-center z-20 pointer-events-none transition-all duration-200"
                style={{
                    clipPath: `circle(75px at ${circlePos.x + 75}px ${circlePos.y + 75}px)`,
                }}
            >
                <h1 className="text-red-500 text-6xl font-bold select-none">{text}</h1>
            </div>
        </div>
    );
};

export default AnimatedInvertCircle;
