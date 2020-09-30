export default function TransSvg({ color = "#FF3366", style }) {
  return (
  <svg xmlns="http://www.w3.org/2000/svg"width="20pt" height="20pt" viewBox="0 0 20 20" version="1.1" style={style || {}}>
  <g id="surface1">
  <path fill={`${color}`} d="M 15.3125 0.9375 L 15.3125 2.1875 L 16.875 2.1875 L 13.152344 5.910156 C 12.320312 5.148438 11.214844 4.6875 10 4.6875 C 8.785156 4.6875 7.679688 5.148438 6.847656 5.910156 L 5.78125 4.84375 L 6.5625 4.0625 L 5.625 3.125 L 4.84375 3.90625 L 3.125 2.1875 L 4.6875 2.1875 L 4.6875 0.9375 L 0.9375 0.9375 L 0.9375 4.6875 L 2.1875 4.6875 L 2.1875 3.125 L 3.90625 4.84375 L 3.125 5.625 L 4.0625 6.5625 L 4.84375 5.78125 L 5.996094 6.933594 C 5.5625 7.644531 5.3125 8.480469 5.3125 9.375 C 5.3125 11.75 7.082031 13.714844 9.375 14.019531 L 9.375 16.25 L 8.125 16.25 L 8.125 17.5 L 9.375 17.5 L 9.375 19.0625 L 10.625 19.0625 L 10.625 17.5 L 11.875 17.5 L 11.875 16.25 L 10.625 16.25 L 10.625 14.019531 C 12.917969 13.714844 14.6875 11.75 14.6875 9.375 C 14.6875 8.480469 14.4375 7.644531 14.003906 6.933594 L 17.8125 3.125 L 17.8125 4.6875 L 19.0625 4.6875 L 19.0625 0.9375 Z M 10 12.5 C 8.273438 12.5 6.875 11.101562 6.875 9.375 C 6.875 7.648438 8.273438 6.25 10 6.25 C 11.726562 6.25 13.125 7.648438 13.125 9.375 C 13.125 11.101562 11.726562 12.5 10 12.5 Z M 10 12.5 "/>
  </g>
  </svg>
  );
}