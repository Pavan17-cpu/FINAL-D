
import { useState } from 'react';
import './Quiz.css';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Quiz(){
    var Questionbank = [
        {
            Question: "What is a room rental?",
            Answers: [
                { Answer: " Renting an entire apartment or house", isCorrect:false  },
                { Answer: "Renting a single room in someone's home", isCorrect: true },
                { Answer: "Renting a hotel room", isCorrect: false },
                { Answer: "Renting a car", isCorrect: false}
            ]
        },
        {
            Question: "Who can benefit from renting a room?",
            Answers: [
                { Answer: "Students", isCorrect: false },
                { Answer: "Travelers ", isCorrect:false },
                { Answer: "People relocating for work", isCorrect: false },
                { Answer: " All of the above", isCorrect: true }
            ]
        }, {
            Question: "What are some benefits of renting a room?",
            Answers: [
                { Answer: "Flexibility ", isCorrect: false },
                { Answer: "Affordability ", isCorrect: false },
                { Answer: "Shared expenses ", isCorrect: false },
                { Answer: "All of the above", isCorrect: true }
            ]
        },
        {
            Question: "What is a potential downside of renting a room?",
            Answers: [
                { Answer: "Lack of privacy", isCorrect: false },
                { Answer: " High cost", isCorrect: false },
                { Answer: " Inflexibility", isCorrect: false },
                { Answer: "All of the above", isCorrect: true }
            ]
        },
        {
            Question: "What is a potential benefit of renting a room in someone's home?",
            Answers: [
                { Answer: " Security", isCorrect: false },
                { Answer: " Access to amenities like a kitchen or living room  ", isCorrect: false },
                { Answer: " Opportunities for social interaction", isCorrect: false },
                { Answer: " All of the above", isCorrect: true }
            ]
        }
    ]

    //useState Hook
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

const handleAnswerResponse=(isCorrect)=>
{
    if(isCorrect)
    {
        setScore(score+1);
    }

   const nextQuestion= currentQuestion+1;
   if(nextQuestion<Questionbank.length)
   {
    setCurrentQuestion(nextQuestion);
   }
   else{
    setShowScore(true);
   }
}

const resetQuiz=()=>
{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
}

    return (

<div>
  <br/>
  <center> <h1 >FREQUENTLY ASKED QUESTIONS</h1></center>
  
        <div>
           
            <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How much should I expect to pay for renting a room?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The cost of renting a room can vary greatly depending on the location, size of the room, and included amenities. It's best to research the area and compare prices before making a decision.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Is it normal to sign a lease agreement for renting a room?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, it's common to sign a lease agreement even when renting a room in someone's home. The lease will outline the terms of the rental agreement, including the length of the lease, the rent amount, and any rules or restrictions.
          </Typography>
        </AccordionDetails>
        
      </Accordion>
      <Accordion>
                
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What are some important things to look for when inspecting a room before renting it?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Look for any damages or safety hazards such as cracked walls or loose floorboards. Make sure the room is clean and check that all appliances and fixtures are working properly. Also, check for any evidence of pests.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
                
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Can I negotiate the rent for a room?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, it's possible to negotiate the rent for a room, especially if you're renting from an individual rather than a rental agency. However, be sure to approach the negotiation in a respectful and reasonable manner.
          </Typography>
        </AccordionDetails>
      </Accordion>

      

      </div>
      
      
        <div className='actd'>
            {showScore ? (
                <div className='score-section'>
                    You have scored {score} out of {Questionbank.length}
                    <>
                       <button type="submit" onClick={resetQuiz}>Play Again!!</button>
                    </>
                </div>
            )
                : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                               <span>{currentQuestion+1}</span>/{Questionbank.length}
                            </div>

                            <div className='question-text'>
                             {Questionbank[currentQuestion].Question}
                            </div>
                        </div>

                        <div className='answer-section'>
                          {Questionbank[currentQuestion].Answers.map((answer)=>
                          (
                            
                              <button className='button' onClick={()=>handleAnswerResponse(answer.isCorrect)}>{answer.Answer}</button>
                          ))}
                        </div>
                        
                    </>
                )
            }

        </div>
        </div>
        
        
    );
}
export default Quiz;
