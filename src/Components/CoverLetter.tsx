import {Button, Container, TextField} from "@mui/material";
import React from "react";

export type CoverLetterValues = {
    coverLetter: string,
}

const CoverLetter = () => {

    return (
        <>
            <Container>
                <Button variant="contained">Submit</Button>
                <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={10}
                    defaultValue="Default Value"
                    name="coverLetter"
                />
            </Container>
        </>
    )
}

export default CoverLetter