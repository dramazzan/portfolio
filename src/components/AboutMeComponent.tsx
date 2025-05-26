'use client'

import { useState, useEffect } from "react";
import styles from "@/styles/AboutMeComponent.module.css";

type Language = "en" | "rus";

const AboutMeComponent: React.FC = () => {
    const [language, setLanguage] = useState<Language>("en");
    const [isAnimating, setIsAnimating] = useState(false);

    // Объект с текстами только для основного контента
    const aboutTexts: Record<Language, string> = {
        en: "I am a beginner frontend developer and am currently looking for my first job. I like creating beautiful and convenient interfaces, understanding technologies and seeing how code turns into a real product. I want to join a team where I can learn from experienced guys, develop as a specialist and do cool projects together. I have a lot of motivation, a desire to grow and become better every day.",
        rus: "Я начинающий фронтенд-разработчик и сейчас в поиске своей первой работы. Мне нравится создавать красивые и удобные интерфейсы, разбираться в технологиях и видеть, как код превращается в настоящий продукт. Хочу попасть в команду, где можно учиться у опытных ребят, развиваться как специалист и вместе делать классные проекты. У меня много мотивации, желания расти и становиться лучше каждый день."
    };

    const toggleLanguage = (): void => {
        setIsAnimating(true);

        setTimeout(() => {
            setLanguage((prevLang: Language) => prevLang === "en" ? "rus" : "en");
            setIsAnimating(false);
        }, 150);
    };

    // Сохранение выбранного языка в localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem('aboutMeLanguage') as Language | null;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'rus')) {
            setLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('aboutMeLanguage', language);
    }, [language]);

    return (
        <section className={styles.aboutMe}>
            <div className={styles.header}>
                <h1 className={styles.title}>About Me</h1>
                <button
                    className={styles.languageToggle}
                    onClick={toggleLanguage}
                    aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
                    disabled={isAnimating}
                >
                    <span className={styles.languageIcon}>🌐</span>
                    {language.toUpperCase()}
                </button>
            </div>

            <div className={styles.content}>
                <p className={`${styles.text} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
                    {aboutTexts[language]}
                </p>
            </div>
        </section>
    );
};

export default AboutMeComponent;