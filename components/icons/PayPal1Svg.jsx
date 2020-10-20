const PayPal1Svg = ({color}) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.6066 4.39348C22.7735 1.56023 19.0066 0 15 0C10.9934 0 7.22654 1.56023 4.39342 4.39348C1.56023 7.22654 0 10.9934 0 15C0 19.0066 1.56023 22.7735 4.39342 25.6065C7.22654 28.4398 10.9934 30 15 30C19.0066 30 22.7735 28.4398 25.6066 25.6066C28.4397 22.7734 30 19.0066 30 15C30 10.9934 28.4398 7.22654 25.6066 4.39348ZM15 29.0527C7.25133 29.0527 0.947344 22.7487 0.947344 15C0.947344 7.25133 7.25133 0.947344 15 0.947344C22.7487 0.947344 29.0527 7.25133 29.0527 15C29.0527 22.7487 22.7487 29.0527 15 29.0527Z" fill={color}/>
      <path d="M22.0162 10.9506C21.4289 10.271 20.6438 9.79535 19.7787 9.58928C19.3313 7.71428 17.6416 6.31582 15.6315 6.31582H11.6099C10.7817 6.31582 10.0775 6.90803 9.93557 7.72406L7.5859 21.2347C7.56193 21.3725 7.60008 21.5138 7.69002 21.6207C7.78002 21.7277 7.91273 21.7895 8.05254 21.7895H11.2318L10.7449 24.3864C10.7189 24.5249 10.7559 24.6678 10.8459 24.7762C10.9359 24.8847 11.0696 24.9474 11.2104 24.9474H15C15.2289 24.9474 15.425 24.7837 15.4661 24.5585L16.6584 18H18.7894C21.1402 18 23.0526 16.0876 23.0526 13.7368C23.0527 12.7135 22.6846 11.724 22.0162 10.9506ZM18.7895 17.0527H16.2632C16.0342 17.0527 15.8381 17.2164 15.7971 17.4416L14.6047 24H11.7813L12.7324 18.927C12.787 18.6354 12.5634 18.366 12.2668 18.366C12.0389 18.366 11.8433 18.5284 11.8012 18.7525L11.4095 20.8421H8.6158L10.869 7.88631C10.9317 7.5252 11.2434 7.26311 11.6099 7.26311H15.5759C17.3914 7.26311 18.9122 8.69941 18.9466 10.5147C18.982 12.3722 17.4813 13.8947 15.6315 13.8947H13.1052C12.8773 13.8947 12.6816 14.0571 12.6396 14.2811L12.2339 16.445C12.1793 16.7366 12.4029 17.006 12.6995 17.006C12.9274 17.006 13.123 16.8437 13.1651 16.6196L13.4984 14.8421H15.6315C17.9718 14.8421 19.8776 12.9469 19.8946 10.6105C21.1887 11.0722 22.1053 12.3243 22.1053 13.7368C22.1053 15.5651 20.6179 17.0527 18.7895 17.0527Z" fill={color}/>
    </svg>
  );
}

PayPal1Svg.defaultProps = {
  color: '#909090'
};

export default PayPal1Svg;
