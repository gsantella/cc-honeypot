import express,{Request,Response} from "express";
import * as UserRepository from '../../repositories/v2/UserRepository.js'
const router = express.Router({ mergeParams: true })


router.use(express.json())

router.get("/", async (req: Request, res: Response) => {
    try{    //gets all users? why would we need this?
    res.json(await UserRepository.findUsers())
    } catch(error) {console.error(error)}
    
})
router.get("/:uuid", async (req: Request, res: Response) => {
    try{    // Gets a user by ID
        res.json(await UserRepository.findUserById(req.params.uuid))
    } catch(error) {console.error(error)} 
})
router.post("/", async (req: Request, res: Response) => {
    try{    //Creates user
        const user = await UserRepository.createUser(req.body)
        res.status(201).json(user)
    } catch(error:any) {
        if (error.message.includes("Invalid argument")) {
            res.status(400).json({ error: error.message })
        }
        res.status(500).json({message:"Internal Server Error"})
        console.error(error) // will never run until our data becomes more complex.
    }
})
router.delete("/:uuid", (req: Request, res: Response) => {
    try{    // Deletes user
        let x = UserRepository.deleteUser(req.params.uuid)
        res.json({message: x})
    } catch(error) {console.error(error)}
})
router.patch("/:uuid", (req: Request, res: Response) => {
    try{    // updates user information
        
    } catch(error) {console.error(error)}
})

export default router