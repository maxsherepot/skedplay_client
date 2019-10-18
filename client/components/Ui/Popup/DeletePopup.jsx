import React from "react";
import {Button} from "UI";
import Popup from "reactjs-popup";
import Content from "./Content";

const contentStyle = {
    background: "transparent",
    width: 300,
    padding: 0,
    border: "none",
};

const DeleteButton = React.forwardRef(({...props}, ref) => (
    <Button className="px-3" level="primary" outline size="xxs" ref={ref} {...props}>
        <span className="text-black hover:text-white">Delete</span>
    </Button>
));

const YesButton = React.forwardRef(({...props}, ref) => (
    <Button className="px-3 mr-4" level="primary" size="xs" ref={ref} {...props}>
        Yes, delete
    </Button>
));

export default ({title, onEnter, children}) => {
    const handleClick = (onClose, onEnter) => {
        if (onEnter) {
            onEnter();
            onClose();
        }
    };

    return (
        <Popup modal trigger={<DeleteButton/>} contentStyle={contentStyle}>
            {close => (
                <Content title={title} close={close} footer={(
                    <div className="pt-6">
                        <YesButton onClick={() => handleClick(close, onEnter)} />

                        <Button className="px-3" level="black" outline size="xs" onClick={close}>
                            <span className="text-black">No, close</span>
                        </Button>
                    </div>
                )}>
                    {children}
                </Content>
            )}
        </Popup>
    )
};