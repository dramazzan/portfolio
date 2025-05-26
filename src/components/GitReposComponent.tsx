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

const GitReposComponent = (): JSX.Element => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [itemsPerView, setItemsPerView] = useState<number>(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRepos = async (): Promise<void> => {
      try {
        const res = await fetch("https://api.github.com/users/dramazzan/repos");
        const data: Repo[] = await res.json();
        const filteredRepos = data
            .filter((repo: Repo) => !repo.private)
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        setRepos(filteredRepos);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    const updateItemsPerView = (): void => {
      if (typeof window === "undefined") return;
      if (window.innerWidth <= 480) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, repos.length - itemsPerView);
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [itemsPerView, repos.length, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying || repos.length === 0 || repos.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, repos.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, repos.length, itemsPerView]);

  const getIconLang = (lang: string | null): JSX.Element => {
    const iconSize = typeof window !== "undefined" && window.innerWidth <= 480 ? 28 : 40;

    if (!lang) return <Ban size={iconSize} />;

    switch (lang.toLowerCase()) {
      case "javascript":
        return <JavascriptOriginal size={iconSize} />;
      case "python":
        return <PythonOriginal size={iconSize} />;
      case "java":
        return <JavaOriginal size={iconSize} />;
      case "html":
        return <Html5Original size={iconSize} />;
      case "css":
        return <Css3Original size={iconSize} />;
      case "typescript":
        return <TypescriptOriginal size={iconSize} />;
      case "kotlin":
        return <KotlinOriginal size={iconSize} />;
      case "vue":
        return <VuejsOriginal size={iconSize} />;
      case "go":
        return <GoOriginal size={iconSize} />;
      default:
        return <Ban size={iconSize} />;
    }
  };

  const maxIndex = Math.max(0, repos.length - itemsPerView);

  const nextSlide = () => {
    if (currentIndex >= maxIndex) return;
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    if (currentIndex <= 0) return;
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    if (index < 0 || index > maxIndex) return;
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const translateX = (currentIndex * 100) / itemsPerView;
  const totalPages = Math.min(Math.ceil(repos.length / itemsPerView), maxIndex + 1);

  if (repos.length === 0) {
    return (
        <div className={styles.git_container}>
          <h1 className={styles.git_title}>My repositories</h1>
          <div className={styles.loading}>Loading repositories...</div>
        </div>
    );
  }

  return (
      <div className={styles.git_container}>
        <h1 className={styles.git_title}>My repositories</h1>

        <div className={styles.carousel_wrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {repos.length > itemsPerView && (
              <>
                <button
                    className={`${styles.carousel_nav} ${styles.prev} ${currentIndex === 0 ? styles.disabled : ""}`}
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    aria-label="Previous repositories"
                >
                  <ChevronLeft size={typeof window !== "undefined" && window.innerWidth <= 480 ? 16 : 24} />
                </button>

                <button
                    className={`${styles.carousel_nav} ${styles.next} ${currentIndex >= maxIndex ? styles.disabled : ""}`}
                    onClick={nextSlide}
                    disabled={currentIndex >= maxIndex}
                    aria-label="Next repositories"
                >
                  <ChevronRight size={typeof window !== "undefined" && window.innerWidth <= 480 ? 16 : 24} />
                </button>
              </>
          )}

          <div className={styles.carousel_container} ref={containerRef}>
            <div
                className={styles.git_items}
                style={{
                  transform: `translateX(-${translateX}%)`,
                  width: `${Math.ceil(repos.length / itemsPerView) * 100}%`,
                  transition: "transform 0.5s ease",
                }}
            >
              {repos.map((repo) => (
                  <div
                      className={styles.git_item}
                      key={repo.id || repo.name}
                      style={{
                        width: `${100 / Math.ceil(repos.length / itemsPerView)}%`,
                        minWidth: `${100 / itemsPerView}%`,
                      }}
                  >
                    <div className={styles.repo_name}>
                      <div className={styles.repo_icon_name}>
                        <span>{repo.name}</span>
                        <div>
                          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <SquareArrowOutUpRight
                                size={typeof window !== "undefined" && window.innerWidth <= 480 ? 16 : 20}/>
                          </Link>
                        </div>
                      </div>

                    </div>
                    <div className={styles.repo_lang}>
                      <span>Language:</span>
                      {getIconLang(repo.language)}
                    </div>
                    {repo.description && (
                        <div className={styles.repo_description}>
                          <p>{repo.description.length > 100 ? `${repo.description.substring(0, 100)}...` : repo.description}</p>
                        </div>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </div>

        {repos.length > itemsPerView && totalPages > 1 && (
            <div className={styles.carousel_indicators}>
              {Array.from({ length: totalPages }, (_, index) => (
                  <button
                      key={index}
                      className={`${styles.indicator} ${currentIndex === index ? styles.active : ""}`}
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
