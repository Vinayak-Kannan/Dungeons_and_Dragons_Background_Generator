import Grid from '@mui/material/Unstable_Grid2';
import Header from "./Header";
import axios, {AxiosResponse} from "axios";
import CoverLetter, {CoverLetterValues} from "./CoverLetter";
import {Formik} from "formik";
import React, {useState} from 'react';
import {Box, SxProps, Theme} from "@mui/material";
import KeyWords, {KeyWordsValues, KeyWordValuePair} from "./KeyWords";
import DDDescription from "./DDDescription";

// Styling
const pageWrapper: SxProps<Theme> = {
    margin: "30px"
}

const handleResumeUpload = async (values: CoverLetterValues, setKeyWordPairings: React.Dispatch<React.SetStateAction<KeyWordValuePair[]>>, setCoverLetter: React.Dispatch<React.SetStateAction<string>>) => {
    const text = values.coverLetter
    setCoverLetter(text)
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

const handleKeyWordsSelected = async (values: KeyWordsValues, coverLetter: string, setDDDescription: React.Dispatch<React.SetStateAction<string>>) => {
    let keyWords = ""
    values.keyWords.map((keyWordPair) => {
        if (keyWordPair.isSelected) {
            keyWords = keyWords + keyWordPair.keyWord + " ,"
        }
    })
    const response: AxiosResponse<string, string> = await axios.post(
        'http://localhost:8000/description',
        {
            coverLetter: coverLetter,
            keyWords: keyWords
        }
    )
    console.log(response.data)
    setDDDescription(response.data)
}

const Page = ({}) => {

    const [coverLetter, setCoverLetter] = useState("")
    const [keyWordPairings, setKeyWordPairings] = useState<KeyWordValuePair[]>([])
    const [ddDescription, setDDDescription] = useState("")

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
                            await handleResumeUpload(values, setKeyWordPairings, setCoverLetter)
                        }}
                    >
                        <CoverLetter/>
                    </Formik>
                </Grid>
                <Grid xs={4}>
                    <Formik
                        initialValues={{keyWords: keyWordPairings} as KeyWordsValues}
                        onSubmit={async (values) => {
                            await handleKeyWordsSelected(values, coverLetter, setDDDescription)
                        }}
                        enableReinitialize={true}
                    >
                        <KeyWords/>
                    </Formik>
                </Grid>
                <Grid xs={4}>
                    <DDDescription
                        description={ddDescription}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Page