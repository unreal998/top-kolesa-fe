import { useSelector } from 'react-redux';

import { Stack, styled } from '@mui/material';

import { selectSelectedItemData } from '../../shopPage/selectors';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../../constants';

const StyledStack = styled(Stack)({
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  maxHeight: '30rem',
  maxWidth: '30rem',
  minWidth: '30rem',
  minHeight: '30rem',
  '@media (max-width: 1300px)': {
    maxHeight: '22rem',
    maxWidth: '22rem',
    minWidth: '22rem',
    minHeight: '22rem',
  },
  '@media (max-width: 990px)': {
    maxHeight: '22rem',
    maxWidth: '22rem',
    minWidth: '22rem',
    minHeight: '22rem',
  },
});

export default function TireImg() {
  const selectedItemData = useSelector(selectSelectedItemData());

  return (
    <StyledStack
      sx={{
        backgroundImage: selectedItemData?.image_file
          ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${selectedItemData.image_file}")`
          : `url("./imgs/noPhotoImg.jpg")`,
      }}
    />
  );
}
