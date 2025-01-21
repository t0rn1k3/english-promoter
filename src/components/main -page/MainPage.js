import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInAnonymously } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState("");
  const [passcodeEntered, setPasscodeEntered] = useState(false);
  const [error, setError] = useState("");

  const correctPasscode = "1111";

  const handleTestBuilderClick = () => {
    setShowPasscodeModal(true);
  };

  const handlePasscodeSubmit = () => {
    if (enteredPasscode === correctPasscode) {
      signInAnonymously(auth)
        .then((userCredential) => {
          const user = userCredential.user;

          user.getIdToken().then((idToken) => {
            localStorage.setItem("authToken", idToken);
            const decodedToken = jwtDecode(idToken);
            setPasscodeEntered(true);
            navigate(`/test-builder/${idToken}`);
          });
        })
        .catch((error) => {
          setError("ავტორიზაციისას დაფიქსირდა შეცდომა");
        });
    } else {
      setError("კოდი არასწორია 🙁 შეიყვანეთ თავიდან");
    }
  };

  const handleCancel = () => {
    setShowPasscodeModal(false);
    setEnteredPasscode("");
    setError("");
  };

  const startTest = () => {
    navigate("/slider");
  };

  return (
    <div className="main-page">
      <header className="header">
        <div className="logo">
          <img alt="logo" src={"" || null} />
        </div>
        <button className="button" onClick={handleTestBuilderClick}>
          ტესტის შექმნა
        </button>
      </header>
      <button className="start button" onClick={startTest}>
        გამოცდის დაწყება
      </button>

      {showPasscodeModal && (
        <div className="passcode-modal">
          <div className="modal-content">
            <h2>შეიყვანეთ კოდი</h2>
            <input
              type="password"
              value={enteredPasscode}
              onChange={(e) => setEnteredPasscode(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <div className="modal-buttons">
              <button onClick={handlePasscodeSubmit}>დაწყება</button>
              <button onClick={handleCancel}>გაუქმება</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
