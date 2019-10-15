import cx from "classnames";
import { useTabState } from "@bumaga/tabs";

export default ({ children }) => {
    const { isActive, onClick } = useTabState();

    return <button className={cx("py-3 mr-6", {
        "text-black border-red border-b-2": isActive,
        "text-grey": !isActive,
    })} onClick={onClick} style={{outline: 0}}>{children}</button>;
};