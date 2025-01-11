import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Alert
} from "@mui/material";
import { useUserAddProductCommentMutation } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";

const CommentForm = ({
  product_id,
  handleCloseAddComment,
  onCommentEdited,
}) => {
  const [addProductComment] = useUserAddProductCommentMutation();
  const { access_token } = getToken();
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});

  const [formData, setFormData] = useState({
    subject: "",
    comment: "",
    rating: 0,
  });

  const handleChange = (event) => {
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
    const actualData = {
      subject: formData.subject,
      comment: formData.comment,
      rating: formData.rating,
    };
    const res = await addProductComment({
      product_id: product_id,
      comment: actualData,
      access_token: access_token,
    });
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("add-comment-form").reset();
      await onCommentEdited();
      await handleCloseAddComment();
    }
  };

  return (
    <form id="add-comment-form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Subject"
            variant="outlined"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            fullWidth
          />
          {server_error.subject ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {server_error.subject[0]}
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Comment"
            variant="outlined"
            name="comment"
            id="comment"
            value={formData.comment}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          {server_error.comment ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
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
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          {server_error.rating ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {server_error.rating[0]}
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          {server_error.non_field_errors ? (
            <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
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
  );
};

export default CommentForm;
