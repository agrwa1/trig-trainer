import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const HomeScreen = () => {
    return (
        <div style={{margin: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div >
                
                <Typography variant="h1" style={{marginBottom: '.5em'}}>Let's Learn Trig!</Typography>
                
                {/* this next part renders the paragraphs from the "content" variable */}
                <div>
                    {content.map((paragraph) => (
                        <TextBlock header={paragraph.header} text={paragraph.text} />
                    ))}
                </div>


            </div>
        </div>
    )
}


const content = [
    {header: 'Intro to Trig', text: 'random text about intro to trig'},
    {header: 'Trig Part 2', text: 'some more text about other trig things'}
]


const TextBlock = ({header, text}) => {
    return (
        <div style={{marginBottom: '1em'}}>

            <Typography variant="h4">{header}</Typography>
            <Typography variant="body1">{text}</Typography>
        </div>
    )
}


export default HomeScreen;