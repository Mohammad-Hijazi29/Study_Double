import store from "../store/store"
import { setOpenRoom, setRoomDetails, setActiveRooms, setLocalStream, setRemoteStreams, setScreenSharingStream, setIsUserJoinedOnlyWithAudio } from "../store/actions/roomActions";
import * as socketConnection from './socketConnection';
import * as webRTCHandler from './webRTCHandler';

// export const createNewRoom = () => {
//   const successCallBackFunc = () => {
//     store.dispatch(setOpenRoom(true, true));
//     const audioOnly = store.getState().room.audioOnly;
//     store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
//     socketConnection.createNewRoom();
//   }  

//   const audioOnly = store.getState().room.audioOnly;
//   webRTCHandler.getLocalStreamPeview(audioOnly, successCallBackFunc);
// };

export const createNewRoom = async () => {
  const successCallBackFunc = async () => {
    try {
      store.dispatch(setOpenRoom(true, true));
      const audioOnly = store.getState().room.audioOnly;
      store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));

      const userId = store.getState().auth.userDetails?._id;
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      const response = await fetch("http://localhost:5002/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participants: [userId] }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create session");
      }

      console.log("Session created:", data);

      store.dispatch(setRoomDetails({ roomId: data._id }));

      socketConnection.createNewRoom({ roomId: data._id });

    } catch (error) {
      console.error("Error creating new room:", error.message);
    }
  };
  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPeview(audioOnly, successCallBackFunc);
};

export const newRoomCreated = (data) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
    const { activeRooms } = data;
  
    const friends = store.getState().friends.friends;
    const rooms = [];
  
    const userId = store.getState().auth.userDetails?._id;
  
    activeRooms.forEach((room) => {
      const isRoomCreatedByMe = room.roomCreator.userId === userId;
  
      if (isRoomCreatedByMe) {
        rooms.push({ ...room, creatorUsername: "Me" });
      } else {
        friends.forEach((f) => {
          if (f.id === room.roomCreator.userId) {
            rooms.push({ ...room, creatorUsername: f.username });
          }
        });
      }
    });
  
    store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCallBackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.joinRoom({ roomId });
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPeview(audioOnly, successCallBackFunc);
  
}

// export const joinRoom = async (roomId) => {
//   const successCallBackFunc = async () => {
//     try {
//       store.dispatch(setRoomDetails({ roomId }));
//       store.dispatch(setOpenRoom(false, true));
//       const audioOnly = store.getState().room.audioOnly;
//       store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));

//       const userId = store.getState().auth.userDetails?._id;
//       if (!userId) {
//         console.error("User ID not found");
//         return;
//       }

//       // Make a request to add the user to the session
//       const response = await fetch(`http://localhost:5002/api/session/${roomId}/add-user`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to join session");
//       }

//       console.log("User successfully added to session:", data);

//       // Emit socket event to join the room on the other side
//       socketConnection.joinRoom({ roomId });
//     } catch (error) {
//       console.error("Error joining room:", error.message);
//     }
//   };

//   const audioOnly = store.getState().room.audioOnly;
//   webRTCHandler.getLocalStreamPeview(audioOnly, successCallBackFunc);
// };


export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach(track=> track.stop());
    store.dispatch(setLocalStream(null));
  }

  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
