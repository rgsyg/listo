import pool from "../config/db.js"

export const getTodos = async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM todo")
        res.status(200).json(response.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to update todos" });
    }
}

export const getTodo = async (req, res) => {
    try {
        const { id } = await req.params
        const response = await pool.query(`SELECT * FROM todo WHERE id=${id}`)
        res.status(200).json(response.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to get todo" });
    }
}

export const createTodo = async (req, res) => {
    try {
        const { userID, title, description, isCompleted,
            updatedAt, dueDate, archived, priority } = req.body

        const response = await pool.query(`INSERT INTO todo (user_id, title, description, is_completed, updated_at, due_date, archived, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [userID, title, description, isCompleted, updatedAt, dueDate, archived, priority])

        res.status(201).json(response.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to create todo" });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { userID, title, description, isCompleted,
            dueDate, archived, priority } = req.body
        const updatedAt = new Date().toISOString()

        const response = await pool.query("UPDATE todo SET title=$1, description=$2, is_completed=$3, updated_at=$4, due_date=$5, archived=$6, priority=$7 WHERE id=$8 AND user_id=$9 RETURNING *", [title, description, isCompleted, updatedAt, dueDate, archived, priority, id, userID])

        if (response.rows.length === 0) {
            return res.status(304).json({ error: "No change" });
        }

        res.status(200).json(response.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to update todo" });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { userID } = req.body

        const response = await pool.query("DELETE FROM todo WHERE id=$1 AND user_id=$2", [id, userID])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(204).json({ error: "Deleted successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}