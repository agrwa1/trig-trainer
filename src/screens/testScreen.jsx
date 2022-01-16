import React, { useState, useEffect } from 'react'
import { Button, Backdrop, Typography } from '@mui/material'
import { auth } from '../firebase'
import { problemSet } from '../utils/problems'
import { getAuth } from 'firebase/auth'
import 'firebase/auth'
import { Link } from 'react-router-dom'

import { useAuthState } from 'react-firebase-hooks/auth';

// ****** fix user auth persistence. not using firebase's asynchronous fucntion and checking synchronlously and start instead

import TestGraph from './../components/TestGraph'

import AnswerChoices from '../components/AnswerChoices/AnswerChoices'
import TestSettings from '../components/TestSettings'
import identifyAngles from '../utils/identifyAngles'

// import { getAuth } from 'firebase/auth' // keep this for rerouting?

// IDEAS:
//  - Make the next problem function into a doubly linked list so users can go back to review answers
//  - Make sure the same question doesn't get repeated
//  - add footer and make App.js styling to Maxwidth: 100vw and maxHeight: 100vh
// ** adaptive algorithm. record students correct vs incorrect.
// -- make teacher class and let students sign up for a teachers class. teachers can see students progress.
// -- animations
// -- make custom svg with better responsive design
// -- add home page for students to learn trig
// -- send "auth" variable to Nav.js so it can render EITHER login/signup OR profile
// -- send report after session close
// -- fix graph


