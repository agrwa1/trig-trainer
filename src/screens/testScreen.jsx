import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import TestGraph from './../components/TestGraph'
import {problemSet} from './../utils/problems'
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill'

// import { firebaseApp, db } from './../firebase'
// import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

addStyles()

const TestScreen = () => {

    const [streak, setStreak] = useState({sin: 0, cos: 0, tan: 0, sec: 0, csc: 0, cot: 0})
    const [problem, setProblem] = useState({})
    const [finalAnswerChoice, setFinalAnswerChoice] = useState('')
    const [correct, setCorrect] = useState(null)

    // make function to change streak and pass to answer choices
    // on change of setfinalanswerchoice, function should 
    
    // implement auth and redirect
    // set state for type of problem

    const getProblem = () => {
        const random = problemSet[Math.floor(Math.random() * problemSet.length)];

        setProblem(random)

        // setting correct answer to null
        setCorrect(null)
        return;
    }

    useEffect(() => {
        if (!problem.name) {
            console.log('use effect loop started')
            getProblem()
        }
        
    })

    return (
        <div style={{display: 'flex', padding: '2em'}}>
            <div>

           {/* <Typography variant="h2">This is the Learn Page</Typography> */}
            <Button variant="contained" onClick={getProblem} color={correct ? 'success' : (correct === false) ? 'error' : 'secondary'} >Next Question</Button> 
            <Typography variant="h2">Problem: {problem.type}({problem.degree})</Typography>      
            <Typography variant="h4">Degree: {problem.degree}</Typography>   
            <Typography variant="h4">Answer: {problem.answer}</Typography>   

            <TestGraph stoppingDegree={problem.degree} /> 
            </div>



            <div>

            <AnswerButtons correctAnswer={problem.answer} setFinalAnswerChoice={setFinalAnswerChoice} setCorrect={setCorrect} finalAnswerChoice={finalAnswerChoice} correct={correct}/>
  
            </div>
        </div>
    )
}

const AnswerButtons = ({ correctAnswer, setFinalAnswerChoice, setCorrect, finalAnswerChoice, correct }) => {
    const [positiveSign, setPositiveSign] = useState(true)
    const [answerChoice, setAnswerChoice] = useState('')

    // on new question, reset answer choice
    // on submit: combine questions and check if answre is correct
    const handleAnswerChoiceChange = (choice) => {
        setAnswerChoice(choice)
        // handleSubmit()
    }

    const handleSignChangeToPositive = () => {
        setPositiveSign(true)
    }

    const handleSignChangeToNegative = () => {
        setPositiveSign(false)
    }

    const handleAnswerChoiceChangeToRt2Over2 = () => {
        handleAnswerChoiceChange('√2/2')
    }
    const handleAnswerChoiceChangeToRt3Over2 = () => {
        handleAnswerChoiceChange('√3/2')
    }
    const handleAnswerChoiceChangeTo1Over2 = () => {
        handleAnswerChoiceChange('1/2')
    }
    const handleAnswerChoiceChangeTo1OverRt3 = () => {
        handleAnswerChoiceChange('1/√3')
    }
    const handleAnswerChoiceChangeToRt3 = () => {
        handleAnswerChoiceChange('√3')
    }
    const handleAnswerChoiceChangeTo1 = () => {
        handleAnswerChoiceChange('1')
    }
    const handleAnswerChoiceChangeTo0 = () => {
        handleAnswerChoiceChange('0')
    }
    const handleAnswerChoiceChangeToUndefined = () => {
        handleAnswerChoiceChange('undefined')
    }

    const handleSubmit = () => {
        if (positiveSign) {
            setFinalAnswerChoice(answerChoice)
        } 
        else { // negative is chosen
            if (answerChoice == 'undefined') {
                setFinalAnswerChoice('undefined')

            } else if( answerChoice == '0') {
                setFinalAnswerChoice('0')
            } else {
                setFinalAnswerChoice('-' + answerChoice)
            }
        }

        // setTimeout(500)

        if (finalAnswerChoice == correctAnswer) {
            console.log('point 1')
            setCorrect(true)
        } else {
            setCorrect(false)
        }


    }

    


    return (
        <div style={{border: '1px solid black', height: '70%', maxWidth: '50%', padding: '1em'}}>
        

            <Button variant="outlined" onClick={handleSignChangeToPositive} disabled={positiveSign} style={{fontSize: 20, width: '30%'}}> + </Button>
            <Button variant="outlined" onClick={handleSignChangeToNegative} disabled={!positiveSign} style={{fontSize: 20, width: '30%'}}> - </Button>

            <br />

            <Button variant="outlined" style={{ padding: 20, margin: '1em'}} onClick={handleAnswerChoiceChangeToRt2Over2} color="inherit">
                <StaticMathField style={{fontSize: 40}}>{'\\frac{\\sqrt{2}}{2}'}</StaticMathField>
            </Button> 
            <Button variant="outlined" style={{ padding: 20, margin: '1em'}} onClick={handleAnswerChoiceChangeToRt3Over2} color="inherit">
                <StaticMathField style={{fontSize: 40}}>{'\\frac{\\sqrt{3}}{2}'}</StaticMathField>
            </Button> 
            <Button variant="outlined" style={{ padding: 20, margin: '1em'}} onClick={handleAnswerChoiceChangeTo1Over2} color="inherit">
                <StaticMathField style={{fontSize: 40}}>{'\\frac{1}{2}'}</StaticMathField>
            </Button> 
            <Button variant="outlined" style={{ padding: 20, margin: '1em'}} onClick={handleAnswerChoiceChangeTo1OverRt3} color="inherit">
                <StaticMathField style={{fontSize: 40}}>{'\\frac{1}{\\sqrt{3}}'}</StaticMathField>
            </Button> 
            <Button variant="outlined" style={{ padding: 20, margin: '1em'}} onClick={handleAnswerChoiceChangeToRt3} color="inherit">
                <StaticMathField style={{fontSize: 40}}>{'\\sqrt{3}'}</StaticMathField>
            </Button> 

            <Button variant="outlined" style={{ padding: 20, margin: '1em'}} onClick={handleAnswerChoiceChangeTo1} color="inherit">
                <StaticMathField style={{fontSize: 40}}>{'1'}</StaticMathField>
            </Button> 
            <Button variant="outlined" style={{ padding: 20, margin: '1em'}} onClick={handleAnswerChoiceChangeTo0} color="inherit">
                <StaticMathField style={{fontSize: 40}}>{'0'}</StaticMathField>
            </Button> 
            <Button variant="outlined" style={{ padding: 20, margin: '1em'}} onClick={handleAnswerChoiceChangeToUndefined} color="inherit">
                <StaticMathField style={{fontSize: 40}}>{'undefined'}</StaticMathField>
            </Button> 

            <Button variant="contained" onClick={handleSubmit} size="large" color={correct ? 'success' : (correct === false) ? 'error' : 'secondary'}>
                {
                    correct === null 
                    &&
                    'Check Work'
                }

                {
                    correct === false
                    && 
                    "Incorrect"
                }

                {
                    correct === true
                    &&
                    "Correct"
                }

            </Button>
        </div>
    )
}

export default TestScreen;