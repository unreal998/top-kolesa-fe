import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Box, Tab, Tabs, styled } from "@mui/material";

import Characteristics from "./Characteristics";
import ReviewPage from "./ReviewPage";

import { selectSelectedItemData } from "../../shopPage/selectors";
import { BASE_COLORS, FONTS } from "../../../shared/constants";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  },
  "& .MuiTab-root.Mui-selected": {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

const StyledTab = styled(Tab)({
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  fontWeight: 600,
  color: BASE_COLORS.DEFAULT_GREY,
});

function CustomTabPanel(props: ITabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
}

export default function FullInfo() {
  const { t } = useTranslation();
  const [modalValue, setModalValue] = useState(0);
  const selectedItemData = useSelector(selectSelectedItemData());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setModalValue(newValue);
  };

  return (
    <>
      <Box display="flex" alignContent="center" justifyContent="center" mt={2}>
        <StyledTabs value={modalValue} onChange={handleChange}>
          <StyledTab label={t("characteristics")} />
          <StyledTab label={`${t("reviews")} (0)`} />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={modalValue} index={0}>
        {selectedItemData && <Characteristics {...selectedItemData} />}
      </CustomTabPanel>
      <CustomTabPanel value={modalValue} index={1}>
        <ReviewPage />
      </CustomTabPanel>
    </>
  );
}
