import {Button, Container, TextField} from "@mui/material";
import {useFormikContext} from "formik";
import React from "react";

export type CoverLetterValues = {
    coverLetter: string,
}

const CoverLetter = () => {
    const {handleSubmit} = useFormikContext<CoverLetterValues>()

    return (
        <>
            <Container>
                {/*
                // @ts-ignore */}
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
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