import { useState, FormEvent } from 'react';
import { Send, Mail } from 'lucide-react';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

interface FormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!accessKey) {
      setSubmitStatus('error');
      setErrorMessage('Form is not configured yet. Please email us directly.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New contact from ${formData.name} via lightcodelabs.studio`,
          from_name: 'Lightcode Labs Website',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          botcheck: ''
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!accessKey) {
    return (
      <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="text-center py-8">
          <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Get in touch</h3>
          <p className="text-gray-300 mb-2">
            Email us at{' '}
            <a
              href="mailto:hello@lightcodelabs.studio"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
            >
              hello@lightcodelabs.studio
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-4">
            The contact form will be available shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-8 shadow-xl space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Tell us about your event, project, or rental needs..."
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500 rounded-lg text-emerald-400">
          Thanks! Your message is on its way. We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-400">
        Or email us directly at{' '}
        <a
          href="mailto:hello@lightcodelabs.studio"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          hello@lightcodelabs.studio
        </a>
      </p>
    </form>
  );
}

export default ContactForm;