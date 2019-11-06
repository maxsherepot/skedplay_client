import React, { useState } from "react";
import cx from "classnames";
import {
  VisaSvg,
  PayPalSvg,
  PostFinanceSvg,
  TwintSvg,
  SmsSvg,
  InvoiceSvg
} from "icons";

function PaymentMethod({ payment, setPayment }) {
  const methods = [
    <VisaSvg />,
    <PayPalSvg />,
    <PostFinanceSvg />,
    <TwintSvg />,
    <SmsSvg />,
    <InvoiceSvg />
  ];

  return (
    <div className="flex flex-col">
      <div className="text-white text-center mt-6 mb-3">
        Select Payment Method
      </div>

      <div className="flex bg-white rounded-full">
        <div className="flex items-center justify-between rounded-full bg-white cursor-pointer p-1">
          {methods.map((method, i) => (
            <div
              key={i}
              className={cx(
                "mx-1 p-4 rounded-full opacity-25 hover:bg-light-grey hover:opacity-100",
                {
                  "bg-light-grey opacity-100": payment === i
                }
              )}
              onClick={() => setPayment(i)}
            >
              {method}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
