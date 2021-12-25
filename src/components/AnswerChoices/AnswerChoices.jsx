import React, {useState, useEffect} from 'react'
import { Button, Typography } from '@mui/material'

// AnswerChoices component has to:
// 1) Provide interface that allows users to select answer choices
// 2) Take the following as props:
//  2a) Current Problem
//  2b) 
// 3) Create a final answer choice and use the setAnswerChoice method
// 4) Accept the correct answer as props and handle submittion of answer

const allAnswers = ['-√3/2', '-√2/2', '-1/2', '-1', '-√3', '-1/√3', '0', '1/√3', '√3', '1', '1/2', '√2/2', '√3/2', 'undefined']

const AnswerChoices = ({setAnswerChoice, answerChoice, correctAnswer, onCorrect, onWrong }) => {
    // correctAnswer
    // AnswerChoice
    // setAnswerChoice

    // useEffect(() => {
    //     console.log('test')
    //     console.log(AnswerChoice)
    // }, [])

    // if ans == AnswerChoice, then active, if not then default

    const onSubmit = () => {
        // function should check if answer is correct and call appropriate functions
        if (correctAnswer == answerChoice ) {
            onCorrect()
        }
        else {
            onWrong()
        }
        console.log('Question submitted')
    }


    return (
        <div>
            <h1>{correctAnswer}</h1>

        {/* This div is for all the Answer Buttons */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr 1fr', gridRowGap: 10, marginTop: 20}}>
                {
                    allAnswers.map(ans => (
                        <AnswerButton val={ans} setAnswerChoice={setAnswerChoice} answerChoice={answerChoice} />
                    ))
                }
                <Button variant="contained" style={{width: 200, height: 100}} onClick={onSubmit}>
                    <Typography variant="h6">Check</Typography>
                </Button>
            </div> 

            {/* <h1>{answerChoice}</h1> */}
        </div>
    )
}

const AnswerButton = ({val, setAnswerChoice, answerChoice }) => {
    // create method that changes final answer choice on button click

    const [clicked, setClicked] = useState(false)


    const onClick = () => {
        setAnswerChoice(val)
        // let AnswerChoice state reflect change of state
        setClicked(true)

    }

    return (
        // Make button look non crappy
        // make this look better
        <Button onClick={onClick} style={ val == answerChoice ? styles.active : styles.default} color={clicked ? 'secondary' : "primary"} >
            <Typography variant="h5" className="answer-choice-text" >{val}</Typography>
        </Button>
    )
}

const styles = {
    active: {
        width: 200, 
        height: 100, 
        background: 'midnightBlue', 
        color: 'white'
    },
    default: {
        width: 200, 
        height: 100, 
        background: 'grey', 
        color: 'white'
    }
}

export default AnswerChoices;