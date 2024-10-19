const Report = require("../models/reportDetails");
const Schedule = require("../models/collectionDetails")

// add new reports
exports.reportSave = async (req, res) => {
    try {
        const { mostusedType, mostusedTypeWeight, leastusedType, leastusedTypeWeight, amount, income } = req.body;
        if (!mostusedType || !mostusedTypeWeight || !leastusedType || !leastusedTypeWeight || !amount || !income) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newReport = new Report({
            mostusedType,
            mostusedTypeWeight,
            leastusedType,
            leastusedTypeWeight,
            amount,
            income,
        });

        await newReport.save();
        res.status(201).json({ message: "Report created successfully", report: newReport });
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

// generate report
exports.generateAndSaveReport = async (req, res) => {
    try {
        const schedules = await Schedule.find(); 

        const wasteTypeCount = {};
        let totalIncome = 0;
        let totalAmount = 0;

        schedules.forEach(customer => {
            customer.schedules.forEach(schedule => {
                if (!wasteTypeCount[schedule.wasteType]) {
                    wasteTypeCount[schedule.wasteType] = 0;
                }
                wasteTypeCount[schedule.wasteType] += parseInt(schedule.amount);

                totalAmount += parseInt(schedule.amount);
                totalIncome += parseInt(schedule.price) * parseInt(schedule.amount);
            });
        });

        const wasteTypes = Object.keys(wasteTypeCount);
        const mostusedType = wasteTypes.reduce((a, b) => wasteTypeCount[a] > wasteTypeCount[b] ? a : b);
        const leastusedType = wasteTypes.reduce((a, b) => wasteTypeCount[a] < wasteTypeCount[b] ? a : b);

        const mostusedTypeWeight = wasteTypeCount[mostusedType];
        const leastusedTypeWeight = wasteTypeCount[leastusedType];

        const reportData = {
            mostusedType,
            mostusedTypeWeight,
            leastusedType,
            leastusedTypeWeight,
            amount: totalAmount,
            income: totalIncome,
        };

        const newReport = new Report(reportData);
        await newReport.save();
        res.status(201).json({ message: "Report created successfully", report: newReport });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};