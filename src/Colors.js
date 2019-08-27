import colors from 'vuetify/es5/util/colors';

const selectColorByNumber = (id) => {
  const colorArray = [
    colors.amber.darken2,
    colors.blue.base,
    colors.teal.base,
    colors.deepOrange.base,
    colors.deepPurple.base,
  ];
  return colorArray[id % colorArray.length];
};

export { selectColorByNumber };
export default colors;
