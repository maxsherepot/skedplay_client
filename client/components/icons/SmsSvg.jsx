import PropTypes from "prop-types";

export default function SmsSvg({ fill }) {
  return (
    <svg
      width="36"
      height="15"
      viewBox="0 0 36 15"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
    >
      <rect width="36" height="15" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0"
            transform="translate(0 -0.00232558) scale(0.0232558 0.055814)"
          />
        </pattern>
        <image
          id="image0"
          width="43"
          height="18"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAASCAYAAADCKCelAAADsElEQVRIia1Wa0hUQRT+dl1E1MrMMrNSE5M2id4FJm1PiBISirKy/i1FQdCPIIp2J/vTn+gBRUGBRVAU9oaiUkSt7AUK+kPJtf7kY/NRa/naJr7bvde7m3fbCx0Y7syZM+f77sw5M8cmpYRBnAC2AlgLYIWqfg+gBsBtALUG23wABYZxddi8mR39VQshBjjweDwRMYUQoz5JVm0lUsoRGVkeSCnTpZRPTKxKDP7Y8k3smqWUcVYwvV4vHCrnEgDX2Kn80IWK+q941NCrTKzITsT6BZOwZtEUxMfFFAJIBbDU3zuIV43d+k8X5qdB82Gz2a5LKbljVRw/rP2i22WnJ8CZOT5H3U0rmMtsqtMGADGXH/pwsaJjjJMEUhMduLR/DjKmJijjprZv2Hm2SZ/ftzoV7sIsdoMA5gO4wp8ikUPXP+p2J7ZkaD8WtIi52K7GSgydmi2i5KTGYXJSnOk819IHfWlEP7X349TdT2ZLrGL6HFrwv2/pCzG87J6NJXOSQcCnbzuxa91MHgmnbgLYPpZz7uC9afHciaU/BoI4WtaCjsCIKRkrmEKIbruZo/buQeXLI+DxGoheNUUHFIIkeuG+D43tA5FMo8YUQhSzE+P1ehlAGwaHgnja0KMvrGzqQ029H/6en0iZEIukxFiq8wA8A1DU1TuI8rou3Z5J8blnCF2BETyu68Sr1oCiZ9xlJscqesoqZxJyZ45T+tFiulyu1qqqqgaS/Q5gb1Zagn2CQ6K25bu+mADvfP24WdsJ+/AwFuVOpLpImQsje86di8r6bvQP/VKaJqXbstAbGEZzx0A42aAVTJfL9ZxhwJTeTE3x2hm4cdCpZDZ3xChMBOMVFC48utIds0K0hzemY9XCyWZLjlnEdGsxq5+FM3O8Ei9PShfjdEl2yOJbNeaZS2FykCBl07wkhUg0EiVmgV19YvXLm/enJtyVuVNHr6toEoYEuUtHinP+ZXrSImYW992t3XnH7/y5E3cuT0Hu9AS8ae4LIUh9NKI+DpQXANaYLLGKWePQiofyl6NHfOO1H4A/xDPjaevKtGi47lbvbhY2eyIZWsS8bVerG5w/kKc8heFBTuGxGJ69N5EIsC6w2Wxufv/1V1YwhRDntOrojLHMafT16a3tS8A4VadWXc0mFVK1EVBK6YlQTVnCZNUVXs6xHOsZw3GrlLJMShmv2uaRWDhRVW/0qRE22rKfT/BoMWnLFl58U5iKxmKZdSCL4f8qQgjdn8fj+QtTCBGKCeA3j2VYZ9dOFM8AAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}

SmsSvg.propTypes = {
  fill: PropTypes.string
};

SmsSvg.defaultProps = {
  fill: "none"
};
