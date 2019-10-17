import React from "react";
import {CloseSvg } from "icons";

export default ({close, title, children, footer}) => (
    <div className="modal" style={{height: "auto", width: "auto"}}>
        <div className="modal__dialog">
            <div className="modal__content">
                <div className="modal__content__header relative z-1">
                    <div className="text-lg font-medium flex justify-center items-center">
                        {title}
                    </div>
                    <div className="absolute top-0 right-0 m-4 cursor-pointer" onClick={close}>
                        <CloseSvg />
                    </div>
                </div>

                <div className="modal__content__body">{children}</div>

                {footer && (
                   <>
                       <div className="border-b border-divider"/>

                       <div className="modal__content__body">
                           {footer}
                       </div>
                   </>
                )}
            </div>
        </div>
    </div>
);
