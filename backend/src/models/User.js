import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            lowerCase:true,
            trim:true,
        },
       email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        role:{
            type:String,
            enum:["admin","airline","baggage"],
            default:"airline",
        },
    },
    {timestamps:true}
);

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    try{
        const salt =await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }
    catch(err){
        next(err);
    }
});
UserSchema.methods.comparePassword=async function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
};

const User=mongoose.model("User",UserSchema);
export default User; 