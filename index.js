const express = require("express");

const SERVER_PORT = 5500

const app = express()

app.listen(SERVER_PORT, () => {
    console.log(`Server UP na porta ${SERVER_PORT}`)
})