import pool from "../config/db.js"

export const getTodos = async (req, res) => {
    const { user_id } = req.query
    try {
        const response = await pool.query("SELECT * FROM todo WHERE user_id=$1", [user_id])
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
        const { user_id, title, description, due_date, priority } = req.body
        const sanitizedDueDate = due_date === "" ? null : due_date;

        const response = await pool.query(`INSERT INTO todo (user_id, title, description, due_date, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_id, title, description, sanitizedDueDate, priority])

        res.status(201).json(response.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to create todo" });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { user_id, title, description, is_completed,
            due_date, archived, priority } = req.body
        const updated_at = new Date().toISOString()

        const response = await pool.query("UPDATE todo SET title=$1, description=$2, is_completed=$3, updated_at=$4, due_date=$5, archived=$6, priority=$7 WHERE id=$8 AND user_id=$9 RETURNING *", [title, description, is_completed, updated_at, due_date, archived, priority, id, user_id])

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
        const { user_id } = req.body

        const response = await pool.query("DELETE FROM todo WHERE id=$1 AND user_id=$2", [id, user_id])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(204).json({ error: "Deleted successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}