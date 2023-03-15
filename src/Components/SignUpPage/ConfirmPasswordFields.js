import { Form } from 'semantic-ui-react';
import Password from "../Password/Password";
import { useState } from "react"
const ConfirmPasswordFields = ({ fetchPasswordHandler }) => {
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword : ''
    });

    const sendPassword = (password) => {
        setPasswords((prevState) => { return { ...prevState, ...password } })
        fetchPasswordHandler(passwords)
    }

    return (
        <Form.Field >
            <Password changeHandler={(password) => { sendPassword({ password }) }} />
            <Form.Input
                value={passwords.confirmPassword}
                onChange={e => sendPassword({ confirmPassword: e.target.value })}
                onBlur={e => sendPassword({ confirmPassword: e.target.value })}
                label = 'Confirm Password' 
                placeholder = "Confirm your password" 
                type="password"
                required
                autoComplete = "on" />
        </Form.Field>
    )
}
export default ConfirmPasswordFields