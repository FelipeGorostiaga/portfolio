import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import { externalUrls } from '../../../utils/constants/urls';
import { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';


const Footer = () => {
  const { isDark } = useTheme();
  const [isLinkedinHovered, setIsLinkedinHovered] = useState<boolean>(false);
  const [isEmailHovered, setIsEmailHovered] = useState<boolean>(false);
  const iconColor = isDark ? 'white' : '#171515';
  const linkedinColor = isDark ? 'white' : (isLinkedinHovered ? '#0E76A8' : '#171515');

  return (
    <div
      className="bg-neutral-100 w-full flex flex-row items-center gap-36 justify-center h-16 border-t-2 border-t-neutral-200 absolute bottom-0 dark:bg-neutral-900 dark:border-gray-600">
      <span className="text-sans font-light text-sm dark:text-gray-200">© 2023 Felipe Gorostiaga</span>
      <a className="flex flex-row gap-2 items-center"
         href={externalUrls.linkedin}
         target="_blank"
         rel="noopener noreferrer"
         onMouseEnter={() => setIsLinkedinHovered(true)}
         onMouseLeave={() => setIsLinkedinHovered(false)}
      >
        <LinkedInIcon fontSize="small" style={{ color: linkedinColor }} />
        <div
          className="text-sans font-light text-sm hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50">Linkedin
        </div>
      </a>
      <a className="flex flex-row gap-2 items-center" href={externalUrls.github} target="_blank"
         rel="noopener noreferrer">
        <GitHubIcon fontSize="small" style={{ color: iconColor }} />
        <div
          className="text-sans font-light text-sm hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50">Github
        </div>
      </a>
      <a className="flex flex-row gap-2 items-center" href={`mailto:${externalUrls.github}`} target="_blank"
         rel="noopener noreferrer"
         onMouseEnter={() => setIsEmailHovered(true)}
         onMouseLeave={() => setIsEmailHovered(false)}>
        {!isEmailHovered ? <EmailIcon fontSize="small" style={{ color: iconColor }} /> :
          <DraftsIcon fontSize="small" style={{ color: iconColor }} />}
        <div
          className="text-sans font-light text-sm hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50">fgorostiagabraun@gmail.com
        </div>
      </a>
    </div>
  );
};

export default Footer;
