import "dotenv/config"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import todoRoutes from "./routes/todoRoutes.js"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/todos", todoRoutes)

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT)
})