import Button from '@mui/material/Button';
import * as roomHandler from '../../realtimeCommunication/roomHandler';
import axios from 'axios';

const CreateRoomButton = ({isUserInRoom}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
        console.log("Authorization token required");
        return;
    }

    const createNewRoomHandler = async () => {
        try {
            roomHandler.createNewRoom();
            await axios.patch(
                `http://localhost:5002/api/profile/${user._id}/increment-sessions`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`
                  }
                }
              );
        }
        catch (err){
            console.error("Error incrementing session:", err);
        }
       
        
    }
    return ( 
        <Button
        disabled={isUserInRoom}
        onClick={createNewRoomHandler}
            style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                margin: 0,
                padding: 0,
                minWidth: 0,
                marginTop: "10px",
                color: "white",
                background: "linear-gradient(135deg, rgb(144, 238, 144), rgb(0, 100, 0))",
                fontSize: '25px'
            }}
            >
                +
            </Button>
     );
}
 
export default CreateRoomButton;