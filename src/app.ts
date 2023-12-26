import express, {Request, Response, NextFunction} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { apiRoutes } from "./routes/api-route"
import { connectDB } from "./config/connectDB";

dotenv.config()

if(!process.env.PORT){
    console.log("No port value specified...")
}

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())

// connect to DB
connectDB()

app.use("/api", apiRoutes);

// middleware cuoi cung xu ly error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})