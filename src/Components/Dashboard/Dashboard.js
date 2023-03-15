import { Menu, Grid, Segment, Header, Button, Image} from "semantic-ui-react";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import VerifyUserEmail from "./VerifyUserEmail";
import UpdateDetails from "./UpdateDetails";
import GetAllUsers from "./GetAllUsers"
import axios from "axios";
const Dashboard = () => {
    
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [activeItem, setActiveItem] = useState('updateDetails')
    const [open, setOpen] = useState(false)
    const getUser = async (accessToken) => {         
        try {
            const getUserDetails = await axios.get('http://localhost:5000/profile/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const { role, verified, name, email, username, phone, avatar } = getUserDetails.data
            setUser((prevState) => { return { ...prevState, name, username, email, phone, verified, role, avatar} })
        } catch (err) {
            navigate('/login')
        }
    }
    const logout = async() => { 
        try {
            const { accessToken } = JSON.parse(localStorage.getItem('tokens'))
            const logOutUser = await axios.post('http://localhost:5000/auth/logout', '' ,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (logOutUser.status === 201) { 
                localStorage.removeItem('tokens')
                navigate('/login')
            }
        } catch (err) { 
            console.log(err)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("tokens") === null) {
            navigate('/login')
            return 
        }
        const tokens = JSON.parse(localStorage.getItem("tokens"))
        const { accessToken } = tokens
        getUser(accessToken)
        if (user.verified === false) {
            setOpen(true)
        }
    }, [])
    return (

        <Grid centered columns={2} className="container">
            <Grid.Column centered width={5}>
                <Segment>
                    <Image fluid rounded centered src={ user.avatar} />
                    <Segment content={user.name} />
                    <Menu vertical fluid>
                        {!user.verified ? (<Menu.Item
                            name='info'
                            active={activeItem === 'verify'}
                            onClick={e => setActiveItem('verify')}>
                            <Header as='h4' icon="mail square" subheader="Verify registered email id" content="Verify Email Address" />
                        </Menu.Item>) : null}
                        <Menu.Item
                            name='updateDetails'
                            active={activeItem === 'updateDetails'}
                            onClick={e => setActiveItem('updateDetails')}>
                            <Header as='h4' icon="pencil" subheader="Change or update your details" content="Update User Details "/>
                        </Menu.Item>
                        <Menu.Item
                            name='changeEmail'
                            active={activeItem === 'changeEmail'}
                            onClick={e => setActiveItem('changeEmail')}>
                            <Header as='h4' subheader="Update and verify your new email Id" icon="mail oultine" content="Change/ Update Email Id" />
                        </Menu.Item>
                        {user.role === 0 ? (
                            <Menu.Item
                                name='changeEmail'
                                active={activeItem === 'checkAllUser'}
                                onClick={e => setActiveItem('checkAllUser')}>
                                <Header as='h4' subheader="Check all exists normal users" icon="user secret" content="See All Users"/>
                            </Menu.Item>
                        ) : null}
                    </Menu>
                    <Button fluid secondary onClick={logout}>Log Out</Button>
                </Segment>
            </Grid.Column>
            <Grid.Column width={ 11 }>
                
                {
                    activeItem === 'verify' ? <VerifyUserEmail email={user.email} verified={user.verified} /> :
                    activeItem === 'updateDetails' ? <UpdateDetails user={user} /> :
                    activeItem === 'changeEmail' ? <VerifyUserEmail email={user.email} verified={user.verified} /> :
                                activeItem === 'checkAllUser' ? <GetAllUsers load={ true} /> : null 
                }
            </Grid.Column>
        </Grid> 
        
    )
}
export default Dashboard;