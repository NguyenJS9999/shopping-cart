
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './shopping-cart.css';
// import { PaymentElement } from './payment';

const DATA_ITEMS = [
    {
        id: 1,
        image_product: 'https://product.hstatic.net/1000367569/product/sub_pcs_318nb_c6dba44f27aa4fbcaa77210701c481db_master.jpg',
        name_product: 'PCS 318NB',
        price_product: 65200000,
        quantity: 1,
    },
    {
        id: 2,
        image_product: 'https://www.nexo-sa.com/wp-content/uploads/ls18-e1476457570490.jpg',
        name_product: 'LS18',
        price_product: 89612600,
        quantity: 2,
    },
    
]

export function PaymentElement( {totalAmount} ) {


    return (
        <section className=" payment-container  container ">
            <div className=" payment-title "> THANH TOÁN </div>
            <div className=" count-money ">
            <span className=" total-money ">
                <b>Tổng tiền</b>
                {/* 195,600,000 */}
                <div className=" total-money-number ">{totalAmount.toLocaleString()} VNĐ</div>
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

export function Cart() {

    const [ stateDataItems, setDataItems] = useState( [...DATA_ITEMS] );
    const [ stateTotalAmount, setTotalAmount] = useState( 195600000 );

    // Tăng
    function addProductNumber( event, id ) { console.log('Tăng')
        // clone state, để dễ dàng chỉnh sửa giá trị
        let cloneDataItems =[...stateDataItems]
        cloneDataItems.forEach( (item, index)=> {
            if(item.id === id){
                item.quantity += 1
            }
        });
        // set lại giá trị state với giá trị mới là clone,
        setDataItems(cloneDataItems)
    }
    // Giảm
    function reduce_product_number( event, id ) { console.log('Giảm')
        let cloneDataItems = [...stateDataItems]
        cloneDataItems.forEach( ( item, index) => {
            if ( item.id === id ) {
                item.quantity -= 1
            }
        }) 
        setDataItems(cloneDataItems)
    }
    // Lấy giá trị ô input
    function valueInputQuantity(event, id) {
        let valueInputQuantity = event.target.value;
        let cloneDataItems 
        
        if ( valueInputQuantity > 0 &&  valueInputQuantity <= 100 )  {
            cloneDataItems = [...stateDataItems];
            cloneDataItems.forEach( ( item ) => {
                if ( item.id === id ) {
                    item.quantity = parseInt( valueInputQuantity );
                }
            })
        } else {
            return;
        }     
        setDataItems(cloneDataItems)
    }
    // Xóa
    function delete_item( id ) { console.log('Xóa 1 sản phẩm đó id: ', id);
        let deleteItem = [...DATA_ITEMS].filter( (item) => item.id !== id );   

        console.log('deleteItem', deleteItem)
        
        setDataItems(deleteItem)
    }

    const cartItemElement = DATA_ITEMS.map( ( cart_item, id ) => 

        <div  key = { cart_item.id }
            className=   {` cart-item   `} >
            {/* Chọn sp */}
            <span> <input type="checkbox" defaultValue /> </span>
        
            {/* Ảnh sp */}
            <span className=" cart-item-product-image ">
                <img src={ cart_item.image_product } alt="sound" />
            </span>
        
            {/* Tên sp */}
            <span> { cart_item.name_product } </span>

            {/* Đơn giá sp    */}
            <span> { ( cart_item.price_product.toLocaleString() ) } VNĐ </span>

            {/* Giảm tăng số lượng sp */}
            <span className="custom-number">
                <i onClick= { (event) => reduce_product_number( event, cart_item.id ) } className="fas fa-minus" />
                
                {/* quantity_product  stateNumberProducts */}
                <input onChange = { (event) => valueInputQuantity(event, cart_item.id ) }
                    value = { cart_item.quantity }
                    className="custom-number-input" type="number"  /> 
                
                <i onClick= { (event) => addProductNumber( event, cart_item.id ) } className="fas fa-plus" /> 
            </span>

            {/* Tổng tiền */}
            <span> { (cart_item.price_product * cart_item.quantity ).toLocaleString() } VNĐ</span>

            {/* Nút xóa */}
            <span onClick = { () => delete_item( cart_item.id ) }
                className= {` delete-one  `} type="button" > 
                <i className="fas fa-trash-alt " /> 
            </span>

        </div>    
    )
    
    

    return (
        <>
            <section className=" cart-container   container ">
                <div className="cart-container-page-title-container   container-fluid ">
                    Giỏ hàng của bạn
                </div>

                <div className="cart-title">
                <span> <input type="checkbox" defaultValue /> </span>
                <span> SẢN PHẨM&nbsp;<span className="cart-title-number-items"><small> ({DATA_ITEMS.length}) </small></span> </span>
                <span> TÊN SẢN PHẨM</span>
                <span>ĐƠN GIÁ</span>
                <span>SỐ LƯỢNG</span>
                <span>THÀNH TIỀN</span>
                {/* Recbin */}
                <span style={{visibility: 'hidden'}}> <i className="fas fa-trash-alt" /> </span>
                </div>
                {/* Cart Item */}
                { cartItemElement }

                
                <div className=" cart-button-buy-delete-all ">
                <a href="./product.html"> <span className="button-buy" type="button"> TIẾP TỤC MUA HÀNG </span> </a>
                <span className="button-delete-all" type="button" > XÓA TOÀN BỘ </span>
                </div>
            
            </section>

            <PaymentElement totalAmount = {stateTotalAmount}
             />





            </>
    )
}

