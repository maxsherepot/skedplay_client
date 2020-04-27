import cx from "classnames";
import { useSteps } from "hooks";

const StepBox = ({ links, canSetStep }) => {
  const { step, setStep } = useSteps();

  // Todo: Add check step.
  const active = step || 0;

  return (
    <div className="flex w-full flex-wrap items-start justify-between hd:mx-auto hd:w-7/12 px-8 hd:px-0 my-4 xl:my-8">
      {links.map((name, i) => (
        <div
          className="flex flex-1 flex-col xl:flex-row items-center xl:items-start xl:w-1/5 my-3 cursor-pointer"
          key={i}
          onClick={() => canSetStep ? setStep(i) : ''}
        >
          <div
            className={cx(
              "flex items-center justify-center w-7 h-7 text-white rounded-full",
              active === i ? "bg-dark-green" : "bg-divider"
            )}
          >
            {i + 1}
          </div>
          <div
            className={cx(
              "ml-4 w-26 font-medium mt-2 xl:mt-0 text-center xl:text-left",
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
