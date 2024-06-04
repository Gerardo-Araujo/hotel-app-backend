const Hotel = require('./Hotel');
const City = require('./City');
const Image = require('./Image');
const Booking = require('./Booking');
const User = require('./User');
const Review = require('./Review');

 Hotel.belongsTo(City);
 City.hasMany(Hotel);
 
 Hotel.hasMany(Image);
 Image.belongsTo(Hotel);

 Booking.belongsTo(User);
 User.hasMany(Booking);

 Booking.belongsTo(Hotel);
 Hotel.hasMany(Booking);

 Review.belongsTo(User);
 User.hasMany(Review);

 Review.belongsTo(Hotel);
 Hotel.hasMany(Review);