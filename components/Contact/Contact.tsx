import Button from '@ui/Button/Button';
import { InputRounded } from '@mui/icons-material';

const Contact = () => {
  return (
    <div className="max-w-5xl bg-gray-200 py-16 px-20 rounded-[36px] mt-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-sans text-gray-700">Let's get in <span className="font-semibold text-blue-600 underline">touch.</span></h1>
          <h3 className="text-xl font-sans text-gray-700">Looking for a developer or just want to have a conversation on the meaning of life? Send me a message!</h3>
        </div>
      <form className="mt-20 w-full bg-gray-300 h-">
      </form>
      <div>
        <Button intent='primary' size='content' onClick={() => alert('Clicked Send')}>Send</Button>
      </div>
    </div>
  );
};

export default Contact;
