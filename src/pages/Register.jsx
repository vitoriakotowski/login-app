import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        uid,
        firstName: form.firstName,
        lastName: form.lastName,
        dob: form.dob,
        email: form.email,
      });

      navigate("/login");
    } catch (error) {
      alert("Error registering user: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      {["email", "password", "firstName", "lastName", "dob"].map((field) => (
        <input
          key={field}
          type={
            field === "dob"
              ? "date"
              : field === "password"
              ? "password"
              : "text"
          }
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          style={styles.input}
        />
      ))}
      <button onClick={handleSubmit} style={styles.button}>
        Register
      </button>
      <p>
        Already have an account? <Link to="/login">Log in here</Link>.
      </p>
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
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
