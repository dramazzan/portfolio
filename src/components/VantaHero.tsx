'use client'

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

const VantaHero = ({ effect = 'halo' }) => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {

        const currentEffect = HALO({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0xe81359,
                    backgroundColor: 0x1f1437
                });


        setVantaEffect(currentEffect);

        return () => {
            if (currentEffect) currentEffect.destroy();
        };
    }, [effect]);

    return (
        <section
            ref={vantaRef}
            className="hero-section"
            style={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                color: 'white',
                padding: '2rem',
                maxWidth: '1000px'
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    lineHeight: '1.2'
                }}>
                    Welcome to My Portfolio
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    marginBottom: '2rem',
                    opacity: 0.9,
                    lineHeight: '1.4'
                }}>
                    I build modern, responsive websites and creative digital experiences.
                </p>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .hero-section h1 {
                        font-size: 2.5rem !important;
                    }
                    .hero-section p {
                        font-size: 1.2rem !important;
                    }
                    .hero-section > div {
                        padding: 1rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default VantaHero;
