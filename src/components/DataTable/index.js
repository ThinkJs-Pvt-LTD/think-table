
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

const DataTable = (props) => {
    const { tableRef, paginationActive, lastScrolledPage, activeSort, sortColumnFun, invoices, togglePopup, dataLoading } = props;
    return (
        <div
            ref={tableRef}
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
                        const progress = parseInt(user.creditsUsed)/parseInt(user.creditsLimit) * 100;
                        return (
                            <tr key={i} onClick={() => togglePopup(i)} style={{ cursor: 'pointer' }}>
                                <td>
                                    <span className="text">{user.id ? user.id : "-"}</span>
                                </td>
                                <td>{user.invoiceAmount ? user.invoiceAmount : "-"}</td>
                                <td>{user.billingPeriod ? user.billingPeriod : "NA"}</td>
                                <td>
                                    <span id="progressbar">
                                        <span style={{width: `${progress}%`}}></span>
                                    </span>
                                    <span style={{ verticalAlign: 'middle' }}>
                                        {user.creditsUsed ? `${user.creditsUsed}/${user.creditsLimit}` : "-"}
                                    </span>
                                </td>
                                <td>
                                    {user.invoicePaymentStatus ? user.invoicePaymentStatus : "-"}
                                </td>
                                <td>
                                    <button className="recipt-btn">
                                        <span className="recipt-icon"><i class="fa fa-download" aria-hidden="true"></i></span>
                                        <span>Receipt</span>
                                    </button>
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
    )
}

export default DataTable;