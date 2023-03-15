import { Grid, Segment, Form, Icon, Button } from 'semantic-ui-react';
import WrapperGrid from '../WrapperGrid/WrapperGrid';
import ConfirmPasswordFields from './ConfirmPasswordFields';
import AuthNavigationLinks from '../AuthNavigationLinks/AuthNavigationLinks';
import SegmentHeader from '../SegmentHeader/SegmentHeader';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"


const SignUpForm = () => {
    const navigate = useNavigate();
    const [formInputs, setFormInputs] = useState(
        {
            username: "",
            name: "",
            email: "",
            phone: "",
            password: ""
          }
    );
    const getPasswords = (passwords) => { 
        const { password, confirmPassword } = passwords;
        if (password !== '' && confirmPassword !== '' && password === confirmPassword) { 
            setFormInputs((prevState) => {
                return {...prevState, password}
            })
        }
    }
    const setInput = (attribute, e) => { 
        setFormInputs((prevState) => { 
            return {
                ...prevState,
                [attribute]: e.target.value
            }
        })
    }
    const registerUser = async() => {
        try {
            const addUser = await axios.post('http://localhost:5000/auth/register', formInputs, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (addUser.status === 201) { 
                navigate('/login')
            }
        } catch (err) { 
            console.log(err)
        }
    }
    return (
        <WrapperGrid columns={2}>
            <Grid.Column>
                <Segment.Group>
                    <SegmentHeader icon='address card' content="Sign Up" />
                    <Form className="attached fluid segment padded" padded='very'>
                        <Form.Input
                            value={formInputs.name}
                            required onChange={(e) => { setInput('name', e) }}
                            name="fullName"
                            label='Full Name'
                            icon={<Icon bordered name="user outline" />}
                            placeholder="  Full Name" />
                        <Form.Group>
                            <Form.Input value={formInputs.email} onChange={(e) => { setInput('email', e) }}
                                required
                                width={8}
                                name="email"
                                icon={<Icon bordered name="mail outline" />}
                                label='Email Address'
                                placeholder="Email" />
                            <Form.Input
                                value={formInputs.username}
                                required onChange={(e) => { setInput('username', e) }}
                                name="username"
                                width={8}
                                icon={<Icon bordered name="id badge outline" />}
                                label='Username'
                                placeholder="Username" />
                        </Form.Group>
                        <Form.Input
                            required
                            onChange={(e) => { setInput('phone', e) }}
                            label="Phone number"
                            name="phoneNumber"
                            placeholder="Phone number"
                            width={16}
                            icon={<Icon bordered name="mobile" />} />
                        <ConfirmPasswordFields fetchPasswordHandler={getPasswords} />
                        <Button color="black" content="Submit"  icon="arrow alternate circle right outline" labelPosition="right" onClick={(e) => registerUser()} />
                    </Form>
                    <AuthNavigationLinks message="Already have an account?" linkTo="/login" text="Log in"/>
                </Segment.Group>
            </Grid.Column>
        </WrapperGrid>
    )
}

export default SignUpForm        