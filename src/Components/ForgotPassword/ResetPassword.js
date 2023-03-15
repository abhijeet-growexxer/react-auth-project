import { Segment, Form, Grid, Button } from "semantic-ui-react";
import SegmentHeader from "../SegmentHeader/SegmentHeader";
import ConfirmPasswordFields from "../SignUpPage/ConfirmPasswordFields";
import WrapperGrid from "../WrapperGrid/WrapperGrid";
import AlertRail from "../AlertRail/AlertRail";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

const ResetPassword = () => {
    const navigate = useNavigate()
    const [resetPassword, setResetPassword] = useState("")
    const [resetConfirmPassword, setResetConfirmPassword] = useState("");
    const [alertActive, setAlertActive] = useState({
        isHidden: true,
        icon: '',
        header: '',
        message: ''
    });

    const getPassword = (passwords) => { 
        if (passwords) { 
            const { password, confirmPassword } = passwords
            setResetPassword(password.trim())
            setResetConfirmPassword(confirmPassword.trim())
        }
        
    }
    const setPassword = async(password, confirmPassword) => { 
        if (password !== "" && confirmPassword !== "" && password === confirmPassword) {
            try {
                const accessToken = JSON.parse(localStorage.getItem("tokens")).accessToken
                const updatePassword = await axios.patch(`http://localhost:5000/auth/update-password/${password}`, {} , {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (updatePassword.status === 200) {
                    localStorage.removeItem('tokens')
                    navigate('/login')
                }
            } catch (err) { 
                console.log(err)
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
        if (password !== confirmPassword) { 
            setAlertActive((prevState) => { 
                return {
                    ...prevState,
                    isHidden: false,
                    icon: "times circle outline",
                    header: `Passwords did not match `,
                    message: `Please provide the same passwords both fields`
                }
            })
        }
    }

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
    }, [alertActive])
    
    return (
        <WrapperGrid centered columns={1} className="container">
            <Grid.Row stretched>
                <Grid.Column>
                {alertActive ? <AlertRail active={ alertActive } /> : null} 
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column >
                    <Segment.Group>
                        <SegmentHeader content="Set New Password" icon="key"/>
                        <Segment padded="very" className="attached">
                            <Form>
                                <ConfirmPasswordFields fetchPasswordHandler={getPassword} />
                                <Button icon="key" onClick={ e => setPassword(resetPassword, resetConfirmPassword) } content="Reset password" labelPosition="right" secondary />
                            </Form>
                        </Segment>  
                    </Segment.Group>
                </Grid.Column>
            </Grid.Row>
        </WrapperGrid>
    )
}
export default ResetPassword