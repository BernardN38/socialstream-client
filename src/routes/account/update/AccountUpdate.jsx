import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import AccountUpdateLogic from "./AccountUpdateLogic";
import AuthContext from "../../AuthContext";

export default function AccountUpdate() {
  const authContext = useContext(AuthContext);
  const { updateUser, handleChange, handleSubmit } = AccountUpdateLogic(
    authContext.userId
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

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
                updateUser(formData);
              }}
              fullWidth
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
