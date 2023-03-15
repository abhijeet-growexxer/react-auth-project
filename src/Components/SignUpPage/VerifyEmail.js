import { Grid, Segment, Header, Input, Button, Icon} from 'semantic-ui-react';
import SegmentHeader from '../SegmentHeader/SegmentHeader';
import WrapperGrid from '../WrapperGrid/WrapperGrid';
import { useState, useEffect } from "react";
import AlertRail from '../AlertRail/AlertRail';
import axios from 'axios'

const VerifyEmail = ({ email, editEmailHandler }) => {
    const [otp, setOTP] = useState("")
    const [alertActive, setAlertActive] = useState({
        isHidden: true,
        icon: '',
        header: '',
        message: ''
    });

    useEffect(() => { 
        if (alertActive) { 
            const timer = setTimeout(() => { 
                setAlertActive((prevState) => { 
                    return {
                        ...prevState,
                        isHidden: true,
                        icon: '',
                        header: '',
                        message:''
                    }
                })
            }, 2000)
            return () => clearTimeout(timer)
        }
    },[alertActive])

    const onChangeHandler = (text) => { 
        setOTP(text)
    }
    const checkOTP = async(text) => { 
        try {
            if (text !== '') {
                const verifyOTP = await axios.post(`http://localhost:5000/auth/reset-confirm-otp/${email}/${text}`)
                localStorage.setItem('tokens', JSON.stringify(verifyOTP.data))
                editEmailHandler(3)
            } else { 
                setAlertActive((prevState) => {
                    return {
                        ...prevState,
                        isHidden: false,
                        icon: "times circle outline",
                        header: `Invalid OTP `,
                        message: `OTP cannot be blank`
                    }
                })
            }
            
        } catch (err) {
            setAlertActive((prevState) => {
                return {
                    ...prevState,
                    isHidden: false,
                    icon: "times circle outline",
                    header: `${err.response.data.statusCode}: ${err.response.data.error} `,
                    message: err.response.data.message
                }
            })
        }
    }
    return (
        <WrapperGrid columns={1}>
            <Grid.Row stretched>
                <Grid.Column>
                {alertActive ? <AlertRail active={ alertActive } /> : null} 
                </Grid.Column>
            </Grid.Row>
            <Grid.Column>
                <Segment.Group>
                    <SegmentHeader content="Very Email Address" icon={<Icon name='mail square' />} />
                    <Segment padded="very" className="attached">
                        <Grid centered>
                            <Grid.Row>
                                <Header textAlign="left">
                                    Please Verfiy Your Email Id
                                    <Header.Subheader>
                                        Please verify the Otp sent to <b>{email}</b><Icon color="black" name="edit" link onClick={ e=>editEmailHandler(1) } />
                                    </Header.Subheader>
                                </Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input
                                    onChange={e => onChangeHandler(e.target.value) }
                                    value={ otp }
                                    action={
                                        <Button color="black" content="submit" onClick={e => checkOTP(otp)} />
                                    }
                                    type="text"
                                    placeholder="One Time Password">
                                </Input>  
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
        </WrapperGrid>
    )
}

export default VerifyEmail        