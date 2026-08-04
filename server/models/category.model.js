import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        //give me a categories for the Moss decorations website
        enum: ["Moss Pot Decorations", "Moss Wall Art", "Moss Wreaths", "Moss Planters", "Moss Tabletop Decor", "Other Decorations"],
        required: [true, "Category name is required"],
        trim: true,
        minlength: [3, "Category name must be at least 3 characters long"],
        maxlength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        trim: true, 
        maxlength: [200, "Category description cannot exceed 200 characters"]
    }
}, {timestamps: true});

const Category = mongoose.model("Category", categorySchema);

export default Category;

