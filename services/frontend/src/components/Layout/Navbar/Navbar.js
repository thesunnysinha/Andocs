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
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
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

  const { data: cartData } = useFetchCartQuery(access_token);
  const { data: wishlistData } = useFetchWishlistQuery(access_token);

  const { user_data } = useSelector((state) => state.user);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { text: "Profile", path: "/profile" },
    { text: "Change Password", path: "/changepassword" },
    { text: "Orders", path: "/profile?tab=orders" },
    { text: "Address", path: "/profile?tab=address" },
    {
      text: "Logout",
      action: () => {
        handleLogout();
        setAccountAnchorEl(null);
      },
    },
  ];

  const categoryMenuItems = [
    { text: "All Categories", path: "/products?category=all" },
    { text: "Cosmetics", path: "/products?category=C" },
    { text: "Pet Products", path: "/products?category=P" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333", boxShadow: 2 }}>
      <Toolbar sx={{ paddingX: 2 }}>
        {/* Logo */}
        <Button
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color="inherit"
          onClick={handleLogoClick}
        >
          <Typography variant="h6" component="div">
            Andocs
          </Typography>
        </Button>

        {/* Hamburger Icon for Mobile */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={toggleMobileMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Categories Dropdown for Desktop */}
        {!isMobile && (
          <Box sx={{ display: "flex" }}>
            <Button
              color="inherit"
              onClick={handleOpenCategoryMenu}
              sx={{
                textTransform: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                "&:hover": { backgroundColor: "#444" },
              }}
            >
              Categories
            </Button>
            <Menu
              anchorEl={categoryAnchorEl}
              open={Boolean(categoryAnchorEl)}
              onClose={handleCloseCategoryMenu}
              sx={{
                '& .MuiMenuItem-root': {
                  padding: '10px 20px',
                  fontSize: '1rem',
                  borderBottom: "1px solid #ddd",
                  "&:hover": { backgroundColor: "#f4f4f4" },
                },
              }}
            >
              {categoryMenuItems.map((item, idx) => (
                <MenuItem key={idx} onClick={handleCloseCategoryMenu}>
                  <NavLink to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.text}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {access_token ? (
            <>
              {/* Cart Icon */}
              <Tooltip title="Cart" sx={{ marginRight: 2 }}>
                <IconButton color="inherit" onClick={handleCartIconClick}>
                  <Badge badgeContent={cartData?.total_quantity} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Wishlist Icon */}
              <Tooltip title="Wishlist" sx={{ marginRight: 2 }}>
                <IconButton color="inherit" onClick={handleWishlistIconClick}>
                  <Badge
                    badgeContent={wishlistData?.wishlist_total_quantity}
                    color="error"
                  >
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* User Avatar */}
              <Tooltip title="Account">
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

              {/* Account Menu */}
              <Menu
                anchorEl={accountAnchorEl}
                open={Boolean(accountAnchorEl)}
                onClose={handleCloseAccountMenu}
              >
                {menuItems.map((item, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={
                      item.action
                        ? item.action
                        : () => navigate(item.path)
                    }
                    sx={{
                      padding: '10px 20px',
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                      },
                    }}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>

              <Button color="inherit" onClick={handleSignupClick}>
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            paddingTop: 4,
            backgroundColor: "#f4f4f4",
          },
        }}
      >
        <List sx={{ paddingLeft: 2 }}>
          {categoryMenuItems.map((item, idx) => (
            <ListItem button key={idx} onClick={toggleMobileMenu}>
              <ListItemText>
                <NavLink to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {item.text}
                </NavLink>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ marginY: 2 }} />
        {access_token ? (
          <List sx={{ paddingLeft: 2 }}>
            {menuItems.map((item, idx) => (
              <ListItem
                button
                key={idx}
                onClick={item.action ? item.action : () => navigate(item.path)}
              >
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ padding: 2 }}>
            <Button fullWidth onClick={handleLoginClick}>
              Login
            </Button>
            <Button fullWidth onClick={handleSignupClick}>
              Signup
            </Button>
          </Box>
        )}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
