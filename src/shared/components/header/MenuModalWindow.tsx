import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../constants';
import {
  SwipeableDrawer,
  Box,
  List,
  Button,
  ListItem,
  Typography,
  IconButton,
  Link,
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

type MenuItemData = {
  name: string;
  link: string;
};

export default function MenuModalWindow({
  menuData,
}: {
  menuData: MenuItemData[];
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const [state, setState] = useState({
    right: false,
  });

  const isActiveLink = (link: string) => {
    return (
      location.pathname === link || location.pathname.startsWith(`${link}/`)
    );
  };

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
            <Link
              href={menuItem.link}
              underline="none"
              color={'inherit'}
              m={'auto'}>
              <Typography
                lineHeight="1.7"
                variant="body1"
                fontFamily={FONTS.MAIN_TEXT_FAMILY}
                fontSize={'1.5rem'}
                fontWeight={isActiveLink(menuItem.link) ? 600 : 500}
                textAlign={'center'}
                borderBottom={
                  isActiveLink(menuItem.link)
                    ? `1px solid  ${BASE_COLORS.DEFAULT_BLUE}`
                    : 'none'
                }
                m={'auto'}
                color={
                  isActiveLink(menuItem.link)
                    ? BASE_COLORS.DEFAULT_BLUE
                    : '#000'
                }
                sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '1.8rem',
                  },
                }}>
                {t(menuItem.name)}
              </Typography>
            </Link>
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
        onOpen={toggleDrawer(true)}
        sx={{
          '@media (min-width: 919px)': {
            display: 'none',
          },
        }}>
        {list()}
      </SwipeableDrawer>
    </Box>
  );
}
