import React, { useEffect , useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2'
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from '../components/Success'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import "./Payment.css";

import moment from "moment"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
AOS.refresh()
function Bookingscreen({match}) {
    const[loading, setloading]=useState(true);
    const[error, seterror]=useState(false)
    const[success, setsuccess]=useState(false)   
    const[room , setroom]=useState()
    const roomid=match.params.roomid
    const fromdate=moment(match.params.fromdate , 'DD-MM-YYYY')
    const todate=moment(match.params.todate,'DD-MM-YYYY')
    const totalDays = moment.duration(todate.diff(fromdate)).asDays()+1
    const [totalAmount , settotalAmount]=useState()
    const [showPaymentForm, setShowPaymentForm] = useState(false); // state variable to show/hide payment form
    useEffect(async() => {
        
        try {
            setloading(true);
            const data = await (await axios.post("/api/rooms/getroombyid" , {roomid})).data;
            console.log(data);
            setroom(data);
            setloading(false);
            settotalAmount(data.rentperday * totalDays)
          } catch (error) {
            console.log(error);
            setloading(false);
          }
          
    }, [])


    async function tokenHandler(token) {
    
        console.log(token);
        const bookingDetails ={

            token ,
            user : JSON.parse(localStorage.getItem('currentUser')),
            room ,
            fromdate,
            todate,
            totalDays,
            totalAmount

        }


        try {
            setloading(true);
            const result = await axios.post('/api/bookings/bookroom' , bookingDetails)
            setloading(false)
            Swal.fire('Congrats' , 'Your Room has booked succeessfully' , 'success').then(result=>{
                window.location.href='/profile'
            })
        } catch (error) {
            console.log(error);
            setloading(false)
            Swal.fire('Oops' , 'Something went wrong , please try later' , 'error')
        }
        
    }
    function App() {
      const [number, setNumber] = useState('');
      const [name, setName] = useState('');
      const [expiry, setExpiry] = useState('');
      const [cvc, setCvc] = useState('');
      const [focus, setFocus] = useState('');
    
      return (
        <div className="payment-form">
          {showPaymentForm ? (
            <div>
              <Cards
                cvc={cvc}
                expiry={expiry}
                focused={focus}
                name={name}
                number={number}
              />
              <form className="payment-form__details">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="tel"
                  name="number"
                  id="cardNumber"
                  value={number}
                  placeholder="•••• •••• •••• ••••"
                  onChange={(e) => setNumber(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                  required
                />
    
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  id="cardName"
                  value={name}
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                  required
                />
    
                <div className="payment-form__expiry-cvc">
                  <label htmlFor="cardExpiry">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    id="cardExpiry"
                    value={expiry}
                    placeholder="MM/YY"
                    onChange={(e) => setExpiry(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    required
                  />
    
                  <label htmlFor="cardCvc">CVC</label>
                  <input
                    type="tel"
                    name="cvc"
                    id="cardCvc"
                    value={cvc}
                    placeholder="•••"
                    onChange={(e) => setCvc(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    required
                  />
                </div>
    
                <button className="payment-form__submit" onClick={() => tokenHandler()}>
                  Pay Now
                </button>
              </form>
    
              <button className="payment-form__cancel" onClick={() => setShowPaymentForm(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="payment-form__pay" onClick={() => setShowPaymentForm(true)}>
              Pay ₹{totalAmount}
            </button>
          )}
        </div>
      );
    }
    
    
    return (
        <div>
             {loading ? (<Loader/>) : error ? (<Error/>) :(
                 <div>
            <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card p-3">
                            <h2>Your Booking Details</h2>
                            <hr/>
                            <p><b>Name : </b>{room.name}</p>
                            <p><b>Price : </b>₹{room.rentperday} per day</p>
                            <p><b>From Date : </b>{moment(fromdate).format('MMMM Do YYYY')}</p>
                            <p><b>To Date : </b>{moment(todate).format('MMMM Do YYYY')}</p>
                            <p><b>Total Days : </b>{totalDays}</p>
                            <p><b>Total Amount : </b>₹{totalAmount}</p>
                            <hr/>
                            <App />
                        </div>
                    </div>
                </div>
        </div>
             )}
        </div>
    )
  }

  export default Bookingscreen    
    