const TestScreen = () => {
    // const [reload, setReload] = useState(0) // this line is only to reload the page on auth change
    // const [streak, setStreak] = useState(0)

    // let auth = getAuth()
    const [problem, setProblem] = useState({})
    const [finalAnswerChoice, setFinalAnswerChoice] = useState('')
    const [correct, setCorrect] = useState(null)
    const [references, setReferences] = useState(false)
    const [settings, setSettings ] = useState(false)
    const [filteredOutTypes, setFilteredOutTypes] = useState({sin: false, cos: false, tan: false})
    const [filteredOutQuadrants, setFilteredOutQuadrants] = useState({q1: false, q2: false, q3: false, q4: false})
    const [radians, setRadians] = useState(true)
    const [showGraph, setShowGraph] = useState(false)
    const [user] = useAuthState(auth)


    const getProblem = () => {
        let random = problemSet[Math.floor(Math.random() * problemSet.length)];
        // verified = verifyproblem()
        // while !verified:
        //      choose new problem
        //      re verify 
        let verified = verifyProblem(random)
        while (!verified) {
            random = problemSet[Math.floor(Math.random() * problemSet.length)];
            verified = verifyProblem(random)
        }

        setProblem(random)

        // setting correct answer to null
        setCorrect(null)
        // setReferences(false) // turns off references after every problem
        return;
    }

    const verifyProblem = (random) =>{
        const type = random.type;
        const quadrant = random.quadrant;

        // if (type == 'sin') {
        //     return true
        // } else {
        //     return false
        // }

        // if there are any type preferences
        if (filteredOutTypes.sin || filteredOutTypes.cos || filteredOutTypes.tan) {
            if (filteredOutTypes.sin) {
                if (type === 'sin') return false
            }
            if (filteredOutTypes.cos) {
                if (type === 'cos') return false
            }
            if (filteredOutTypes.tan) {
                if (type === 'tan') return false
            }
        }

        if (filteredOutQuadrants.q1 || filteredOutQuadrants.q2 || filteredOutQuadrants.q3 || filteredOutQuadrants.q4) {
            if (filteredOutQuadrants.q1) {
                if (quadrant === '1') return false 
            }
            if (filteredOutQuadrants.q2) {
                if (quadrant === '2') return false 
            }
            if (filteredOutQuadrants.q3) {
                if (quadrant === '3') return false 
            }
            if (filteredOutQuadrants.q4) {
                if (quadrant === '4') return false 
            }
        }

        // if (oldProblem.name === random.name) { // if new problem is the same as the old problem
        //     return false
        // }

        return true
    }

    useEffect(() => {
        if (!problem.name) {
            getProblem()
        }
        // setReload(num => num + 1) // forcing re render -- very broken .causes thousands oferrors
        
    }, [auth, problem])

    return (

        <div className="test">
            <div className="small-screen-warning">
                <Typography variant="h1" className="warning">Please view TrigTrainer on a larger screen</Typography>
            </div>
            {/* graph/problem section (left) */}
            <div className="left" >
                <div className="container" > 

                    {/* <div>

                        {/* Can make streak simpler. For every question right, add a flame */}
                        {/* {
                            streak >= 2 &&
                            <Typography variant="h4">{streak} in a row 🔥🔥.</Typography> 
                        } */}
                    {/* </div>  */}

                    <div className="util-buttons">
                        <Button className="settings" variant="text" onClick={() => setSettings(true)}>
                            Settings
                        </Button>
                        <Backdrop   
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={settings}                             
                        >
                            <TestSettings references={references} setReferences={setReferences} setSettings={setSettings} filteredOutTypes={filteredOutTypes} setFilteredOutTypes={setFilteredOutTypes} filteredOutQuadrants={filteredOutQuadrants} setFilteredOutQuadrants={setFilteredOutQuadrants} radians={radians} setRadians={setRadians} showGraph={showGraph} setShowGraph={setShowGraph}/>
                        </Backdrop>
                        <Button className="skip" variant="contained" onClick={getProblem} color={correct ? 'success' : (correct === false) ? 'error' : 'primary'}>
                            <a className="skip">Next Question</a>
                        </Button> 
                        {/* <div>

                        {
                            (correct == true || correct == false)
                            &&
                            <Typography variant="h5" style={{marginLeft: '1em'}}>Answer: {problem.answer}</Typography>   
                        }  
                        </div> */}
                        
                    </div>
                    

                    <div className="problem-questions">
                    {
                        // degrees mode
                        !radians &&
                        <div>
                            <h2 className="problem-q">What is <span>{problem.type}({problem.degree})</span>?</h2> 
                        </div>

                    }
                    {
                        // radians mode
                        radians &&
                        <div>
                            <h2 className="problem-q">What is <span>{problem.type}({identifyAngles(problem.degree)})</span>?</h2> 
                        </div>
                    }
                    {
                        !auth.currentUser &&
                        <div className="log-in-message">
                            <h2 className="message"><Link to="/signup" className="link">Log in or sign up</Link> to save your results</h2>
                        </div>
                    }
                    </div>


                    <div className="answer-container"> 
                    {/* get rid of margin/padding that is weird */}
                        {/* {
                            !auth.currentUser &&
                            <Typography variant="h4">Please create an account</Typography>
                        } */}
                        <AnswerChoices getNewProblem={getProblem} setAnswerChoice={setFinalAnswerChoice} answerChoice={finalAnswerChoice} correctAnswer={problem.answer}  setCorrect={setCorrect}  correct={correct} />
                        {/* after figuring out handleProblemRight and handleProblemWrong, can add arguments: onCorrect={handleGotProblemCorrect} onWrong={handleGotProblemWrong} */}
                    </div>

                    

                </div>
            </div>
            <div className="right">
                <div className="container">
                    {
                        showGraph &&
                        <TestGraph stoppingDegree={problem.degree} references={references} className="graph"/> 
                    }
                    
                </div>
            </div>

            {/* This is the right side of the screen with the answer Buttons */}

            
        </div>
    )
}

// to see legacy Answer Buttons code check ../legacy/LegacyAnswerButtons.js



export default TestScreen;



    // make function to change streak and pass to answer choices
    
    // implement auth and redirect
    // set state for type of problem

    // const handleGotProblemCorrect = () => {
    //     setStreak(streak => streak + 1)
    //     // set streak
    //     // check if user is logged in
    //     // if user is logged in, then:
    //     // add correct question to database and update profile

    //     // for adding info to database
    //     // switch(problem.type) {
    //     //     case 'sin':
    //     // }

    //     // setStreak(streak[problem.type]++)

    //     // if (user is authenticated) {
    //     //     add problem to database
    //     // }
    // }
    // const handleGotProblemWrong = () => {
    //     setStreak(0)
    // }

