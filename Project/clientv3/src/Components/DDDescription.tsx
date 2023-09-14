import Typography from "@mui/material/Typography";
import {Box, Button, FormControlLabel, FormGroup, Switch} from "@mui/material";
import React from "react";


type DDDescriptionProps = {
    description: string
}

const DDDescription = ({
                           description
                       }: DDDescriptionProps) => {

    return (
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
    )
}