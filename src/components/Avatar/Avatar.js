import React from "react";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import {Avatar as AccountAvatar} from "@material-ui/core";

const Avatar = ({photoURL, handleClick, anchorEl, open, handleClose, handleLogout, username}) => {
  return (
    <>
      <IconButton style={{padding: "0", marginLeft: "auto", marginBottom: "0.5rem"}} onClick={handleClick}>
        <AccountAvatar src={photoURL} />
      </IconButton>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>{username}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Avatar;
