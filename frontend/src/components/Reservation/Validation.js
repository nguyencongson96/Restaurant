export default function Validation(Info) {
  const { fullName, phone, date } = Info;
  //Lấy thông tin giờ đặt bàn, nếu date đặt bàn không có thì giờ đặt bàn tự động là 0
  const day = date === "" ? 0 : new Date(date),
    hour = date === "" ? 0 : new Date(date).getHours(),
    crDay = new Date();

  //Check user có điền đủ thông tin không
  if (fullName === "" || phone === "" || date === "")
    return {
      status: "error",
      message: "Full name, Phone Number and Date are required",
    };

  //Check user có điền đúng số điện thoại không
  if (phone.length <= 9)
    return { status: "warn", message: "Please recheck your phone number" };

  //Check ngày đặt bàn có trước ngày hôm nay hay không
  if (day < crDay) {
    return {
      status: "warn",
      message: "Please choose a different day in the future",
    };
  }

  //Check thời điểm đặt bàn với thời điểm hiện tại có gần nhau không
  if (day - crDay < 4 * 60 * 60 * 1000) {
    return {
      status: "warn",
      message: "We only receive booking order at least 4 hours from now",
    };
  }

  //Check thời điểm đặt bàn có cách xa so với thời điểm hiện tại không
  if (day - crDay > 3 * 24 * 60 * 60 * 1000) {
    return {
      status: "warn",
      message: "We only receive booking order up to 3 days from now ",
    };
  }

  //Check thời gian đặt bàn có chuẩn theo open time của nhà hàng không
  if (!(hour > 11 && hour < 14) || (hour > 18 && hour < 22))
    return {
      status: "warn",
      message:
        "We only open from 11:00 - 14:00 & 18:00 - 22:00. Please choose another time",
    };

  //Trường hợp pass hết các validation trên sẽ trả về true
  return { status: "success", message: "Booking successful" };
}
