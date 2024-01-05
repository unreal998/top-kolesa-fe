import { actions } from '../../../modules/shopPage/reducer';
import {
  selectCartModalWindowOpen,
  selectCartItemCount,
} from '../../../modules/shopPage/selectors';
import { useTranslation } from 'react-i18next';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TypographyWithIcon } from '../../../modules/mainPage/components/TypographyWithIcon';
import useLocalStorageItem from '../../../hooks/useLocalStorageWatcher';

import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
  styled,
  Badge,
} from '@mui/material';
import {
  EmailOutlined,
  Language,
  MapsHomeWorkOutlined,
  TimerOutlined,
} from '@mui/icons-material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { BASE_COLORS, FONTS } from '../../constants';
import CartModalWindow from './CartModalWindow';
import MenuModalWindow from './MenuModalWindow';

const StyledTextMain = styled(Typography)({
  fontFamily: FONTS.MAIN_TEXT_FAMILY,
  color: '#FFFFFF',
  fontSize: '0.9rem',
});

const StyledTextNavigation = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1rem',
  '@media (max-width: 1150px)': {
    paddingLeft: '6rem',
  },
  '@media (max-width: 950px)': {
    paddingLeft: '5rem',
  },
  '@media (max-width: 918px)': {
    display: 'none',
  },
});

const StyledButtonsNav = styled(Stack)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '1rem',
  justifyContent: 'end',
  '@media (max-width: 918px)': {
    gap: '0.75rem',
  },
  '@media (max-width: 550px)': {
    gap: '1rem',
  },
  '@media (max-width: 450px)': {
    paddingRight: '1.4rem',
  },
});

type MenuItemData = {
  name: string;
  link: string;
};

