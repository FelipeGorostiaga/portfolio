import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight } from '~/components/layout/icons';
import { site } from '~/content/site';
import { type ContactInput } from '~/lib/contact';
import { CONTACT_LIMITS, submitContact, type SubmitDeps } from '~/lib/contactForm';
import styles from './Contact.module.css';
import sectionStyles from './Section.module.css';

type Values = Required<ContactInput>;
type Field = keyof Values;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: Values = { firstName: '', lastName: '', email: '', phone: '', message: '', trap: '' };

const SUBMIT_DEPS: SubmitDeps = {
  // zod is loaded on first submit so it stays out of the home page bundle.
  loadValidator: () => import('~/lib/contact').then((module) => module.validateContact),
  post: (body) => fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }),
};

const ROWS = [
  { label: 'Email', text: site.email, href: `mailto:${site.email}` },
  { label: 'LinkedIn', text: 'linkedin.com/in/felipe-gorostiaga', href: site.linkedin },
  { label: 'GitHub', text: 'github.com/FelipeGorostiaga', href: site.github },
];

export default function Contact() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  // Set synchronously, so a second submit can't slip in before React re-renders.
  const submitting = useRef(false);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus('sending');

    const result = await submitContact(values, SUBMIT_DEPS);
    submitting.current = false;
    if (result.kind === 'sent') {
      setErrors({});
      setValues(EMPTY);
      setStatus('sent');
    } else if (result.kind === 'invalid') {
      setErrors(result.fieldErrors);
      setStatus('idle');
    } else {
      setStatus('error'); // values are kept so nothing typed is lost
    }
  };

  const fieldProps = (field: Field) => ({
    name: field,
    value: values[field],
    onChange,
    className: `in ${errors[field] ? styles.invalid : ''}`,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  const errorFor = (field: Field) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <section id="contact" className={`${sectionStyles.section} ${styles.section}`}>
      <div className={styles.layout}>
        <div className={`reveal ${styles.intro}`}>
          <span className="eyebrow">Contact</span>
          <h2 className={styles.title}>
            Let&apos;s get in <span className={styles.touch}>touch.</span>
          </h2>
          <p className={styles.lead}>
            Looking for a developer, or just want to talk about the meaning of life? Send me a message.
          </p>
          <div className={styles.rows}>
            {ROWS.map((row) => (
              <a
                key={row.label}
                className={styles.row}
                href={row.href}
                {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.rowText}>
                  <span className={styles.label}>{row.label}</span>
                  <span>{row.text}</span>
                </span>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* method/action only matter before hydration: they keep a native submit from putting the fields in the URL. */}
        <form
          className={`spot still reveal ${styles.form}`}
          method="post"
          action="/api/contact"
          noValidate
          onSubmit={onSubmit}
        >
          <div className={styles.fields}>
            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input type="text" placeholder="First name" autoComplete="given-name" {...fieldProps('firstName')} />
              {errorFor('firstName')}
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Last name</span>
              <input type="text" placeholder="Last name" autoComplete="family-name" {...fieldProps('lastName')} />
              {errorFor('lastName')}
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input type="email" placeholder="you@company.com" autoComplete="email" {...fieldProps('email')} />
              {errorFor('email')}
            </label>
            <label className={styles.field}>
              <span className={styles.label}>
                Phone <span className={styles.optional}>(optional)</span>
              </span>
              <input type="tel" placeholder="+54 …" autoComplete="tel" {...fieldProps('phone')} />
              {errorFor('phone')}
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.messageHead}>
              <span className={styles.label}>Message</span>
              <span className={`mono ${styles.counter}`}>
                {values.message.length} / {CONTACT_LIMITS.messageMax}
              </span>
            </span>
            <textarea
              rows={5}
              maxLength={CONTACT_LIMITS.messageMax}
              placeholder="What's on your mind?"
              {...fieldProps('message')}
              className={`${fieldProps('message').className} ${styles.textarea}`}
            />
            {errorFor('message')}
          </label>
          <div className={styles.trap} aria-hidden="true">
            <label>
              Leave this field empty
              <input type="text" tabIndex={-1} autoComplete="off" {...fieldProps('trap')} />
            </label>
          </div>
          <div className={styles.footer}>
            <span role="status">
              {status === 'sent' && <span className={styles.status}>Thanks! I&apos;ll get back to you soon.</span>}
              {status === 'error' && (
                <span className={styles.statusError}>Couldn&apos;t send it. Email me at {site.email} instead.</span>
              )}
              {(status === 'idle' || status === 'sending') && (
                <span className={`mono ${styles.hint}`}>I usually reply within 1–2 business days.</span>
              )}
            </span>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowUpRight />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
