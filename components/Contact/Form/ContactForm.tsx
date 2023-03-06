import styles from './ContactForm.module.scss';
import Input from '@ui/Input';
import useBreakpoints from '../../../hooks/useBreakpoints';

const ContactForm = () => {
  const { lg } = useBreakpoints();
  return (
    <form className={styles.form}>
      <Input type="text" label="Name" size="fullWidth" placeholder="Enter first name" />
      <Input type="text" label="Last name" size="fullWidth" placeholder="Enter last name" />
      <Input type="email" label="Email" size="fullWidth" placeholder="Enter email" />
      <Input type="phone" label="Phone" size="fullWidth" placeholder="Enter telephone (optional)" />
      <Input type="text" label="Message" size="fullWidth" placeholder="Enter message"
             containerClassName={!lg ? 'col-span-2' : ''}
             className="resize-none"
             multiline
             rows={3}
      />
    </form>
  );
};

export default ContactForm;
