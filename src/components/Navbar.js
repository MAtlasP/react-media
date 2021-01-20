import React, { useContext, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { FirebaseAuthContext } from "../context/AuthContext";
import firebase from "../firebase/firebase.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    zIndex: 10,
  },
  appBar: {
    height:70,
  },
  displayName: {
    fontSize: 18,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  accountIcon: {
    marginLeft: 10,
  },
  menuItem: {
    fontSize: "17",
    padding:5,
    overflow: "visible",
  }
}));

export default function Navbar(props) {
  const { currentUser } = useContext(FirebaseAuthContext);
  console.log("currentuser", currentUser);
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = useCallback(() => {
    firebase.signOut();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="secondary">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            React Media
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <p className={classes.displayName}>{currentUser?.displayName}</p>
                <AccountCircle className={classes.accountIcon} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}

          <MenuItem
            className={classes.menuItem} 
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Home
          </MenuItem>
          <MenuItem 
            className={classes.menuItem} 
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Sign in
          </MenuItem>
          <MenuItem
            className={classes.menuItem} 
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Sign up
          </MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}
