import { useState } from 'react';
import {
  SwipeableDrawer,
  Box,
  List,
  Button,
  ListItem,
  ListItemButton,
  Typography,
  IconButton,
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../constants';
import CloseIcon from '@mui/icons-material/Close';

export default function MenuModalWindow({ menuData }: { menuData: any }) {
  const { t } = useTranslation();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      event.stopPropagation();
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ right: open });
    };

  const list = () => (
    <Box
      width={'50vw'}
      mt={'3vh'}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ '@media (max-width: 600px)': { width: '100vw' } }}
      position={'relative'}>
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{
          color: FILTER_COLORS.BUTTON_RESET_FILTER,
          padding: 0,
          position: 'absolute',
          top: '0.1rem',
          right: '2rem',
        }}>
        <CloseIcon
          sx={{
            height: '30px',
            width: '30px',
            padding: 0,
          }}
        />
      </IconButton>
      <List sx={{}}>
        {menuData.map((menuItem: any, i: number) => (
          <ListItem key={i}>
            <ListItemButton href={menuItem.link}>
              <Typography
                lineHeight="1.7"
                variant="body1"
                fontFamily={FONTS.MAIN_TEXT_FAMILY}
                fontSize={'1.5rem'}
                textAlign={'center'}
                m={'auto'}
                sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '1.8rem',
                  },
                }}>
                {t(menuItem.name)}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <Button
        onClick={toggleDrawer(true)}
        variant="text"
        sx={{
          padding: '0px',
          margin: '0px',
          '@media (min-width: 919px)': {
            display: 'none',
            padding: '0px',
            margin: '0px',
          },
          '@media (max-width: 918px)': {
            minWidth: 0,
          },
        }}>
        <MenuIcon
          sx={{
            color: '#000',
            width: '30px',
            height: '30px',
          }}
        />
      </Button>
      <SwipeableDrawer
        anchor={'right'}
        open={state.right}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </Box>
  );
}
