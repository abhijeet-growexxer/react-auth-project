import { Grid, Header } from "semantic-ui-react";
const NotFound = () => { 
    return (<Grid centered columns={2 }>
        <Grid.Column>
            <Header as="h2" content="Page Not Found"/>
        </Grid.Column>
    </Grid>)
}
export default NotFound