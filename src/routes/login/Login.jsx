import React, { useEffect, useState, useContext } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import LoginLogic from "./LoginLogic";

export default function Login() {
  const { loginUser, handleChange, errors, formData } = LoginLogic();
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <form>
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
              onClick={(e) => {
                loginUser(e, formData);
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
