// import React, { useState } from "react";
// import {
//   Box,
//   IconButton,
//   Typography,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
//   Grid,
// } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import HomeIcon from "@mui/icons-material/Home";
// import { FaBars } from "react-icons/fa";
// import { NavLink as Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { API_BASE_URL } from "../../../services/apiConfig";
// import {
//   useFetchCartQuery,
//   useFetchWishlistQuery,
// } from "../../../services/userAuthApi";
// import { getToken } from "../../../services/LocalStorageService";
// import styled from "styled-components";

// const Nav = styled.nav`
//   background-color: #555;
//   height: 60px;
//   display: flex;
//   justify-content: center;
//   padding: 0 2rem;
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 1;

//   @media screen and (max-width: 768px) {
//     padding: 0 1rem;
//   }
// `;

// const NavLink = styled(Link)`
//   color: #fff;
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   height: 100%;
//   padding: 0 0.4rem;
//   cursor: pointer;

//   @media screen and (max-width: 768px) {
//     padding: 0.5rem 0;
//     width: 100%;
//     text-align: center;
//   }
// `;

// const Bars = styled(FaBars)`
//   display: none;
//   color: #00ffff;
//   font-size: 1.8rem;
//   cursor: pointer;

//   @media screen and (max-width: 768px) {
//     display: block;
//     position: absolute;
//     top: 0;
//     right: 0;
//     transform: translate(-100%, 75%);
//   }
// `;

// const NavMenu = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: auto;
//   margin-right: 30px;

//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// const MobileNav = styled.div`
//   display: none;

//   @media screen and (max-width: 768px) {
//     display: flex;
//     flex-direction: column;
//     background-color: #555;
//     position: absolute;
//     top: 60px;
//     left: 0;
//     right: 0;
//     z-index: 11;
//   }
// `;

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { access_token } = getToken();

//   const {
//     data: cartData,
//     isSuccess: isCartDataSuccess,
//     error: isCartDataError,
//   } = useFetchCartQuery(access_token);

//   const {
//     data: wishlistData,
//     isSuccess: isWishlistSuccess,
//     isError: isWishlistError,
//   } = useFetchWishlistQuery(access_token);

//   const { user_data } = useSelector((state) => state.user);

//   const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
//   const [accountAnchorEl, setAccountAnchorEl] = useState(null);

//   const handleCategoryClick = (event) => {
//     setCategoryAnchorEl(event.currentTarget);
//   };

//   const handleCategoryClose = () => {
//     setCategoryAnchorEl(null);
//   };

//   const handleAccountClick = (event) => {
//     setAccountAnchorEl(event.currentTarget);
//   };

//   const handleAccountClose = () => {
//     setAccountAnchorEl(null);
//   };

//   return (
//     <>
//       <Nav>
//         <NavLink to="/">
//           <Typography variant="h6">Andocs</Typography>
//         </NavLink>
//         <Bars onClick={() => setIsMenuOpen(!isMenuOpen)} />
//         <NavMenu>
//           <NavLink onClick={handleCategoryClick}>
//             <Typography variant="body1">Categories</Typography>
//           </NavLink>
//           {access_token ? (
//             <>
//               <NavLink to="/cart">
//                 <Typography variant="body1">
//                   <Box display="flex" alignItems="center">
//                     <IconButton size="medium" color="inherit">
//                       <ShoppingCartIcon />
//                       {cartData?.total_quantity > 0 && (
//                         <Box
//                           sx={{
//                             position: "absolute",
//                             top: -8,
//                             right: -10,
//                             backgroundColor: "red",
//                             borderRadius: "50%",
//                             height: 16,
//                             width: 16,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontSize: "0.7rem",
//                           }}
//                         >
//                           {cartData.total_quantity}
//                         </Box>
//                       )}
//                     </IconButton>
//                   </Box>
//                 </Typography>
//               </NavLink>

//               <NavLink to="/wishlist">
//                 <Typography variant="body1">
//                   <Box display="flex" alignItems="center">
//                     <IconButton size="medium" color="inherit">
//                       <FavoriteIcon />
//                       {wishlistData?.wishlist_total_quantity > 0 && (
//                         <Box
//                           sx={{
//                             position: "absolute",
//                             top: -8,
//                             right: -10,
//                             backgroundColor: "red",
//                             borderRadius: "50%",
//                             height: 16,
//                             width: 16,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontSize: "0.7rem",
//                           }}
//                         >
//                           {wishlistData.wishlist_total_quantity}
//                         </Box>
//                       )}
//                     </IconButton>
//                   </Box>
//                 </Typography>
//               </NavLink>

