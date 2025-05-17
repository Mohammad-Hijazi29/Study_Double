import { useHistory } from "react-router-dom";
import one from '../shared/images/one.png';
import window from '../shared/images/window.png'
import lock from '../shared/images/lock.png'
import clock from '../shared/images/clock.png'
import puzzle from '../shared/images/puzzle.png'
import { useState, useRef } from "react";

const Home = () => {
    const history = useHistory();
    const [activeQuestion, setActiveQuestion] = useState(null); 
    const secondSectionRef = useRef(null);

    const handleMoveToLogin = () => {
        history.push("/login"); 
    };
    const handleMoveToRegister = () => {
        history.push("/register"); 
    };

    const toggleQuestion = (questionId) => {
        setActiveQuestion(activeQuestion === questionId ? null : questionId);
      };

    const scrollToSection = () => {
        secondSectionRef.current.scrollIntoView({
            behavior: 'smooth', 
            block: 'start', 
        });
    };

    return ( 
        <div>
            <div className="backgroundWithCircles">
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>
                <div className="circle circle4"></div>
                <div className="circle circle5"></div>
                <nav className="navbar-1">
                    <div className="navbarContent1-1">
                        <img src={one} alt="Logo" className="navbarImg-1" />
                        <h2>StudyDouble</h2>
                        <img src={one} alt="Logo" className="navbarImg-1" />
                    </div>
                    <div className="navbarContent2-1">
                        <button className="navbarButton-1" onClick={handleMoveToLogin}>Login</button>
                        <button className="navbarButton-1" onClick={handleMoveToRegister}>Register</button>
                    </div>

                    <section className="firstSection">
                    <div className="textContainer">
                    <span className="typing-text">Are you ready to start Study Doubling?</span>
                    <br />
                    <div className="button_slide slide_right" onClick={scrollToSection}>Learn More!</div>
                    </div>
                    <img
                        src={window}
                        alt="People working online"
                        className="image"
                    />
                </section>
                </nav>
            </div>

            <section className="secondSection" ref={secondSectionRef}>
            {/* <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <div className="circle circle5"></div> */}

            <h2 className="section-title">How does it work?</h2>
            <div className="steps-row">
                <div className="step">
                <div className="number-circle">1</div>
                <p className="step-text"><strong>It's Easy!</strong><br />Sign up and answer a few questions</p>
                </div>

                <div className="step">
                <div className="number-circle">2</div>
                <p className="step-text"><strong>Get Matched</strong><br />We'll find the right person for you</p>
                </div>

                <div className="step">
                <div className="number-circle">3</div>
                <p className="step-text"><strong>Study Double!</strong><br />Stay focused and study together</p>
                </div>

                <div className="step">
                <div className="number-circle">4</div>
                <p className="step-text"><strong>Review Each Other!</strong><br />Leave a rating to keep each other accountable</p>
                </div>
            </div>
            </section>


            <section className="thirdSection">
                <h2>How will I be matched?</h2>
                <div className="match-item">
                    <img src={clock} alt="Availability" className="match-img" />
                    <h3>Match Based on Availability</h3>
                </div>
                <div className="match-item">
                    <img src={puzzle} alt="Compatibility" className="match-img" />
                    <h3>Match Based on Compatibility</h3>
                </div>
                <div className="match-item">
                    <img src={lock} alt="Trustworthiness" className="match-img" />
                    <h3>Match Based on Trustworthiness</h3>
                </div>
            </section>

            <section className="fourthSection">
                <h2 className="section-title">FAQ</h2>
                <div className="faq-container">
                    <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleQuestion(1)}>
                        <h3>What is study doubling?</h3>
                        <span className={`arrow ${activeQuestion === 1 ? "open" : ""}`}>&#9660;</span>
                    </div>
                    {activeQuestion === 1 && (
                        <div className="faq-answer">
                        <p>
                            Study doubling is a play on words combining studying and body doubling. Body doubling is a technique where individuals study or work alongside each other to improve focus and productivity. Study doubling applies the same idea to enhance accountability and motivation during study sessions.
                        </p>
                        </div>
                    )}
                    </div>

                    <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleQuestion(2)}>
                        <h3>Can I study double with someone who isn't my friend?</h3>
                        <span className={`arrow ${activeQuestion === 2 ? "open" : ""}`}>&#9660;</span>
                    </div>
                    {activeQuestion === 2 && (
                        <div className="faq-answer">
                        <p>
                            No, The goal of study doubling is to create a productive and collaborative environment. You can study with anyone who is compatible with your study habits, whether they are your friend to ensure motivation. We match users based on availability, compatibility, and trustworthiness.
                        </p>
                        </div>
                    )}
                    </div>

                    <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleQuestion(3)}>
                        <h3>How do I get matched with someone?</h3>
                        <span className={`arrow ${activeQuestion === 3 ? "open" : ""}`}>&#9660;</span>
                    </div>
                    {activeQuestion === 3 && (
                        <div className="faq-answer">
                        <p>
                            After signing up and completing your profile, you will answer a few questions about your study habits and preferences. Based on your answers, we match you with someone who fits your availability, study style, and other preferences. Once matched, you can start your study sessions together!
                        </p>
                        </div>
                    )}
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2025 Kamal&Mohammad. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
