import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Help_step({ staff }) {

    let steps;
    if (staff) {

        steps = [
            {
                label: 'Join with Student Group',
                description: `After you register to the RMS,you can check the students group registration request from the 
                notification button in Nav bar Then you can accept or reject those requests.(max groups is 4)`,
            },
            {
                label: 'Chat with Groups',
                description:
                    'After you accept an group request automatically chat conversation are generated with all members of that group then you can chat with them anytime ',
            },
            {
                label: 'Accept A Topic',
                description: `After you joined with student groups you can analyse group information and When they send topic registration Request you can accept or reject.`,
            },
            {
                label: 'Evaluate Submissions',
                description: `You can see the submissions that uploaded by your allocated groups and you can evaluate them according to the marking schema that available.`,
            },

        ];

    } else {

        steps = [

            {
                label: 'Join with Your Group',
                description: `After you register to the RMS you can create a group in RMS for your team
            or,if your Research team has a existing group in RMS,You can ask your friend to add you to the group.`,
            },
            {
                label: 'Request for supervisors',
                description:
                    'After all the 4 members of your team joined to group in RMS,Now you can go to Supervisor page and send request to a supervisor and Co-supervisor according to the Research area that your team going to select.',
            },
            {
                label: 'Register A Topic',
                description: `After supervisor and co-supervisor joined to your RMS group,now you can send a Request to register a topic to your group with the neccessary Links.`,
            },
            {
                label: 'Register A Topic',
                description: `After supervisor and co-supervisor joined to your RMS group,now you can send a Request to register a topic to your group with the neccessary Links.`,
            },
            {
                label: 'Add Submissions',
                description: `After the topic is accepted by both supervisor and co-supervisor you can add submissons to the links that the available in RMS accordinly`,
            },
        ];
    }



    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className='col-5 mt-5 '>

            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption"></Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </div>
    );
}

export default Help_step;