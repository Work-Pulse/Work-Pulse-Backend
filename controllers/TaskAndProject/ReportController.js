// controllers/TaskAndProjectModels/ReportController.js
const Task = require("../../models/TaskAndProjectModels/TaskModel");

class ReportController {
  static async getTaskCompletionReport(req, res) {
    try {
      const { dateFilter = "all", priorityFilter = "All" } = req.query;

      // 1) Build base filter
      const filter = {};
      if (priorityFilter !== "All") {
        filter.priority = priorityFilter;
      }

      // 2) Compute cutoff date
      if (dateFilter !== "all") {
        const now = new Date();
        let cutoff = new Date(now);
        if (dateFilter === "lastWeek") cutoff.setDate(now.getDate() - 7);
        else if (dateFilter === "lastMonth") cutoff.setMonth(now.getMonth() - 1);
        else if (dateFilter === "lastYear") cutoff.setFullYear(now.getFullYear() - 1);

        // deadline is stored as "YYYY-MM-DD" so we can do a lexicographic compare
        const cutoffStr = cutoff.toISOString().slice(0,10); 
        filter.deadline = { $gte: cutoffStr };
      }

      // 3) Fetch counts
      const total = await Task.countDocuments(filter);
      const completedCount = await Task.countDocuments({ ...filter, completed: true });
      const pendingCount   = total - completedCount;

      // 4) Respond
      res.json({ total, completedCount, pendingCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = ReportController;
