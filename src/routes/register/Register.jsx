import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import RegisterLogic from "./RegisterLogic";
import AuthContext from "../AuthContext";

export default function Register() {
  const registerLogic = RegisterLogic();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    // Check each field
    Object.keys(formData).forEach((fieldName) => {
      if (!formData[fieldName].trim()) {
        newErrors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
        valid = false;
      } else if (fieldName === "email" && !isValidEmail(formData[fieldName])) {
        newErrors[fieldName] = "Invalid email format";
        valid = false;
      }
    });

    setErrors(newErrors);

    if (valid) {
      // Handle form submission here (e.g., send data to the server)
      console.log("Form data:", formData);
    }
  };

  const isValidEmail = (email) => {
    // Use HTML5 email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((fieldName) => (
            <Grid item xs={12} key={fieldName}>
              <TextField
                name={fieldName}
                label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                value={formData[fieldName]}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors[fieldName]}
                helperText={errors[fieldName]}
                type={
                  fieldName === "email"
                    ? "email"
                    : fieldName === "password"
                    ? "password"
                    : "text"
                }
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                registerLogic.registerUser(formData);
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
