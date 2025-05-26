'use client';

import { useState } from 'react';
import FeedbackList from './FeedbackList';
import FeedbackForm from './FeedbackForm';
import styles from "@/styles/feedback/FeedbackSection.module.css"

type Feedback = {
    _id: string;
    name: string;
    message: string;
    createdAt: string;
};

export default function FeedbackSection() {
    const [newFeedback, setNewFeedback] = useState<Feedback | null>(null);

    return (
        <div className={styles.feedbackSection}>
            <div className={styles.feedbackHeader}>
                <div className={styles.feedbackDescription}>
                    <h2 className={styles.heading}>We value your feedback</h2>
                    <p className={styles.subText}>You can leave a comment or feedback below. Let us know what you
                        think!</p>
                </div>
                <FeedbackForm onNewFeedback={setNewFeedback}/>
            </div>

            <FeedbackList newFeedback={newFeedback ?? undefined}/>
        </div>
    );
}