//               <NavLink onClick={handleAccountClick}>
//                 <Typography variant="body1">
//                   <AccountCircleIcon /> Account
//                 </Typography>
//               </NavLink>
//             </>
//           ) : (
//             <>
//               <NavLink to="/login">
//                 <Typography variant="body1">Login / Signup</Typography>
//               </NavLink>
//             </>
//           )}
//         </NavMenu>
//       </Nav>

//       {/* Category Menu */}
//       <Menu
//         id="category-menu"
//         anchorEl={categoryAnchorEl}
//         keepMounted
//         open={Boolean(categoryAnchorEl)}
//         onClose={handleCategoryClose}
//       >
//         <MenuItem
//           component={NavLink}
//           to="/products?category=all"
//           onClick={handleCategoryClose}
//         >
//           <ListItemText>All Categories</ListItemText>
//         </MenuItem>
//         <MenuItem
//           component={NavLink}
//           to="/products?category=cosmetics"
//           onClick={handleCategoryClose}
//         >
//           <ListItemText>Cosmetics</ListItemText>
//         </MenuItem>
//         <MenuItem
//           component={NavLink}
//           to="/products?category=petproducts"
//           onClick={handleCategoryClose}
//         >
//           <ListItemText>Pet Products</ListItemText>
//         </MenuItem>
//       </Menu>

//       {/* Account Menu */}
//       <Menu
//         id="account-menu"
//         anchorEl={accountAnchorEl}
//         keepMounted
//         open={Boolean(accountAnchorEl)}
//         onClose={handleAccountClose}
//       >
//         <MenuItem
//           component={NavLink}
//           to="/profile"
//           onClick={handleAccountClose}
//         >
//           <ListItemIcon>
//             <Avatar
//               src={`${API_BASE_URL}${user_data?.pic}`}
//               style={{ width: 40, height: 40 }}
//             />
//           </ListItemIcon>
//           <ListItemText>{user_data?.username}</ListItemText>
//         </MenuItem>
//         <MenuItem component={NavLink} to="/orders" onClick={handleAccountClose}>
//           <ListItemIcon>
//             <ShoppingCartIcon />
//           </ListItemIcon>
//           <ListItemText>Orders</ListItemText>
//         </MenuItem>
//         <MenuItem
//           component={NavLink}
//           to="/change_password"
//           onClick={handleAccountClose}
//         >
//           <ListItemIcon>
//             <AccountCircleIcon />
//           </ListItemIcon>
//           <ListItemText>Change Password</ListItemText>
//         </MenuItem>
//         <MenuItem
//           component={NavLink}
//           to="/address"
//           onClick={handleAccountClose}
//         >
//           <ListItemIcon>
//             <HomeIcon />
//           </ListItemIcon>
//           <ListItemText>Address</ListItemText>
//         </MenuItem>
//       </Menu>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <MobileNav>
//           <Grid container spacing={1}>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="flex-end">
//                 <IconButton onClick={() => setIsMenuOpen(false)}></IconButton>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <NavLink to="/">Home</NavLink>
//             </Grid>
//             <Grid item xs={12}>
//               <NavLink onClick={handleCategoryClick}>
//                 <Typography variant="body1">Categories</Typography>
//               </NavLink>
//             </Grid>

//             {access_token ? (
//               <>
//                 <Grid item xs={12}>
//                   <NavLink to="/cart">
//                     <Typography variant="body1">
//                       <Box display="flex" alignItems="center">
//                         <IconButton size="medium" color="inherit">
//                           <ShoppingCartIcon />
//                           {cartData?.total_quantity > 0 && (
//                             <Box
//                               sx={{
//                                 position: "absolute",
//                                 top: -8,
//                                 right: -10,
//                                 backgroundColor: "red",
//                                 borderRadius: "50%",
//                                 height: 16,
//                                 width: 16,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 fontSize: "0.7rem",
//                               }}
//                             >
//                               {cartData?.total_quantity}
//                             </Box>
//                           )}
//                         </IconButton>
//                       </Box>
//                     </Typography>
//                   </NavLink>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <NavLink to="/wishlist">
//                     <Typography variant="body1">
//                       <Box display="flex" alignItems="center">
//                         <IconButton size="medium" color="inherit">
//                           <FavoriteIcon />
//                           {wishlistData?.wishlist_total_quantity > 0 && (
//                             <Box
//                               sx={{
//                                 position: "absolute",
//                                 top: -8,
//                                 right: -10,
//                                 backgroundColor: "red",
//                                 borderRadius: "50%",
//                                 height: 16,
//                                 width: 16,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 fontSize: "0.7rem",
//                               }}
//                             >
//                               {wishlistData?.wishlist_total_quantity}
//                             </Box>
//                           )}
//                         </IconButton>
//                       </Box>
//                     </Typography>
//                   </NavLink>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <NavLink onClick={handleAccountClick}>
//                     <Typography variant="body1">
//                       <AccountCircleIcon /> Account
//                     </Typography>
//                   </NavLink>
//                 </Grid>
//               </>
//             ) : (
//               <>
//                 <Grid item xs={12}>
//                   <NavLink to="/login">Login / Signup</NavLink>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </MobileNav>
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../../services/apiConfig";
import { getToken } from "../../../services/LocalStorageService";
import {
  useFetchCartQuery,
  useFetchWishlistQuery,
} from "../../../services/userAuthApi";

