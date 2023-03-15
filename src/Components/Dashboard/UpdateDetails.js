import { Segment, Button, Form, Icon, Grid } from "semantic-ui-react";
import { useState, useEffect } from "react";
import AlertModal from "./AlertModal";
import axios from "axios"
const UpdateDetails = ({ user }) => {
    const[open,setOpen] = useState(false)
    const [details, setDetails] = useState({ 
        name: user.name,
        username: user.username,
        phone: user.phone
    })
    useEffect(() => { 
        setDetails((prevState) => {
            return {...prevState, username: user.username, name:user.name, phone: user.phone}
        })
    }, [user])

    const setInput = (attribute, e) => { 
        setDetails((prevState) => { 
            return {...prevState, [attribute]:e.target.value}
        })
    }

    const updateDetails = async() => {
        console.log(details)
        try {
            const updateData = await axios.patch('http://localhost:5000/profile/update-details', details ,{
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokens')).accessToken}`
                }
            })
            if (updateData.status === 200) { 
                setOpen(true)
            }
        } catch (err) { 
            console.log(err)
        }
    }

    return (
        <Grid >
            <AlertModal isOpen={open} header="User details updated" />
            <Grid.Column width={10 }>
                <Segment>
                    <Form>
                        <Form.Input onChange={(e)=>setInput('name',e)} label="Full name" value={details.name} icon={ <Icon bordered name="edit" link/>} />
                        <Form.Input onChange={(e)=>setInput('username',e)} value={details.username} label="Username" icon={ <Icon bordered name="edit" link/>} />
                        <Form.Input onChange={(e)=>setInput('phone',e)} value={details.phone} label="Phone Number" icon={ <Icon bordered name="edit" link/>} />
                        <Button secondary icon="save" onClick={ updateDetails} labelPosition="right" content="Save"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}
export default UpdateDetails