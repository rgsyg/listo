import "dotenv/config"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import todoRoutes from "./routes/todoRoutes.js"
import cors from "cors"
import path from "path"

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/todos", todoRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT)
})