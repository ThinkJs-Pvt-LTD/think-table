import Popup from "../../commons/PopUp/PopUp";

const InvoiceModal = (props) => {
    const {isOpen,selectedArr,PopUpData,setIsOpen,togglePopup} = props;
    return (
        <div>
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
        </div>
    )
}

export default InvoiceModal;