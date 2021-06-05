import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  makeStyles,
  Fade,
  Backdrop,
  Divider,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";


import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Header from "../Header/Header";
import BrowseDetail from "../BrowseDetail/BrowseDetail";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    overflow: "auto",
    width: 225,
    height: "75%",
    backgroundColor: "#81ac8d",
    border: "2px solid #000",
    padding: "5%",
    borderRadius: 16,
    outline: 0,
  },
  image: {
    display: "block",
    maxWidth: "75px",
    maxHeight: "75px",
    marginLeft: "auto",
    marginRight: "auto",
    border: "2px solid #000",
  },
  list: {
    width: "100%",
    maxWidth: 360,
  },
  avatars: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1),
    border:  "1px solid",
    borderColor: theme.palette.primary.main,
  },
  title: {
    textAlign: "center",
    
  },
  divider: {
    marginBottom: "5px",
  },
  contact: {
    backgroundColor: "whitesmoke",
  },
  modal: {
    margin: "0 auto",
    display: "flex",
  },
  button: {
    margin: "0 auto",
    display: "flex",
  },
  info: {
    overflow: "auto",
    maxHeight: 100,
    height: 100,
  },
  modalPic: {
    overflow: "visible",
    minHeight: 75,
    height: 75,
    marginBottom: "2%",
  },
  bookmark: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function Browse() {
  useEffect(() => {
    dispatch({ type: "FETCH_BROWSER" });
    dispatch({ type: "FETCH_FAVORITES", payload: user.id });
  }, []);

  const dispatch = useDispatch();

  const classes = useStyles();
  //   const [modalStyle] = React.useState(getModalStyle);

  //state for modal open attribute
  const [open, setOpen] = useState(false);
  

  // ---REDUCERS--- //

  // grabs all posts for browser
  const browser = useSelector((store) => store.browser.browser);
  // grabs user info
  const user = useSelector((store) => store.user);
  


  // targets specific post and 
  // toggles the modal to open
  const toDetail = (post) => {
      //populates details reducer
    dispatch({ type: "FETCH_DETAILS", payload: post.id });
    modalToggle();
  };


  // function to toggle modal
  const modalToggle = () => {
    // reset reducer to be empty
    dispatch({ type: "SET_DETAILS", payload: {} });
    // toggle modal window
    setOpen(!open);
  };

 

  return (
    <div>
      <Header />
      <Typography className={classes.title} variant="h5">
        Browse Trade List
      </Typography>
      <Divider />
      <div className="grid">
        <div className="grid-col grid-col_8">
          <List className={classes.list}>
            {browser.map((post, i) => {
              return (
                <>
                  <ListItem key={i} onClick={() => toDetail(post)}>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        className={classes.avatars}
                        src={post.image_url}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={post.title}
                      secondary={post.condition}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </div>
        <div>
          <Modal
            open={open}
            onClose={modalToggle}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              {
                <BrowseDetail
                  modalToggle={() => {
                    setOpen(!open);
                  }}
                />
              }
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Browse;
