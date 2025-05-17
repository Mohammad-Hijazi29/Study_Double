import { Button, Tooltip, keyframes } from "@mui/material";
import Avatar from "../../shared/components/Avatar";
import * as roomHandler from '../../realtimeCommunication/roomHandler';

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 217, 173, 0.6), 0 0 10px rgba(100, 72, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 217, 173, 0.8), 0 0 30px rgba(100, 72, 255, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 217, 173, 0.6), 0 0 10px rgba(100, 72, 255, 0.4);
  }
`;

const ActiveRoomButton = ({
    creatorUsername,
    roomId,
    amountOfParticipants,
    isUserInRoom,
}) => {
    const handleJoinActiveRoom = () => {
        if (amountOfParticipants < 4) {
            roomHandler.joinRoom(roomId);
        }
    };

    const activeRoomButtonDisabled = amountOfParticipants > 3;
    const roomTitle = `Creator: ${creatorUsername}. Connected: ${amountOfParticipants}.`;

    return (
        <Tooltip title={roomTitle}>
            <div>
                <Button
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "16px",
                        margin: 0,
                        padding: 0,
                        minWidth: 0,
                        marginTop: "10px",
                        color: "white",
                        background: "linear-gradient(135deg, rgb(100, 72, 255), rgb(0, 217, 173))",
                        boxShadow: "0 0 10px rgba(0, 217, 173, 0.8), 0 0 20px rgba(100, 72, 255, 0.6)",
                        animation: `${glow} 2s infinite ease-in-out`,
                    }}
                    disabled={activeRoomButtonDisabled || isUserInRoom}
                    onClick={handleJoinActiveRoom}
                >
                    <Avatar username={creatorUsername} />
                </Button>
            </div>
        </Tooltip>
    );
};

export default ActiveRoomButton;
