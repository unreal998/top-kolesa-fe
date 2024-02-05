import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, Tooltip, Typography } from '@mui/material';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import styled from '@emotion/styled';

import { BASE_COLORS, FONTS } from '../../../shared/constants';

const CustomIcon = styled('span')(({ theme }) => ({
  color: BASE_COLORS.DEFAULT_BLUE,
  '& .MuiSvgIcon-root': {
    width: '1.3em',
    height: '1.3em',
  },
}));

export default function Tooltips() {
  const { t } = useTranslation();
  const [deliveryPopupHover, setDeliveryPopupHover] = useState<boolean>(false);
  const [guarantiePopupHover, setGuarantiePopupHover] =
    useState<boolean>(false);
  const [revertPopupHover, setRevertPopupHover] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setDeliveryPopupHover(false);
        setGuarantiePopupHover(false);
        setRevertPopupHover(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef]);

  return (
    <Stack justifyContent="space-between" direction="row">
      <Tooltip
        ref={tooltipRef}
        onMouseEnter={() => setDeliveryPopupHover(true)}
        onMouseLeave={() => setDeliveryPopupHover(false)}
        onClick={() => setDeliveryPopupHover(!deliveryPopupHover)}
        open={deliveryPopupHover}
        color={BASE_COLORS.DEFAULT_BLUE}
        title={
          <Stack padding="10px">
            <Typography variant="h6" fontFamily={FONTS.BOLD_TEXT_FAMILY}>
              {t('delivery')}
            </Typography>
            <Typography variant="body1" fontFamily={FONTS.MAIN_TEXT_FAMILY}>
              - {t('deliveryPriceFrom')} 35 {t('uah')}
            </Typography>
            <Typography variant="body1" fontFamily={FONTS.MAIN_TEXT_FAMILY}>
              - {t('deliveryTime')} 1-3 {t('days')}
            </Typography>
            <Typography variant="body1" fontFamily={FONTS.MAIN_TEXT_FAMILY}>
              - {t('deliveredBy')} {t('novaPoshta')}
            </Typography>
            <Typography variant="body1" fontFamily={FONTS.MAIN_TEXT_FAMILY}>
              - {t('pickupFromWarehouses')}
            </Typography>
          </Stack>
        }>
        <Stack alignItems="center">
          <CustomIcon>
            {deliveryPopupHover ? (
              <LocalShippingRoundedIcon />
            ) : (
              <LocalShippingOutlinedIcon />
            )}
          </CustomIcon>
          <Typography variant="h6" fontFamily={FONTS.BOLD_TEXT_FAMILY}>
            {t('delivery')}
          </Typography>
        </Stack>
      </Tooltip>
      <Tooltip
        ref={tooltipRef}
        color={BASE_COLORS.DEFAULT_BLUE}
        onMouseEnter={() => setGuarantiePopupHover(true)}
        onMouseLeave={() => setGuarantiePopupHover(false)}
        onClick={() => setGuarantiePopupHover(!guarantiePopupHover)}
        open={guarantiePopupHover}
        title={
          <Stack padding="10px">
            <Typography variant="h6" fontFamily={FONTS.BOLD_TEXT_FAMILY}>
              {t('guarantee')}
            </Typography>
            <Typography variant="body1" fontFamily={FONTS.MAIN_TEXT_FAMILY}>
              - {t('manufacturerGuarantee')}
            </Typography>
          </Stack>
        }>
        <Stack alignItems="center">
          <CustomIcon>
            {guarantiePopupHover ? <GppGoodIcon /> : <GppGoodOutlinedIcon />}
          </CustomIcon>
          <Typography variant="h6" fontFamily={FONTS.BOLD_TEXT_FAMILY}>
            {t('guarantee')}
          </Typography>
        </Stack>
      </Tooltip>
      <Tooltip
        ref={tooltipRef}
        color={BASE_COLORS.DEFAULT_BLUE}
        onMouseEnter={() => setRevertPopupHover(true)}
        onMouseLeave={() => setRevertPopupHover(false)}
        onClick={() => setRevertPopupHover(!revertPopupHover)}
        open={revertPopupHover}
        title={
          <Stack padding="10px">
            <Typography variant="h6" fontFamily={FONTS.BOLD_TEXT_FAMILY}>
              {t('returns')}
            </Typography>
            <Typography variant="body1" fontFamily={FONTS.MAIN_TEXT_FAMILY}>
              {t('returnsDescription')} <b>({t('returnsDescription2')})</b>
            </Typography>
          </Stack>
        }>
        <Stack alignItems="center">
          <CustomIcon>
            {revertPopupHover ? (
              <ReplayCircleFilledIcon />
            ) : (
              <ReplayOutlinedIcon />
            )}
          </CustomIcon>
          <Typography variant="h6" fontFamily={FONTS.BOLD_TEXT_FAMILY}>
            {t('returns')}
          </Typography>
        </Stack>
      </Tooltip>
    </Stack>
  );
}
