import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import convert from "#root/utils/convert.js";
import Location from "#root/model/location.model.js";
import mongoose from "mongoose";

const handleLocation = {
  // Define a method called getAll that retrieves all locations from the database and returns them as an array of objects
  getAll: asyncWrapper(async (req, res) => {
    //Get Infor and all Location
    const allLocation = await Location.find().lean();

    // Reduce over the array of locations and return an object for each location that includes its ID and formatted address
    const list = allLocation.reduce((obj, { _id, cityId, districtId, detail }) => {
      // Get the name of the city and district using their IDs
      const { cityName, districtName } = convert.location.fromId(cityId, districtId); // Return an object with the location ID as its key and the formatted address as its value
      return {
        ...obj,
        [_id]: `${detail}, ${districtName}, ${cityName}`,
      };
    }, {});

    // Return a JSON response with a status code of 200 and the array of location objects as its body
    return res.status(200).json(list);
  }),

  // Define a method called addNew that adds a new location to the database
  addNew: asyncWrapper(async (req, res) => {
    const { city, district, detail } = req.body;

    //Convert from city, district name to city, district Id
    const { cityId, districtId } = convert.location.toId(city, district);

    // Create a new location
    const newLocation = await Location.create({ cityId, districtId, detail });

    // Return the new location
    res.status(201).json(newLocation);
  }),

  // Define a method called update that update location to the database
  update: asyncWrapper(async (req, res) => {
    const { locationId, city, district, detail } = req.body;

    // Check if the location ID is valid
    !mongoose.Types.ObjectId.isValid(locationId) && _throw(400, "Invalid Location Id");

    //Convert from city, district name to city, district Id
    const { cityId, districtId } = convert.location.toId(city, district);

    // Update the info with the new data
    const updateLocation = await Location.findByIdAndUpdate(
      locationId,
      { cityId, districtId, detail },
      { new: true, runValidators: true }
    );
    // If the location is not found, throw an error with a status code of 404 and a message indicating that it was not found
    !updateLocation && _throw(404, "Location not found");

    // Return the updated location
    res.status(200).json(result);
  }),

  // Define a method called delete that delete location from the database
  delete: asyncWrapper(async (req, res) => {
    const { id } = req.body;

    // Check if the location ID is valid
    !mongoose.Types.ObjectId.isValid(id) && _throw(400, "Invalid Location Id");

    // Delete the location with the given ID
    const deleteLocation = await Location.findByIdAndDelete(id);

    // If the location is not found, throw an error with a status code of 404 and a message indicating that it was not found
    !deleteLocation && _throw(404, "Location not found");

    // Return the deleted location
    res.status(200).json(deleteLocation);
  }),
};

export default handleLocation;
