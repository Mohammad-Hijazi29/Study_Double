import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { sendFriendInvitation, checkFriendStatus, removeFriend } from "../../api"; 
import { connect } from "react-redux";
import { getActions } from "../../store/actions/friendsActions";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import Snackbar from "@mui/material/Snackbar"; 
import Alert from "@mui/material/Alert"; 
import { Link } from "react-router-dom"; 
import StarIcon from "@mui/icons-material/Star";

const FindMatchDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const [loading, setLoading] = useState(true);
  const [randomUsers, setRandomUsers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loadingPhrase, setLoadingPhrase] = useState("Finding your match...");
  const [friendStatuses, setFriendStatuses] = useState({});
  const [pendingRequests, setPendingRequests] = useState({});
  const [loadingMail, setLoadingMail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadingPhrases = [
    "Finding your match...",
    "Almost there...",
    "Just a moment...",
    "Your match is on the way!",
    "Hold tight, we're finalizing your match..."
  ];

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userId = userDetails ? userDetails._id : null;

  useEffect(() => {
    let timeoutId;
    let progressInterval;
    let phraseInterval;

    const fetchRandomUsers = async () => {
      try {
        // const response = await axios.get("http://localhost:5002/api/profile/random/five");
        // setRandomUsers(response.data);
        const response = await axios.get("http://localhost:5002/api/profile/random/five");
        const filteredUsers = response.data.filter((user) => user.userId !== userId);
        setRandomUsers(filteredUsers);

        const statuses = {};
        const pending = {};

        for (const user of response.data) {
          if (userId && user.userId) {
            const friendStatusResult = await checkFriendStatus(userId, user.userId);
            statuses[user.userId] = friendStatusResult.isFriend;

            const pendingResult = await axios.get(`http://localhost:5002/api/friends/checkInvitation/${userId}/${user.userId}`);
            pending[user.userId] = pendingResult.data.pending;
          }
        }

        setFriendStatuses(statuses);
        setPendingRequests(pending);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isDialogOpen) {
      setLoading(true);
      setRandomUsers([]);
      setProgress(0);
      setLoadingPhrase(loadingPhrases[0]);

      timeoutId = setTimeout(fetchRandomUsers, 20000); 

      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress === 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return Math.min(prevProgress + 5, 100);
        });
      }, 1000); 

      phraseInterval = setInterval(() => {
        setLoadingPhrase((prevPhrase) => {
          const currentIndex = loadingPhrases.indexOf(prevPhrase);
          const nextIndex = (currentIndex + 1) % loadingPhrases.length;
          return loadingPhrases[nextIndex];
        });
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, [isDialogOpen]);

  const handleAddFriend = async (user) => {
    setLoadingMail(user.mail);
    try {
      await sendFriendInvitation({ targetMailAddress: user.mail });
      setSuccessMessage(`Friend invitation sent to ${user.name}`);
      setPendingRequests((prev) => ({ ...prev, [user.userId]: true }));
    } catch (error) {
      setErrorMessage("Failed to send friend invitation.");
    } finally {
      setLoadingMail(null);
    }
  };

  const handleRemoveFriend = async (user) => {
    setLoadingMail(user.mail);
    try {
      const result = await removeFriend(userId, user.userId);
      if (!result.error) {
        setSuccessMessage(`You have removed ${user.name} from your friends.`);
        setFriendStatuses((prev) => ({ ...prev, [user.userId]: false }));
      } else {
        setErrorMessage("Failed to remove friend.");
      }
    } catch (error) {
      setErrorMessage("Failed to remove friend.");
    } finally {
      setLoadingMail(null);
    }
  };

  const handleClose = () => {
    setLoading(true);
    setRandomUsers([]);
    closeDialogHandler();
  };

  const getButtonColor = (status) => {
    if (status === "pending") return "#999";
    if (status === "remove") return "#d32f2f"; 
    return "#388e3c"; 
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          padding: "25px 20px",
          borderRadius: "16px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          minWidth: { xs: "90%", sm: "400px" },
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
          Finding Your Match
        </Typography>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
            <LinearProgress variant="determinate" value={progress} sx={{ width: "100%", marginBottom: "10px" }} />
            <Typography variant="body2">{loadingPhrase}</Typography>
          </div>
        ) : (
          <div>
            {randomUsers.map((user, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    <strong>
                        <Link
                        to={`/profile/${user.userId}`}
                        target="_blank"
                        style={{ textDecoration: "none", color: "#333" }}
                        >
                        {user.name || "N/A"}
                        </Link>
                    </strong>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Bio:</strong> {user.biography || "No bio provided"}
                  </Typography>
                  {user.reviews && user.reviews.length > 0 ? (
                    <div className="reviews-explore">
                      <p>
                        {(() => {
                          const averageRating = (
                            user.reviews.reduce((sum, review) => sum + review.rating, 0) /
                            user.reviews.length
                          ).toFixed(1);
                          const fullStars = Math.floor(averageRating);

                          return (
                            <>
                              {Array(fullStars)
                                .fill()
                                .map((_, i) => (
                                  <StarIcon key={`star-${i}`} className="star" />
                                ))}
                            </>
                          );
                        })()}
                      </p>
                    </div>
                  ) : (
                    <p>No reviews yet</p>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {pendingRequests[user.userId] ? (
                    <button
                      style={{
                        backgroundColor: "#999",
                        color: "#fff",
                        width: "120px",
                        height: "40px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "not-allowed",
                      }}
                      disabled
                    >
                      Pending
                    </button>
                  ) : friendStatuses[user.userId] ? (
                    <button
                      style={{
                        backgroundColor: getButtonColor("remove"),
                        color: "#fff",
                        width: "120px",
                        height: "40px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveFriend(user)}
                      disabled={loadingMail === user.mail}
                    >
                      {loadingMail === user.mail ? "Removing..." : "Remove Friend"}
                    </button>
                  ) : (
                    <button
                      style={{
                        backgroundColor: getButtonColor("add"),
                        color: "#fff",
                        width: "120px",
                        height: "40px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAddFriend(user)}
                      disabled={loadingMail === user.mail}
                    >
                      {loadingMail === user.mail ? "Sending..." : "Add Friend"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <CustomPrimaryButton
          label="Close"
          onClick={handleClose}
          additionalStyles={{ width: "100%", maxWidth: "300px", height: "40px", fontWeight: "bold", borderRadius: "8px" }}
        />
      </DialogActions>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

const mapActionsToProps = (dispatch) => ({
  ...getActions(dispatch),
});

export default connect(null, mapActionsToProps)(FindMatchDialog);
