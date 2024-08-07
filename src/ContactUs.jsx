import React from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBoxWithBackground from './reuseComponent/TitleBoxWithBackground';
import backgroundImage from './images/contact-us/contact-us.jpg';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { IMaskMixin } from 'react-imask';

const MaskStyledInput = IMaskMixin(TextField);

function FeedbackForm(props) {
  
  return (
    <Box component="form" onSubmit={props.handleSubmit} id="myForm">
      <Grid container>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            margin="normal"
            helperText={props.errors.first_name}
            required
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            margin="normal"
            helperText={props.errors.last_name}
            required
          />
        </Grid>
        <Grid xs={12}>
          <MaskStyledInput
            mask="000-0000-000[0]"
            unmask={true}
            fullWidth
            id="phone"
            name="phone"
            label="Contact Number"
            variant="outlined"
            margin="normal"
            helperText={props.errors.phone}
            required
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            helperText={props.errors.email}
            required
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            id="message"
            name="message"
            label="Message"
            variant="outlined"
            margin="normal"
            helperText={props.errors.message}
            multiline
            required
          />
        </Grid>
        <Grid xs={12}>
          <Box display='flex' justifyContent='center'>
            <Button type='submit' variant='contained' color='primary'>
              Submit Feedback
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function ContactUs() {

  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});

  function handleSubmit(event, navigate, setErrors) {
    event.preventDefault();
    
    var form = event.target;
    var fName = form.firstName.value;
    var lName = form.lastName.value;
    var phone = form.phone.value.replace(/-/g, '');
    var email = form.email.value;
    var message = form.message.value;
  
    var user = {
      "first_name": fName,
      "last_name": lName,
      "phone": phone,
      "email": email,
      "message": message
    };
    
    let user_feedbacks = sessionStorage.getItem('user_feedbacks');

    if (user_feedbacks) {
      user_feedbacks = JSON.parse(user_feedbacks);
      user_feedbacks = [...user_feedbacks, user];
      sessionStorage.setItem('user_feedbacks', JSON.stringify(user_feedbacks));
    }
    else {
      user_feedbacks = [user];
      sessionStorage.setItem('user_feedbacks', JSON.stringify(user_feedbacks));
    }

    alert("Feedback submitted successfully! Redirecting to home page.");
  
    return navigate("/");
  }

  const handleFormSubmit = (event) => {
    handleSubmit(event, navigate, setErrors);
  }

  const styles = {

    largeIcon: {
      fontSize: 100,
      textAlign: 'center',
      color: 'white'
    },

    centerRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    centerColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

  };

  return (
    <>
      <TitleBoxWithBackground background={backgroundImage}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid xs={12}>
            <Typography variant='h2' textAlign='center'>
              GET IN TOUCH
            </Typography>
          </Grid>
          <Grid xs={12} spacing={3} container sx={styles.centerRow}>
            <Grid sx={styles.centerColumn} sm>
              <IconButton component="a" href="https://www.instagram.com/" target='_blank'>
                <InstagramIcon sx={styles.largeIcon} />
              </IconButton>
              <Typography variant='h3' textAlign='center'>
                Instagram
              </Typography>
              <Typography variant='h6' textAlign='center'>
                @snowball_1234
              </Typography>
              <Typography variant='body1' textAlign='center'>
                just drop a message to us
              </Typography>
            </Grid>
            <Grid sx={styles.centerColumn} sm>
              <IconButton component="a" href="mailto://snowball@gmail.com">
                <MailIcon sx={styles.largeIcon} />
              </IconButton>
              <Typography variant='h3' textAlign='center'>
                Email
              </Typography>
              <Typography variant='h6' textAlign='center'>
                snowball@1utar.com
              </Typography>
              <Typography variant='body1' textAlign='center'>
                reach you as soon as possible
              </Typography>
            </Grid>
            <Grid sx={styles.centerColumn} sm>
              <IconButton>
                <RecentActorsIcon sx={styles.largeIcon} />
              </IconButton>
              <Typography variant='h3' textAlign='center'>
                Contact Number
              </Typography>
              <Typography variant='h6' textAlign='center'>
                123456778
              </Typography>
              <Typography variant='body1' textAlign='center'>
                Mon - Sat (excluding Sunday, Christmas & New Year): 9am to 9pm
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </TitleBoxWithBackground>
      <Box width='100%' bgcolor='background.paper'>
        <Grid container width='100%' spacing={6} padding={4}>
          <Grid md>
            <Typography variant='h2' marginBottom='2rem'>
              Leave us a message
            </Typography>
            <Typography variant='body1' textAlign='justify' marginBottom='1rem'>
              Please leave us a message with your thoughts, or any questions you may have.
              If you have any important stuff, please reach us via contact number.
              Thank you for taking the time to reach out to us!
            </Typography>
            <Typography variant='body1' textAlign='justify'>
              Our staff will reply to your message within 24 hours. Please stay tune to the reply via email or phone.
            </Typography>
          </Grid>
          <Grid md>
            <Typography variant='h4'>
              Please fill in this feeback form
            </Typography>
            <FeedbackForm handleSubmit={handleFormSubmit} errors={errors}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContactUs;