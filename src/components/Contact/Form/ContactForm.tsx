import styles from './ContactForm.module.scss';
import Input from '@ui/Input';
import useBreakpoints from '../../../hooks/useBreakpoints';
import useInput from '../../../hooks/useInput';
import { z } from 'zod';
import { validateInput } from '~/utils/lib/string';
import Button from '@ui/Button/Button';
import { useMemo, useState, type MouseEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTheme } from '~/contexts/ThemeContext';

const MIN_NAME = 1;
const MAX_NAME = 30;
const MIN_MESSAGE = 20;
const MAX_MESSAGE = 300;

export const nameSchema = z.string().min(MIN_NAME).max(MAX_NAME);
export const emailSchema = z.string().email();
export const messageSchema = z.string().min(MIN_MESSAGE).max(MAX_MESSAGE);
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function getEmailErrorMessage(value: string) {
  if (!value || !value.length) {
    return 'Required';
  }
  return 'Invalid email';
}

function getStringErrorMessage(value: string, min?: number, max?: number): string {
  if (!value || !value.length) {
    return 'Required';
  }
  if (min && value.length < min) {
    return `Min. ${min} characters`;
  }
  if (max && value.length > max) {
    return `Max. ${max} characters`;
  }
  return '';
}

function validatePhone(phone: string): boolean {
  if (!phone || phone === '') {
    return true;
  }
  return phoneRegExp.test(phone);
}

const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { sm, lg } = useBreakpoints();
  // First name
  const {
    value: name,
    valid: nameValid,
    error: nameError,
    valueChangeHandler: onChangeName,
    inputBlurHandler: onBlurName,
    reset: resetName,
  } = useInput((value) => validateInput(value, nameSchema));
  // Last name
  const {
    value: lastname,
    valid: lastnameValid,
    error: lastnameError,
    valueChangeHandler: onChangeLastname,
    inputBlurHandler: onBlurLastname,
    reset: resetLastname,
  } = useInput((value) => validateInput(value, nameSchema));
  // Email
  const {
    value: email,
    valid: emailValid,
    error: emailError,
    valueChangeHandler: onChangeEmail,
    inputBlurHandler: onBlurEmail,
    reset: resetEmail,
  } = useInput((value) => validateInput(value, emailSchema));
  // Telephone
  const {
    value: phone,
    valid: phoneValid,
    error: phoneError,
    valueChangeHandler: onChangePhone,
    inputBlurHandler: onBlurPhone,
    reset: resetPhone,
  } = useInput((value) => validatePhone(value));
  // Message
  const {
    value: message,
    valid: messageValid,
    error: messageError,
    valueChangeHandler: onChangeMessage,
    inputBlurHandler: onBlurMessage,
    reset: resetMessage,
  } = useInput((value) => validateInput(value, messageSchema));

  const [sendingMessage, setSendingMessage] = useState(false);
  const { isDark } = useTheme();

  const isFormValid: boolean = useMemo(() => nameValid && lastnameValid && emailValid && messageValid && phoneValid,
    [nameValid, lastnameValid, emailValid, phoneValid, messageValid]);

  const toastStyle = useMemo(() => {
    return isDark ? { color: '#f3f4f6', backgroundColor: '#171717' } : {};
  }, [isDark]);

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      setFormSubmitted(true);
      return;
    }
    const payload = {
      name: `${name} ${lastname}`,
      message,
      email,
      phone: phone || null,
    };
    try {
      setSendingMessage(true);
      await axios.post('/api/contact', payload);
      toast.success('Message sent', {
        style: toastStyle,
      });
    } catch (e) {
      toast.error('Error: contact me directly at fgorostiagabraun@gmail.com', {
        style: toastStyle,
      });
    }
    setSendingMessage(false);
    setFormSubmitted(false);
    resetForm();
  };

  const resetForm = () => {
    resetName();
    resetLastname();
    resetEmail();
    resetPhone();
    resetMessage();
  };

  const nameErrorMessage = useMemo(() => {
    if (nameError) {
      return getStringErrorMessage(name, MIN_NAME, MAX_NAME);
    }
  }, [nameError, name]);

  const lastNameErrorMessage = useMemo(() => {
    if (lastnameError) {
      return getStringErrorMessage(lastname, MIN_NAME, MAX_NAME);
    }
  }, [lastnameError, lastname]);

  const emailErrorMessage = useMemo(() => {
    if (emailError) {
      return getEmailErrorMessage(email);
    }
  }, [emailError, email]);

  const messageErrorMessage = useMemo(() => {
    if (messageError) {
      return getStringErrorMessage(message, MIN_MESSAGE, MAX_MESSAGE);
    }
  }, [messageError, message]);

  const phoneErrorMessage = useMemo(() => {
    if (phoneError) {
      return 'Invalid format';
    }
  }, [phoneError]);

  return (
    <form className={styles.form}>
      <Input value={name}
             onChange={onChangeName}
             onBlur={onBlurName}
             error={nameError || (formSubmitted && !nameValid)}
             type="text"
             label="Name"
             size="fullWidth"
             errorMessage={nameErrorMessage}
             placeholder="Enter first name"
      />
      <Input value={lastname}
             onChange={onChangeLastname}
             onBlur={onBlurLastname}
             error={lastnameError || (formSubmitted && !lastnameValid)}
             type="text"
             label="Last name"
             size="fullWidth"
             errorMessage={lastNameErrorMessage}
             placeholder="Enter last name" />
      <Input value={email}
             onChange={onChangeEmail}
             onBlur={onBlurEmail}
             error={emailError || (formSubmitted && !emailValid)}
             type="email"
             label="Email"
             size="fullWidth"
             errorMessage={emailErrorMessage}
             placeholder="Enter email" />
      <Input value={phone}
             onChange={onChangePhone}
             onBlur={onBlurPhone}
             error={phoneError || (formSubmitted && !phoneValid)}
             type="phone"
             label="Phone"
             errorMessage={phoneErrorMessage}
             size="fullWidth"
             placeholder="Enter telephone (optional)" />
      <Input value={message}
             onChange={onChangeMessage}
             onBlur={onBlurMessage}
             error={messageError || (formSubmitted && !messageValid)}
             type="text"
             label="Message"
             size="fullWidth"
             placeholder="Enter message"
             containerClassName={!lg ? 'col-span-2' : ''}
             className="resize-none"
             errorMessage={messageErrorMessage}
             maxCharacters={300}
             multiline
             rows={3} />
      <div className={`${!lg ? 'col-span-2' : ''} flex w-full items-center justify-end pb-6 lg:pb-8`}>
        <Button
          loading={sendingMessage}
          type="submit"
          intent="primary"
          onClick={handleSubmit}
          size={sm ? 'fullWidth' : 'pill'}
          className={sm ? 'rounded-2xl' : 'px-12'}>
          {sendingMessage ? 'Sending...' : 'Send message'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
