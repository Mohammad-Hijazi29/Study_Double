// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const OnlineStatusManager = () => {
//   const userDetails = useSelector((state) => state.auth.userDetails);

//   useEffect(() => {
//     const updateOnlineStatus = async () => {
//       if (userDetails) {
//         // User logged in
//         await axios.post("/api/online/add", {
//           username: userDetails.username,
//         });
//       } else {
//         // User logged out
//         await axios.post("/api/online/remove", {
//           username: userDetails?.username, // optional chaining in case userDetails is null
//         });
//       }
//     };

//     updateOnlineStatus();
//   }, [userDetails]);

//   return null; // no UI needed
// };

// export default OnlineStatusManager;
