import styles from './ContactForm.module.scss';
import Input from '@ui/Input';

const ContactForm = () => {
  return (
    <form className={styles.form}>
      <Input type="text" label="Name" size="fullWidth" placeholder="Enter first name" />
      <Input type="text" label="Last name" size="fullWidth" placeholder="Enter last name" />
      <Input type="email" label="Email" size="fullWidth" placeholder="Enter email" />
      <Input type="phone" label="Phone" size="fullWidth" placeholder="Enter telephone (optional)" />
      <Input type="text" label="Message" size="fullWidth" placeholder="Enter message" />
    </form>
  );
};

export default ContactForm;
