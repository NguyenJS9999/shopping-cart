import './payment.css'
import React, {  useEffect, useState } from "react";

// {totalAmount}
export function PaymentElement( {updateTotalMoney} ) {
    const [ stateTotalAmount, setTotalAmount] = useState( 0 );
    let grossMoney = stateTotalAmount + (stateTotalAmount * 0.1);

    useEffect( () => { console.log('Chạy useffect');
        let sumMoney = 0;
        for ( let i = 0; i <  updateTotalMoney.length; i++ ) {
            sumMoney += ( updateTotalMoney[i].price_product *  updateTotalMoney[i].quantity )
        } 
        setTotalAmount( sumMoney )
        
    }, [setTotalAmount, updateTotalMoney]);

    return (
        <section className=" payment-container  container ">
            <div className=" payment-title "> THANH TOÁN </div>
            <div className=" count-money ">
            <span className=" total-money ">
                <b>Tổng tiền</b>
                <div className=" total-money-number "> {stateTotalAmount.toLocaleString()} VNĐ </div>
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
                <b>Thành tiền sau thuế</b>
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
