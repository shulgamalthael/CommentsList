import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import "./index.scss";
import { Grid, Box, Container, Paper, Typography, Avatar,TextField, FormControl  } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    root: {
        backgroundColor: theme.palette.primary.dark,
        height: "100vh",
        display: "flex",
        flexGrow: "1",
        flexDirection: "column",
        boxShadow: "0 0 10px 20px rgba(0,0,0,0.888)",
    },
    header: {
        display: "flex",
        width: "100%",
        textTransform: "uppercase",
        color: "white",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "5%",
        width: "100%",
        backgroundColor: theme.palette.header.dark,
        boxShadow: "0 0 7.77px 3.33px rgba(0,0,0,0.888)",
        marginBottom: theme.spacing(2),
    },
    commentEditor: {
        display: "flex",
        flexDirection: "column",
        height: "10%",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0 0 7.77px 3.33px rgba(0,0,0,0.888)",
    },
    commentInput: { 
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10%",
        '& label.Mui-focused': {
            color: 'black',
            fontSize: "1.5em",
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
                border: "none",
            },
            '&.Mui-focused fieldset': {
              border: "none",
            },
          },
    },
    paper: {
        backgroundColor: theme.palette.primary.main,
        height: "90%",
        margin: "auto",
        width: "50%",
        padding: theme.spacing(2),
        overflow: "auto",
        boxShadow: "0 0 7.77px 3.33px rgba(0,0,0,0.888)",
        "&::-webkit-scrollbar": {
            display: "none",
        }
    },
    comment: {
        boxShadow: "0 0 3.33px 1.11px rgba(0,0,0,0.888)",
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    userAvatarContainer: {
        display: "flex",
        minHeight: "100%",
    },
    userAvatar: {
        display: "flex",
        margin: "auto",
        minHeight: "50%",
        minWidth: "25%",
        textAlign: "center",
    },
    img: {
        height: "100%",
        width: "100%",
    },
    commentContainer: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        minHeight: "100%",
        width: "100%",
        wordBreak: "break-word"
    },
    name: {
        color: "red",
        padding: theme.spacing(2),
        paddingTop: 0,
        paddingleft: 0,
    },
    message: {
        padding: theme.spacing(2),
        boxShadow: "0 0 3.33px 1.11px rgba(0,0,0,0.111)",
        // borderLeft: "0.25px solid rgba(0,0,0,0.025)",
        // borderRight: "0.25px solid rgba(0,0,0,0.055)",
    },
    date: {
        color: "silver",
        width: 200,
    },
}))

const messages = [
    {
        name: "Nikita Shulha ,1WO",
        message: "Hello dude! Welcome to our party!",
        date: moment().format("ddd MM YYYY HH:mm"),
        avatar_url: "data:image/jpeg;base64,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",
    },
    {
        name: "1WO inc.",
        message: "+, Welcome!",
        date: moment().format("ddd MM YYYY HH:mm"),
        avatar_url: "data:image/png;base64,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",
    },
    {
        name: "Guest",
        message: "OK, let`s some drinks :)fwabfgjwabhajlndfawk;fnawi;fjwaipfhawfhbwauodhauofgawudgfaefhgdowhawpidhejgbshgkgwaoufhw",
        date: moment().format("ddd MM YYYY HH:mm"),
        avatar_url: "data:image/jpeg;base64,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",
    },
    {
        name: "Guest",
        message: "OK, let`s some drinks :)fwabfgjwabhajlndfawk;fnawi;fjwaipfhawfhbwauodhauofgawudgfaefhgdowhawpidhejgbshgkgwaoufhwawifhwafowahnodlbwaifbwadbhaljdas;jaipfwhnfjoabfhiesfbsayhfvbawkdahduwiofhawuifoawdihanbwidhadu",
        date: moment().format("ddd MM YYYY HH:mm"),
        avatar_url: "data:image/jpeg;base64,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",
    },
    {
        name: "Guest",
        message: "OK, let`s some drinks :)fwabfgjwabhajlndfawk;fnawi;fjwaipfhawfhbwauodhauawbnjlafhniwlanfawjlg njwfbajkwfbjkalnwidlanfwjbfahkfbawfhaiwfjawipfawoifwahfojabfahkwfbawvksfoauwfbawkfvbahvbwuidhawoidajwhpinawldjbnadavbwdwfbofgawudgfaefhgdowhawpidhejgbshgkgwaoufhwawifhwafowahnodlbwaifbwadbhaljdas;jaipfwhnfjoabfhiesfbsayhfvbawkdahduwiofhawuifoawdihanbwidhadu",
        date: moment().format("ddd MM YYYY HH:mm"),
    }
];

const App = () => {
    
    const [ commentsList, setCommentsList ] = useState([]);
    const [ message, setMessage ] = useState("");

    useEffect(() => {
        const comments = [...messages, ...JSON.parse(localStorage.getItem("comments"))];
        setTimeout( () => setCommentsList(comments), 25 )
    }, [])

    console.log(commentsList);

    const classes = useStyles();

    const sendComment = e => {
        if ( e.keyCode === 13 ) {
            if ( message.split("").length > 0 ) {
                setCommentsList( prev => [...prev, 
                    {
                        name: "Guest",
                        message: message,
                        date: moment().format("ddd MM YYYY HH:mm"),
                    }
                ])
                localStorage.setItem("comments", JSON.stringify([...commentsList, {
                    name: "Guest",
                    message: message,
                    date: moment().format("ddd MM YYYY HH:mm"),
                }]))
            }
            setMessage("");
            console.log(message);
        }
    }

    return(
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Box>
                    <Typography>ExampleBook</Typography>
                </Box>
            </Paper>
            <Paper className={classes.paper}>
            <Paper style={{ position: "fixed", zIndex: 1000 }}>
                <TextField 
                    label="Enter your comment" 
                    variant="outlined" 
                    className={classes.commentInput} 
                    onKeyDown={ e => sendComment(e) } 
                    onChange={ e => setMessage(e.target.value) } 
                    value={message} 
                />
            </Paper>
            {commentsList.map( user => {
                return(
                    <Paper className={classes.comment}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography className={classes.userAvatarContainer}>
                                <Avatar className={classes.userAvatar} src={user.avatar_url ? user.avatar_url : null} />
                            </Typography>
                        </Grid>
                        <Grid item xs={10} sm container className={classes.commentContainer} direction="column">
                            <Grid className={classes.name} item xs>
                                <Typography>{user.name}</Typography>
                            </Grid>
                            <Grid className={classes.message} item xs>
                                <Typography style={{ fontSize: "1em"}}>{user.message}</Typography>
                            </Grid>
                        </Grid>
                        <Grid className={classes.date} item xs={2}>
                            <Typography style={{ float: "right" }}>{user.date}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                )
            })}
            </Paper>
        </div>
    )
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    header: {
        dark: "#000066",
    }
  },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);