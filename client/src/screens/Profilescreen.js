import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { Tag, Divider } from 'antd';
import { CSVLink } from 'react-csv';
const { TabPane } = Tabs;

const user = JSON.parse(localStorage.getItem('currentUser'));
function req()
{
  alert("Sorry user not authorized to get Admin access")
}

function Profilescreen() {
  return (
    <div className="mt-5 ml-3">
      <Tabs defaultActiveKey="1" centered className="custom-tabs">
        <TabPane tab="My Profile" key="1">
        
          
           <center> <h2>My Profile</h2></center>
            <div className="card p-4">
            <Divider />
            <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Admin Access: {user.isAdmin ? "Yes" : "No"}</h3>
            {user.isAdmin ? (
              <p>You already have admin access</p>
            ) : (
              <button onClick={req} className="btn btn-primary">
                Get Admin Access
              </button>
            )}
          </div>
        </TabPane>
        
        <TabPane tab="Bookings" key="2">
          
            <h2>My Bookings</h2>
            <Divider />
            <div className="mt-5 ml-3">
            <MyOrders/>
          </div>
        </TabPane>
        <TabPane tab="Bookings Download" key="3">
          
          <h2>My Bookings Download</h2>
          <Divider />
          <div className="mt-5 ml-3">
          <MyOrdersDownload />
        </div>
      </TabPane>
      
      </Tabs>
      </div>
        
    
    
  );
}

export default Profilescreen;


  export const MyOrders = () => {
    const [mybookings, setmybookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);
    useEffect(async () => {
      try {
        setloading(true);
        const data = await (
          await axios.post("/api/bookings/getuserbookings", {
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
          })
        ).data;
        setmybookings(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    }, []);
  
    async function cancelBooking(bookingid , roomid){
  
      
      try {
        setloading(true);
        const result = await axios.post('/api/bookings/cancelbooking' , {bookingid:bookingid , userid:user._id , roomid:roomid});
        setloading(false);
        Swal.fire('Congrats' , 'Your Room has cancelled succeessfully' , 'success').then(result=>{
          window.location.href='/profile'
      })
      } catch (error) {
        Swal.fire('Oops' , 'Something went wrong' , 'error').then(result=>{
          window.location.href='/profile'
      })
        setloading(false)
      }
  
    }
  
    return (
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          mybookings.map(booking=>{
            return <div className="row">
            <div className="col-md-6 my-auto">
              <div className='bs m-1 p-2'>
                <h1>{booking.room}</h1>
                <p>BookingId : {booking._id}</p>
                <p>TransactionId : {booking.transactionId}</p>
                <p><b>Check In : </b>{booking.fromdate}</p>
                <p><b>Check Out : </b>{booking.todate}</p>
                <p><b>Amount : </b> {booking.totalAmount}</p>
                <p><b>Status</b> : {booking.status =='booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                <div className='text-right'>
                {booking.status=='booked' && (<button className='btn btn-primary' onClick={()=>cancelBooking(booking._id , booking.roomid)}>Cancel Booking</button>)}
                </div>
              </div>
            </div>
          </div>
          })
        )}
      </div>
    );
  };
  export const MyOrdersDownload = () => {
    const [mybookings, setmybookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);
  
    useEffect(async () => {
      try {
        setloading(true);
        const data = await (
          await axios.post("/api/bookings/getuserbookings", {
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
          })
        ).data;
        setmybookings(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    }, []);
  
    async function cancelBooking(bookingid , roomid){
      try {
        setloading(true);
        const result = await axios.post('/api/bookings/cancelbooking' , {bookingid:bookingid , userid:user._id , roomid:roomid});
        setloading(false);
        Swal.fire('Congrats' , 'Your Room has cancelled succeessfully' , 'success').then(result=>{
          window.location.href='/profile'
      })
      } catch (error) {
        Swal.fire('Oops' , 'Something went wrong' , 'error').then(result=>{
          window.location.href='/profile'
      })
        setloading(false)
      }
    }
  
    const headers = [
      { label: 'Booking ID', key: '_id' },
      { label: 'Room Name', key: 'room' },
      { label: 'Total Amount', key: 'totalAmount' },
      { label: 'Status', key: 'status' },
    ];
  
    const data = mybookings.map((booking) => ({
     
      ...booking,
    }));
    
    return (
    <>
    {loading ? (
    <Loader />
    ) : error ? (
    <Error />
    ) : (
    <>
    {mybookings.length === 0 ? (
    <p>No Bookings Found</p>
    ) : (
    <>
    <CSVLink data={data} headers={headers} filename={"mybookings.csv"}>
    <Tag color="#108ee9" style={{ marginBottom: "10px" }}>
    Download Bookings
    </Tag>
    </CSVLink>
    <table className="table table-bordered table-responsive-sm">
    <thead className="thead-dark">
    <tr>
    <th scope="col">Booking ID</th>
    <th scope="col">Room Name</th>
    <th scope="col">Check-In Date</th>
    <th scope="col">Check-Out Date</th>
    <th scope="col">Total Amount</th>
    <th scope="col">Status</th>
    
    </tr>
    </thead>
    <tbody>
    {mybookings.map((booking) => (
    <tr key={booking._id}>
    <td>{booking._id}</td>
    <td>{booking.room}</td>
    <td>{new Date(booking.fromdate).toLocaleDateString()}</td>
    <td>{new Date(booking.todate).toLocaleDateString()}</td>
    <td>{booking.totalAmount}</td>
    <td>{booking.status}</td>
    <td>
    {booking.status === "Booked" && (
    <button
    className="btn btn-danger"
    onClick={() => cancelBooking(booking._id, booking.room._id)}
    >
    Cancel
    </button>
    )}
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    </>
    )}
    </>
    )}
    {success && <Success message="Booking cancelled successfully" />}
    </>
    );
    };
