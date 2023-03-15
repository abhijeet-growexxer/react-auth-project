import './LoginPage.css';
import Password from '../Password/Password';
import WrapperGrid from "../WrapperGrid/WrapperGrid";
import AuthNavigationLinks from '../AuthNavigationLinks/AuthNavigationLinks';
import SegmentHeader from '../SegmentHeader/SegmentHeader';
import { Grid, Segment, Form, Icon, Button } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import AlertRail from '../AlertRail/AlertRail';
const emailRegex = /^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/

const LoginPage = () => {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        username: '',
        email: '',
        password: ''
    })
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
    const usernameorEmailHandler = (text) => {
        let username = null;
        let email = null;
        if (emailRegex.test(text)) {
            email = text
        } else { 
            username = text
        }

        setUserInput((prevState) => { 
            return {...prevState, username, email}
        })
    }

    const passwordHandler = (text) => { 
        setUserInput((prevState) => { 
            return {...prevState, password: text}
        })
    }

    const requestlogin = async (e, userInput) => {
        e.preventDefault()
        try {
            const loginRequest = await axios.post("http://localhost:5000/auth/login", userInput)
            const { status, data } = await loginRequest
            if (status === 201) { 
                localStorage.setItem("tokens", JSON.stringify(data))
                navigate('/dashboard')
            }
        }
        catch (err) {
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
        <WrapperGrid columns={3}>
            {alertActive ? <AlertRail active={ alertActive } /> : null} 
            <Grid.Column >
                <Segment.Group>
                    <SegmentHeader icon="user circle" content="Login" />
                    <Form className="attached fluid segment padded" padded='very'>
                        <Form.Input
                            onChange={e => usernameorEmailHandler(e.target.value)}
                            value={userInput.username || userInput.email}
                            icon={<Icon color="black" bordered name="mail outline" />}
                            required
                            label='Username or Email' placeholder="Username or Email" />
                        <Password changeHandler={passwordHandler} inputValue={ userInput.password} />
                        <Link href="#" className="link forgot-password" to="/forgot-password"> Forgot password?</Link>
                        <Button type="submit" onClick={ e=>requestlogin(e, userInput)} content="Log In" color="black" fluid />
                    </Form>
                    <AuthNavigationLinks message="Don't have an account?" linkTo="/register" text=" SignUp"/>
                </Segment.Group>
            </Grid.Column>
        </WrapperGrid>
    )
}

export default LoginPage        