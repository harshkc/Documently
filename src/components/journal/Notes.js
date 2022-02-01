import React from "react";
import {Card, CardHeader, CardContent, Typography, Grid, Divider} from "@material-ui/core";
import useStyles from "./styles";

const Notes = ({user}) => {
  const {root, cardContent, divider} = useStyles();

  const handleChange = (e) => {
    console.log(e.target.value);
  };

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
        <Typography variant='h6'>{new Date().toLocaleDateString()}</Typography>
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
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Notes;
