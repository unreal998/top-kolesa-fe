import { Box } from "@mui/material";

import { ContactMainInfo } from "./components/ContactMainInfo";
import GoogleMapBox from "./components/GoogleMapBox";

export function ContactPage() {
  return (
    <Box m={"3% 25% 10%"}>
      <ContactMainInfo />
      <GoogleMapBox />
    </Box>
  );
}
