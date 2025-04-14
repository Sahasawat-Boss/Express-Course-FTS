import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    // res.send('Hello from Express!')
    res.json({
        name: "Boss",
        age: "25",
        position: "Nuxt-Dev",
        location: "CNX",
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
