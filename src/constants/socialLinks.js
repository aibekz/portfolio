import { HiMail } from 'react-icons/hi';
import { SiGithub, SiLinkedin } from 'react-icons/si';

export const socialLinks = [
  { 
    href: '/contact', 
    icon: HiMail, 
    label: 'Email', 
    color: 'hover:text-linkblue', 
    isInternal: true 
  },
  { 
    href: 'https://github.com/aibekz', 
    icon: SiGithub, 
    label: 'GitHub', 
    color: 'hover:text-linkblue' 
  },
  { 
    href: 'https://linkedin.com/in/aibekz', 
    icon: SiLinkedin, 
    label: 'LinkedIn', 
    color: 'hover:text-linkblue' 
  }
];
