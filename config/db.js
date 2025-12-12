const mongoose = require('mongoose');


const connectDB = async () => {
try {
const conn = await mongoose.connect(process.env.DATABASE_URL, {
// options are set automatically in mongoose >=6

});
console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
};


module.exports = connectDB;