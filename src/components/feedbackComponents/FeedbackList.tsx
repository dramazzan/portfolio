'use client';

import { useEffect, useState, useCallback } from 'react';
import styles from '@/styles/feedback/FeedbackList.module.css';
import {User} from "lucide-react"

type Feedback = {
    _id: string;
    name: string;
    message: string;
    createdAt: string;
};

type Props = {
    newFeedback?: Feedback;
};

const FETCH_TIMEOUT = 10000; // 10 seconds

export default function FeedbackList({ newFeedback }: Props) {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFeedbacks = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

            const response = await fetch('/api/feedback', {
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Failed to load: ${response.status}`);
            }

            const data: Feedback[] = await response.json();
            setFeedbacks(data);
        } catch (err) {
            console.error('Error while loading feedback:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while loading feedback');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    useEffect(() => {
        if (newFeedback && !feedbacks.some(fb => fb._id === newFeedback._id)) {
            setFeedbacks(prev => [newFeedback, ...prev]);
        }
    }, [newFeedback, feedbacks]);

    const formatDate = useCallback((dateString: string) => {
        try {
            return new Date(dateString).toLocaleString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Unknown date';
        }
    }, []);

    const isNewFeedback = useCallback((feedback: Feedback, index: number) => {
        return index === 0 && newFeedback && feedback._id === newFeedback._id;
    }, [newFeedback]);

    if (isLoading) {
        return (
            <div className={styles.feedbackContainer}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner} aria-hidden="true" />
                    <span>Loading feedback...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.feedbackContainer}>
                <div className={styles.errorState}>
                    <h3>Failed to load</h3>
                    <p>{error}</p>
                    <button
                        onClick={fetchFeedbacks}
                        className={styles.retryButton}
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    if (feedbacks.length === 0) {
        return (
            <div className={styles.feedbackContainer}>
                <div className={styles.emptyState}>
                    <h3>No feedback yet</h3>
                    <p>Be the first to leave feedback!</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.feedbackContainer}>
            <div className={styles.feedbackGrid}>
                {feedbacks.map((feedback, index) => (
                    <article
                        key={feedback._id}
                        className={`${styles.feedbackCard} ${
                            isNewFeedback(feedback, index) ? styles.newFeedback : ''
                        }`}
                    >
                        <header className={styles.feedbackHeader}>
                            <h4 className={styles.authorName}>
                                <span className={styles.authorIcon} aria-hidden="true"><User size={20}/></span>
                                {feedback.name}
                            </h4>
                            <time
                                className={styles.timestamp}
                                dateTime={feedback.createdAt}
                                title={formatDate(feedback.createdAt)}
                            >
                                {formatDate(feedback.createdAt)}
                            </time>
                        </header>
                        <div className={styles.messageWrapper}>
                            <p className={styles.message}>{feedback.message}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
