import React, { useEffect, useRef, useState } from "react";
import { tableData } from "../../JsonData";
import Search from "../../commons/Search/Search";
import ToggleButton from "../../commons/ToggleButton/ToggleButton";
import "./Dashboard.css";
import { partialStringMatch } from "../../utils/partialStringMatch";
import Pagination from '../Pagination';
import { sortByKey } from "../../utils/sortByKey";
import DataTable from "../DataTable";
import InvoiceModal from "../InvoiceModal";
const pageSize = 5;

function Dashboard(props) {
  //Local State
  const [invoices, setInvoices] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [paginationActive, setPaginationActive] = useState(true);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
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
            const nextSetData = fetchNextSetData(nextPage);
            const finalData = [...originalData, ...nextSetData];
            setInvoices(finalData);
            setOriginalData(finalData);
            setLastScrolledPage(nextPage);
            setDataLoading(false);
          }, 500);
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
    setInvoiceModalOpen(!invoiceModalOpen);
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
      {!paginationActive && (
        <span className="scroll-msg"><i>Scroll the table to view more data.</i></span>
      )}
      <DataTable
        tableRef={tableRef}
        paginationActive={paginationActive}
        lastScrolledPage={lastScrolledPage}
        activeSort={activeSort}
        sortColumnFun={sortColumnFun}
        invoices={invoices}
        togglePopup={togglePopup}
        dataLoading={dataLoading}
      />
      <InvoiceModal
        isOpen={invoiceModalOpen}
        setIsOpen={setInvoiceModalOpen}
        selectedArr={selectedArr}
        PopUpData={PopUpData}
        togglePopup={togglePopup}
      />
      <div className='table-footer'>
        {paginationActive ? <Pagination activePage={activePage} goToPage={goToPage} pageCount={pageCount} /> : ''}
      </div>
    </div>
  );
}

export default Dashboard;
