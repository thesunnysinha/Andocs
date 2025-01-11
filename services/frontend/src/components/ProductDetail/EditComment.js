import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Menu,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { useUserEditProductCommentMutation } from "../../services/userAuthApi";

const EditComment = ({ comment, handleCloseEditComment, onCommentEdited }) => {
  const { access_token } = getToken();
  const [editComment] = useUserEditProductCommentMutation();
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});

  const [formData, setFormData] = useState({
    subject: comment.subject,
    comment: comment.comment,
    rating: comment.rating,
  });
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!access_token) {
      return window.location.replace("/profile");
    }
    const data = new FormData(event.currentTarget);
    const actualData = {
      subject: data.get("subject"),
      comment: data.get("comment"),
      rating: data.get("rating"),
    };
    const res = await editComment({
      comment_id: comment.id,
      access_token: access_token,
      comment: actualData,
    });
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      await onCommentEdited();
      await handleCloseEditComment();
    }
    
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Subject"
              variant="outlined"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          {server_error.subject ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {server_error.subject[0]}
            </Typography>
          ) : (
            ""
          )}
          <Grid item xs={12}>
            <TextField
              label="Comment"
              variant="outlined"
              name="comment"
              id="comment"
              value={formData.comment}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />
            {server_error.comment ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {server_error.comment[0]}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                name="rating"
                id="rating"
                value={formData.rating}
                onChange={handleInputChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            {server_error.rating ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {server_error.rating[0]}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Save
            </Button>
            {server_error.non_field_errors ? (
              <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
            ) : (
              ""
            )}
            {server_error.detail ? (
              <Alert severity="error">{server_error.detail}</Alert>
            ) : (
              ""
            )}
            {server_msg.msg ? (
              <Alert severity="success">{server_msg.msg}</Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditComment;
