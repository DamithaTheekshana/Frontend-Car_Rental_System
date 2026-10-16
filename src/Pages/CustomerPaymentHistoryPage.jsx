import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./CustomerPaymentHistoryPage.css";

function CustomerPaymentHistoryPage() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user?.userId) {
      setLoading(false);
      return;
    }

    fetchPayments();

  }, []);

  const fetchPayments = async () => {

    try {

      const response = await fetch(
        `http://localhost:8080/payment/customer/${user.userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payment history");
      }

      const data = await response.json();

      console.log("Customer Payment History:", data);

      setPayments(data);

    } catch (error) {

      console.error("Payment History Error:", error);

    } finally {

      setLoading(false);
    }
  };


  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString();
  };


  return (
    <>
      <HomeNavbar />

      <div className="customer-payment-container">

        <div className="customer-payment-header">

          <div>
            <h2>Payment History</h2>

            <p>
              View your completed payment transactions
            </p>
          </div>

          <div className="customer-payment-count">
            Total Payments: {payments.length}
          </div>

        </div>


        {loading ? (

          <div className="customer-payment-message">
            Loading payment history...
          </div>

        ) : payments.length === 0 ? (

          <div className="customer-payment-message">
            No payment transactions found.
          </div>

        ) : (

          <div className="customer-payment-table-wrapper">

            <table className="customer-payment-table">

              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Paid Date</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr key={payment.paymentId}>

                    <td>
                      <div className="customer-payment-vehicle">

                        <img
                          src={`http://localhost:8080/uploads/${payment.vehicleImage}`}
                          alt={payment.vehicleModel}
                        />

                        <span>
                          {payment.vehicleModel}
                        </span>

                      </div>
                    </td>

                    <td>
                      {formatDate(payment.paidDate)}
                    </td>

                    <td className="customer-paid-amount">
                      Rs. {Number(
                        payment.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`customer-method-badge ${
                          payment.type === "CARD"
                            ? "customer-card-method"
                            : "customer-cash-method"
                        }`}
                      >
                        {payment.type}
                      </span>
                    </td>

                    <td>
                      <span className="customer-paid-badge">
                        {payment.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
    </>
  );
}

export default CustomerPaymentHistoryPage;