import React, { useState, useEffect } from 'react'
import { Button, Backdrop, Typography, Switch } from '@mui/material'
import { problemSet } from '../utils/problems'
import { Link } from 'react-router-dom'

import { auth } from '../firebase'
import { getAuth } from 'firebase/auth'
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { firebaseProblemCorrect, firebaseProblemWrong } from '../utils/firebaseFunctions'

// ****** fix user auth persistence. not using firebase's asynchronous fucntion and checking synchronlously and start instead

import TestGraph from './../components/TestGraph'

import AnswerChoices from '../components/AnswerChoices/AnswerChoices'
import TestSettings from '../components/TestSettings'
import identifyAngles from '../utils/identifyAngles'

// import { getAuth } from 'firebase/auth' // keep this for rerouting?

// IDEAS:
//  - Make the next problem function into a doubly linked list so users can go back to review answers
// ** adaptive algorithm. record students correct vs incorrect.
// -- make teacher class and let students sign up for a teachers class. teachers can see students progress.
// -- make custom svg with better responsive design
// -- add home page for students to learn trig
// -- send report after session close
// -- fix graph
// -- create caching mechanism in local storage to reduce firebase costs
// -- there is currently bug where teacher can join a class and see all the information for that class

const color = 'midnightblue'
const secondaryColor = '#ffa701;'


const TestScreen = () => {
    // LOGISTICS/PROBLEM
    const [problem, setProblem] = useState({})
    const [previousProblem, setPreviousProblem] = useState({})
    const [finalAnswerChoice, setFinalAnswerChoice] = useState('')
    const [correct, setCorrect] = useState(null)
    
    // SETTINGS
    const [references, setReferences] = useState(false)
    const [settings, setSettings ] = useState(false)
    const [filteredOutTypes, setFilteredOutTypes] = useState({sin: false, cos: false, tan: false})
    const [filteredOutQuadrants, setFilteredOutQuadrants] = useState({q1: false, q2: false, q3: false, q4: false})
    const [radians, setRadians] = useState(true)
    const [showGraph, setShowGraph] = useState(false)

    // AUTHENTICATION
    const [user] = useAuthState(auth)


    const getProblem = () => {
        setPreviousProblem(problem)
        setFinalAnswerChoice('') // clears answer choice from previous question
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

        // if there are quadrant preferences
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
        
        if (previousProblem.name === random.name) {
            return false
        }

        return true
    }

    const handleGotProblemCorrect = () => {
        if (!user) return // if user isn't logged in, dont try firebase 
        firebaseProblemCorrect(problem, auth.currentUser.email)
    }
    const handleGotProblemWrong = () => {
        if (!user) return // if user isn't logged in, dont try firebase
        firebaseProblemWrong(problem, auth.currentUser.email)
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

                    <div className="util-buttons">
                        {/* <Button className="settings" variant="text" onClick={() => setSettings(true)}>
                            Settings
                        </Button> */}
                        {/* <Backdrop   
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={settings}                             
                            >
                            <TestSettings references={references} setReferences={setReferences} setSettings={setSettings} filteredOutTypes={filteredOutTypes} setFilteredOutTypes={setFilteredOutTypes} filteredOutQuadrants={filteredOutQuadrants} setFilteredOutQuadrants={setFilteredOutQuadrants} radians={radians} setRadians={setRadians} showGraph={showGraph} setShowGraph={setShowGraph}/>
                        </Backdrop> */}
                        
                        <div style={{display: 'flex'}}>
                            <Typography variant="h5"></Typography>
                            <Switch checked={radians} style={{color: color}} onClick={() => setRadians( radians ? false : true )} />     
                        </div>
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
                        <AnswerChoices getNewProblem={getProblem} setAnswerChoice={setFinalAnswerChoice} answerChoice={finalAnswerChoice} onCorrect={handleGotProblemCorrect} onWrong={handleGotProblemWrong} correctAnswer={problem.answer}  setCorrect={setCorrect}  correct={correct} />
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


