const { formatDate, getCurrentFormattedTime, calculateTimeDifferenceInHours, calculatingTheNoPriority, totalTaskCount } = require("../functionality/itemFunctions");

exports.createItem = async (req, res, db) => {
    console.log("hii",req.body);
    
    const { title, start_time, end_time, priority, task_status, user_id } = req.body;
    
    try {
        const [result] = await db.execute(
            'INSERT INTO tasks (title, start_time, end_time, priority, task_status, user_id) VALUES (?, ?, ?, ?, ?, ?)',
            [title, start_time, end_time, priority, task_status, user_id]
        );
        res.status(201).json({ id: result.insertId, title, start_time, end_time, priority, task_status, user_id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getItems = async (req, res, db) => {
    try {
        // var rows = [];
        const [rows] = await db.execute('SELECT * FROM tasks');
        // console.log('testrow',rows);
        
        var currentTimeing = getCurrentFormattedTime();
      
        
        for (let i = 0; i < rows.length; i++) {
            rows[i].start_time = formatDate(rows[i].start_time);
            rows[i].end_time = formatDate(rows[i].end_time);
            
            rows[i].totalTime = calculateTimeDifferenceInHours(rows[i].start_time,rows[i].end_time);
           
            rows[i].timeSlaping = calculateTimeDifferenceInHours(rows[i].start_time,currentTimeing);
        };
        var noOfPriority = calculatingTheNoPriority(rows);
        // console.log('test1',rows);
        rows.push({PrioritySummery: noOfPriority});
        var totalCounts = totalTaskCount(rows);
        rows.push({countSummery: totalCounts});
        // console.log('test1',rows);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getItemById = async (req, res, db) => {
    const { id } = req.params;
    console.log('id',id);
    
    try {
        const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItem = async (req, res, db) => {
    
    const { id } = req.params;
    const { title, start_time, end_time, priority, task_status } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE tasks SET title = ?, start_time = ?, end_time = ?, priority = ?, task_status = ? WHERE id = ?',
            [title, start_time, end_time, priority, task_status, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
        res.json({ id, title, start_time, end_time, priority, task_status });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res, db) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Similarly, create update and delete handlers.
