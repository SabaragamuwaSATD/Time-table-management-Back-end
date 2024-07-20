import mongoose from "mongoose";
import bcrypt from "bcrypt"


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [false, "Please enter a username"],
      unique: true,  
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: {
            /**
             * Validates if the given value is a valid email address.
             *
             * @param {string} value - The value to validate.
             * @return {boolean} True if the value is a valid email address, false otherwise.
             */
            validator: function(value) {
              // Regular expression to validate email addresses.
              // It checks if the value contains at least one non-whitespace character, followed by an "@" symbol,
              // then at least one non-whitespace character, and finally a dot and at least one non-whitespace character.
              return /\S+@\S+\.\S+/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
          }
    },
    password: {
        type: String,
        required: [true, "Please enter an email"],
        minlength: [6, "Minimum password length is 6 characters"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isLecturer: {
        type: Boolean,
        default: false
    },
    isInstructor: {
        type: Boolean,
        default: false
    },
    isStudent: {
        type: Boolean,
        default: true,
    },
    enrolledCourses: [{
       
        courseId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        progress:{
            type:String,
            default: 0,
        },
        status:{
            type:String,
            default: "Incomplete",
        },
        enrolledAt:{
            type: Date,
            default: Date.now,
        },
        modifiedAt:{
            type: Date,
            default: Date.now,
        }
    }]
},
    {
        timestamps: true
    },
);


//hash password before user save to db
UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}

const User = mongoose.model("user", UserSchema)
export default User 