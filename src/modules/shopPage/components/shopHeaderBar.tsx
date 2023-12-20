import React, { useCallback, useRef } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import { Apps, FormatAlignJustify } from '@mui/icons-material';
import styled from '@emotion/styled';
import { BASE_COLORS } from '../../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../reducer';
import { selectCardView } from '../selectors';
import { ShopHeaderSort } from './ShopHeaderSort';

const ViewButton = styled(Box)({
  backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  padding: '10px',
  paddingBottom: '7px',
  borderRadius: '7px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    color: '#fff',
  },
  '&.isSelected': {
    cursor: 'pointer',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    color: '#fff',
  },
});

export function ShopHeaderBar() {
  const dispatch = useDispatch();
  const cardView = useSelector(selectCardView);
  const tableButton = useRef();
  const cardButton = useRef();

  const handleCardViewChange = useCallback(() => {
    const cardButtonElement = cardButton.current as unknown as HTMLElement;
    const tableButtonElement = tableButton.current as unknown as HTMLElement;
    cardButtonElement.classList.add('isSelected');
    tableButtonElement.classList.remove('isSelected');
    dispatch(actions.setCardView(true));
  }, []);

  const handleTableViewChange = useCallback(() => {
    const cardButtonElement = cardButton.current as unknown as HTMLElement;
    const tableButtonElement = tableButton.current as unknown as HTMLElement;
    cardButtonElement.classList.remove('isSelected');
    tableButtonElement.classList.add('isSelected');
    dispatch(actions.setCardView(false));
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="row"
      width="90%"
      gap="20px">
      <Stack justifyContent="space-around" direction="row" width="15%">
        <ViewButton
          ref={cardButton}
          onClick={handleCardViewChange}
          className={cardView ? 'isSelected' : ''}
          sx={{ transition: 'all 0.3s ease-in-out' }}>
          <Apps />
        </ViewButton>
        <ViewButton
          ref={tableButton}
          onClick={handleTableViewChange}
          className={!cardView ? 'isSelected' : ''}
          sx={{ transition: 'all 0.3s ease-in-out' }}>
          <FormatAlignJustify />
        </ViewButton>
      </Stack>
      <Divider sx={{ width: '60%' }} />
      <ShopHeaderSort />
    </Stack>
  );
}
