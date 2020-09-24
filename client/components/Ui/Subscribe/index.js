import React from 'react';
import SubscribeForm from "./SubscribeForm";


export default function Subscribe(props) {
    const { isMobile, text, textComponent, classNameText, styleText, style, height, image, dispatch } = props;


    return (
          <div className="subscribe-box" style={{backgroundImage: "url(" + image + ")", ...(style || {})}}>
              <div className="container flex py-10 sm:py-20">
                  <div className={"p-6 rounded-lg text-white text w-full flex items-center " + (classNameText || "")} style={{backgroundColor: "#1a1a1a", minHeight: 350, maxWidth: 400, ...(styleText || {})}}>
                    <SubscribeForm/>
                  </div>
              </div>
          </div>
    );

}
