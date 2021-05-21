import React, {useState} from 'react';
import { tableData } from "../../JsonData";
import "./Dashboard.css"

function Dashboard(props) {

    const tableHeaders = [
        "ID",
        "Amount",
        "Time Period",
        "Credits Used",
        "Status",
        " ",
      ];

      const [invoices, setInvoices] = useState(tableData)

    return (
        <div className="container">
      <header className="site-header">
        <h3>Invoices</h3>
        {/* <NavBar /> */}
      </header>
      <table className="invoice-data">
        <tr styles={{ width: "50px" }}>
          {tableHeaders.map((i) => {
            return <th > {i}</th>;//onClick={() => sortColumnFun(i)}
          })}
        </tr>
        {invoices.map((user, i) => {
          return (
            <tbody key={i}>
              <tr className="border-bottom">
                <td>{user.id ? user.id : "-"}</td>
                <td>{user.invoiceAmount ? user.invoiceAmount : "-"}</td>
                <td>{user.billingPeriod ? user.billingPeriod : "NA"}</td>
                <td>{user.creditsUsed ? user.creditsUsed : "-"}</td>
                <td>
                  {user.invoicePaymentStatus ? user.invoicePaymentStatus : "-"}
                </td>
                <td>
                  <button>Recipt</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
    );
}

export default Dashboard;