//@ts-nocheck

import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export default async function Handler(req, res) {
  if (req.method != "POST")
    return res.status(404).json({ success: false, message: "Not Found" });

  if (!req.body.order_price || !req.body.user_id)
    return res
      .status(400)
      .json({
        success: false,
        message: "Please Provide order_price And User ID",
      });

  try {
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.body.order_price + "",
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      console.log("RES: ", response);
      return res
        .status(500)
        .json({ success: false, message: "Some Error Occured at backend" });
    }

    // ...

    // // Your Custom Code for doing something with order
    // // Usually Store an order in the database like MongoDB

    // ...

    res.status(200).json({ success: true, data: { order } });
  } catch (err) {
    throw new Error("Err at Create Order: ", err);
  }
}
