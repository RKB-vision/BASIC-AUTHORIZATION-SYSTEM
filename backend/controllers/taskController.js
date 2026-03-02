const TaskModel = require("../models/tasks");

exports.getTasks = async (req, res) => {
    const userTask = await TaskModel.find({ owner: req.userId });
    res.json(userTask);
};

exports.createTask = async (req, res) => {
    let content = req.body.content;
    const NewTask = await TaskModel.create({ content: content, owner: req.userId });
    res.json(NewTask);
};

exports.deleteTask = async (req, res) => {
    let id = req.params.id;
    try {
        const deletedDoc = await TaskModel.findOneAndDelete({ _id: id });

        if (!deletedDoc) {
            console.log("No record found with that ID.");
            return res.status(404).json({ message: "No record found" });
        }

        console.log("Successfully deleted:", deletedDoc);
        res.json(deletedDoc);

    } catch (error) {
        console.error("Error deleting record:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateTask = async (req, res) => {
    let id = req.params.id;
    const newContent = req.body.content;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { content: newContent }, { new: true });
        console.log("Update successfull -DB");
        res.json(updatedTask);
    } catch (error) {
        console.log("Error updating data", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
