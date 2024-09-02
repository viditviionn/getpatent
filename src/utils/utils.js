export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const colorCodes = [
  '#98A2B3', '#1D2939',
  '#D6BBFB', '#6941C6',
  '#FDA29B', '#D92D20',
  '#6CE9A6', '#12B76A', '#05603A', '#054F31',
  
];

// const colorCodes = [
//   '#FCFCFD', '#F9FAFB', '#F2F4F7', '#EAECF0', '#D0D5DD', '#98A2B3', '#667085', '#475467', '#344054', '#1D2939', '#101828',
//   '#F4F3FF', '#F9F5FF', '#EBE9FE', '#E9D7FE', '#D6BBFB', '#B692F6', '#9E77ED', '#7F56D9', '#6941C6', '#53389E', '#42307D',
//   '#FFFBFA', '#FEF3F2', '#FEE4E2', '#FECDCA', '#FDA29B', '#F97066', '#F04438', '#D92D20', '#B42318', '#912018', '#7A271A',
//   '#F6FEF9', '#ECFDF3', '#D1FADF', '#A6F4C5', '#6CE9A6', '#32D583', '#12B76A', '#039855', '#027A48', '#05603A', '#054F31'
// ];
