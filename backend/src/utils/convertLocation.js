import configLocation from "#root/config/location.config.js";
import _throw from "#root/utils/throw.js";

const convertLocation = {
  toId: (city, district) => {
    // Get the city ID from the configLocation
    const configCity = configLocation.city,
      cityId = Object.keys(configCity).find((key) => city === configCity[key]);
    //Throw an error if cannot find the city
    if (!cityId) return _throw(400, "Invalid city name");

    // Get the district ID from the configLocation
    const configDistrict = configLocation.district,
      districtId = Object.keys(configDistrict).find((key) => district === configDistrict[key]);
    //Throw an error if cannot find the proper district
    if (!districtId) return _throw(400, "Invalid district name");

    //Throw an error if found district does not belong to found city
    if (foundCityId.toString() !== foundDistrictId.slice(0, 2))
      return _throw(400, `${district} is not in ${city}`);

    //Return result if no error found
    return { cityId, districtId };
  },
  fromId: (cityId, districtId) => {
    const { city, district } = configLocation;

    //Get city name
    const cityName = city[cityId];
    if (!cityName) return _throw(400, "Invalid cityId");

    //Get district name
    const districtName = district[districtId];
    if (!districtName) return _throw(400, "Invalid districtId");

    return { cityName, districtName };
  },
};

export default convertLocation;
