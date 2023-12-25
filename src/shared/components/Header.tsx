import {
  EmailOutlined,
  Language,
  MapsHomeWorkOutlined,
  TimerOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { TypographyWithIcon } from '../../modules/mainPage/components/TypographyWithIcon';
import { BASE_COLORS, FONTS } from '../constants';
import { useTranslation } from 'react-i18next';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartModalWindowOpen,
  selectCartItemCount,
} from '../../modules/shopPage/selectors';
import { actions } from '../../modules/shopPage/reducer';
import CartModalWindow from './CartModalWindow';
import MenuModalWindow from './MenuModalWindow';

export function Header() {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemCount);
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
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

  const menu = [
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
    const cartItemsCountFromStorage = JSON.parse(
      localStorage.getItem('cartItem') || '[]',
    ).length;

    dispatch(actions.setCartItemCount(cartItemsCountFromStorage));
  }, [dispatch, cartItemCount, cartModalWindowOpen]);

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
    <Box width="100%" display="flex" flexDirection="column" overflow="hidden">
      <Box
        bgcolor={BASE_COLORS.DEFAULT_BLUE}
        display="flex"
        flexDirection="row"
        justifyContent={'flex-start'}
        gap="3rem"
        height={'1.6rem'}
        padding="1.1rem 4%"
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
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2">
              {' '}
              topkolesa@gmail.com{' '}
            </Typography>
          }
        />
        <TypographyWithIcon
          icon={<MapsHomeWorkOutlined sx={{ fill: '#FFF', width: '2rem' }} />}
          typography={
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2">
              {`${t('headerCity')}, ${t('headerAddress')} / ${t(
                'headerAddress2',
              )}`}
            </Typography>
          }
        />
        <TypographyWithIcon
          icon={<TimerOutlined sx={{ fill: '#FFF', width: '2rem' }} />}
          typography={
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2">
              {t('workHours')}
            </Typography>
          }
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        padding="30px 4%"
        alignItems="center"
        justifyContent="space-between"
        sx={{
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
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          gap="1rem"
          sx={{
            '@media (max-width: 1150px)': {
              paddingLeft: '6rem',
            },
            '@media (max-width: 950px)': {
              paddingLeft: '5rem',
            },
            '@media (max-width: 918px)': {
              display: 'none',
            },
          }}>
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
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          gap={'1rem'}
          width={'243px'}
          display={'flex'}
          justifyContent={'end'}
          sx={{
            '@media (max-width: 918px)': {
              gap: '0.75rem',
            },
            '@media (max-width: 550px)': {
              gap: '1rem',
            },
            '@media (max-width: 450px)': {
              paddingRight: '1.4rem',
            },
          }}>
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
              badgeContent={cartItemCount}
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
        </Stack>
      </Box>
    </Box>
  );
}
