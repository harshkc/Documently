import React from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Grid,
  Toolbar,
  Typography,
  AppBar,
} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import BookIcon from "@material-ui/icons/Book";
import MenuIcon from "@material-ui/icons/Menu";
import XpenseIcon from "@material-ui/icons/AccountBalanceWallet";
import useStyles from "./xpenseStyles";

import {Link, Routes, Route, useLocation} from "react-router-dom";
import {PushToTalkButton, PushToTalkButtonContainer} from "@speechly/react-ui";
import {SpeechState, useSpeechContext} from "@speechly/react-client";

import Details from "../components/Details/Details";
import Main from "../components/Main/Main";
import Avatar from "../components/Avatar/Avatar";
import Journal from "./Journaly";

const XpenseCard = ({mainRef}) => {
  const {grid, main, desktop, mobile, last} = useStyles();

  return (
    <Grid
      className={grid}
      container
      spacing={0}
      alignItems='center'
      justifyContent='center'
      style={{height: "100vh"}}
    >
      <Grid item sm={4} className={mobile}>
        <Details />
      </Grid>
      <Grid ref={mainRef} item xs={10} sm={9} md={4} lg={3} className={main}>
        <Main />
      </Grid>
      <Grid item xs={10} sm={10} md={4} className={desktop}>
        <Details />
      </Grid>
      <Grid item xs={10} sm={10} md={4} className={last}>
        <Details isExpense={true} />
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </Grid>
  );
};

const App = ({theme, toggleTheme, handleLogout, user}) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {navbar, navVisibile, drawerPaper} = useStyles();
  const {speechState} = useSpeechContext();
  const mainRef = React.useRef(null);
  const location = useLocation();

  const executeScroll = () => mainRef.current.scrollIntoView({behavior: "smooth"});

  React.useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: "90vw",
          marginTop: "1rem",
        }}
        className={navbar}
      >
        <IconButton
          onClick={() => {}}
          style={{
            backgroundColor: "white",
            padding: "0.4rem 0.6rem 0.3rem 0.6rem",
            marginRight: "0.5rem",
            marginBottom: "0.5rem",
            color: "grey",
          }}
        >
          <Link to={location.pathname === "/journaly" ? "/" : "/journaly"}>
            {location.pathname === "/journaly" ? <XpenseIcon /> : <BookIcon />}
          </Link>
        </IconButton>
        <IconButton
          onClick={toggleTheme}
          style={{
            backgroundColor: "white",
            padding: "0.5rem",
            marginRight: "0.5rem",
            marginBottom: "0.5rem",
            color: "grey",
          }}
        >
          {theme === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Avatar
          photoURL={user.photoURL}
          username={user.displayName}
          handleClick={handleClick}
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleLogout={handleLogout}
        />
      </div>
      <div className={navVisibile}>
        <AppBar position='static'>
          <Toolbar
            style={{
              backgroundColor: "rgba(231, 124, 151,0.52)",
            }}
          >
            <IconButton onClick={() => setOpenDrawer(true)} edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              Xpensly
            </Typography>
            <Avatar
              photoURL={user.photoURL}
              username={user.displayName}
              handleClick={handleClick}
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
              handleLogout={handleLogout}
            />
            <Drawer
              variant='temporary'
              classes={{
                paper: drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
            >
              <List style={{margin: "2rem 1rem 2rem 1rem"}}>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to='/'>Xpensly</Link>
                  </ListItemText>
                </ListItem>
                <hr />
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to='/journaly'>Journally</Link>
                  </ListItemText>
                </ListItem>
                <hr />
                <ListItem onClick={toggleTheme}>
                  <ListItemText>
                    Switch Theme
                    <IconButton
                      onClick={() => {}}
                      style={{
                        padding: "0.4rem",
                        color: "grey",
                      }}
                    >
                      {theme === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                  </ListItemText>
                </ListItem>
                <hr />
              </List>
            </Drawer>
          </Toolbar>
        </AppBar>
      </div>
      <Routes>
        <Route path='/' element={<XpenseCard mainRef={mainRef} />} />
        <Route path='/journaly' exact element={<Journal user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
