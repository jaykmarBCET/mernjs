import mongoose  from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    maxLength:50,
  },
  email: {
    type:String,
    required:true,
    maxLength:50,
    
  }
});

export default mongoose.model("User", userSchema);
