import React from "react"
import {FaFacebook,FaTwitter,FaGithub,FaLinkedin,FaInstagram} from 'react-icons/fa'

const SocialIconLinks = ({ iconClasses }) => {

  return (
    <>
      <a href="https://github.com/hari-bhandari" target="_blank" rel="noopener noreferrer">
        <FaGithub height={'31.665px'} width={'31.665px'} className={iconClasses}/>
        </a>
      <a href="https://www.linkedin.com/in/haribhandari0" target="_blank" rel="noopener noreferrer">
        <FaLinkedin height={'31.665px'} width={'31.665px'} className={iconClasses}/>
      </a>
      <a href="https://twitter.com/_hari_bhandari" target="_blank" rel="noopener noreferrer">
        <FaTwitter height={'31.665px'} width={'31.665px'} className={iconClasses}/>
      </a>
      <a href="https://www.instagram.com/_hari_bhandari" target="_blank" rel="noopener noreferrer">
        <FaInstagram height={'31.665px'} width={'31.665px'} className={iconClasses}/>
      </a>
      <a href="https://www.facebook.com/haribhandari.me" target="_blank" rel="noopener noreferrer">
        <FaFacebook height={'31.665px'} width={'31.665px'} className={iconClasses}/>
      </a>
    </>
  )
}

export default SocialIconLinks
