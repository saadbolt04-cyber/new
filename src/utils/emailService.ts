// Simple EmailJS service for newsletter subscriptions
import emailjs from '@emailjs/browser';

// EmailJS Configuration - You'll replace these with your actual values
const EMAILJS_SERVICE_ID = 'service_78g1aha';
const EMAILJS_TEMPLATE_ID_WELCOME = 'template_4015mqw';
const EMAILJS_TEMPLATE_ID_ARTICLE = 'template_br9pr7g';
const EMAILJS_PUBLIC_KEY = 'YlRIA-4TEOH3k-NgJ';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export class EmailService {
  /**
   * Send welcome email to new subscriber
   */
  static async sendWelcomeEmail(subscriberEmail: string): Promise<boolean> {
    const firstName = subscriberEmail.split('@')[0];

    const templateParams = {
      email: subscriberEmail,
      to_name: firstName,
      from_name: 'Saher Flow Solutions',
      subscriber_name: firstName,
      company_name: 'Saher Flow Solutions',
      website_url: window.location.origin,
    };

    try {
      console.log('Sending welcome email to:', subscriberEmail);
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_WELCOME,
        templateParams
      );
      console.log('Welcome email sent successfully:', response);
      return response?.status === 200;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return false;
    }
  }

  /**
   * Send new article notification to subscriber
   */
  static async sendArticleNotification(
    subscriberEmail: string,
    articleTitle: string,
    articleExcerpt: string,
    articleUrl: string
  ): Promise<boolean> {
    const firstName = subscriberEmail.split('@')[0];
    const fullArticleUrl = `${window.location.origin}${articleUrl}`;

    const templateParams = {
      email: subscriberEmail,
      to_name: firstName,
      from_name: 'Saher Flow Solutions',
      subscriber_name: firstName,
      article_title: articleTitle,
      article_excerpt: articleExcerpt,
      article_url: fullArticleUrl,
      company_name: 'Saher Flow Solutions',
      website_url: window.location.origin,
    };

    try {
      console.log('Sending article notification to:', subscriberEmail);
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_ARTICLE,
        templateParams
      );
      console.log('Article notification sent successfully:', response);
      return response?.status === 200;
    } catch (error) {
      console.error('Failed to send article notification:', error);
      return false;
    }
  }

  /**
   * Notify all subscribers about new article
   */
  static async notifyAllSubscribers(
    articleTitle: string,
    articleExcerpt: string,
    articleUrl: string,
    subscriberEmails: string[],
    fromName: string = 'Saher Flow Solutions Team',
    publishedDate: string = new Date().toLocaleDateString()
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    console.log(`Notifying ${subscriberEmails.length} subscribers about new article:`, articleTitle);

    for (const email of subscriberEmails) {
      try {
        const sent = await this.sendArticleNotification(
          email,
          articleTitle,
          articleExcerpt,
          articleUrl
        );
        
        if (sent) {
          success++;
        } else {
          failed++;
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Failed to notify subscriber ${email}:`, error);
        failed++;
      }
    }

    console.log(`Notification complete: ${success} successful, ${failed} failed`);
    return { success, failed };
  }
}

export const validateEmailJSConfig = (): boolean => {
  // Since you're using your actual credentials, always return true
  return true;
};
