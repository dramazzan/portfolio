'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedInvertCircleProps {
    text: string;
}

const AnimatedInvertCircle: React.FC<AnimatedInvertCircleProps> = ({ text }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [circlePos, setCirclePos] = useState({ x: 300, y: 175 });
    const sizeRef = useRef(150); // диаметр круга

    useEffect(() => {
        let angle = 0;
        const radiusX = 120;
        const radiusY = 60;

        const animate = () => {
            if (containerRef.current) {
                const container = containerRef.current.getBoundingClientRect();
                const centerX = container.width / 2;
                const centerY = container.height / 2;

                const x = centerX + radiusX * Math.sin(angle) - sizeRef.current / 2;
                const y = centerY + radiusY * Math.sin(angle * 1.5) - sizeRef.current / 2;

                setCirclePos({ x, y });
                angle += 0.01;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="w-full flex justify-center p-4">
            <div
                ref={containerRef}
                className="relative w-full max-w-[600px] aspect-[12/7] bg-red-500 rounded-xl overflow-hidden flex items-center justify-center transition-all hover:translate-y-[-10px]"
            >
                <div className="absolute inset-0 bg-red-500 flex items-center justify-center z-10">
                    <h1 className="text-white text-4xl md:text-6xl font-bold select-none text-center">{text}</h1>
                </div>

                <div
                    className="absolute inset-0 bg-white flex items-center justify-center z-20 pointer-events-none transition-all duration-200"
                    style={{
                        clipPath: `circle(${sizeRef.current / 2}px at ${circlePos.x + sizeRef.current / 2}px ${circlePos.y + sizeRef.current / 2}px)`,
                    }}
                >
                    <h1 className="text-red-500 text-4xl md:text-6xl font-bold select-none text-center">{text}</h1>
                </div>
            </div>
        </div>
    );
};

export default AnimatedInvertCircle;
