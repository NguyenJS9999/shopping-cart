import './payment.css'
import React, {  useEffect, useState } from "react";
// import { DATA_ITEMS } from './mock-data'

// {totalAmount}
export function PaymentElement( {stateCssButtonContinueBuy} ) {
    // const [ stateDataItems, setDataItems] = useState( [...DATA_ITEMS] );
    const [ stateTotalAmount, setTotalAmount] = useState( 0 );
    let grossMoney = stateTotalAmount + (stateTotalAmount * 0.1);

    // Data deep copy sau thay đổi số lượng item

    useEffect( () => {
        let totalAmounts = [ ];
        let totalUnitPrice;
        // [...DATA_ITEMS].map( getMoney )
        [...stateCssButtonContinueBuy].map( getMoney )

        function getMoney (item) {   
            // console.log('Đơn giá item', item.price_product )
            // console.log('Số lượng sp đó', item.quantity )
            
            totalUnitPrice = (item.price_product) * (item.quantity)
            // console.log( '1 tổng đơn giá', totalUnitPrice )
            totalAmounts.push( totalUnitPrice );
        } 
        
        // console.log('Mảng các đơn giá', totalAmounts)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let sumMoney = totalAmounts.reduce( reducer ) ;
        // let sumMoney = 0;
        // for ( let i = 0; i <  totalAmounts.length; i++ ) {
        //     sumMoney += totalAmounts[i]
        // } 
        // console.log('sumMoney', sumMoney);
        setTotalAmount( sumMoney )
    }, [setTotalAmount, stateCssButtonContinueBuy]);

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
