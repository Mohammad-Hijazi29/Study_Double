import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserProfile, sendFriendInvitation, checkFriendStatus, removeFriend, leaveReview } from "../api";
import one from '../shared/images/one.png';
import Avatar from '../shared/components/Avatar';
import load from '../shared/images/load.gif';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

const PublicProfile = () => {
  const { id } = useParams(); 
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMail, setLoadingMail] = useState(false);
  const [isFriend, setIsFriend] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingRequest, setPendingRequest] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userId = userDetails._id;

  useEffect(() => {
    const fetchProfileAndStatus = async () => {
      try {
        const profileResult = await getUserProfile(id);
        if (!profileResult.error) {
          setProfile(profileResult);
        }
        
        if (userId && id) {
          const friendStatusResult = await checkFriendStatus(userId, id);
          if (!friendStatusResult.error) {
            setIsFriend(friendStatusResult.isFriend);
          }
          const pendingResult = await fetch(`http://localhost:5002/api/friends/checkInvitation/${userId}/${id}`);
          const pendingData = await pendingResult.json();
          if (pendingData.pending) {
            setPendingRequest(true);
          }
        }
      } catch (error) {
        setErrorMessage("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileAndStatus();
  }, [id, userId]);

  const handleAddFriend = async () => {
    setLoadingMail(true);
    try {
      await sendFriendInvitation({ targetMailAddress: profile.mail });
      setSuccessMessage(`Friend invitation sent to ${profile.name}`);
      setPendingRequest(true);
    } catch (error) {
      setErrorMessage("Failed to send friend invitation.");
    }
    setLoadingMail(false);
  };

  const handleRemoveFriend = async () => {
    setLoadingMail(true);
    try {
      const result = await removeFriend(userId, id);
      if (!result.error) {
        setSuccessMessage(`You have removed ${profile.name} from your friends.`);
        setIsFriend(false);
      } else {
        setErrorMessage("Failed to remove friend.");
      }
    } catch (error) {
      setErrorMessage("Failed to remove friend.");
    } finally {
      setLoadingMail(false);
    }
  };

  const handleLeaveReview = async () => {
    if (rating === 0 || reviewText.trim() === "") {
      setErrorMessage("Please provide a rating and description.");
      return;
    }
    try {
      const response = await leaveReview(userId, id, { rating, description: reviewText });
      if (!response.error) {
        setSuccessMessage("Review submitted successfully!");
        setProfile((prevProfile) => ({
          ...prevProfile,
          reviews: [...prevProfile.reviews, response.review],
        }));
        setOpenReviewModal(false);
      } else {
        setErrorMessage(response.message || "Failed to submit review.");
      }
    } catch (error) {
      setErrorMessage("Error submitting review.");
    }
  };

  if (loading) return <img src={load} alt="Loading..." className="loading" />;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="profile-container">
      <nav className="navbar">
        <div className="navbarContent1">
          <img src={one} alt="Logo" className="navbarImg" />
          <h2>StudyDouble</h2>
          <img src={one} alt="Logo" className="navbarImg" />
        </div>
        <div className="navbarContent2">
          <button className="navbarButton" onClick={() => history.push("/dashboard")}>Dashboard</button>
          <button className="navbarButton" onClick={() => history.push("/explore")}>Explore</button>
          <button className="navbarButton" onClick={() => history.push("/my-profile")}>Profile</button>
        </div>
      </nav>

      <div className="profileWrapper">
        <div className="leftSide">
          <div className="userInfo">
            <Avatar username={profile.name} large={true} className="avatar-class" />
            <h3>{profile.name}</h3>
          </div>
          <p>{profile.biography}</p>
          
          {(pendingRequest && !isFriend) ? (
            <button className="pendingButton" disabled>
              Pending
            </button>
          ) : isFriend ? (
            <>
              <button className="leaveReviewButton" onClick={() => setOpenReviewModal(true)}>
                Leave Review
              </button>
              <button className="removeFriendButton" onClick={handleRemoveFriend} disabled={loadingMail}>
                {loadingMail ? "Removing..." : "Remove Friend"}
              </button>
            </>
          ) : (
            <button
              className="addFriendButton"
              onClick={handleAddFriend}
              disabled={loadingMail}
            >
              {loadingMail ? "Sending..." : "Add Friend"}
            </button>
          )}
        </div>

        <div className="middleBox">
          <div className="profileDetails">
            <h2>Profile Information</h2>
            <div className="profile-info">
              <p><strong>Email:</strong> {profile.mail}</p>
              <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>Location:</strong> {profile.country}</p>
              <p><strong>Major:</strong> {profile.major}</p>
              <p><strong>Communication Style:</strong> {profile.communicationStyles}</p>
              <p><strong>Preferred Study Technique:</strong> {profile.preferredStudyTechnique}</p>
            </div>
          </div>
        </div>
        <div className="personalityResults">
          <h2>Big Five Inventory Results</h2>
          <div className="profile-info">
            {profile.personalityTestResults && Object.keys(profile.personalityTestResults).map((key, index) => {
              const score = profile.personalityTestResults[key] * 100;
              return (
                <div key={index} className="personality-item">
                  <p><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong></p>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${score}%` }}
                    />
                    <div className="percentage-label">
                      {score}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="session-pref">
        
        <div className="preference-box">
          <p><strong>Preferred Study Technique:</strong></p>
          <div className="box">
            <p><strong>{profile.preferredStudyTechnique}</strong></p>
            <p>Technique</p>
          </div>
        </div>
        
        <div className="preference-box">
          <p><strong>Preferred Study Length:</strong></p>
          <div className="box">
            <p>{profile.preferredStudyLength}</p>
            <p>minutes</p>
          </div>
        </div>
      
        <div className="preference-box">
          <p><strong>Preferred Break Length:</strong></p>
          <div className="box">
            <p>{profile.preferredBreakLength}</p>
            <p>minutes</p>
          </div>
        </div>

        <div className="preference-box">
          <p><strong>Todays Total Study Time:</strong></p>
          <div className="box">
            <p>{profile.preferredStudyLength}</p>
            <p>minutes</p>
          </div>
        </div>

        <div className="preference-box">
          <p><strong>Todays Goal Categories:</strong></p>
          <div className="box">
            <p>{profile.todayGoals}</p>
            <p></p>
          </div>
        </div>
      </div>

      {profile.reviews && profile.reviews.length > 0 ? (
        <div className="reviewsSection">
          <h2>User Reviews</h2>
          {profile.reviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>Rating:</strong> {review.rating} ⭐</p>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      ) : (
      <div></div>
      )}

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

      <Modal open={openReviewModal} onClose={() => setOpenReviewModal(false)}>
        <Box sx={{ width: 400, bgcolor: "white", p: 3, borderRadius: 2, mx: "auto", mt: 5, zIndex: 99999999999 }} className="modalContent">
          <h3>Leave a Review</h3>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Review"
            variant="outlined"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <button className="leaveReviewButton" onClick={handleLeaveReview}>
              Submit
            </button>
          </Box>
        </Box>
      </Modal>

    </div>
  );
};

export default PublicProfile;
