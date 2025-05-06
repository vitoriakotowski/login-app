import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!userData) {
    return (
      <div style={styles.container}>
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Welcome, {userData.firstName}!</h2>
      <div style={styles.infoBox}>
        <p>
          <strong>First Name:</strong> {userData.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {userData.lastName}
        </p>
        <p>
          <strong>Date of Birth:</strong> {userData.dob}
        </p>
      </div>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
      <p style={{ marginTop: "30px", fontSize: "14px", color: "#555" }}>
        Vitoria Lelis Kotowski da Cunha – Tecnologias Para Desenvolvimento Web
        Assignment
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  infoBox: {
    marginTop: "20px",
    textAlign: "left",
    padding: "10px 15px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