import useLogout from "../../../services/logoutService";

const Navbar = () => {
  const navigate = useNavigate();
  const { access_token } = getToken();

  const {
    data: cartData,
    // isSuccess: isCartDataSuccess,
    // error: isCartDataError,
  } = useFetchCartQuery(access_token);

  const {
    data: wishlistData,
    // isSuccess: isWishlistSuccess,
    // isError: isWishlistError,
  } = useFetchWishlistQuery(access_token);

  const { user_data } = useSelector((state) => state.user);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const handleOpenCategoryMenu = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCloseCategoryMenu = () => {
    setCategoryAnchorEl(null);
  };

  const handleOpenAccountMenu = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAccountAnchorEl(null);
  };

  const handleCartIconClick = () => {
    navigate("/cart");
  };

  const handleWishlistIconClick = () => {
    navigate("/wishlist");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login?tab=login");
  };

  const handleSignupClick = () => {
    navigate("/login?tab=signup");
  };

  const { handleLogout } = useLogout();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#555" }}>
      <Toolbar>
        {/* Logo */}
        <Button
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color="inherit"
          onClick={handleLogoClick}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Andocs
          </Typography>
        </Button>

        {/* Categories Dropdown */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" onClick={handleOpenCategoryMenu}>
            Categories
          </Button>
          <Menu
            anchorEl={categoryAnchorEl}
            open={Boolean(categoryAnchorEl)}
            onClose={handleCloseCategoryMenu}
          >
            <MenuItem onClick={handleCloseCategoryMenu}>
              <NavLink to="/products?category=all">All Categories</NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseCategoryMenu}>
              <NavLink to="/products?category=cosmetics">Cosmetics</NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseCategoryMenu}>
              <NavLink to="/products?category=petproducts">
                Pet Products
              </NavLink>
            </MenuItem>
          </Menu>
        </Box>

        {access_token ? (
          <>
            {/* Cart Icon */}
            <Tooltip title="cart">
              <IconButton color="inherit" onClick={handleCartIconClick}>
                <Badge badgeContent={cartData?.total_quantity} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Wishlist Icon */}
            <Tooltip title="wishlist">
              <IconButton color="inherit" onClick={handleWishlistIconClick}>
                <Badge
                  badgeContent={wishlistData?.wishlist_total_quantity}
                  color="error"
                >
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="settings">
              <IconButton onClick={handleOpenAccountMenu} sx={{ p: 0 }}>
                {user_data?.pic ? (
                  <Avatar
                    alt={user_data?.username}
                    src={`${API_BASE_URL}${user_data?.pic}`}
                  />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
            </Tooltip>

            {/* Menu for Cart, Wishlist, and Account */}
            <Menu
              anchorEl={accountAnchorEl}
              open={Boolean(accountAnchorEl)}
              onClose={handleCloseAccountMenu}
            >
              <MenuItem onClick={handleCloseAccountMenu}>
                <NavLink to="/profile">Profile</NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseAccountMenu}>
                <NavLink to="/changepassword">Change Passowrd</NavLink>
              </MenuItem>

              <MenuItem onClick={handleCloseAccountMenu}>
                <NavLink to="/profile?tab=orders">Orders</NavLink>
              </MenuItem>

              <MenuItem onClick={handleCloseAccountMenu}>
                <NavLink to="/profile?tab=address">Address</NavLink>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseAccountMenu();
                  handleLogout();
                }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleLoginClick}>
              <Typography>Login</Typography>
            </Button>

            <Button color="inherit" onClick={handleSignupClick}>
              <Typography>Signup</Typography>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
