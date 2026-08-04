import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [3, "Product name must be at least 3 characters long"],  
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        minlength: [10, "Product description must be at least 10 characters long"],
        maxlength: [1000, "Product description cannot exceed 1000 characters"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price must be a positive number"]
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Product stock must be a positive number"]
    },  
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required"]
    },
    images: [{
        type: String,
        trim: true
    }],
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;