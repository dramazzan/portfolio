'use client';

import { useState } from 'react';
import styles from '@/styles/feedback/FeedbackForm.module.css';

type Feedback = {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
};

type Props = {
  onNewFeedback: (feedback: Feedback) => void;
};

export default function FeedbackForm({ onNewFeedback }: Props) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long.');
      return;
    }

    if (message.trim().length < 10) {
      setError('Feedback must be at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data: Feedback | { error: string } = await res.json();

      if (!res.ok || 'error' in data) {
        setError((data as any).error || 'Something went wrong.');
      } else {
        onNewFeedback(data as Feedback);
        setName('');
        setMessage('');
        setSuccess('Thank you for your feedback! It has been submitted successfully.');

        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError('Submission error. Please check your internet connection and try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className={styles.form_container}>
        <h2 className={styles.form_title}>Leave Feedback</h2>

        <form onSubmit={handleSubmit} className={styles.feedback_form}>
          {error && (
              <div className={styles.error_message}>
                {error}
              </div>
          )}

          {success && (
              <div className={styles.success_message}>
                {success}
              </div>
          )}

          <div className={styles.input_group}>
            <label htmlFor="name" className={styles.input_label}>
              Your Name
            </label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.text_input}
                disabled={isSubmitting}
                maxLength={50}
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="message" className={styles.input_label}>
              Your Feedback
            </label>
            <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.textarea}
                disabled={isSubmitting}
                maxLength={500}
            />
          </div>

          <button
              type="submit"
              className={styles.submit_button}
              disabled={isSubmitting}
          >
            <div className={styles.button_content}>
              {isSubmitting && <span className={styles.loading_spinner}></span>}
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </div>
          </button>
        </form>
      </div>
  );
}
