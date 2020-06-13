module.exports.hexaFromColor = (color) =>
  color.hex() + Math.round(color.valpha * 255).toString(16);
