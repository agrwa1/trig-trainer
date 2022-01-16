import React, {useState, useEffect} from 'react'
import { Typography, Paper, Button, Switch, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

// WORKING ON:
//  - if user selects none of the options, send an alert that makes them choose
//      - or just auto make it reset to all

const TestSettings = ({ references, setReferences, setSettings, filteredOutTypes, setFilteredOutTypes, filteredOutQuadrants, setFilteredOutQuadrants, radians, setRadians, showGraph, setShowGraph}) => {

    const color = 'midnightblue'
    const onTypeClick = (val) => {
        // if filteredOutTypes[val] is true, set to false. 
        // else set "" to true


        //NOTE TO FUTURE SELF:
        //  I know this is really crap style
        //  But until I figure out how to pass variable values as object keys 
        //  I'm kinda stuck
        filteredOutTypes[val] = filteredOutTypes[val] ? false : true
        setFilteredOutTypes({...filteredOutTypes})
    }

    const onQuadrantClick = (val) => {
        filteredOutQuadrants[val] = filteredOutQuadrants[val] ? false : true;
        setFilteredOutQuadrants({...filteredOutQuadrants})
    }

    const resetAll = () => {
        setFilteredOutTypes({
            sin: false,
            cos: false,
            tan: false
        })
        setFilteredOutQuadrants({
            q1: false,
            q2: false,
            q3: false,
            q4: false
        })
        setReferences(false)
        setRadians(true)
        setShowGraph(true)
    }

    return(
        <div>
            <Paper elevation={4} style={styles.paper}>
                <div>
                    <Typography variant="body1"><Checkbox disabled defaultChecked /> means allow questions of this type</Typography>
                    <Typography variant="body1"><Checkbox disabled color="success"/> means do not allow questions of this type</Typography>
                    <hr />
                </div>
                <div style={{display: 'flex'}}>

                    {/* remove following comment section to add graph functionality back */}
                    {/* <div style={{display: 'flex'}}>
                        <Typography variant="h5">References: </Typography>
                        <Switch checked={references} style={{color: color}} onClick={() => setReferences( references ? false : true )} />     
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography variant="h5">Graph: </Typography>
                        <Switch checked={showGraph} style={{color: color}} onClick={() => setShowGraph( showGraph ? false : true )} />     
                    </div> */}
                    <div style={{display: 'flex'}}>
                        <Typography variant="h5">Radians: </Typography>
                        <Switch checked={radians} style={{color: color}} onClick={() => setRadians( radians ? false : true )} />     
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    {/* checked == val !in don't allow list*/}
                    <FormGroup>
                        <FormControlLabel style={{color: color}} control={<Checkbox checked={!filteredOutTypes.sin}  />  } onClick={() => onTypeClick('sin')} label="Sin" />
                        <FormControlLabel control={<Checkbox checked={!filteredOutTypes.cos}/>} onClick={() => onTypeClick('cos')} label="Cos" />
                        <FormControlLabel control={<Checkbox checked={!filteredOutTypes.tan}/>} onClick={() => onTypeClick('tan')} label="Tan" />
                    </FormGroup>
                
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={!filteredOutQuadrants.q1} onClick={() => onQuadrantClick('q1')} />} label="Quadrant 1" />
                        <FormControlLabel control={<Checkbox checked={!filteredOutQuadrants.q2} onClick={() => onQuadrantClick('q2')} />} label="Quadrant 2" />
                        <FormControlLabel control={<Checkbox checked={!filteredOutQuadrants.q3} onClick={() => onQuadrantClick('q3')} />} label="Quadrant 3" />
                        <FormControlLabel control={<Checkbox checked={!filteredOutQuadrants.q4} onClick={() => onQuadrantClick('q4')} />} label="Quadrant 4" />
                    </FormGroup>
                </div>
                
                <Button style={{width: '100%', color: color}} variant="text" onClick={resetAll}>Reset All</Button>
                <Button variant="contained" style={{ backgroundColor: color }}onClick={() => setSettings(false)}>Exit</Button>
            </Paper>
        </div>
    )
}

//ALGORITHM:
// List of filters that are checked to have at least one value 
// While (problem.type == type in don't allow list || problem.quadrant == type in don't allow list ) {
// reroll
// }

const styles = {
    paper: {
        padding: '2em', 
        display:'flex', 
        flexDirection: 'column',
        
    }
}

export default TestSettings;