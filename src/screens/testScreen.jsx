import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import TestGraph from './../components/TestGraph'
import {problemSet} from './../utils/problems'
import { addStyles, StaticMathField } from 'react-mathquill'
import AnswerChoices from '../components/AnswerChoices/AnswerChoices'
// import { getAuth } from 'firebase/auth' // keep this for rerouting?

addStyles()

const TestScreen = () => {
    const [reload, setReload] = useState(0) // this line is only to reload the page on auth change
    const [streak, setStreak] = useState(0)
    const [problem, setProblem] = useState({})
    const [finalAnswerChoice, setFinalAnswerChoice] = useState('')
    const [correct, setCorrect] = useState(null)

    // make function to change streak and pass to answer choices
    
    // implement auth and redirect
    // set state for type of problem

    const handleGotProblemCorrect = () => {
        setStreak(streak => streak + 1)
        // set streak
        // check if user is logged in
        // if user is logged in, then:
        // add correct question to database and update profile

        // for adding info to database
        // switch(problem.type) {
        //     case 'sin':
        // }

        // setStreak(streak[problem.type]++)

        // if (user is authenticated) {
        //     add problem to database
        // }
    }
    const handleGotProblemWrong = () => {
        setStreak(0)
    }

    const getProblem = () => {
        // Make the next problem function into a doubly linked list so users can go back to review answers
        const random = problemSet[Math.floor(Math.random() * problemSet.length)];

        setProblem(random)

        // setting correct answer to null
        setCorrect(null)
        return;
    }

    useEffect(() => {
        if (!problem.name) {
            getProblem()
            // console.log(auth)
        }
        setReload(num => num + 1) // forcing re render
        
    })

    return (

        <div style={{display: 'flex', maxHeight: '80vh', maxWidth: '100vw', overflowY: 'hidden', overflowX: 'hidden', margin: '5em 2em 2em 5em' }}>
            {/* graph/problem section (left) */}
            <div style={{width: '45%', padding: '1rem' }}>
                <div className="container"> 

                    <div>

                        {/* Can make streak simpler. For every question right, add a flame */}
                        {/* {
                            streak >= 2 &&
                            <Typography variant="h4">{streak} in a row 🔥🔥.</Typography> 
                        } */}
                    </div> 
                    <div style={{display: 'flex'}}>

                        <Button variant="contained" onClick={getProblem} color={correct ? 'success' : (correct === false) ? 'error' : 'primary'} >Next Question</Button> 
                        {/* <div>

                            {
                                (correct == true || correct == false)
                                &&
                                <Typography variant="h5" style={{marginLeft: '1em'}}>Answer: {problem.answer}</Typography>   
                            }  
                        </div> */}
                    </div>
                    
                    <Typography variant="h2">What is {problem.type}({problem.degree})?</Typography>      
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TestGraph stoppingDegree={problem.degree} /> 
                    </div>
                </div>
            </div>

            {/* This is the right side of the screen with the answer buttons */}
            <div style={{width: '45%', marginRight: '6em' }}>
                <AnswerChoices getNewProblem={getProblem} setAnswerChoice={setFinalAnswerChoice} answerChoice={finalAnswerChoice} correctAnswer={problem.answer} onCorrect={handleGotProblemCorrect} onWrong={handleGotProblemWrong} setCorrect={setCorrect}  correct={correct} />
            </div>
        </div>
    )
}

// to see legacy Answer Buttons code check ../legacy/LegacyAnswerButtons.js



export default TestScreen;