const formatPhone = (req, res, next) => {
  const phone = req.body.phone || req.query.phone;
  phone && phone.startsWith(0) && (req.phone = `+84${phone.slice(1)}`);
  next();
};

export default formatPhone;
