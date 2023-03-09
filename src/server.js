import express from "express"

import morgan from "morgan";
import cors from "cors";

import 'dotenv/config'
import connectDatabase from "./database/dbAdaptor";
import environment_modes from "./constants/mode";

import router from './routes'

const mode = process.env.NODE_ENV || environment_modes.DEVELOPMENT
const port = process.env.PORT || 3000

const getUri = () => {
    if (mode === environment_modes.DEVELOPMENT) {
        return process.env.DEV_DB
    } else if (mode === environment_modes.PRODUCTION) {
        return process.env.DB
    }
    return  process.env.TEST_DB
}
const server =  () => {

    const app = express()
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to my the API" });
    });
    app.use('/api/v1', router)

    connectDatabase(getUri(), {useNewUrlParser: true}).then(()=>{
        app.listen(port, ()=>{
            console.log("listening port", port)
        })
    }).catch(error=>{
        console.log(error)
    })

}

export default server