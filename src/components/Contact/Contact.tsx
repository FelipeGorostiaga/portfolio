import ContactForm from './Form/ContactForm';

const Contact = () => {
  return (
    <div className="max-w-5xl bg-gray-200 dark:bg-[#050505] rounded-xl md:rounded-[36px]
    pt-4 sm:pt-10 md:pt-16
    px-5 sm:px-10 md:px-12 lg:px-20
    mx-3 sm:mx-6 md:mx-8
     dark:sm:border
     dark:sm:border-gray-600
    dark:md:border-2
     dark:md:border-gray-600 md:shadow-xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans text-gray-700 dark:text-neutral-100">Let&apos;s get
          in <span
            className="font-semibold text-blue-600 underline">touch.</span>
        </h1>
        <h3 className="text-sm md:text-base lg:text-lg font-sans text-gray-700 dark:text-neutral-300">
            Looking for a developer or just want to have a conversation on the meaning of life?
            Send me a message!
        </h3>
      </div>
      <ContactForm />
    </div>
  );
};

export default Contact;
