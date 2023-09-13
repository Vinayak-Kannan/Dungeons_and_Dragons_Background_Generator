import Grid from '@mui/material/Unstable_Grid2';
import Header from "./Header";
import axios from "axios";
import CoverLetter, {CoverLetterValues} from "./CoverLetter";
import {Formik} from "formik";
import React from 'react';

// Styling

const handleResumeUpload = async (values: CoverLetterValues) => {
    const text = values.coverLetter
    const response = await axios.post(
        'http://localhost:8000/upload',
        text
    )
    console.log(response.data)
}

const Page = ({}) => {

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <Header/>
            </Grid>
            <Grid xs={4}>
                <Formik
                    initialValues={{} as CoverLetterValues}
                    onSubmit={async (values, formikHelpers) => {
                        await handleResumeUpload(values)
                    }}
                >
                    <CoverLetter/>
                </Formik>
            </Grid>
            <Grid xs={4}>
                Pick Key Words and submit
            </Grid>
            <Grid xs={4}>
                See D&D description
            </Grid>
        </Grid>
    );
}

export default Page