import { styled } from '@mui/system';
import CameraButton from './CameraButton';
import MicButton from './MicButton';
import CloseRoomButton from './CloseRoomButton';
import ScreenShareButton from './ScreenShareButton';
import { connect } from 'react-redux';
import { getActions } from '../../../store/actions/roomActions';

const MainContainer = styled("div")({
    height: "15%",
    width: "100%",
    background: "linear-gradient(135deg, rgb(100, 72, 255), rgb(0, 217, 173))",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  
const RoomButtons = (props) => {
    // const { localStream, isUserJoinedWithOnlyAudio } = props;
    const { localStream, isUserJoinedWithOnlyAudio, isFullscreen } = props;

    return ( 
        <MainContainer>
            {!isUserJoinedWithOnlyAudio && <ScreenShareButton {...props} isFullscreen={isFullscreen} />}
            <MicButton localStream={localStream} isFullscreen={isFullscreen} />
            <CloseRoomButton isFullscreen={isFullscreen} />
            {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} isFullscreen={isFullscreen} />}
        </MainContainer>
     );
}
 
const mapStoreStateToProps = ({ room }) => {
    return {
        ...room,
    };
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButtons);
