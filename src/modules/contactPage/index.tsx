import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { ContactMainInfo } from './components/ContactMainInfo';
import GoogleMapBox from './components/GoogleMapBox';

export function ContactPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToMap) {
      const mapBox = document.getElementById('googleMapBox');
      if (mapBox) {
        mapBox.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <Box
      m={'3% auto 10%'}
      maxWidth={'60rem'}
      sx={{
        '@media (max-width: 1500px)': {
          m: '3% 20% 10%',
        },
        '@media (max-width: 1111px)': {
          m: '3% 15% 10%',
        },
        '@media (max-width: 960px)': {
          m: '3% 10% 10%',
        },
      }}>
      <ContactMainInfo />
      <GoogleMapBox />
    </Box>
  );
}
