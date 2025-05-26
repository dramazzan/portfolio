'use client'

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import HALO from 'vanta/dist/vanta.halo.min';
import styles from '@/styles/VantaHero.module.css'; // импорт CSS

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
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xe81359,
            backgroundColor: 0x1f1437,
        });

        setVantaEffect(currentEffect);

        return () => {
            if (currentEffect) currentEffect.destroy();
        };
    }, [effect]);

    return (
        <section ref={vantaRef} className={styles.vanta_hero_section}>
            <div className={styles.vanta_content}>
                <h1 className={styles.vanta_title}>Welcome to My Portfolio</h1>
                <p className={styles.vanta_description}>
                    I build modern, responsive websites and creative digital experiences.
                </p>
                <a href="#skills" className={styles.vanta_button}>
                    Start Inspection
                </a>
            </div>
        </section>
    );
};

export default VantaHero;
