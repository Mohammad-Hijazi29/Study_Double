import React, { useState, useEffect } from "react";
import TimerIcon from "@mui/icons-material/Timer";
import CloseIcon from "@mui/icons-material/Close"; 
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton"; 
import CircularProgress from "@mui/material/CircularProgress";
import alarm from "../../shared/images/alarm.wav";
import confetti from "../../shared/images/confetti.gif";
import Draggable from "react-draggable";

const TechniquesWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTechnique, setSelectedTechnique] = useState("");
    const [time, setTime] = useState(0); 
    const [isRunning, setIsRunning] = useState(false); 
    const [intervalId, setIntervalId] = useState(null);
    const [customTime, setCustomTime] = useState(""); 
    const [customBreakTime, setCustomBreakTime] = useState("");
    const [isBreak, setIsBreak] = useState(false); 
    const [showConfetti, setShowConfetti] = useState(false); 

    const techniqueTimes = {
        "Pomodoro Technique": 25 * 60,  
        "112-26 Technique": 112 * 60, 
        "Blurting Technique": 10 * 60  
    };

    const breakTimes = {
        "Pomodoro Technique": 5 * 60,   
        "112-26 Technique": 26 * 60,    
        "Blurting Technique": 5 * 60    
    };

    const toggleBox = () => {
        setIsOpen(!isOpen);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        if (selectedTechnique && selectedTechnique !== "Custom") {
            setTime(techniqueTimes[selectedTechnique]);
            setCustomBreakTime(breakTimes[selectedTechnique] / 60);
        } else if (selectedTechnique === "Custom") {
            setTime(customTime * 60); 
        }// eslint-disable-next-line
    }, [selectedTechnique, customTime]);

    const toggleTimer = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
        } else {
            const id = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        if (isBreak) {
                            setIsBreak(false);
                            setTime(customTime * 60 || techniqueTimes[selectedTechnique]); 
                        } else {
                            setIsBreak(true);
                            setTime(customBreakTime * 60 || 5 * 60);
                            setShowConfetti(true); 
                            setTimeout(() => setShowConfetti(false), 2000);
                        }
                        clearInterval(id);
                        setIsRunning(false);
                        playSound();
                        return prevTime;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setIsRunning(true);
            setIntervalId(id);
        }
    };

    const playSound = () => {
        const sound = new Audio(alarm);
        sound.play();
    };

    const handleCustomTimeChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= 0) {
            setCustomTime(value); 
        }
    };

    const handleCustomBreakTimeChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= 0) {
            setCustomBreakTime(value);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const progress = (time / (customTime * 60 || techniqueTimes[selectedTechnique])) * 100;

    return (
        <>
            {showConfetti && (
                <img
                    src={confetti}
                    alt="Confetti"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%", 
                        height: "auto",
                        zIndex: 9999, 
                    }}
                />
            )}

            <Button
                onClick={toggleBox}
                style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "16px",
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    marginTop: "10px",
                    color: "white",
                    background: "linear-gradient(135deg, rgb(75, 0, 130), rgb(216, 191, 216))",
                    position: "relative",
                }}
            >
                <TimerIcon />
            </Button>

            {isOpen && (
                <Draggable handle=".handle-drag">
                    <Box
                    className="handle-drag"
                    component={Paper}
                    elevation={4}
                    sx={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        width: "250px",
                        padding: "10px",
                        backgroundColor: "white",
                        zIndex: 1000,
                        borderRadius: "8px",
                        cursor: "move", 
                    }}
                    >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        zIndex: 10,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        Study Techniques
                    </Typography>

                    {/* <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "10px" }}>
                        // {formatTime(time)}
                    </Typography> */}

                    <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "10px", color: isBreak ? "red" : "green" }}>
                        {isBreak ? "Break Time" : "Study Time"}
                    </Typography>

                    <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress
                            variant="determinate"
                            value={progress}
                            size={100}
                            thickness={4}
                            sx={{
                                color: isBreak ? "red" : "green",
                                marginBottom: "15px"
                            }}
                        />
                        <Typography
                            sx={{
                                position: "absolute",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                marginBottom: "15px"
                            }}
                        >
                            {formatTime(time)}
                        </Typography>
                    </Box>

                    <Select
                        fullWidth
                        value={selectedTechnique}
                        onChange={(e) => setSelectedTechnique(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select a Technique</MenuItem>
                        <MenuItem value="Pomodoro Technique">Pomodoro Technique</MenuItem>
                        <MenuItem value="112-26 Technique">112-26 Technique</MenuItem>
                        <MenuItem value="Blurting Technique">Blurting Technique</MenuItem>
                        <MenuItem value="Custom">Custom</MenuItem>
                    </Select>

                    {selectedTechnique === "Custom" && (
                        <>
                        <TextField
                            label="Custom Time (minutes)"
                            value={customTime}
                            onChange={handleCustomTimeChange}
                            type="number"
                            fullWidth
                            sx={{ marginTop: "10px" }}
                        />

                        <TextField
                            label="Custom Break Time (minutes)"
                            value={customBreakTime}
                            onChange={handleCustomBreakTimeChange}
                            type="number"
                            fullWidth
                            sx={{ marginTop: "10px" }}
                        />
                        </>
                    )}

                    <Button
                        onClick={toggleTimer}
                        variant="contained"
                        color={isRunning ? "secondary" : "primary"}
                        fullWidth
                        sx={{ marginTop: "10px" }}
                    >
                        {isRunning ? "Stop" : "Start"}
                    </Button>
                    </Box>
                </Draggable>
                )}
        </>
    );
};

export default TechniquesWidget;
