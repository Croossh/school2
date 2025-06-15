export const setFontBySpan = (str) => {
  return str.split("").map((item) => {
    return <span>{item}</span>;
  });
};

export const formatNumberWithComma = (num) => {
  if (num === 0 || !num) return "0";
  return num.toLocaleString("ko-KR");
};

export const DingButton = () => {
  const audio = new Audio("/sounds/ding.mp3");
  audio.play();
};
