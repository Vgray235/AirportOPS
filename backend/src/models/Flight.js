
// import mongoose from 'mongoose';

// const flightSchema = new mongoose.Schema({
//   flightNo: { type: String, unique: true, index: true },
//   airlineCode: String,
//   origin:String,
//   destination:String,
//   gate:String,
//   scheduledDep:Date,
//   scheduledArr:Date,
//   status: { type: String, enum: ['scheduled','boarding','departed','arrived','delayed','cancelled'], default: 'scheduled' },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// }, { timestamps: true });

// export default mongoose.model('Flight', flightSchema);
import mongoose from 'mongoose';
import Baggage from './Baggage.js'; // <--- note .js extension

const flightSchema = new mongoose.Schema({
  flightNo: { type: String, unique: true, index: true },
  airlineCode: String,
  origin: String,
  destination: String,
  gate: String,
  scheduledDep: Date,
  scheduledArr: Date,
  status: { type: String, enum: ['scheduled','boarding','departed','arrived','delayed','cancelled'], default: 'scheduled' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Cascade delete baggage when a flight is deleted
flightSchema.pre('remove', async function(next) {
  try {
    await Baggage.deleteMany({ flightId: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model('Flight', flightSchema);
