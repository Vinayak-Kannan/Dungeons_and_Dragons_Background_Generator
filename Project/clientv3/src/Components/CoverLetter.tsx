import {Box, Button, SxProps, TextField, Theme} from "@mui/material";
import {useFormikContext} from "formik";
import React from "react";
import Typography from '@mui/material/Typography';

const wrapperStyling: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "left"
}


export type CoverLetterValues = {
    coverLetter: string,
}

const CoverLetter = () => {
    const {handleSubmit, setFieldValue} = useFormikContext<CoverLetterValues>()

    return (
        <>
            <Box sx={wrapperStyling}>
                <Typography variant="h4" gutterBottom>
                    Paste your cover letter below!
                </Typography>
                {/*
                // @ts-ignore */}
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                <TextField
                    id="outlined-multiline-static"
                    label="Cover Letter"
                    multiline
                    rows={20}
                    onChange={async (e) => {
                        await setFieldValue("coverLetter", e.target.value)
                    }}
                    name="coverLetter"
                />
            </Box>
        </>
    )
}

export default CoverLetter