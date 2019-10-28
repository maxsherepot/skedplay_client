import React from "react";
import PropTypes from "prop-types";
import { Button } from "UI";
import cx  from "classnames";

const DawSVG = () => (
  <svg
    className="stroke-red"
    width="25"
    height="18"
    viewBox="0 0 25 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 2L8.5625 16L2 9.63636"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const CrossSVG = () => (
  <svg
    className="stroke-divider"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 2L2 20M2 2L20 20"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const InfinitySVG = () => (
  <svg
    className="fill-red -mr-1"
    width="35"
    height="17"
    viewBox="0 0 35 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M27.125 0.661438C25.025 0.661438 23.0417 1.47813 21.6198 2.90001L17.5 6.54582L17.4927 6.53851L15.2833 8.48538L15.2979 8.49994L11.3677 11.9854C10.4344 12.9115 9.19481 13.4219 7.875 13.4219C5.14794 13.4219 2.93125 11.2125 2.93125 8.50001C2.93125 5.78751 5.14794 3.57813 7.875 3.57813C9.19481 3.57813 10.4344 4.08857 11.4333 5.08019L13.0885 6.54582L15.2906 4.59894L13.4457 2.96563C11.9582 1.48544 9.98218 0.668753 7.87493 0.668753C3.52919 0.661439 0 4.17607 0 8.50001C0 12.824 3.52919 16.3386 7.875 16.3386C9.975 16.3386 11.9511 15.5219 13.3802 14.1073L17.5 10.4542L17.5073 10.4615L19.7094 8.50733L19.7021 8.50001L23.6322 5.02188C24.5656 4.08857 25.8052 3.57813 27.125 3.57813C29.8521 3.57813 32.0687 5.78751 32.0687 8.50001C32.0687 11.2125 29.8521 13.4219 27.125 13.4219C25.8052 13.4219 24.5656 12.9115 23.5667 11.9271L21.9115 10.4614L19.7094 12.4156L21.5542 14.049C23.0417 15.5291 25.0178 16.3385 27.1178 16.3385C31.4708 16.3386 35 12.824 35 8.50001C35 4.17607 31.4708 0.661438 27.125 0.661438Z"></path>
  </svg>
);

const InfoSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.22">
      <circle cx="10" cy="10" r="9.5" stroke="#FF3366" />
      <path
        d="M12.8204 13.8129L12.6306 14.4412C12.0614 14.6232 11.6067 14.7617 11.2681 14.857C10.9292 14.9525 10.5353 15 10.0866 15C9.39749 15 8.8615 14.8633 8.47922 14.5917C8.09694 14.319 7.90574 13.9734 7.90574 13.5542C7.90574 13.392 7.91961 13.225 7.94846 13.055C7.97755 12.8847 8.02379 12.693 8.08708 12.4786L8.79845 10.4391C8.86174 10.2438 8.91554 10.0587 8.95862 9.88375C9.00231 9.70984 9.02337 9.54984 9.02337 9.4058C9.02337 9.14533 8.95679 8.96315 8.82426 8.86072C8.69172 8.75858 8.43881 8.70672 8.06335 8.70672C7.87945 8.70672 7.69044 8.73058 7.49778 8.77672C7.30427 8.82305 7.13887 8.86781 7 8.90942L7.19023 8.28063C7.65624 8.12693 8.10169 7.99532 8.52778 7.88609C8.95387 7.77656 9.35648 7.72174 9.7373 7.72174C10.4217 7.72174 10.9497 7.85572 11.3206 8.12368C11.6914 8.39184 11.8768 8.73945 11.8768 9.16781C11.8768 9.25644 11.8646 9.4126 11.8384 9.6358C11.8129 9.8595 11.7653 10.0645 11.6959 10.2509L10.9876 12.2823C10.9295 12.4454 10.8773 12.6319 10.8319 12.8418C10.7851 13.0504 10.7627 13.2097 10.7627 13.3165C10.7627 13.5863 10.8369 13.7704 10.9858 13.8683C11.1357 13.9662 11.394 14.0149 11.7608 14.0149C11.933 14.0149 12.1289 13.9902 12.3467 13.9416C12.5638 13.893 12.7221 13.8503 12.8204 13.8129ZM13 5.28458C13 5.63851 12.8353 5.94078 12.5044 6.18931C12.1743 6.43874 11.7766 6.56355 11.3113 6.56355C10.8446 6.56355 10.4459 6.43874 10.112 6.18931C9.7788 5.94068 9.61182 5.63851 9.61182 5.28458C9.61182 4.93135 9.7788 4.62859 10.112 4.3769C10.4453 4.1256 10.8447 4 11.3113 4C11.7765 4 12.1743 4.1259 12.5044 4.3769C12.8356 4.62859 13 4.93145 13 5.28458Z"
        fill="#FF3366"
      />
    </g>
  </svg>
);

const getBackgroundColor = (id) => {
    let className = '';

    switch (+id) {
        case 1:
            className = 'bg-dark-green';
            break;
        case 2:
            className = 'bg-red';
            break;
        case 3:
            className = 'bg-grey';
            break;
    }
    return className;
};

const PERMISSION_INFINITY = -1;
const PERMISSION_FALSE = null;
const PERMISSION_TRUE = 0;

function PlanCard({ plan: { id, name, price, permissions }, onSubscribe }) {
  return (
    <div className="plans__item">
      <div className="flex items-center justify-center font-extrabold text-center capitalize text-2xl">
        {name}
          {id === "2" && (
              <div className="bg-dark-green ml-3 py-1 px-3 rounded-full text-white text-xs font-normal uppercase">
                  popular
              </div>
          )}
      </div>
      <div className={cx("text-center text-white text-lg font-medium leading-none mt-2 py-4", getBackgroundColor(id))}>
        {{
          0: "Free"
        }[price] || `$ ${price}`}
      </div>
      <div className="plans__body mt-6">
        {permissions &&
          permissions.map(({ display_name, pivot: { value } }, index) => (
            <div
              className="flex justify-between leading-snug mt-5 h-6 items-center"
              key={index}
            >
              <div className="flex-auto text-sm flex-shrink pr-3">
                <div className="flex">
                  {display_name}
                  {display_name === "Credit card payment" && (
                    <span className="ml-4">
                      <InfoSVG />
                    </span>
                  )}
                </div>
              </div>
              <div className="flex">
                {{
                  [PERMISSION_INFINITY]: <InfinitySVG />,
                  [PERMISSION_TRUE]: <DawSVG />,
                  [PERMISSION_FALSE]: <CrossSVG />
                }[value] || (
                  <div className="w-6 text-center text-sm">{value}</div>
                )}
              </div>
            </div>
          ))}
        <Button
          className="text-sm mt-5 min-w-full"
          size="xs"
          outline
          onClick={() => onSubscribe(id)}
        >
          <span className="text-black">
              Choose
          </span>
        </Button>
      </div>
    </div>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(
      PropTypes.shape({
        display_name: PropTypes.string.isRequired,
        pivot: PropTypes.shape({
          value: PropTypes.string
        })
      })
    )
  }),
  onSubscribe: PropTypes.func.isRequired
};

export default PlanCard;
