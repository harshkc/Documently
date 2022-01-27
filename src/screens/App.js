import React from "react";
import useStyles from "./styles";
import Details from "../components/Details/Details";
import Main from "../components/Main/Main";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import MenuIcon from "@material-ui/icons/Menu";

import Avatar from "../components/Avatar/Avatar";

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

import {PushToTalkButton, PushToTalkButtonContainer} from "@speechly/react-ui";
import {SpeechState, useSpeechContext} from "@speechly/react-client";

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
  const {grid, main, desktop, navbar, mobile, last, navVisibile, drawerPaper} = useStyles();
  const {speechState} = useSpeechContext();
  const mainRef = React.useRef(null);

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
                  <ListItemText>Xpensly</ListItemText>
                </ListItem>
                <hr />
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>Journally</ListItemText>
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
    </div>
  );
};

export default App;
