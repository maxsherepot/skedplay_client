import React from "react";
import Popup from "reactjs-popup";
import Content from "./Content";

const defaultContentStyle = {
    background: "transparent",
    width: 300,
    padding: 0,
    border: "none",
};

export default ({ trigger, title, contentStyle, children }) => (
    <Popup modal trigger={trigger} contentStyle={contentStyle || defaultContentStyle}>
        {(close) => <Content title={title} close={close}>{children}</Content>}
    </Popup>
)