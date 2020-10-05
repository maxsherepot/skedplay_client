import React from 'react';
import SubscribeForm from "./SubscribeForm";


export default function Subscribe(props) {
    const { text = '', classNameText = '', styleText = {}, style = {}, imageUrl, onSubmit, isSubscribed } = props;


    return (
          <div className="subscribe-box" style={{backgroundImage: `url(${imageUrl})`, ...style}}>
              <div className="container flex py-10 sm:py-20">
                  <div className={"p-6 rounded-lg text-white text w-full flex items-center " + classNameText} style={{backgroundColor: "#1a1a1a", minHeight: 350, maxWidth: 400, ...styleText}}>
                    <SubscribeForm isSubscribed={isSubscribed} onSubmit={onSubmit} text={text} />
                  </div>
              </div>
          </div>
    );

}
