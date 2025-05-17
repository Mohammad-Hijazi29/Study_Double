import React, { useEffect, useState } from "react";
import loadingGif from '../shared/images/load.gif';
import InputWithLabel from "../shared/components/InputWithLabel";
import SelectWithLabel from "../shared/components/SelectWithLabel";
import { getUserProfile, updateUserProfile } from "../api";
import { useHistory } from "react-router-dom";

const EditProfile = () => {
    const [loading, setLoading] = useState(true); 
    const [profile, setProfile] = useState(null);
    const [bio, setBio] = useState("");
    const [dob, setDob] = useState("");
    const [communication, setCommunication] = useState("");
    const [studyTechnique, setStudyTechnique] = useState("");
    const [country, setCountry] = useState("");
    const [major, setMajor] = useState("");
    const [error, setError] = useState("");
    const [preferredStudyLength, setPreferredStudyLength] = useState(""); 
    const [preferredBreakLength, setPreferredBreakLength] = useState("");
    
    const history = useHistory();

    useEffect(() => {
        const fetchProfile = async () => {
            const user = JSON.parse(localStorage.getItem("user")); 
            if (!user || !user._id) {
                setLoading(false);
                return;
            }
            const result = await getUserProfile(user._id);
            if (!result.error) {
                setProfile(result);
                setBio(result.biography || "");
                setDob(result.dob || "");
                setCommunication(result.communicationStyles || "");
                setStudyTechnique(result.preferredStudyTechnique || "");
                setCountry(result.country || "");
                setMajor(result.major || "");
                setPreferredStudyLength(result.preferredStudyLength || "");
                setPreferredBreakLength(result.preferredBreakLength || "");
            }
            setLoading(false);
        };
    
        fetchProfile();
    }, []);
    
    
    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <img src={loadingGif} alt="Loading..." className="loading" />
            </div>
        );
    }

    if (!profile) {
        return <div style={{ textAlign: "center", marginTop: "50px" }}>Profile not found.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.token) {
            setError("Authorization token required");
            return;
        }

        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        const updatedProfile = {
            biography: bio,
            dob: dob,
            country: country,
            major: major,
            communicationStyles: communication,
            preferredStudyTechnique: studyTechnique,
            preferredStudyLength: preferredStudyLength,  
            preferredBreakLength: preferredBreakLength, 
            age,
        };

        try {
            const response = await updateUserProfile(user._id, updatedProfile, user.token);
            if (response.error) {
                setError(response.error);
            } else {
                setProfile(response.data); 
                history.push("/my-profile");
            }
        } catch (error) {
            setError("Failed to update profile.");
            console.error("Error updating profile:", error);
        }
    };

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
        "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
        "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
        "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
        "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
        "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba",
        "Cyprus", "Czech Republic (Czechia)", "Democratic Republic of the Congo",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)",
        "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
        "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
        "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
        "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
        "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
        "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
        "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
        "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal",
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
        "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
        "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
        "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
        "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
        "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
        "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
        "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
        "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
        "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay",
        "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
        "Zambia", "Zimbabwe"
      ];
      const majors = [
        "Accounting",
        "Biology",
        "Business Administration",
        "Chemistry",
        "Computer Science",
        "Economics",
        "Engineering",
        "English",
        "Environmental Science",
        "Finance",
        "History",
        "Information Technology",
        "Law",
        "Liberal Arts",
        "Mathematics",
        "Mechanical Engineering",
        "Nursing",
        "Philosophy",
        "Physics",
        "Political Science",
        "Psychology",
        "Sociology",
        "Theater",
        "Social Work"
      ];      
    const communicationStyles = ["Direct", "Casual", "Formal", "Collaborative"];
    // const studyTechniques = ["Pomodoro", "112-26", "Blurting", "Other"];

    return ( 
        <div className="bg">
        <div className="info-container">
            <h2>Welcome, {profile.name}!</h2>
            <p>To get started StudyDoubling, you must complete your profile.</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <InputWithLabel
                value={bio}
                setValue={setBio}
                label="Biography"
                type="text"
                placeholder="Enter your biography"
            />
            <InputWithLabel
                value={dob}
                setValue={setDob}
                label="Date of Birth"
                type="date"
                placeholder="Enter your date of birth"
            />
            <SelectWithLabel
                value={country}
                setValue={setCountry}
                label="Country"
                options={countries}
            />
            <SelectWithLabel
                value={major}
                setValue={setMajor}
                label="Major"
                options={majors}
            />
            <SelectWithLabel
                value={communication}
                setValue={setCommunication}
                label="Communication Style"
                options={communicationStyles}
            />
            {/* <SelectWithLabel
                value={studyTechnique}
                setValue={setStudyTechnique}
                label="Preferred Study Technique"
                options={studyTechniques}
            />
            <InputWithLabel
                value={preferredStudyLength}
                setValue={setPreferredStudyLength}
                label="Preferred Study Length (minutes)"
                type="number"
                placeholder="Enter your preferred study length in minutes"
            />
            <InputWithLabel
                value={preferredBreakLength}
                setValue={setPreferredBreakLength}
                label="Preferred Break Length (minutes)"
                type="number"
                placeholder="Enter your preferred break length in minutes"
            /> */}
            <button className="submit-profile" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    );
};

export default EditProfile;
