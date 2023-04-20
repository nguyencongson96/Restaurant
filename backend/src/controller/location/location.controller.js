import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import configLocation from "#root/config/location.config.js";
import Location from "#root/model/location.model.js";
import mongoose from "mongoose";

const handleLocation = {
  // Define a method called getAll that retrieves all locations from the database and returns them as an array of objects
  getAll: asyncWrapper(async (req, res) => {
    const all = await Location.find(),
      { city, district } = configLocation;

    // Reduce over the array of locations and return an object for each location that includes its ID and formatted address
    const list = all.reduce((obj, { _id, cityId, districtId, detail }) => {
      // Get the name of the city and district using their IDs
      const cityName = city[cityId],
        districtName = district[districtId];
      // Return an object with the location ID as its key and the formatted address as its value
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

    // Get the city ID from the configLocation
    const configCity = configLocation.city,
      foundCityId = Object.keys(configCity).find((key) => city.includes(configCity[key]));
    //Throw an error if cannot find the city
    !foundCityId && _throw(400, "Invalid city name");

    // Get the district ID from the configLocation
    const configDistrict = configLocation.district,
      foundDistrictId = Object.keys(configDistrict).find((key) => district.includes(configDistrict[key]));

    //Throw an error if cannot find the proper district
    !foundDistrictId && _throw(400, "Invalid district name");
    //Throw an error if found district does not belong to found city
    foundCityId.toString() !== foundDistrictId.slice(0, 2) && _throw(400, `${district} is not in ${city}`);

    // Create a new location
    const newLocation = await Location.create({ cityId: foundCityId, districtId: foundDistrictId, detail });
    // Return the new location
    res.status(201).json(newLocation);
  }),
  // Define a method called update that update location to the database
  update: asyncWrapper(async (req, res) => {
    const { id, cityId, districtId, detail } = req.body;

    // Check if the location ID is valid
    !mongoose.Types.ObjectId.isValid(id) && _throw(400, "Invalid Location Id");

    // Check if the city ID matches the first two digits of the district ID; if not, throw an error with a status code of 400 and a message indicating that they don't match
    cityId.toString() !== districtId.slice(0, 2) && _throw(400, "city and district are not matched");

    // Update the location with the new data
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      {
        cityId,
        districtId,
        detail,
      },
      { returnDocument: "after", runValidators: true }
    );

    // If the location is not found, throw an error with a status code of 404 and a message indicating that it was not found
    !updatedLocation && _throw(404, "Location not found");
    // Return the updated location
    res.status(200).json(updatedLocation);
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
