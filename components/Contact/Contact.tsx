import Button from '@ui/Button/Button';
import ContactForm from './Form/ContactForm';

const Contact = () => {
  return (
    <div className="max-w-5xl bg-gray-200 py-16 px-20 rounded-[36px] mt-24 dark:bg-black dark:border-2 dark:border-gray-500 shadow-xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-sans text-gray-700">Let&apos;s get in <span
          className="font-semibold text-blue-600 underline">touch.</span>
        </h1>
        <h3 className="text-xl font-sans text-gray-700">Looking for a developer or just want to have a conversation on
          the meaning of life? Send me a message!</h3>
      </div>
      <ContactForm />
      <div className="flex w-full items-center justify-end">
        <Button intent="primary" size="pill" onClick={() => alert('Clicked Send')} className="px-7 mt-10">
     Send message
        </Button>
      </div>
    </div>
  );
};

export default Contact;
