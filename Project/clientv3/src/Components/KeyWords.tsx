import {Box, Button, FormControlLabel, FormGroup, Switch, SxProps, Theme} from "@mui/material";
import {useFormikContext} from "formik";
import React, {CSSProperties} from "react";
import Typography from '@mui/material/Typography';

const wrapperStyling: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "center"
}

const selectWrapperStyling: CSSProperties = {
    display: "flex",
    padding: "5px"
}

const keyWordWrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
}

export type KeyWordValuePair = {
    keyWord: string,
    isSelected: boolean
}

export type KeyWordsValues = {
    keyWords: KeyWordValuePair[],
}

const KeyWords = () => {
    const {handleSubmit, values, setFieldValue} = useFormikContext<KeyWordsValues>()

    return (
        <>
            <Box sx={wrapperStyling}>
                <Typography variant="h6" gutterBottom>
                    Pick relevant characteristics for your character!
                </Typography>
                {/*
                // @ts-ignore */}
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                <FormGroup>
                    <div style={keyWordWrapper}>
                        {
                            values.keyWords.map((keyWord, index) => (
                                <div key={index} style={selectWrapperStyling}>
                                    <FormControlLabel
                                        control={<Switch defaultChecked
                                                         onChange={() => setFieldValue(`keyWords[${index}].isSelected`, !keyWord.isSelected)}/>}
                                        label={keyWord.keyWord}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </FormGroup>
            </Box>
        </>
    )
}

export default KeyWords