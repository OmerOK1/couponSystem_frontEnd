
import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer flex-around">
			<span id="p1">All rights reserved to Omer Keidar &copy;</span>
            <SocialMedia/>
        </div>
    );
}

export default Footer;
