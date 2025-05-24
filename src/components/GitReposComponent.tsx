"use client";

import { useState, useEffect, useRef, JSX } from "react";
import styles from "@/styles/GitReposComponent.module.css";
import { Repo } from "@/models/Repo";
import {
  JavascriptOriginal,
  TypescriptOriginal,
  KotlinOriginal,
  PythonOriginal,
  VuejsOriginal,
  JavaOriginal,
  Html5Original,
  GoOriginal,
  Css3Original,
} from "devicons-react";
import { Ban, SquareArrowOutUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const GitReposComponent = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/dramazzan/repos");
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth <= 480) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || repos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, repos.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, repos.length, itemsPerView]);

  const getIconLang = (lang: string): JSX.Element => {
    switch (lang.toLowerCase()) {
      case "javascript":
        return <JavascriptOriginal size={40} />;
      case "python":
        return <PythonOriginal size={40} />;
      case "java":
        return <JavaOriginal size={40} />;
      case "html":
        return <Html5Original size={40} />;
      case "css":
        return <Css3Original size={40} />;
      case "typescript":
        return <TypescriptOriginal size={40} />;
      case "kotlin":
        return <KotlinOriginal size={40} />;
      case "vue":
        return <VuejsOriginal size={40} />;
      case "go":
        return <GoOriginal size={40} />;
      default:
        return <Ban size={40} />;
    }
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const maxIndex = Math.max(0, repos.length - itemsPerView);
  const translateX = currentIndex * (100 / itemsPerView);
  const totalPages = Math.ceil(repos.length / itemsPerView);

  return (
    <div className={styles.git_container}>
      <h1 className={styles.git_title}>My repositories</h1>
      
      <div 
        className={styles.carousel_wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {repos.length > itemsPerView && (
          <>
            <button 
              className={`${styles.carousel_nav} ${styles.prev}`}
              onClick={prevSlide}
              aria-label="Previous repositories"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className={`${styles.carousel_nav} ${styles.next}`}
              onClick={nextSlide}
              aria-label="Next repositories"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        <div className={styles.carousel_container} ref={containerRef}>
          <div 
            className={styles.git_items}
            style={{
              transform: `translateX(-${translateX}%)`,
              width: `${(repos.length / itemsPerView) * 100}%`,
              transition: 'transform 0.5s ease'
            }}
          >
            {repos.map((repo) => (
              <div 
                className={styles.git_item} 
                key={repo.name}
                style={{ width: `${100 / repos.length}%` }}
              >
                <div className={styles.repo_name}>
                  <div className={styles.repo_icon_name}>
                    <span>{repo.name}</span>
                  </div>
                  <div>
                    <Link href={repo.html_url}>
                      <SquareArrowOutUpRight />
                    </Link>
                  </div>
                </div>
                <div className={styles.repo_lang}>
                  <span>Language:</span>
                  {getIconLang(repo.language)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {repos.length > itemsPerView && (
        <div className={styles.carousel_indicators}>
          {Array.from({ length: totalPages }, (_, index) => (
              <button
                  key={index}
                  className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
              />
          ))}

        </div>
      )}
    </div>
  );
};

export default GitReposComponent;