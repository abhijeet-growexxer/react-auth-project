import { Header, Segment, Icon } from "semantic-ui-react"
const SegmentHeader = ({ icon, content }) => { 
    return (
        <Segment attached  >
            <Header icon={<Icon name={icon} />} content={ content} />
        </Segment>
    )
}
export default SegmentHeader;