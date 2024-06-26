import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollTopButton(props) {

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 , zIndex: 9999}}
      >
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
}

export default ScrollTopButton;