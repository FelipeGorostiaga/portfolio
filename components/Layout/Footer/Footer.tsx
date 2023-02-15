import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { externalUrls } from '../../../utils/constants/urls';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-neutral-100 w-full flex flex-row items-center gap-40 justify-center h-[80px] border-t-2 border-t-neutral-200 absolute bottom-0">
      <div>Felipe Gorostiaga <CopyrightIcon fontSize='small' style={{ color: '#2B2B2B' }}/></div>
      <a className="flex flex-row gap-2" href={externalUrls.linkedin} target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
        <div>Linkedin</div>
      </a>
      <div className="flex flex-row gap-2">
        <GitHubIcon />
        <div>Github</div>
      </div>
    </div>
  );
};

export default Footer;
