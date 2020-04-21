import cx from "classnames";
import { useTabState } from "@bumaga/tabs";

export default ({ children, onClick }) => {
    const { isActive, onClick: onClickTab } = useTabState();
    const handleClick = () => {
        onClickTab();
        if (onClick) {
            onClick();
        }
    };

    return <button className={cx("py-3 mr-6", {
        "text-black border-red border-b-2": isActive,
        "text-grey": !isActive,
    })} onClick={handleClick} style={{outline: 0}}>{children}</button>;
};