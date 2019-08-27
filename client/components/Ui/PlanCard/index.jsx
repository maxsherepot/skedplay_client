import PropTypes from "prop-types";
import { Button } from "UI";

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

function PlanCard({ plan }) {
  return (
    <div className="plans__item">
      <div className="font-extrabold text-center text-2xl">{plan.name}</div>
      <div className="bg-xs-grey text-center text-lg font-medium leading-none mt-2 py-4">
        {plan.price}
      </div>
      <div className="plans__body mt-6">
        {plan.permissions &&
          plan.permissions.map(({ name, value }, index) => (
            <div
              className="flex justify-between leading-snug mt-5 items-center"
              key={index}
            >
              <div className="flex-auto text-sm flex-shrink pr-3">{name}</div>
              <div className="flex">
                {{
                  0: <InfinitySVG />,
                  true: <DawSVG />,
                  false: <CrossSVG />
                }[value] || (
                  <div className="w-6 text-center text-sm">{value}</div>
                )}
              </div>
            </div>
          ))}
        <Button className="text-sm mt-5 min-w-full" size="xs">
          Subscribe
        </Button>
      </div>
    </div>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    permissions: PropTypes.array
  })
};

export default PlanCard;
