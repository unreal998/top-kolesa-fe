import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

type FooterStrocedTextProps = {
    text: ReactNode
}

export function FooterStrocedText (props: FooterStrocedTextProps) {
    return (
        <Stack justifyContent='flex-start'>
            {props.text}
            <Stack paddingTop='16px' direction='row' alignItems='center' gap='5px'>
                <Box bgcolor='rgba(28,57,123,1)' width='40px' height='2px'/>
                <Box bgcolor='rgba(28,57,123,1)' width='5px' height='2px'/>
            </Stack>
        </Stack>
    )
}