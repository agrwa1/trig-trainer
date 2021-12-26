import React, { useState, useRef, useEffect } from 'react'
import { Typography, Fade } from '@material-ui/core'
import './TestGraphCSS/TestGraph.css'
import { findAnswer } from './../utils/findAnswer'


// import gsap and use
// find and import graph library

const TestGraph = ({stoppingDegree, references}) => {
    // make function able to have transitions
    // take props for right answer


    const [degree, setDegree] = useState(0)

    useEffect(() => {
        // if degree is less than stopping degree ==> keep drawing
        // else ==> stop drawing
        // on stopping degree reset ==> set degree to 0
        // setDegree(deg => deg + 1)
    })

    // right now this is returning only a 
    //fixed frame rather than an animation
    return (
        <div>
            
            <Draw degree ={stoppingDegree} references ={references} />
            {/* {
                !stoppingDegree && <Draw degree={0} />
            }
            {
                // acts as while loop
                // while degree is less than the stopping degree, 
                // set a new draw function
                degree < stoppingDegree 
                && 
                <Draw degree={degree} />
            }
            {
                // when degree is equal to stopping degree, 
                // set a draw function that will stop at that point
                degree == stoppingDegree
                &&
                <Draw degree={stoppingDegree}  />
            } */}
        </div>
    )
    
}

const Sine = ({stoppingDegree}) => {
    const [degree, setDegree] = useState(0)

    const lastTimeRef = useRef(null)
    const frameRef = useRef()

    const animate = time => {
        if (lastTimeRef.current != null) {
          const delta = (time - lastTimeRef.current) * 0.07; // change speed
          // Because of the unfortunate side effect of the effect's 
          // second parameter we cannot refer to degree as simple
          // as you might would in an other situation. Luckily for 
          // us though the setter function can accept a function if 
          // the state is needed to calcualte the next value and
          // that function will always have the latest value of the state
          if (degree <= stoppingDegree) {
            setDegree(previousDegree => (previousDegree + delta) % 360);
          } else {
            setDegree(180)
          }
          
        }
        lastTimeRef.current = time;
        frameRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        if (true){
        frameRef.current = requestAnimationFrame(animate);
    }
        return () => {
            cancelAnimationFrame(frameRef.current)
        };
    }, []);

    // add event listener that looks for when degree = stopping degree. Stop movement when this happens
    // when stopping degree changes, reset degree

    return (
        <div>

            {/* {
                degree <= stoppingDegree
                &&
            <Draw degree={degree}/>
            } */}
            {
                degree <= stoppingDegree ? <Draw degree={degree}/> : <Draw degree={0} /> 
            }
        </div>
    )

}

const sin = value => -Math.sin(value/180*Math.PI)
const cos = value => Math.cos(value/180*Math.PI)



const Draw = ({ degree, references }) => {
    return (
    <svg width='1000' height='820' viewBox='120 -50 400 300'>
        {/* <text x='100'>
            sin(
        </text> */}
        
        {/* This is the line that connects the two sides */}
        {/* <line 
            transform='translate(310 0)'
            className='thin' 
            x1={cos(degree) * 100} 
            y1={sin(degree) * 100}
            x2={degree + 250}
            y2={sin(degree) * 100}
        /> */}

        {/* This is the left side block with the circle*/}
        <g transform='translate(310 0)'>
        <circle className='thin' cx='0' cy='0' r='100' />

        {/* This is the arc showing the progress (M: move to, A: arc to)*/}
        <path d={`
            M 30 0 
            A 30 30 0 ${degree <= 180 ? 0 : 1} 0 ${cos(degree) * 30} ${sin(degree) * 30}
        `}/>

        {/* These are the two sides of the angle */}
        <line 
            className='thin'
            x1='0'
            y1='0' 
            x2='100' 
            y2='0' 
        />
        <line 
            className='thin' 
            x1='0' 
            y1='0'
            x2={cos(degree) * 100} 
            y2={sin(degree) * 100} 
        />

        {/* This is the degree of the angle */}
        

        {
            // Quadrant 1
            ((degree <= 90 && degree >= 0) && references)
            &&
            <Fade in={references}>
                <text style={{fontSize: 14}} 
                    x={cos(degree) * 100} 
                    y={sin(degree) * 100}
                >           
                    ({findAnswer(Math.cos(degree * Math.PI / 180).toFixed(2))}, {findAnswer(Math.sin(degree * Math.PI / 180).toFixed(2))})
                </text>
            </Fade>

        }

        {
            // Quadrant 2
            ((degree <= 180 && degree > 90) && references)
            &&
            <Fade in={references}>
                <text style={{fontSize: 14}} 
                    x={cos(degree) * 100 - 75} 
                    y={sin(degree) * 100 - 10}
                >           
                    ({findAnswer(Math.cos(degree * Math.PI / 180).toFixed(2))}, {findAnswer(Math.sin(degree * Math.PI / 180).toFixed(2))})
                </text>
            </Fade>

        }

        {
            // Quadrant 3
            ((degree <= 270 && degree > 180) && references)
            &&
            <Fade in={references}>
                <text style={{fontSize: 14}}
                    x={cos(degree) * 100 - 75} 
                    y={sin(degree) * 100 + 15}
                >           
                    ({findAnswer(Math.cos(degree * Math.PI / 180).toFixed(2))}, {findAnswer(Math.sin(degree * Math.PI / 180).toFixed(2))})
                </text>
            </Fade>
        }

        {
            // Quadrant 4
            ((degree <= 360 && degree > 270) && references)
            &&
            <Fade in={references}>
                <text style={{fontSize: 14}}
                    x={cos(degree) * 100} 
                    y={sin(degree) * 100}
                >           
                    ({findAnswer(Math.cos(degree * Math.PI / 180).toFixed(2))}, {findAnswer(Math.sin(degree * Math.PI / 180).toFixed(2))})
                </text>
            </Fade>
        }

        </g>

        {/* <text x='470'>
        ) =
        </text> */}

          
        {/* if wanted add the below part here (const sinWave)*/}

    </svg>)
}

export default TestGraph;

const sinWave = {

    //  {/* This is the right side block with the sine wave */}
    //  <g transform='translate(560 0)'>
            
    //  {/* This is the baseline */}
    //  <line className='thin' x1='0' y1='0' x2='360' y2='0' />
    
    //  {/* These are the full sine wave in the background and the in progress one*/}
    //  <polyline className='thin'
    //      points={Array.from(
    //      { length: 360 },
    //      (v, d) => `${d} ${sin(d) * 100}`
    //      )} 
    //  />
    //  <polyline 
    //      points={Array.from(
    //      { length: degree },
    //      (v, d) => `${d} ${sin(d) * 100}`
    //      )}
    //  />
     
    //  {/* This is the value of the sine */}
    //  <text x={degree + 10} y={sin(degree) * 100}>
    //      {parseFloat(Math.sin(degree/180*Math.PI)).toFixed(2)}
    //  </text>
    //  </g> 
}