export function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItemCountRedux = useSelector(selectCartItemCount);
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const cartItems = useLocalStorageItem('cartItem');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en';
  const languages = [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'ru',
      name: 'Русский',
    },
    {
      code: 'ua',
      name: 'Українська',
    },
  ];

  const menu: MenuItemData[] = [
    {
      name: 'homeLabel',
      link: '/',
    },
    {
      name: 'shopLabel',
      link: '/shop',
    },
    {
      name: 'aboutLabel',
      link: '/about',
    },
    {
      name: 'contactLabel',
      link: '/contact',
    },
  ];

  useEffect(() => {
    cartItems.length;
    dispatch(actions.setCartItemCount(cartItems.length));
  }, [dispatch, cartItems]);

  useEffect(() => {
    dispatch(actions.getShopItems(''));
  }, [dispatch]);

  const handleLanguageClick = useCallback((event: SyntheticEvent) => {
    setAnchorEl(event.target as HTMLElement);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" flexDirection="column" width={'100%'}>
      <Box bgcolor={BASE_COLORS.DEFAULT_BLUE}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={'flex-start'}
          gap="3rem"
          height={'1.6rem'}
          padding="1.1rem 4%"
          maxWidth={'170rem'}
          m={'0 auto'}
          sx={{
            '@media (max-width: 1250px)': {
              justifyContent: 'center',
              padding: '1.1rem 2%',
            },
            '@media (max-width: 918px)': {
              display: 'none',
            },
          }}>
          <TypographyWithIcon
            icon={<EmailOutlined sx={{ fill: '#FFF', width: '2rem' }} />}
            typography={
              <StyledTextMain>
                <Link
                  href="mailto:topkolesa@gmail.com"
                  color={'inherit'}
                  style={{ textDecoration: 'none' }}>
                  topkolesa@gmail.com
                </Link>
              </StyledTextMain>
            }
          />
          <TypographyWithIcon
            icon={<MapsHomeWorkOutlined sx={{ fill: '#FFF', width: '2rem' }} />}
            typography={
              <StyledTextMain>
                {`${t('headerCity')}, ${t('headerAddress')} / ${t(
                  'headerAddress2',
                )}`}
              </StyledTextMain>
            }
          />
          <TypographyWithIcon
            icon={<TimerOutlined sx={{ fill: '#FFF', width: '2rem' }} />}
            typography={<StyledTextMain>{t('workHours')}</StyledTextMain>}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        padding="30px 4%"
        alignItems="center"
        justifyContent={'space-between'}
        sx={{
          '@media (min-width: 2899px)': {
            width: '160rem',
            margin: '0 auto',
          },
          '@media (max-width: 550px)': {
            padding: '20px 2%',
          },
        }}>
        <Link href="/">
          <Box
            component={'img'}
            src="./logo.png"
            alt="logo"
            sx={{
              '@media (max-width: 550px)': {
                height: '35px',
              },
            }}
          />
        </Link>
        <StyledTextNavigation>
          {menu.map((menuItem, index) => (
            <Link
              key={index}
              underline="none"
              href={menuItem.link}
              sx={{
                color: '#000',
                fontFamily: FONTS.MAIN_TEXT_FAMILY,
                fontSize: '1.1rem',
              }}>
              {t(menuItem.name)}
            </Link>
          ))}
        </StyledTextNavigation>
        <StyledButtonsNav>
          <IconButton
            onClick={() =>
              dispatch(actions.setCartModalWindowOpen(!cartModalWindowOpen))
            }
            aria-label="cart"
            sx={{
              marginRight: cartModalWindowOpen ? '0px' : '1rem',
              '@media (max-width: 918px)': {
                width: '10px',
                height: '10px',
                padding: '10px',
                margin: '10px',
              },
              '@media (max-width: 550px)': {
                width: '8px',
                height: '8px',
                padding: '8px',
                margin: '8px',
              },
            }}>
            <Badge
              badgeContent={cartItemCountRedux}
              sx={{
                color: '#FFF',
                '& .MuiBadge-badge': {
                  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                  fontSize: '14px',
                  '@media (max-width: 550px)': {
                    fontSize: '12px',
                  },
                },
              }}>
              <ShoppingCartOutlinedIcon
                sx={{
                  color: '#000',
                  width: '30px',
                  height: '30px',
                  '@media (max-width: 550px)': {
                    width: '25px',
                    height: '25px',
                  },
                }}
              />
            </Badge>
          </IconButton>
          {cartModalWindowOpen && <CartModalWindow />}
          <Button
            onClick={(event) => handleLanguageClick(event)}
            sx={{
              color: '#000',
              '@media (max-width: 918px)': {
                padding: '0px',
                margin: '0px',
                minWidth: 0,
              },
              '@media (max-width: 550px)': {
                width: '20px',
                height: '20px',
              },
            }}>
            <Language
              sx={{
                paddingRight: '10px',
                width: '30px',
                height: '30px',
                '@media (max-width: 918px)': {
                  padding: '0px',
                  margin: '0px',
                },
                '@media (max-width: 550px)': {
                  width: '25px',
                  height: '25px',
                },
              }}
            />
            <Typography
              fontFamily={FONTS.MAIN_TEXT_FAMILY}
              fontSize={'1.1rem'}
              sx={{
                '@media (max-width: 918px)': {
                  display: 'none',
                },
              }}>
              {currentLanguageCode}
            </Typography>
          </Button>
          <Menu
            open={!!anchorEl}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}>
            {languages.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  i18next.changeLanguage(item.code);
                }}
                sx={{
                  color: '#000',
                }}>
                <Typography
                  fontFamily={FONTS.MAIN_TEXT_FAMILY}
                  fontSize={'1.1rem'}
                  sx={{
                    '@media (max-width: 918px)': {
                      fontSize: '1.15rem',
                    },
                    '@media (max-width: 800px)': {
                      fontSize: '1.2rem',
                    },
                  }}>
                  {item.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <MenuModalWindow menuData={menu} />
        </StyledButtonsNav>
      </Box>
    </Box>
  );
}
