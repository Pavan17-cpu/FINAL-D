const express = require('express')

const app = express()
const db = require('./db')
app.use(express.json())
const path = require('path')


// Import routes
const roomsRoute = require('./routes/roomsRoute')
const userRoute = require('./routes/userRoute')
const bookingsRoute = require('./routes/bookingsRoute')

// Use routes
app.use('/api/rooms', roomsRoute)
app.use('/api/users', userRoute)
app.use('/api/bookings', bookingsRoute)

// Serve static files for production
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Node JS Server Started`))
