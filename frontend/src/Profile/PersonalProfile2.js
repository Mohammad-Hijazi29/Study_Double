import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserProfile, updatePreferences } from "../api";
import one from '../shared/images/one.png';
import Avatar from '../shared/components/Avatar';
import load from '../shared/images/load.gif';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

const PersonalProfile2 = () => {
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleMoveToDashboard = () => history.push("/dashboard");
  const handleMoveToExplore = () => history.push("/explore");
  const handleMoveToEdit = () => history.push("/edit-my-profile");

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user ? user._id : null;

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getUserProfile(id);
      if (!result.error) {
        setProfile(result);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [id]);

  const handleOpenModal = (type, currentValue) => {
    setModalType(type);
    setInputValue(currentValue || "");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalType("");
    setInputValue("");
  };

  const handleSave = async () => {
    const updates = {};
    const token = localStorage.getItem("token");
  
    switch (modalType) {
      case "Preferred Study Technique":
        updates.preferredStudyTechnique = inputValue;
        break;
      case "Preferred Study Length":
        updates.preferredStudyLength = inputValue;
        break;
      case "Preferred Break Length":
        updates.preferredBreakLength = inputValue;
        break;
      case "Today's Total Study Time":
        updates.todayStudyLength = inputValue;
        break;
      case "Today's Goal Categories":
        updates.todayGoals = inputValue;
        break;
      default:
        return;
    }
  
    const result = await updatePreferences(id, updates, token);
  
    if (result.error) {
      alert(`Failed to update: ${result.error}`);
    } else {
      setProfile(result.profile); 
    }
  
    handleCloseModal();
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
          <button className="navbarButton" onClick={handleMoveToDashboard}>Dashboard</button>
          <button className="navbarButton" onClick={handleMoveToExplore}>Explore</button>
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
          <button className="editProfileButton" onClick={handleMoveToEdit}>Edit Profile</button>
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
        <div
          className="preference-box"
          onClick={() => handleOpenModal("Preferred Study Technique", profile.preferredStudyTechnique)}
        >
          <p><strong>Preferred Study Technique:</strong></p>
          <div className="box">
            <p><strong>{profile.preferredStudyTechnique}</strong></p>
            <p>Technique</p>
          </div>
        </div>

        <div
          className="preference-box"
          onClick={() => handleOpenModal("Preferred Study Length", profile.preferredStudyLength)}
        >
          <p><strong>Preferred Study Length:</strong></p>
          <div className="box">
            <p>{profile.preferredStudyLength}</p>
            <p>minutes</p>
          </div>
        </div>

        <div
          className="preference-box"
          onClick={() => handleOpenModal("Preferred Break Length", profile.preferredBreakLength)}
        >
          <p><strong>Preferred Break Length:</strong></p>
          <div className="box">
            <p>{profile.preferredBreakLength}</p>
            <p>minutes</p>
          </div>
        </div>

        <div
          className="preference-box"
          onClick={() => handleOpenModal("Today's Total Study Time", profile.preferredStudyLength)}
        >
          <p><strong>Todays Total Study Time:</strong></p>
          <div className="box">
            <p>{profile.todayStudyLength}</p>
            <p>minutes</p>
          </div>
        </div>

        <div
          className="preference-box"
          onClick={() => handleOpenModal("Today's Goal Categories", profile.preferredStudyLength)}
        >
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



      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit {modalType}</DialogTitle>
        <DialogContent>
        {modalType === "Preferred Study Technique" ? (
          <TextField
            select
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="Pomodoro">Pomodoro</option>
            <option value="112-26">112-26</option>
            <option value="Blurting">Blurting</option>
            <option value="Custom">Custom</option>
          </TextField>
        ) : modalType === "Today's Goal Categories" ? (
          <TextField
            select
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="">Select your goal</option>
            <option value="Homework">Homework</option>
            <option value="Quiz">Quiz</option>
            <option value="Exams">Exams</option>
            <option value="Projects">Projects</option>
            <option value="Papers">Papers</option>
          </TextField>
        ) : (
          <TextField
            autoFocus
            margin="dense"
            type="number"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
      </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PersonalProfile2;
