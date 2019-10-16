import React from "react";
import cx from "classnames";
import { ChevronDownSvg } from "icons";

export default ({ owner, className }) => (
    <div className={cx("flex items-center justify-between bg-xs-grey rounded p-2", className)}>
        <div className="w-26 text-xs truncate">{owner.name}</div>
        <ChevronDownSvg />
    </div>
);