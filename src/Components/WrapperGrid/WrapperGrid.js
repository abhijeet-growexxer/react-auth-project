import { Grid } from "semantic-ui-react";
import "./WrapperGrid.css";

const WrapperGrid = ({ columns, children}) => {
    return (
        <Grid columns={columns} centered className="container">
            { children }
        </Grid>
    )
}

export default WrapperGrid