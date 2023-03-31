
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
            Question: " What is the purpose of a car rental management system?",
            Answers: [
                { Answer: "To buy new cars", isCorrect:false  },
                { Answer: " To manage customer reservations and bookings", isCorrect: true },
                { Answer: "To set rental rates and revenue", isCorrect: false },
                { Answer: "ALL", isCorrect: false}
            ]
        },
        {
            Question: "Which of the following is NOT a typical feature of a car rental management system?",
            Answers: [
                { Answer: "Online booking portal for customers", isCorrect: false },
                { Answer: "Real-time tracking of car locations and availability", isCorrect:false },
                { Answer: "Automatic maintenance scheduling for rental cars", isCorrect: false },
                { Answer: "Social media marketing tools for promoting the car rental service", isCorrect: true }
            ]
        }, {
            Question: "What is the benefit of using a car rental management system for customers?",
            Answers: [
                { Answer: "Faster and more convenient booking process", isCorrect: true },
                { Answer: "cars are not in condition", isCorrect: false },
                { Answer: " high pricing and rental terms", isCorrect: false },
                { Answer: "All of the above", isCorrect: false }
            ]
        },
        {
            Question: "How can a car rental management system help a rental car company improve its business operations?",
            Answers: [
                { Answer: "By providing real-time data and insights on rental car usage and customer behavior", isCorrect: true },
                { Answer: "By automating routine tasks such as vehicle maintenance and payment processing", isCorrect: false },
                { Answer: " By improving customer satisfaction and loyalty through a more streamlined rental experience", isCorrect: false },
                { Answer: "All of the above", isCorrect: true }
            ]
        },
        {
            Question: "Which of the following is a potential challenge when implementing a car rental management system?",
            Answers: [
                { Answer: "High initial cost of system implementation and training", isCorrect: false },
                { Answer: " Difficulty in integrating the system with existing IT infrastructure ", isCorrect: false },
                { Answer: "Concerns about data security and privacy", isCorrect: false },
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
          <Typography>How old do I need to be to rent a car?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          With many rental companies, you must be at least 21 years of age to rent a car, and any driver under 25 may have to pay a Young Driver Fee. Similarly, people aged 70+ may find some companies will charge a Senior Driver Fee, or may not rent to them at all.
So car rental for the under-25s or over-70s can be more expensive – which is one more reason to book with Rentalcars.com, as we work with all the big brands. Just check each car’s terms and conditions to see if your age would make any difference.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Can I book a one-way car rental?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes. One-way car rental deals are quite common, as they give people even more freedom to explore and enjoy their rental. However, rental companies will often charge a One Way Fee (or ‘drop charge’) to cover the cost of returning the car to its original location. As the world’s biggest online car rental service, we can help you find a one-way rental car with a low Fee – or no Fee at all.
          </Typography>
        </AccordionDetails>
        
      </Accordion>
      <Accordion>
                
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Do I need rental car insurance – and what is ‘CDW’ anyway?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Before you buy any car rental insurance, you should find out what coverage is provided by your credit card company, your homeowner’s / renter’s policy, and your own car insurance. This will help you decide what cover you need to buy while booking and picking up your car.
CDW means ‘Collision Damage Waiver’; a type of cover that limits your liability for damage to certain parts of a rental car.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
                
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How do I find the cheapest car rental deals?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          As the world’s biggest online car rental service, we specialize in finding the cheapest car rental deals from major brands such as Hertz, Avis, Alamo, and Budget. Daily, weekly, or monthly car rentals… just fill in our search form to compare deals from different companies – and find out how much you can save when you rent a car from us.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
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
        </div>
        
    );
}
export default Quiz;