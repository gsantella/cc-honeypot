import express,{Request,Response} from "express";
import * as UserRepository from '../../repositories/v2/UserRepository.js'
const router = express.Router({ mergeParams: true })


router.use(express.json())

router.get("/", async (req: Request, res: Response) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(await UserRepository.findUsers())
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
router.get("/:uuid", async (req: Request, res: Response) => {
    try {    // Gets a user by ID
        const user = await UserRepository.findUserById(req.params.uuid)
        res.status(200).json(user)
    } catch(error:any) {
        console.error(error)
        if (error.message.includes("ID Not Found")) {
            res.status(400).json({error: error.message})
        } else {
            res.status(500).json({message:"Internal Server Error"})
        }
    } 
})

router.post("/", async (req: Request, res: Response) => {
    try {    //Creates user
        const user = await UserRepository.createUser(req.body)
        res.status(201).json(user)
    } catch(error:any) {
        console.error(error)
        if (error.message.includes("Invalid argument")) {
            res.status(400).json({ error: error.message })
        } else{
            res.status(500).json({error:error.message})
            // will never run until our data becomes more complex.
        }   
    }
})

router.delete("/:uuid", async (req: Request, res: Response) => {
    try {    // Deletes user
       const user = await UserRepository.deleteUser(req.params.uuid)
       res.status(201).json({deleted:user})
    } catch(error:any) {
        console.error(error)
        if (error.message.includes("Invalid argument")) {
            res.status(400).json({ error: error.message })
        }
        if (error.message.includes("ID Not Found")) {
            res.status(400).json({error: error.message})
        } else {
            res.status(500).json({message:"Internal Server Error"})
        }
    }
        
})
router.patch("/:uuid", async (req: Request, res: Response) => {
    try {    // updates user information
        const result = await UserRepository.changeUser(req.params.uuid, req.body)
        res.status(200).json(result)
    } catch(error:any) {
        console.error(error)
        if (error.message.includes("ID Not Found")) {
            res.status(400).json({error: error.message})
        } else {
            res.status(500).json({message:"Internal Server Error"})
        }
    }
    
})

export default router