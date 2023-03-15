import AlertRail from '../AlertRail/AlertRail';
import WrapperGrid from '../WrapperGrid/WrapperGrid';
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import VerifyEmail from "../SignUpPage/VerifyEmail";
import ResetPassword from "./ResetPassword";
import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react"
import axios from "axios";

const emailRegex = /^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/;

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1)
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

    const sendOTP = async (email) => {
        if (emailRegex.test(email)) {
            setEmail(email)
            try {
                const requestOTP = await axios.post(`http://localhost:5000/auth/forgot-password/${email}`);
                if (requestOTP.status === 201) {
                    setStep(2)
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
        } else { 
            setAlertActive((prevState) => {
                return {
                    ...prevState,
                    isHidden: false,
                    icon: "times circle outline",
                    header: `Invalid email Id `,
                    message: `not a valid Email id format`
                }
            })
        }
    }
    
    const editEmail = (stepNumber) => { 
        setStep(stepNumber)
    }

    return (
        <WrapperGrid centered columns={2}>
            {alertActive ? <AlertRail active={ alertActive } /> : null} 
            <Grid.Column>
                {step === 1 ? <ForgotPasswordEmail email={email} onClickHandler={sendOTP} /> : step === 2 ? <VerifyEmail email={email} editEmailHandler={ editEmail } /> : <ResetPassword />}
            </Grid.Column>
        </WrapperGrid>
    )
}
export default ForgotPasswordPage 