import React, { useEffect, useRef, useState } from "react";
import { tableData } from "../../JsonData";
import Search from "../../commons/Search/Search";
import ToggleButton from "../../commons/ToggleButton/ToggleButton";
import Popup from "../../commons/PopUp/PopUp";
import "./Dashboard.css";
import { partialStringMatch } from "../../utils/partialStringMatch";
import Pagination from '../Pagination';
import { sortByKey } from "../../utils/sortByKey";
const pageSize = 5;

const tableHeaders = [{
  dataIndex: 'id',
  label: 'ID'
}, {
  dataIndex: 'invoiceAmount',
  label: 'Amount'
}, {
  dataIndex: 'billingPeriod',
  label: 'Time Period'
}, {
  dataIndex: 'creditsUsed',
  label: 'Credits Used'
}, {
  dataIndex: 'invoicePaymentStatus',
  label: 'Status'
}, {
  dataIndex: '',
  label: ''
}];
function Dashboard(props) {
  //Local State
  const [invoices, setInvoices] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [paginationActive, setPaginationActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArr, setSelectedArr] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [activeSort, setActiveSort] = useState(null);
  const [filterKey, setFilterKey] = useState("");
  const [lastScrolledPage, setLastScrolledPage] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);

  const pageCount = tableData && tableData.length / pageSize;
  const tableRef = useRef();

  useEffect(() => {
    setActiveSort(null);
    setLastScrolledPage(0);
  }, [paginationActive]);


  const fetchNextSetData = (page) => {
    const startIdx = page * pageSize;
    const endIdx = pageSize * page + pageSize;
    const filteredData = tableData && tableData.length !== 0 && tableData.slice(startIdx, endIdx);
    return filteredData;
  }

  useEffect(() => {
    //pagination handler
    if (filterKey !== "") {
      setFilterKey("");
    }
    if (paginationActive) {
      const filteredData = fetchNextSetData(activePage);
      setInvoices(filteredData);
      setOriginalData(filteredData);
    } else {
      const initData = tableData.slice(0, pageSize)
      setInvoices(initData);
      setOriginalData(initData);
    }
  }, [activePage, paginationActive]);

  useEffect(() => {
    const tableEl = tableRef?.current;
    if (!paginationActive && tableRef) {
      const scrollHandler = () => {
        const { lastscrolledpage } = { ...tableRef?.current?.dataset };
        if (parseInt(lastscrolledpage) < (pageCount - 1) && tableEl.scrollTop + tableEl.clientHeight >= tableEl.scrollHeight && !dataLoading) {
          const nextPage = parseInt(lastscrolledpage) + 1;
          setDataLoading(true);
          setTimeout(() => {
            setDataLoading(false);
            const nextSetData = fetchNextSetData(nextPage);
            const finalData = [...originalData, ...nextSetData];
            setInvoices(finalData);
            setOriginalData(finalData);
          }, 1500);
          setLastScrolledPage(nextPage);
        }
      }
      tableEl.addEventListener('scroll', scrollHandler);
      return () => tableEl.removeEventListener('scroll', scrollHandler);
    }
  }, [paginationActive, tableRef]);

  const sortColumnFun = (key) => {
    if (key !== '') {
      const sortAsc = activeSort && activeSort.key === key && activeSort.asc;
      const sortedData = sortByKey([...invoices], key);
      const finalData = sortAsc ? sortedData : sortedData.reverse();
      setActiveSort({ key: key, asc: !sortAsc });
      setInvoices(finalData);
    }
  };

  const handleChange = (newVal) => {
    setFilterKey(newVal);
    if (newVal === '') {
      setInvoices(originalData);
      return;
    }
    const filteredData = originalData?.filter((_item) => {
      const { id, invoiceAmount, billingPeriod, creditsUsed, creditsLimit, invoicePaymentStatus } = _item;
      return partialStringMatch(id, newVal) || partialStringMatch(invoiceAmount, newVal) || partialStringMatch(billingPeriod, newVal) || partialStringMatch(creditsUsed, newVal) || partialStringMatch(creditsLimit, newVal) || partialStringMatch(invoicePaymentStatus, newVal)
    });
    setInvoices(filteredData);
  };
  const togglePopup = (index) => {
    setSelectedArr(invoices[index]);
    setIsOpen(!isOpen);
  };

  const PopUpData = (tableHead, tableValue) => {
    return (
      <div className="pop-up-block">
        <span className="style-text">{tableHead}</span>
        <input value={tableValue} className="style-text-input" />
      </div>
    );
  };

  const goToPage = (pageIdx) => {
    setActivePage(pageIdx);
  }

  const handleToggleView = () => {
    setPaginationActive(!paginationActive);
    setInvoices(tableData);
  }
  return (
    <div className="container">
      <div className='heading'>
        <h2>Think Table</h2>
      </div>
      <header className="site-header">
        <h3 className="style-text">Invoices</h3>
        <div className="nav-search">
          <Search filterKey={filterKey} onChange={handleChange} />
          <ToggleButton paginationActive={paginationActive} toggleView={handleToggleView} />
        </div>
      </header>
      <div
        ref={tableRef}
        className={!paginationActive ? "table-wrapper" : ""}
        data-lastscrolledpage={lastScrolledPage}
      >
        <table className="invoice-data">
          <thead>
            <tr styles={{ width: "50px" }}>
              {tableHeaders.map((header) => {
                const sortAscCls = activeSort?.key === header.dataIndex && !activeSort?.asc ? 'sort-asc' : '';
                const sortDescCls = activeSort?.key === header.dataIndex && activeSort?.asc ? 'sort-desc' : '';
                return <th className={`${sortAscCls} ${sortDescCls}`} onClick={() => sortColumnFun(header.dataIndex)}> {header.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {invoices && invoices.length !== 0 && invoices.map((user, i) => {
              return (
                <tr key={i} onClick={() => togglePopup(i)} style={{ cursor: 'pointer' }}>
                  <td>
                    <span className="text">{user.id ? user.id : "-"}</span>
                  </td>
                  <td>{user.invoiceAmount ? user.invoiceAmount : "-"}</td>
                  <td>{user.billingPeriod ? user.billingPeriod : "NA"}</td>
                  <td>{user.creditsUsed ? user.creditsUsed : "-"}</td>
                  <td>
                    {user.invoicePaymentStatus ? user.invoicePaymentStatus : "-"}
                  </td>
                  <td>
                    <button className="recipt-btn">Recipt</button>
                  </td>
                </tr>
              );
            }) || 'No rows found!!!'}
          </tbody>
        </table>
        {dataLoading && (
          <div className="loading-messsage">
            Loading more data ...
          </div>
        )}
      </div>
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
                <button onClick={() => { setIsOpen(!isOpen) }} className="cancle-button">Cancel</button>
                <button className="updateButton">Update Details</button>
              </div>
            </div>
          }
          handleClose={togglePopup}
        />
      )}
      <div className='table-footer'>
        {paginationActive ? <Pagination activePage={activePage} goToPage={goToPage} pageCount={pageCount} /> : ''}
      </div>
    </div>
  );
}

export default Dashboard;
