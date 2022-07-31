import Shipping from "../models/Shipping.js";

export const createShipping = async (req, res, next) => {
  const newShipping = new Shipping(req.body);

  try {
    const savedShipping = await newShipping.save();
    res.status(200).json(savedShipping);
  } catch (err) {
    next(err);
  }
};
export const updateShipping = async (req, res, next) => {
  try {
    const updatedShipping = await Shipping.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedShipping);
  } catch (err) {
    next(err);
  }
};
export const deleteShipping = async (req, res, next) => {
  try {
    await Shipping.findByIdAndDelete(req.params.id);
    res.status(200).json("Shipping Deleted");
  } catch (err) {
    next(err);
  }
};

export const getShipping = async (req, res, next) => {
  try {
    const shipping = await Shipping.findById(req.params.id);
    res.status(200).json(shipping);
  } catch (err) {
    next(err);
  }
};
export const getAllShipping = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const shippings = await Shipping.find({
      ...others,
      requestDate: { $gte: min || 0, $lte: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(shippings);
  } catch (err) {
    next(err);
  }
};
// export const getAllRequest = async (req, res, next) => {
//   try {
//     const requests = await Request.find();
//     res.status(200).json(requests);
//   } catch (err) {
//     next(err);
//   }
// }
//   const { min, max, ...others } = req.query;
//   try {
//     const hotels = await Hotel.find({
//       ...others,
//       cheapestPrice: { $gt: min | 1, $lt: max || 999 },
//     }).limit(req.query.limit);
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }

// export const countByCity = async (req, res, next) => {
//   const cities = req.query.cities.split(",");
//   try {
//     const list = await Promise.all(
//       cities.map((city) => {
//         return Hotel.countDocuments({ city: city });
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };
// export const countByType = async (req, res, next) => {
//   try {
//     const hotelCount = await Hotel.countDocuments({ type: "hotel" });
//     const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
//     const resortCount = await Hotel.countDocuments({ type: "resort" });
//     const villaCount = await Hotel.countDocuments({ type: "villa" });
//     const cabinCount = await Hotel.countDocuments({ type: "cabin" });

//     res.status(200).json([
//       { type: "hotel", count: hotelCount },
//       { type: "apartments", count: apartmentCount },
//       { type: "resorts", count: resortCount },
//       { type: "villas", count: villaCount },
//       { type: "cabins", count: cabinCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getHotelRooms = async (req, res, next) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     const list = await Promise.all(
//       hotel.rooms.map((room) => {
//         return Room.findById(room);
//       })
//     );
//     res.status(200).json(list)
//   } catch (err) {
//     next(err);
//   }
// };
