import { Box, Typography } from "@mui/material";
import { BASE_COLORS, FONTS } from "../../../shared/constants";
import { ShopItemAPI } from "../../shopPage/reducer";
import { useTranslation } from "react-i18next";

import {
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  TableCell,
  tableCellClasses,
} from "@mui/material";

const TitleText = styled(Typography)({
  fontSize: "1rem",
  fontFamily: FONTS.MAIN_TEXT_FAMILY,
});
const PersonalInfoText = styled(Typography)({
  fontSize: "1rem",
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  fontWeight: 600,
});

const StyledTableCellL = styled(TableCell)(({ theme }) => ({
  paddingLeft: "10%",
  paddingRight: "0",
  width: "40%",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableCellR = styled(TableCell)(({ theme }) => ({
  paddingLeft: "0",
  paddingRight: "10%",
  width: "60%",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledCheckbox = styled(Checkbox)({
  margin: "0",
  padding: "0",
  "&.Mui-checked": {
    color: BASE_COLORS.DEFAULT_BLUE,
    "&:after": {
      backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    },
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Characteristics(itemData: ShopItemAPI) {
  const { t } = useTranslation();
  function createData(titles: string, info: string | number | JSX.Element) {
    return { titles, info };
  }

  const rows = [
    createData(t("brand"), itemData.brand),
    createData(t("model"), itemData.name),
    createData(
      t("studdedCharacteristics"),
      itemData.param.length > 0 ? (
        <StyledCheckbox disabled checked />
      ) : (
        <StyledCheckbox disabled />
      )
    ),
    createData(t("width"), itemData.width),
    createData(t("diametr"), itemData.diametr),
    createData(t("profile"), itemData.height),
    createData(t("country"), itemData.country),
    createData(t("speedIndex"), itemData.speed),
    createData(t("loadIndex"), itemData.weight),
    createData(t("season"), itemData.season),
    createData(t("year"), itemData.year),
  ];
  return (
    <Box maxWidth={600} m={"0 auto"}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.titles}>
                <StyledTableCellL component="th" scope="row">
                  <TitleText> {row.titles}</TitleText>
                </StyledTableCellL>
                <StyledTableCellR align="right">
                  <PersonalInfoText>{row.info}</PersonalInfoText>
                </StyledTableCellR>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
