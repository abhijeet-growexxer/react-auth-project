import { Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import './AuthNavigationLinks.css'
const AuthNavigationLinks = ({ message, linkTo, text}) => { 
    return (
        <Segment padded attached="bottom">
            { message}
            <Link to={linkTo} className="link">{ text }</Link>
        </Segment>
    )
}
export default AuthNavigationLinks;