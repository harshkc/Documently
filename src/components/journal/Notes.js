import React from "react";
import {Card, CardHeader, CardContent, Typography, Grid, Divider} from "@material-ui/core";
import useStyles from "./styles";
import {db} from "../../firebase";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {toShortFormat} from "../../utils/formatDate";
import {CircularProgress, Fab} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Notes = ({user}) => {
  const [note, setNote] = React.useState("");
  const [isSaving, setSaving] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [theDay, setTheDay] = React.useState(toShortFormat(new Date()));

  const timeout = React.useRef();

  const getNotes = async (date) => {
    try {
      const noteSnapshot = await getDoc(doc(db, "users", user.id, "notes", date));
      if (noteSnapshot.exists()) {
        setNote(noteSnapshot.data());
      } else {
        setNote("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getNotes(theDay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNoteToDB = async (value, theDay) => {
    try {
      await setDoc(doc(db, "users", user.id, "notes", theDay), {content: value});
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
  };

  const handleChange = (e) => {
    clearTimeout(timeout.current);
    setSaving(true);
    setNote(e.target.value);
    timeout.current = setTimeout(() => {
      addNoteToDB(e.target.value, theDay);
    }, 3000);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const theDay = toShortFormat(date);
    getNotes(theDay);
    setTheDay(theDay);
  };

  const {root, cardContent, divider, wrapper, fabProgress, flexed} = useStyles();
  return (
    <Card className={root}>
      <Grid container spacing={2}>
        <Grid item xs={7} sm={8}>
          <CardHeader
            title={<span style={{fontSize: "2.5rem", fontWeight: "bold"}}>Journaly</span>}
            style={{color: "#E77C97"}}
          />
        </Grid>
        <Grid item xs={5} sm={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='dd/MM/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Fetch Journals'
              minDate={new Date("2022-02-01")}
              maxDate={new Date()}
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <CardContent className={cardContent}>
        <Typography variant='h6'>{theDay}</Typography>
        <Divider className={divider} />
      </CardContent>
      <CardContent className={cardContent}>
        <Grid container>
          <Grid item xs={12}>
            <div className={flexed}>
              <span style={{fontSize: "22px", fontWeight: "bold", marginRight: "0.5rem"}}>
                Reflect Your Day
              </span>
              <div className={wrapper}>
                <Fab size='small' aria-label='save' color='inherit'>
                  {!isSaving ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {isSaving && <CircularProgress size={51} className={fabProgress} />}
              </div>
            </div>
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
              placeholder='Write down what you observed today? Key things you learned OR Great Experiences You had'
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
