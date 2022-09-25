import "./SocialMedia.css";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
            <a href="https://www.facebook.com/omerkeidar95"><BsFacebook size={42} /></a>
            <a href="https://www.linkedin.com/in/omer-keidar7/"><BsLinkedin size={42} /></a>
            <a href="https://github.com/OmerOK1"><BsGithub size={42} /></a>
            <a href="https://www.instagram.com/omer_keidar_/"><BsInstagram size={42} /></a>
        </div>
    );
}


export default SocialMedia;