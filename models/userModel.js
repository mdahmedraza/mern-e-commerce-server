const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique: true,
        teim: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please add a password'],
        minLength: [6, "password must be up to 6 characters"]
    },
    role: {
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer", "admin"]
    },
    photo: {
        type: String,
        required: [true, "please add a photo"],
        default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20191110%2Fourmid%2Fpngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg&tbnid=oi_Go1ieNFYJRM&vet=12ahUKEwiB_YTr-NKCAxURTGwGHRLLB8wQMygAegQIARBu..i&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Fprofile-icon&docid=_39XTgMKwHFqSM&w=360&h=360&q=profile%20logo&ved=2ahUKEwiB_YTr-NKCAxURTGwGHRLLB8wQMygAegQIARBu"
        
    },
    phone: {
        type: String,
        default: "+234",
    },
    address: {
        type: Object
    }
},{
    timestamps: true,
})

// encrypt password before saving to db
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

const User = mongoose.model("User", userSchema);
module.exports = User;