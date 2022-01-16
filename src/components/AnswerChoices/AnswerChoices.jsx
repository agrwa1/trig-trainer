import React, {useState} from 'react'
import { Button, Typography, Fade } from '@mui/material'


// AnswerChoices component has to:
// 1) Provide interface that allows users to select answer choices
// 2) Take the following as props:
//  2a) Current Problem
//  2b) 
// 3) Create a final answer choice and use the setAnswerChoice method
// 4) Accept the correct answer as props and handle submittion of answer

const allAnswers = ['-√3/2', '-√2/2', '-1/2', '-1', '-√3', '-1/√3', '1/√3', '√3', '1', '1/2', '√2/2', '√3/2', '0', 'undef.']
const color = 'midnightblue'
const secondaryColor = '#ffa701'

const AnswerChoices = ({ setAnswerChoice, answerChoice, correctAnswer, correct, setCorrect, getNewProblem }) => {
    // correctAnswer
    // AnswerChoice
    // setAnswerChoice
    // onCorrect
    // onWrong

    // BUGS:
    // after submittion, user can still click other options and resubmit to get question right

    // if ans ==== AnswerChoice, then active, if not then default

    const onSubmit = () => {
        // function should check if answer is correct and call appropriate functions
        if (correctAnswer === answerChoice ) {
            setCorrect(true)
            
        }
        else {
            setCorrect(false)
        }
         
    }

    // Submit button:
    //  - if answer is correct, next question
    // - if wrong, check again
    // - else, check


    return (
        <div style ={{height: '100%', width: '100%', padding: '1rem'}} className="answer-choices">
            {/* <h1>{correctAnswer}</h1> */}

        {/* This div is for all the Answer Buttons */}
            <div className="container">
                {
                    allAnswers.map(ans => (
                        <AnswerButton  val={ans} setAnswerChoice={setAnswerChoice} answerChoice={answerChoice} correct={correct} setCorrect={setCorrect} correctAnswer={correctAnswer}/>
                    ))
                }
                {
                    (correct === true || correct === false) &&
                    <Button variant="contained" onClick={getNewProblem} color='success' className={"check"} >
                        <a className="check-button">{correct === true && "Correct!"}{correct === false && "Incorrect!"} Next</a>
                    </Button>
                }
                
                {
                    correct === null &&
                    <Button variant="contained" onClick={onSubmit} className="check" >
                        <a className="check-button">Check Answer</a>
                    </Button>
                }
            </div> 

            

            {/* <h1>{answerChoice}</h1> */}
        </div>
    )
}

const AnswerButton = ({val, setAnswerChoice, answerChoice, correct, setCorrect, correctAnswer }) => {
    // create method that changes final answer choice on button click

    const [clicked, setClicked] = useState(false)


    const onClick = () => {
        // if statement -> return gets rid of bug where:
        //      after submitting answer, user can still click on answer choices and they will appear red or green
        if (correct === true || correct === false ) {
            return
        }

        setAnswerChoice(val)

        // sets the current state of correctness to void
        // setCorrect(null) 


        // let AnswerChoice state reflect change of state
        setClicked(true)

    }

    const styler = (val) => {
        // if val===answer choice -> styles.active
        // if correct === true || false && correctAnswer === val. This is to make a separate answer button correct if the answer wrong
        // if correct and val=answer choice -> styles.correct
        // if correct === false and val === answer choice -> styles.wrong
        // else styles.default

        if(val === answerChoice && correct === true) {
            return styles.correct
        } else if ((correct === true || correct === false) && correctAnswer === val) {
            return styles.correct
        } else if (val === answerChoice && correct === false) {
            return styles.wrong
        } else if (val === answerChoice) {
            return styles.active
        } else {
            return styles.default
        }
    }

    return (
        // Make button look non crappy
        // make this look better
        <Fade in={true} className="button">

            <Button onClick={onClick} className="choice" >
                <a className="answer-choice-text" style={styler(val)} >{val}</a>
            </Button>
        </Fade>
    )
}

const styles = {
    active: {
        color: 'white',
        background: secondaryColor,
        
    },
    correct: {
        background: 'green', 
        color: 'white' 
    },
    wrong : {
        background: 'red', 
        color: 'white'
    }
}

export default AnswerChoices;