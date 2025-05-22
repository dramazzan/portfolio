'use client'

import { useState, useEffect } from 'react';
import styles from  '@/styles/AnonMessageForm.module.css';

export default function AnonMessageForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Автоматически скрывать статус через 5 секунд
  useEffect(() => {
    if (status && !isLoading) {
      const timer = setTimeout(() => {
        setStatus('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, isLoading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatus('success');
        setMessage('');
      } else {
        const errorData = await res.json();
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left_section}>
          <h2 className={styles.title}>Send me a suggestion or wish</h2>
          <p className={styles.description}>
            I'd love to hear your thoughts, ideas, or feedback. Your message will be sent anonymously and I'll do my best to consider every suggestion.
          </p>
          
          {status === 'success' && (
            <div className={styles.success_message}>
              <div className={styles.success_icon}>✓</div>
              <div>
                <h3>Message sent successfully!</h3>
                <p>Thank you for your feedback. I appreciate you taking the time to share your thoughts.</p>
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <div className={styles.error_message}>
              <div className={styles.error_icon}>✕</div>
              <div>
                <h3>Failed to send message</h3>
                <p>Something went wrong. Please try again in a moment.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.right_section}>
          <form onSubmit={handleSubmit} className={styles.anon_form}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={6}
              required
              disabled={isLoading}
              className={styles.anon_textarea}
            />
            <button 
              type="submit" 
              disabled={isLoading || !message.trim()}
              className={styles.anon_button}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}