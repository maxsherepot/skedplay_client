import cx from "classnames";
import { useSteps } from "hooks";

const StepBox = ({ links, canSetStep }) => {
  const { step, setStep } = useSteps();

  // Todo: Add check step.
  const active = step || 0;

  return (
    <div className="step-box flex w-full flex-wrap items-start justify-between hd:mx-auto hd:w-7/12 px-8 hd:px-0 my-4 xl:my-8">
      {links.map((name, i) => (
        <div className={cx(
              "flex flex-1 flex-col items-center my-3 cursor-pointer",
              active === i ? "" : "xs:hidden sm:flex"
            )}
          key={i}
          onClick={() => canSetStep ? setStep(i) : ''}
        >
          <div
            className={cx(
              "flex items-center justify-center w-10 h-10 sm:w-7 sm:h-7 text-white rounded-full",
              active === i ? "bg-dark-green" : "bg-divider"
            )}
          >
            {i + 1}<span className="sm:hidden">/{links.length}</span>
          </div>
          <div
            className={cx(
              "  sm:w-26 font-medium mt-2 text-center",
              active === i ? "text-black" : "text-light-grey"
            )}
          >
            {name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepBox;
