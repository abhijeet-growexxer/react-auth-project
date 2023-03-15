import { Segment, Header, Image, Grid} from "semantic-ui-react"
const GetUser = ({ user }) => {
    console.log("cehck "+ user.name)
    return (
        <Segment>
            <Grid columns={2}>
                <Grid.Column width={4}>
                    <Image rounded src={ user.avatar}/>
                </Grid.Column>
                <Grid.Column>
                    <Header  content={ user.name} subheader={user._id} />
                    <p>{user.email}</p>
                </Grid.Column>
            </Grid>
            
        </Segment>
    )
}
export default GetUser;