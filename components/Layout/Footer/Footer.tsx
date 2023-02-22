import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import { externalUrls } from '../../../utils/constants/urls';
import { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import useBreakpoints from '../../../hooks/useBreakpoints';


const Footer = () => {
  const { isDark } = useTheme();
  const { sm } = useBreakpoints();
  const [isLinkedinHovered, setIsLinkedinHovered] = useState<boolean>(false);
  const [isEmailHovered, setIsEmailHovered] = useState<boolean>(false);
  const iconColor = isDark ? 'white' : '#171515';
  const linkedinColor = isDark ? 'white' : (isLinkedinHovered ? '#0E76A8' : '#171515');

  const iconTexts = {
    linkedin: sm ? '' : 'Linkedin',
    email: sm ? '' : 'fgorostiagabraun@gmail.com',
    github: sm ? '' : 'Github',
    inc: sm ? '© 2023' : '© 2023 Felipe Gorostiaga',
  };

  return (
    <div
      className="bg-neutral-100 w-full flex flex-row items-center gap-1 justify-around md:justify-center md:gap-20 lg:gap-40 2xl:gap-60 h-16 border-t-2 border-t-neutral-200 dark:bg-neutral-900 dark:border-gray-600">
      {!sm && <span className="text-sans font-light text-xs md:text-sm dark:text-gray-200">{iconTexts.inc}</span>}
      <a className="flex flex-row gap-2 items-center"
         href={externalUrls.linkedin}
         target="_blank"
         rel="noopener noreferrer"
         onMouseEnter={() => setIsLinkedinHovered(true)}
         onMouseLeave={() => setIsLinkedinHovered(false)}
      >
        <LinkedInIcon fontSize="small" style={{ color: linkedinColor }} />
        <div
          className="text-sans font-light text-xs md:text-sm hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50">
          {iconTexts.linkedin}
        </div>
      </a>
      <a className="flex flex-row gap-2 items-center" href={externalUrls.github} target="_blank"
         rel="noopener noreferrer">
        <GitHubIcon fontSize="small" style={{ color: iconColor }} />
        <div
          className="text-sans font-light text-xs md:text-sm hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50">
          {iconTexts.github}
        </div>
      </a>
      <a className="flex flex-row gap-2 items-center" href={`mailto:${externalUrls.email}`} target="_blank"
         rel="noopener noreferrer"
         onMouseEnter={() => setIsEmailHovered(true)}
         onMouseLeave={() => setIsEmailHovered(false)}>
        {!isEmailHovered ? <EmailIcon fontSize="small" style={{ color: iconColor }} /> :
          <DraftsIcon fontSize="small" style={{ color: iconColor }} />}
        <div
          className="text-sans font-light text-xs md:text-sm hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50">
          {iconTexts.email}
        </div>
      </a>
    </div>
  );
};

export default Footer;
