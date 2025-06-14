import express from "express"
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todoController.js"

const router = express.Router()

router.get("/", getTodos)
router.get("/:id", getTodo)
router.post("/", createTodo)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)

export default router