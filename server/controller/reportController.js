const Report = require("../models/reportDetails");

// add new reports
exports.reportSave = async (req, res) => {
    try {
        const newReport = new Report({
          wasteType,
          amount,
          address,
          price,
        });
        
        await newReport.save();
        res
          .status(201)
          .json({ message: "Report created successfully", customer: newReport });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// fetch all reports
exports.reportFetch = async (req, res) => {
    try {
        const reports = await Report.find();

        if (!reports) {
            return res.status(404).json({ message: "Reports not found" });
        }
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// delete report
exports.reportDelete = async (req, res) => {
    const { reportID } = req.params;

    try {
        const reportCheck = await Report.findOne({ _id: reportID });

        if (!reportCheck) {
            res.status(404).json({ message: "Report not found" });
        } else {
            const report = await Report.findByIdAndDelete({ _id: reportID });
            res.status(200).json({ message: "Report deleted successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}