export const play = (pathname, node, appears) => {
  const delay = appears ? 0 : 0.5;
  let timeline;

  if (pathname === "/") timeline = getHomeTimeline(node, delay);
  else timeline = getDefaultTimeline(node, delay);

  timeline.play();
};
