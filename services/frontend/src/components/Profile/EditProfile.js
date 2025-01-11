// import React, { useState } from "react";
// import {
//   Grid,
//   TextField,
//   Button,
//   Box,
//   Alert,
//   Typography,
//   CircularProgress,
//   Avatar,
// } from "@mui/material";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import { useUserEditProfileMutation } from "../../services/userAuthApi";
// import { getToken } from "../../services/LocalStorageService";

// const EditProfile = (props) => {
//   const [server_error, setServerError] = useState({});
//   const { access_token } = getToken();
//   const [ editProfile, { isLoading } ] = useUserEditProfileMutation();
//   const { selectedProfile } = props;
//   const profile = selectedProfile;
//   const [formData, setFormData] = useState({
//     email: profile.email,
//     name: profile.name,
//     username: profile.username,
//     date_of_birth: profile.date_of_birth,
//     gender: profile.gender,
//     phone: profile.phone,
//     profile_pic: profile.profile_pic,
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const actualData = {
//       email: data.get("email"),
//       name: data.get("name"),
//       username: data.get("username"),
//       date_of_birth: data.get("date_of_birth"),
//       gender: data.get("gender"),
//       phone: data.get("phone"),
//       profile_pic: data.get("profile_pic"),
//     };
//     const res = await editProfile({
//       access_token: access_token,
//       profile: actualData,
//     });
//     // console.log(res);

//     if (res.error) {
//       // console.log(res.error.data.errors)
//       setServerError(res.error.data.errors);
//     }
//   };

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };
//   return (
//     <>
//       <Box
//         component="form"
//         noValidate
//         sx={{ mt: 1 }}
//         id="signup-form"
//         onSubmit={handleSubmit}
//       >
//         <Grid container spacing={0}>
//           <Grid item xs={12}>
//             <Box
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginTop: 8,
//               }}
//             >
//               <Avatar
//                 src={`http://127.0.0.1:8000${formData.profile_pic}`}
//                 style={{ width: 100, height: 100 }}
//               />
//             </Box>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="profile_pic"
//               name="profile_pic"
//               placeholder="Profile Pic"
//               value={formData.profile_pic}
//               onChange={handleInputChange}
//               // label="Profile Pic"
//               type="file"
//             />
//             {server_error.pic ? (
//               <Typography
//                 style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
//               >
//                 {server_error.pic[0]}
//               </Typography>
//             ) : (
//               ""
//             )}
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="name"
//               name="name"
//               label="Name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             {server_error.name ? (
//               <Typography
//                 style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
//               >
//                 {server_error.name[0]}
//               </Typography>
//             ) : (
//               ""
//             )}
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               name="username"
//               label="Username"
//               value={formData.username}
//               onChange={handleInputChange}
//             />
//             {server_error.username ? (
//               <Typography
//                 style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
//               >
//                 {server_error.username[0]}
//               </Typography>
//             ) : (
//               ""
//             )}
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               name="email"
//               label="Email"
//               type="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             {server_error.email ? (
//               <Typography
//                 style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
//               >
//                 {server_error.email[0]}
//               </Typography>
//             ) : (
//               ""
//             )}
//           </Grid>

//           <Grid item xs={12} container>
//             <Grid item xs={4}>
//               <PhoneInput
//                 country="INDIA"
//                 style={{ margin: "normal" }}
//                 id="phone"
//                 name="phone"
//                 placeholder="Enter phone number"
//                 required
//                 value={formData.phone}
//                 onChange={handleInputChange}
//               />
//               {server_error.phone ? (
//                 <Typography
//                   style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
//                 >
//                   {server_error.phone[0]}
//                 </Typography>
//               ) : (
//                 ""
//               )}
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="date_of_birth"
//                 name="date_of_birth"
//                 type="date"
//                 value={formData.date_of_birth}
//                 onChange={handleInputChange}
//               />
//               {server_error.date_of_birth ? (
//                 <Typography
//                   style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
//                 >
//                   {server_error.date_of_birth[0]}
//                 </Typography>
//               ) : (
//                 ""
//               )}
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="gender"
//                 name="gender"
//                 label="Gender"
//                 select
//                 SelectProps={{
//                   native: true,
//                 }}
//                 value={formData.gender}
//                 onChange={handleInputChange}
//               >
//                 <option value="M">Male</option>
//                 <option value="F">Female</option>
//                 <option value="O">Other</option>
//               </TextField>
//               {server_error.gender ? (
//                 <Typography
//                   style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
//                 >
//                   {server_error.gender[0]}
//                 </Typography>
//               ) : (
//                 ""
//               )}
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <Box textAlign="center">
//               {isLoading ? (
//                 <CircularProgress />
//               ) : (
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{ backgroundColor: "#ff00ff", mt: 2, mb: 2 }}
//                 >
//                   Update
//                 </Button>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//         {server_error.non_field_errors ? (
//           <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
//         ) : (
//           ""
//         )}
//       </Box>
//     </>
//   );
// };

// export default EditProfile;

import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useUserEditProfileMutation } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";

const EditProfile = ({ selectedProfile }) => {
  const [serverError, setServerError] = useState({});
  const [formData, setFormData] = useState({
    email: selectedProfile.email,
    name: selectedProfile.name,
    username: selectedProfile.username,
    date_of_birth: selectedProfile.date_of_birth,
    gender: selectedProfile.gender,
    phone: selectedProfile.phone,
    profile_pic: selectedProfile.profile_pic,
  });
  const [editProfile, { isLoading }] = useUserEditProfileMutation();
  const { access_token } = getToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let picVal = data.get("profile_pic");
    if (picVal !== undefined) {
      picVal = data.get("profile_pic");
    }
    else{
      picVal = selectedProfile.profile_pic;
    }
    const actualData = {
      email: data.get("email"),
      name: data.get("name"),
      username: data.get("username"),
      date_of_birth: data.get("date_of_birth"),
      gender: data.get("gender"),
      phone: data.get("phone"),
      profile_pic: picVal,
    };
    const res = await editProfile({
      access_token: access_token,
      profile: actualData,
    });

    if (res.error) {
      setServerError(res.error.data.errors);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      component="form"
      noValidate
      id="signup-form"
      onSubmit={handleSubmit}
      style={{ marginTop: 8 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar
              src={`http://127.0.0.1:8000${formData.profile_pic}`}
              style={{ width: 100, height: 100 }}
            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="profile_pic"
            name="profile_pic"
            placeholder="Profile Pic"
            // value={formData.profile_pic}
            onChange={handleInputChange}
            type="file"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="date_of_birth"
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="gender"
            label="Gender"
            name="gender"
            placeholder="Enter Your Gender"
            value={formData.gender}
            onChange={handleInputChange}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <PhoneInput
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            placeholder="Enter Your Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Grid>
        {Object.keys(serverError).length > 0 && (
          <Grid item xs={12}>
            {Object.values(serverError).map((error) => (
              <Alert severity="error">{error[0]}</Alert>
            ))}
          </Grid>
        )}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <Typography>Update</Typography>
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default EditProfile;