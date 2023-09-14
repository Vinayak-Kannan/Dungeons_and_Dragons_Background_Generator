import React from "react"
import Typography from "@mui/material/Typography";

type HeaderProps = {}

const Header = ({}: HeaderProps) => {

    return (
        <div style={{margin: "20px", textAlign: "center", display: "flex", flexDirection: "column", gap: "5px"}}>
            <Typography variant="h2" gutterBottom>
                D&D Cover Letters!
            </Typography>
            <Typography variant="h5" gutterBottom>
                I help aspiring young professionals create their first D&D character by converting their cover letters
                into D&D character sheets
            </Typography>
            <Typography variant="h6" gutterBottom>
                Author: Vinayak (Vin) Kannan
            </Typography>
        </div>
    )
}

export default Header