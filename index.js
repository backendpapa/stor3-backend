const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express()

const helloRoute = require('./routes/mainRoute.js')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: '500mb' }))

app.use('/', helloRoute)





app.listen(port, () => {
    console.log(`Server started`)
    console.log(`Running on port ${port}`)
    console.log(`CTRL+C to stop server`)
})
