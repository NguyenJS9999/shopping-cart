import './payment.css'

export function PaymentElement( {totalAmount} ) {
    let grossMoney = totalAmount - totalAmount * 0.1;

    return (
        <section className=" payment-container  container ">
            <div className=" payment-title "> THANH TOÁN </div>
            <div className=" count-money ">
            <span className=" total-money ">
                <b>Tổng tiền</b>
                <div className=" total-money-number "> {totalAmount.toLocaleString()} VNĐ </div>
            </span>
            {/*  */}
            <div className="border-bottom" />
            <span className=" tax-avt ">
                <b>Thuế VAT</b>
                <div>10%</div>
            </span>
            {/*  */}
            <div className="border-bottom" />
            <span className="into-money">
                <b>Thành tiền</b>
                <div className="into-money-number"> {grossMoney.toLocaleString()} VNĐ</div>
            </span>
            </div> {/* count-money */}
            <span className=" make-payment ">
            <div className="make-payment-button" >
                <i className="fas fa-hand-holding-usd" /> &nbsp;TÍNH TỔNG TIỀN SAU THUẾ
            </div>
            </span>
        </section> 

    )
}
