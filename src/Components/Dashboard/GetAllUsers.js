import { Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";
import GetUser from "./GetUser";
import axios from "axios";


const GetAllUsers = () => { 
    let [users, setUsers] = useState([]);
    const getAllUserDetails = async() => { 
        try {
            const getAllUserInfo = await axios.get(`http://localhost:5000/profile/all`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokens')).accessToken}`
                }
            })
            
            if (getAllUserInfo.status === 200) { 
                
                setUsers(() => { return getAllUserInfo.data.map((item) => item) });
            }
        } catch(err) { 
            console.log(err)
        }
        
    }
    useEffect(() => { 
        getAllUserDetails()
    },[])
    return (
        <Segment>
            {users.map((userDetails) => {
                return <GetUser user={userDetails} />
            })}
        </Segment>
    )
}
export default GetAllUsers;