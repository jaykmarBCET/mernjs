// db.js
import mongoose from"mongoose"

const connectDB = async () => {
  try {
   
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000, 
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // exit process on failure
  }
};


export  {connectDB}
