import express,{Request,Response} from "express";

const router = express.Router({ mergeParams: true })

router.use(express.json())

router.get("/user/", (req: Request, res: Response) => {
    res.json({message: {users: {"userID":"content"}}})
    //gets all users? why would we need this?
})

router.get("/user/:uuid", (req: Request, res: Response) => {
    res.json({message: {"userID":"content"}})
    // Gets a user by ID
})
router.post("/user", (req: Request, res: Response) => {
    res.json({message: `Created user UserID`})
    //Creates user
})
router.delete("/user/:uuid", (req: Request, res: Response) => {
    res.json({message: `Deleted user UserID`})
// Deletes user
})
router.patch("/user/:uuid", (req: Request, res: Response) => {
    res.json({message: `updated user UserID`})
// updates user information
})






  
export default router