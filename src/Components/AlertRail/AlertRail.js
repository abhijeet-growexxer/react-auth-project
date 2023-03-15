import { Rail } from "semantic-ui-react";
import "./AlertRail.css";
import { Segment, Message } from  "semantic-ui-react"
const AlertRail = ({ active }) => {
    const { isHidden, header, icon, message } = active
    return (
        <Rail className="margin" close={"very"} hidden={ isHidden } internal position="right">
            <Segment basic>
                <Message
                    color="black"
                    size='mini'
                    icon={icon}
                    header={header}
                    content={ message }
                />
            </Segment>
        </Rail>
    )
}
export default AlertRail