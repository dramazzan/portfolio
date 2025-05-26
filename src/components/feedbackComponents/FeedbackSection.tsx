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
      <FeedbackForm onNewFeedback={setNewFeedback} />
      <FeedbackList newFeedback={newFeedback ?? undefined} />
    </div>
  );
}
