import { Grid, Segment, Header, Icon, Button, Form } from "semantic-ui-react";
import SegmentHeader from "../SegmentHeader/SegmentHeader";
import { useState } from "react";
import WrapperGrid from "../WrapperGrid/WrapperGrid";


const ForgotPasswordEmail = ({ onClickHandler }) => {
    const [email, setEmail] = useState();
    const emailHandler = (text) => {
        setEmail(text)
    }
    
        return (   
            <WrapperGrid centered columns={1}>
                <Grid.Column>
                    <Segment.Group compact>
                        <SegmentHeader icon="question circle" content="Forgot password" />
                        <Segment padded="very" className="attached">
                            <Grid >
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header>
                                            Email Verification
                                            <Header.Subheader>Please enter your email address to verify</Header.Subheader>
                                        </Header>
                                        <Form>
                                            <Form.Input
                                                onChange={e => emailHandler(e.target.value)}
                                                label="Email Id" fluid required
                                                icon={<Icon bordered name="mail outline" />}
                                                value={email}
                                                placeholder="Registered Email Address"
                                            />
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column columns={2}>
                                        <Button
                                            icon="paper plane outline"
                                            onClick={e => onClickHandler(email)}
                                            labelPosition="left"
                                            content="Send OTP"
                                            secondary />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </WrapperGrid>
        )
    }
export default ForgotPasswordEmail 