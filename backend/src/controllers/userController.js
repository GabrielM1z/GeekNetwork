const pool = require('../config/dbPostgres');

exports.getUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users LIMIT 10');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
