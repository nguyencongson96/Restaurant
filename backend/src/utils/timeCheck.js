import _throw from "#root/utils/throw.js";

const timeCheck = (value) => {
  if (!value.includes(":")) return _throw(400, 'Time format must be "hh:mm"');
  const [hour, minute] = value.split(":");
  if (!Number(hour) || hour < 0 || hour > 23) _throw(400, "Invalid Hour");
  if (minute !== "00" && (!Number(minute) || minute < 0 || minute > 59))
    _throw(400, "Invalid minute");
};

export default timeCheck;
