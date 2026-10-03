import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 500
    },
    images: {
        type: [{
            type: String,
        }],
        validate: {
            validator: images => images.length <= 5,
            massage: "You can upload a maximum of 5 images"
        }
    },
    price: {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            enum: ["USD", "INR"],
            default: "INR"
        }
    },

    sizes: [
        {
            size: {
                type: String,
                enum: ["S", "M", "L", "XL", "XXL"],
                required: true
            },
            stock: {
                type: Number,
                min: 0,
                default: 0
            }
        }
    ],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

const productModel = mongoose.model("product", productSchema);

export default productModel;