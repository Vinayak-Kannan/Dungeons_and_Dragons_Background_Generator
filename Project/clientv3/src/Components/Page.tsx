import Grid from '@mui/material/Unstable_Grid2';
import Header from "./Header";
import axios, {AxiosResponse} from "axios";
import CoverLetter, {CoverLetterValues} from "./CoverLetter";
import {Formik} from "formik";
import React, {useState} from 'react';
import {Box, SxProps, Theme} from "@mui/material";
import KeyWords, {KeyWordsValues, KeyWordValuePair} from "./KeyWords";

// Styling
const pageWrapper: SxProps<Theme> = {
    margin: "30px"
}

const handleResumeUpload = async (values: CoverLetterValues, setKeyWordPairings: React.Dispatch<React.SetStateAction<KeyWordValuePair[]>>) => {
    const text = values.coverLetter
    const response: AxiosResponse<string, string> = await axios.post(
        'http://localhost:8000/upload',
        {data: text}
    )
    const keyWords = response.data.split(",");
    const keyWordPairs: KeyWordValuePair[] = []
    keyWords.map((keyWord) => {
        keyWordPairs.push({
            keyWord: keyWord,
            isSelected: true
        })
    })
    setKeyWordPairings(keyWordPairs)
}

const handleKeyWordsSelected = async (values: KeyWordsValues) => {

}

const Page = ({}) => {

    const [keyWordPairings, setKeyWordPairings] = useState<KeyWordValuePair[]>([])

    // @ts-ignore
    return (
        <Box sx={pageWrapper}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Header/>
                </Grid>
                <Grid xs={4}>
                    <Formik
                        initialValues={{} as CoverLetterValues}
                        onSubmit={async (values, formikHelpers) => {
                            await handleResumeUpload(values, setKeyWordPairings)
                        }}
                    >
                        <CoverLetter/>
                    </Formik>
                </Grid>
                <Grid xs={4}>
                    <Formik
                        initialValues={{keyWords: keyWordPairings} as KeyWordsValues}
                        onSubmit={async (values) => {
                            await handleKeyWordsSelected(values)
                        }}
                        enableReinitialize={true}
                    >
                        <KeyWords/>
                    </Formik>
                </Grid>
                <Grid xs={4}>
                    See D&D description
                </Grid>
            </Grid>
        </Box>
    );
}

export default Page