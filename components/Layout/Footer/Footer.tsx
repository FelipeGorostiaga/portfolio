import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import { externalUrls } from '../../../utils/constants/urls';
import { useState } from 'react';


const Footer = () => {
  const [isLinkedinHovered, setIsLinkedinHovered] = useState<boolean>(false);
  const [isEmailHovered, setIsEmailHovered] = useState<boolean>(false);
  const linkedinColor = isLinkedinHovered ? '#0E76A8' : '#171515';

  return (
    <div
      className="bg-neutral-100 w-full flex flex-row items-center gap-40 justify-center h-[70px] border-t-2 border-t-neutral-200 absolute bottom-0">
      <span className="text-sans font-light text-sm">© 2023 Felipe Gorostiaga</span>
      <a className="flex flex-row gap-2 items-center"
         href={externalUrls.linkedin}
         target="_blank"
         rel="noopener noreferrer"
         onMouseEnter={() => setIsLinkedinHovered(true)}
         onMouseLeave={() => setIsLinkedinHovered(false)}
      >
        <LinkedInIcon fontSize='small' style={{ color: linkedinColor }} />
        <div className="text-sans font-light text-sm hover:text-gray-600">Linkedin</div>
      </a>
      <a className="flex flex-row gap-2 items-center" href={externalUrls.github} target="_blank"
         rel="noopener noreferrer">
        <GitHubIcon fontSize='small' style={{ color: '#171515' }} />
        <div className="text-sans font-light text-sm hover:text-gray-600">Github</div>
      </a>
      <a className="flex flex-row gap-2 items-center" href={`mailto:${externalUrls.github}`} target="_blank"
         rel="noopener noreferrer"
         onMouseEnter={() => setIsEmailHovered(true)}
         onMouseLeave={() => setIsEmailHovered(false)}>
        {!isEmailHovered? <EmailIcon fontSize='small'/> : <DraftsIcon fontSize='small'/>}
        <div className="text-sans font-light text-sm hover:text-gray-600">fgorostiagabraun@gmail.com</div>
      </a>
    </div>
  );
};

export default Footer;
