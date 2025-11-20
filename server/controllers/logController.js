const Log = require('../models/log');

const getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const total = await Log.countDocuments();
    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      logs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalLogs: total
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: error.message || 'Server error while fetching logs' });
  }
};

module.exports = { getLogs}