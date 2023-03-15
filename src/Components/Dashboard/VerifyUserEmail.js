import { Button, Segment, Form, Icon, Header } from "semantic-ui-react";
import { useState, useEffect } from "react";
import AlertModal from "./AlertModal"
import axios from "axios";

const VerifyUserEmail = ({ email, verified }) => {
    const [emailId, setEmailId] = useState("");
    const [emailSent, setEmailSent] = useState(false)
    const [open, setOpen] = useState(false)
    const [emailVerified,setEmailVerified] = useState(false)
    useEffect(() => { 
        setEmailId(email)
        setEmailVerified(verified)
    }, [email, verified])

    const [otp, setOTP] = useState("")
    const verifyOTP = async() => { 
        try {
            const verifyUser = await axios.post(`http://localhost:5000/auth/verify-otp/${otp}`, {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokens')).accessToken}`
                }
            })
            if (verifyUser.status === 201) { 

            }
        } catch (err) { 
            console.log(err)
        }
    }
    const sendOTP = async () => { 
        
        try {
            const sendEmail = await axios.patch(`http://localhost:5000/profile/${emailId}/update-email/`, {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokens')).accessToken}`
                }
            })
            if (sendEmail.status === 200) { 
                setEmailSent(true)
            }
        } catch (err) { 
            console.log(err)
        }
    }
    const verifyUpdateEmailOTP = async() => { 
        const data = {
            email: emailId,
            otp: otp
        }
        try {
            const verifyNewEmail = await axios.post(`http://localhost:5000/profile/verify-new-email/`, data, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokens')).accessToken}`
                }
            })
            if (verifyNewEmail.status === 201) { 
                setOpen(true)
                setEmailVerified(true)

            }
        } catch (err) { 
            console.log(err)
        }
    }
    return (
        <Segment>
            <AlertModal isOpen={open} header="Email Verified" />
            <Form>
                {verified ? <><Form.Input
                    width={9}
                    value={emailId}
                    onChange={e => setEmailId(e.target.value)}
                    label="Registered Email Id"
                    action={<Button color="black" disabled = {emailSent ? true: false} onClick= {sendOTP } content="send otp"/>}
                />
                </>
                    : <Header subheader={`OTP sent to ${email}`} />}
                    {!emailVerified || emailSent ? <>
                        <Form.Input width={8} onChange={(e) => { setOTP(e.target.value) }} placeholder="otp" value={otp} label="6 Digit OTP" icon={<Icon bordered name="keyboard" />} />
                        <Button onClick={emailSent ? verifyUpdateEmailOTP : verifyOTP} secondary>Verify OTP</Button>
                    </> : null}
            </Form>
        </Segment>
    )
}
export default VerifyUserEmail