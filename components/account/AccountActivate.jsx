import React, {Fragment, useState} from "react";
import cx from "classnames";
import { Button } from "UI";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Close from "@material-ui/icons/Close";
import {ACTIVATION_EMPLOYEE, GET_EMPLOYEE, GET_MY_EMPLOYEES} from 'queries';
import {useMutation} from "@apollo/react-hooks";
import Payment from "@material-ui/icons/Payment";
import Receipt from "@material-ui/icons/Receipt";
import PhoneIphone from "@material-ui/icons/PhoneIphone";
import Phone from "@material-ui/icons/Phone";
import {now} from "moment";


const paymentData = [
    // {period: "3 days", payment: "Payment of 10.90 CHF", color: "#909090"},
    {period: "7 days", payment: "Payment of 25.90 CHF", color: "#FF3366"},
    // {period: "30 days", payment: "Payment of 59.90 CHF", color: "#00C337"}
]

const paymentMethods = [
    {name: "Cards", icon: <Payment/>},
    {name: "Phone", icon: <PhoneIphone/>},
    {name: "Sofort", icon: <Receipt/>},
    {name: "Cards", icon: <Payment/>},
    {name: "Phone", icon: <PhoneIphone/>},
    {name: "Sofort", icon: <Receipt/>}
]

export default function AccountActivate({open, onClose, employee}) {
    const [paymentMethod, setPaymentMethod] = useState(0)
    const [paymentPlan, setPaymentPlan] = useState(0)

    const [activationEmployee] = useMutation(ACTIVATION_EMPLOYEE, {
        refetchQueries: [
            {
                query: GET_MY_EMPLOYEES,
            }
        ]
    });

    const tryToActive = async (days) => {

        await activationEmployee({
            variables: {
                employee: employee.id,
                days: days,
            }
        });

    };

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            className="payment-dialog"
            open={open}
            onClose={onClose}
            >

            <div className="flex items-center justify-between border-b-1" style={{borderBottom: "1px solid rgba(0, 0, 0, 0.12)"}}>
                <DialogTitle className="">Refill Credits</DialogTitle>
                <div className="mr-2">
                    <IconButton
                                onClick={onClose}>
                        <Close/>
                    </IconButton>
                </div>
            </div>
            <div className="hidden">
                <Tabs
                  value={paymentMethod}
                  onChange={(e, v) => setPaymentMethod(v)}
                  variant="scrollable"
                  scrollButtons="on"
                  indicatorColor="secondary"
                  aria-label="scrollable force tabs example"
                >
                  {
                      paymentMethods.map((item, i) => {
                          return (
                              <Tab key={i} className="outline-none" label={(
                                  <span className="flex flex-col items-center justify-center py-2">
                                      <span >{item.icon}</span>
                                      <span className="text-sm">{item.name}</span>
                                  </span>
                              )}/>
                          )
                      })
                  }
                </Tabs>
            </div>
            <DialogContent dividers>
                <div className="mt-4">
                    {
                        paymentData.map((item, i) => {
                            const selected = i === paymentPlan
                            return (
                                <div key={i} className={"mb-4 flex flex-col px-4 py-2 border opacity-75 hover:opacity-100 rounded cursor-pointer hover:shadow " + (selected ? " shadow opacity-100 " : "")}
                                     onClick={() => setPaymentPlan(i)} style={{borderColor: "rgba(0, 0, 0, 0.12)"}}>
                                    <span className="mb-1 font-medium text-lg" style={{color: item.color}}>{item.period}</span>
                                    <span className="text-grey text-xs">{item.payment}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="mt-6 mb-4 flex items-center justify-center">
                    <div className="w-full" style={{maxWidth: 200}}>
                        <Button
                          className="w-full px-4"
                          size="sm"
                          onClick={() => {
                              tryToActive(7);
                              onClose();
                          }}
                        >
                          Continue
                        </Button>
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    )
}
