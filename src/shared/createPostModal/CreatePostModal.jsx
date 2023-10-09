import React, { useState } from "react";
import {
  Card,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Input,
} from "@mui/material";
import Compressor from "compressorjs";
import axios from "axios";
import { serverUrl } from "../../backendApi/config";
import CreatePostLogic from "./CreatePostLogic";
export default function CreatePostModal() {
  const { handleUpload, handleChange, handleImageChange, formData, errors } =
    CreatePostLogic();
  return (
    <Box sx={{ padding: "1rem" }}>
      <Card sx={{ padding: "1rem" }}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} key="body">
              <TextField
                name="body"
                label={"body"}
                value={formData.body}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                error={!!errors["body"]}
                helperText={errors["body"]}
              />
            </Grid>
            <Grid item xs={12} key={"file"}>
              <Input
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={handleUpload}
                fullWidth
              >
                Create Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
}
