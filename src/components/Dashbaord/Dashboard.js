import React, {useState} from 'react';
import { tableData } from "../../JsonData";
import Search from "../../commons/Search/Search";
import ToggleButton from "../../commons/ToggleButton/ToggleButton"
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
      //Local State
      const [invoices, setInvoices] = useState(tableData);
      const [toggle, setToggle] = useState(false)

      //Functions
      const sortColumnFun = (i) => {
        setToggle(!toggle);
        console.log(toggle);
        let arrToBeSorted = [];
        switch (i) {
          case "ID":
            invoices?.map((invoiceData) => {
              return arrToBeSorted.push(invoiceData.id);
            });
            if (toggle === true) {
              invoices.sort(function (a, b) {
                if (a.id === b.id) {
                  return 0;
                }
                if (typeof a.id === typeof b.id) {
                  return a.id < b.id ? 1 : -1;
                }
                return typeof a.id < typeof b.id ? 1 : -1;
              });
            } else if (toggle === false) {
              arrToBeSorted.sort(function (a, b) {
                if (a.id === b.id) {
                  return 0;
                }
                if (typeof a.id === typeof b.id) {
                  return a.id < b.id ? -1 : 1;
                }
                return typeof a.id < typeof b.id ? -1 : 1;
              });
            }
            break;
          case "Amount":
            invoices.map((invoiceData) => {
              return arrToBeSorted.push(invoiceData.invoiceAmount);
            });
            if (toggle === true) {
              invoices.sort(function (a, b) {
                if (a.invoiceAmount === b.invoiceAmount) {
                  return 0;
                }
                if (typeof a.invoiceAmount === typeof b.invoiceAmount) {
                  return a.invoiceAmount < b.invoiceAmount ? 1 : -1;
                }
                return typeof a.invoiceAmount < typeof b.invoiceAmount ? 1 : -1;
              });
            } else if (toggle === false) {
              arrToBeSorted.sort(function (a, b) {
                if (a.invoiceAmount === b.invoiceAmount) {
                  return 0;
                }
                if (typeof a.invoiceAmount === typeof b.invoiceAmount) {
                  return a.invoiceAmount < b.invoiceAmount ? -1 : 1;
                }
                return typeof a.invoiceAmount < typeof b.invoiceAmount ? -1 : 1;
              });
            }
            break;
            case "Credits Used":
            invoices.map((invoiceData) => {
              return arrToBeSorted.push(invoiceData.creditsUsed);
            });
            if (toggle === true) {
              invoices.sort(function (a, b) {
                if (a.creditsUsed === b.creditsUsed) {
                  return 0;
                }
                if (typeof a.creditsUsed === typeof b.creditsUsed) {
                  return a.creditsUsed < b.creditsUsed ? 1 : -1;
                }
                return typeof a.creditsUsed < typeof b.creditsUsed ? 1 : -1;
              });
            } else if (toggle === false) {
              arrToBeSorted.sort(function (a, b) {
                if (a.creditsUsed === b.creditsUsed) {
                  return 0;
                }
                if (typeof a.creditsUsed === typeof b.creditsUsed) {
                  return a.creditsUsed < b.creditsUsed ? -1 : 1;
                }
                return typeof a.creditsUsed < typeof b.creditsUsed ? -1 : 1;
              });
            }
        }
      };
      const handleChange = (newVal) => {
        // console.log(newVal);
        let filteredData = tableData.filter((data) => {
          return data.id === newVal;
        });
        setInvoices(filteredData);
      };

      //Component
      const NavBar = () => {
        return (
          <div className="nav-search">
              <Search onChange={handleChange}/>
              <ToggleButton/>
          </div>
        );
      };

    return (
        <div className="container">
      <header className="site-header">
        <h3>Invoices</h3>
        <NavBar />
      </header>
      <table className="invoice-data">
        <tr styles={{ width: "50px" }}>
          {tableHeaders.map((i) => {
            return <th onClick={() => sortColumnFun(i)}> {i}</th>;
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