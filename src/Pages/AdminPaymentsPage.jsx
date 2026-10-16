import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminPaymentsPage.css";

function AdminPaymentsPage() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {

      const response = await fetch(
        "http://localhost:8080/payment/all"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }

      const data = await response.json();

      console.log("Payment Transactions:", data);

      setPayments(data);

    } catch (error) {

      console.error("Payment Fetch Error:", error);

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
      <AdminNavbar />

      <div className="admin-payments-container">

        <div className="admin-payments-header">

          <div>
            <h2>Payment Transactions</h2>

            <p>
              View all customer payment transactions
            </p>
          </div>

          <div className="payment-count">
            Total Payments: {payments.length}
          </div>

        </div>


        {loading ? (

          <div className="payment-loading">
            Loading payments...
          </div>

        ) : payments.length === 0 ? (

          <div className="no-payments">
            No payment transactions found.
          </div>

        ) : (

          <div className="payments-table-wrapper">

            <table className="payments-table">

              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Vehicle</th>
                  <th>Customer</th>
                  <th>Paid Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr key={payment.paymentId}>

                    <td>
                      #{payment.paymentId}
                    </td>

                    <td>
                      <div className="payment-vehicle">

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
                      {payment.customerName}
                    </td>

                    <td>
                      {formatDate(payment.paidDate)}
                    </td>

                    <td className="transaction-amount">
                      Rs. {Number(
                        payment.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`payment-method-badge ${
                          payment.type === "CARD"
                            ? "card-method"
                            : "cash-method"
                        }`}
                      >
                        {payment.type}
                      </span>
                    </td>

                    <td>
                      <span className="paid-status-badge">
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

export default AdminPaymentsPage;