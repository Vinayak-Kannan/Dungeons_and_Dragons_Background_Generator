import Typography from "@mui/material/Typography";
import {Box, SxProps, Theme} from "@mui/material";
import React from "react";

const wrapperStyling: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "right"
}


type DDDescriptionProps = {
    description: string
}

const DDDescription = ({
                           description
                       }: DDDescriptionProps) => {

    return (
        <Box sx={wrapperStyling}>
            <Typography variant="h6" gutterBottom>
                See your D&D Character Sheet!
            </Typography>
            <Typography variant={"overline"} display={"block"} sx={{whiteSpace: "pre-line"}} gutterBottom>
                {description}
            </Typography>
        </Box>
    )
}

export default DDDescription