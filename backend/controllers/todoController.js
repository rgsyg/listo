import pool from "../config/db.js"

export const getTodos = async (req, res) => {
    const { user_id } = req.query
    try {
        const response = await pool.query("SELECT * FROM todo WHERE user_id=$1 ORDER BY id DESC", [user_id])
        res.status(200).json(response.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to update todos" });
    }
}

export const getTodo = async (req, res) => {
    const { id } = req.params
    const { user_id } = req.query
    try {
        const response = await pool.query(`SELECT * FROM todo WHERE id=$1 AND user_id=$2`, [id, user_id])
        if (response.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json(response.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to get todo" });
    }
}

export const createTodo = async (req, res) => {
    const { user_id, title, description, due_date, priority } = req.body
    const sanitizedDueDate = due_date === "" ? null : due_date;
    try {
        const response = await pool.query(`INSERT INTO todo (user_id, title, description, due_date, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_id, title, description, sanitizedDueDate, priority])

        res.status(201).json(response.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to create todo" });
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params
    const { user_id, title, description, status,
        due_date, archived, priority } = req.body

    try {
        const response = await pool.query("UPDATE todo SET title=$1, description=$2, status=$3, updated_at=CURRENT_TIMESTAMP, due_date=$4, archived=$5, priority=$6 WHERE id=$7 AND user_id=$8 RETURNING *", [title, description, status, due_date, archived, priority, id, user_id])

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
    const { id } = req.params
    const { user_id } = req.query
    try {
        const response = await pool.query("DELETE FROM todo WHERE id=$1 AND user_id=$2 RETURNING *", [id, user_id])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(204).json({ error: "Deleted successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}