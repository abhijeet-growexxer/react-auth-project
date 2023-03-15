import { Form, Icon } from 'semantic-ui-react';
import { useState } from "react";

const Password = ({ changeHandler }) => {
    const [visible, setVisible] = useState("eye slash outline")
    const [inputType, setInputType] = useState("password")
    const [password, setPassword] = useState("")
    const handlePasswordVisible = () => {
        if (visible === "eye slash outline") { 
            setVisible("eye")
            setInputType("text")
        }
        if (visible === "eye") { 
            setVisible("eye slash outline")
            setInputType("password")

        }
    }
    const handleChange = (e) => {
        setPassword(e.target.value)
        changeHandler(e.target.value)
    }

    return (
        <Form.Input
            label='Password'
            onChange={e => { handleChange(e) }}
            onBlur={e => { handleChange(e) }}
            required
            value={password}
            type={inputType}
            icon={<Icon bordered color="black" name={visible} onClick={(e) => handlePasswordVisible()} link />}
            placeholder="Password"
            autoComplete="on" />
    )
}

export default Password