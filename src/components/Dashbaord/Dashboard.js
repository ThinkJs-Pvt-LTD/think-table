import React, { useState } from "react";
import { tableData } from "../../JsonData";
import Search from "../../commons/Search/Search";
import ToggleButton from "../../commons/ToggleButton/ToggleButton";
import Popup from "../../commons/PopUp/PopUp";
import "./Dashboard.css";
import Pageinition from "../Pageinition/Pageinition";

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
  const [toggle, setToggle] = useState(true);
  console.log("🚀 ~ file: Dashboard.js ~ line 21 ~ Dashboard ~ toggle", toggle)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArr, setSelectedArr] = useState([]);

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
          invoices.sort(function (a, b) {
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
          invoices.sort(function (a, b) {
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
          invoices.sort(function (a, b) {
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
    console.log(newVal);
    if (
      invoices.findIndex(
        (value) => value.id === newVal || value.invoiceAmount === newVal
      ) >= 0
    ) {
      let res = invoices.filter((i) => {
        return i.id === newVal || i.invoiceAmount === newVal;
      });
      setInvoices(res);
      console.log("🚀 ~ file: Dashboard.js ~ line 118 ~ res ~ res", res);
    } else {
      setInvoices(tableData);
    }
    // invoices.filter((data) => {
    //   console.log(invoices.findIndex(value => value.id === newVal))
    // })
  };
  const togglePopup = (index) => {
    setSelectedArr(invoices[index]);
    setIsOpen(!isOpen);
  };

  //Component
  const NavBar = () => {
    return (
      <div className="nav-search">
        <Search onChange={handleChange} />
        <ToggleButton />
      </div>
    );
  };
  const PopUpData = (tableHead, tableValue) => {
    return (
      <div className="pop-up-block">
        <span className="style-text">{tableHead}</span>
        <input value={tableValue} className="style-text-input" />
      </div>
    );
  };

  return (
    <div className="container">
      <header className="site-header">
        <h3 className="style-text">Invoices</h3>
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
                <td
                  onClick={() => togglePopup(i)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="text">{user.id ? user.id : "-"}</span>
                </td>
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
      {isOpen && (
        <Popup
          content={
            <div>
              <span className="style-text">{selectedArr.id}</span>
              <hr />
              {PopUpData("ID", selectedArr.id)}
              {PopUpData("Amount", selectedArr.invoiceAmount)}
              {PopUpData("Date", selectedArr.billingPeriod)}
              {PopUpData("Credits Used", selectedArr.creditsUsed)}
              <form>
                <label>
                  <input
                    type="radio"
                    name="optradio"
                    checked={
                      selectedArr.invoicePaymentStatus === "Paid" ? true : false
                    }
                  />
                  Paid
                </label>
                <label>
                  <input
                    type="radio"
                    name="optradio"
                    checked={
                      selectedArr.invoicePaymentStatus === "Unpaid"
                        ? true
                        : false
                    }
                  />
                  Not Paid
                </label>
              </form>
              <div className="footer-buttons">
                <button className="cancle-button">Cancel</button>
                <button className="updateButton">Update Details</button>
              </div>
            </div>
          }
          handleClose={togglePopup}
        />
      )}
      <div>{toggle ? <Pageinition /> : console.log("infinite")}</div>
    </div>
  );
}

export default Dashboard;
