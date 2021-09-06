import './payment.css'

export function PaymentElement() {
    return (
        <section className=" payment-container  container ">
            <div className=" payment-title "> THANH TOÁN </div>
            <div className=" count-money ">
            <span className=" total-money ">
                <b>Tổng tiền</b>
                <div className=" total-money-number ">195,600,000đ</div>
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
                <div className="into-money-number">197,556,000đ</div>
            </span>
            </div> {/* count-money */}
            <span className=" make-payment ">
            <a className="make-payment-button" href="./check-out.html">
                <i className="fas fa-hand-holding-usd" /> &nbsp;TIẾN HÀNH THANH TOÁN
            </a>
            </span>
        </section> 

    )
}