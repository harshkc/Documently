import React from "react";
import {Card, CardHeader, CardContent, Typography, Grid, Divider} from "@material-ui/core";
import useStyles from "./styles";
import {db} from "../../firebase";
import {doc, getDoc, setDoc, deleteDoc} from "firebase/firestore";
import {toShortFormat} from "../../utils/formatDate";

const getInitialState = () => {
  return JSON.parse(localStorage.getItem("notes")) || "";
};

const Notes = ({user}) => {
  const [note, setNote] = React.useState("");
  const timeout = React.useRef();
  const today = toShortFormat(new Date());

  const getNotes = async (date) => {
    try {
      const noteSnapshot = await getDoc(doc(db, "users", user.id, "notes", date));
      if (noteSnapshot.exists()) {
        setNote(noteSnapshot.data());
      } else {
        console.log("No notes found");
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getNotes(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNoteToDB = async (value) => {
    try {
      console.log("note", note);
      await setDoc(doc(db, "users", user.id, "notes", today), {content: value});
      console.log("Note added to firestore");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNoteFromDB = async () => {
    try {
      const toDeleteRef = doc(db, "users", user.id, "notes", today);
      await deleteDoc(toDeleteRef);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    clearTimeout(timeout.current);
    setNote(e.target.value);
    timeout.current = setTimeout(() => {
      addNoteToDB(e.target.value);
    }, 3000);
  };

  const {root, cardContent, divider} = useStyles();
  return (
    <Card className={root}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <CardHeader
            title={
              <Typography variant='h3' style={{fontWeight: "bold"}}>
                Journaly
              </Typography>
            }
            style={{color: "#E77C97"}}
          />
        </Grid>
      </Grid>
      <CardContent className={cardContent}>
        <Typography variant='h6'>{today}</Typography>
        <Divider className={divider} />
      </CardContent>
      <CardContent className={cardContent}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h6'>
              <strong>Reflect Your Day</strong>
            </Typography>
            <textarea
              style={{
                margin: "10px 0",
                padding: "8px 12px",
                border: "1px solid #f1f1f4",
                background: "#f1f1f4",
                borderRadius: "5px",
                width: "100%",
                maxWidth: "100%",
                maxHeight: "50vh",
                height: "50vh",
              }}
              placeholder='Write down what you observed today, key things you learned or great experiences'
              onChange={handleChange}
              value={note.content}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Notes;
