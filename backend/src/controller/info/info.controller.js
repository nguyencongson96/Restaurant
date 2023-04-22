import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Info from "#root/model/info.model.js";

const handleInfo = {
  // Define a method called getAll that retrieves all locations from the database and returns them as an array of objects
  getAll: asyncWrapper(async (req, res) => {
    //Get Infor and all Location
    const allInfo = await Info.findOne({}, { _id: 0 }).lean();

    //Throw and error if there is no infor
    !allInfo && _throw(404, "No info");

    // Return a JSON response with a status code of 200 and the array of location objects as its body
    return res.status(200).json(allInfo);
  }),

  // Define a method called update that update location to the database
  update: asyncWrapper(async (req, res) => {
    const foundInfo = await Info.findOne();
    // If the info is not found, throw an error with a status code of 404 and a message indicating that it was not found
    !foundInfo && _throw(404, "Infor not found");

    //Config field used to update
    const updateField = ["name", "phone", "email", "timeId"];

    //Update each field to foundInfo
    updateField.forEach((field) => {
      const value = req.body[field];
      switch (field) {
        //If field to update is timeId, then update open and close time
        case "timeId":
          //Config open and close time based on req.body
          const { open, close } = req.body;
          //Find index of time need to update based on timeId of req.body
          const foundIndex = foundInfo.time.findIndex((item) => item._id.toString() === value);
          //Update open and close time
          foundInfo.time[foundIndex] = { open, close };
          break;

        //If field to update is not timeId, then update directly value of this field based on value in req.body
        default:
          foundInfo[field] = value;
          break;
      }
    });
    await foundInfo.save();

    // Return the updated location
    res.status(200).json(foundInfo);
  }),
};

export default handleInfo;