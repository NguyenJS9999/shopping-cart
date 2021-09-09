import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './shopping-cart.css';
import { PaymentElement } from './payment';
import { DATA_ITEMS } from './mock-data'

export function Cart() {

    const [ stateDataItems, setDataItems] = useState( [...DATA_ITEMS] );
    const [ stateCssButtonDelete, setCssButtonDelete] = useState( false );
    const [ stateCssButtonContinueBuy, setCssButtonContinueBuy] = useState( true );
    const [ stateUpdateTotalMoney, setUpdateTotalMoney] = useState( null );

    
    const dataLength = DATA_ITEMS.length;

    // Tăng
    function addProductNumber( event, id ) { console.log('Tăng')
        let cloneDataItems = stateDataItems.map( (obj) => ( {...obj}) );

        cloneDataItems.forEach( (item)=> {
            if(item.id === id){
                item.quantity += 1
            }
        });
        console.log('cloneDataItems', cloneDataItems)
        setDataItems(cloneDataItems)
        // Truyền obj data mới vào state-truyền snag payment
        setUpdateTotalMoney(cloneDataItems)
    }
    // Giảm
    function reduce_product_number( event, id ) { console.log('Giảm')
        let cloneDataItems = stateDataItems.map( (obj) => ( {...obj}) );
        cloneDataItems.forEach( ( item) => {
            if ( item.id === id ) {
                item.quantity -= 1
            }
        }) 
        console.log('cloneDataItems', cloneDataItems)
        setDataItems(cloneDataItems);
        // Truyền obj data mới vào state-truyền snag payment
        setUpdateTotalMoney(cloneDataItems);

        
    }
    // Lấy giá trị ô input số lượng item
    function valueInputQuantity(event, id) {
        let valueInputQuantity = event.target.value;
        let cloneDataItems; 
        
        if ( valueInputQuantity > 0 &&  valueInputQuantity <= 100 )  {
            cloneDataItems = stateDataItems.map( (obj) => ( {...obj}) );
            cloneDataItems.forEach( ( item ) => {
                if ( item.id === id ) {
                    item.quantity = parseInt( valueInputQuantity );
                }
            })
        } else {
            return;
        }     
        setDataItems(cloneDataItems)
        // Truyền obj data mới vào state-truyền snag payment
        setUpdateTotalMoney(cloneDataItems)
    }

    // Xóa
    function deleteItem(id) {
        console.log('Xóa 1 sản phẩm đó id: ', id);
        let deletedItem = stateDataItems.filter( (item) => item.id !== id);
        console.log('Sau xóa còn deletedItem', deletedItem)   
        setDataItems( deletedItem );
       
    }

    // let deletedItem2 = stateDataItems.filter( function delete() );
    // function delete( (item) => item.id !== id )  

    // Xóa tất cả các item
    function deleteAllItems() { 
        // let deleteAllItem = [...DATA_ITEMS].filter( (item) => item.id === id );   
        // setDataItems(deleteAllItem)
        let deleteItem =  [...stateDataItems].splice( 1, 0 );
        console.log('Xóa tất cả các Item deleteItem', deleteItem)
        setDataItems( deleteItem )
        console.log('stateDataItems sau xóa tất cả', stateDataItems);
        
        if ( dataLength <= 0) {
            setCssButtonDelete(false)
            setCssButtonContinueBuy(true)
        } else {
            setCssButtonDelete(true)
            setCssButtonContinueBuy(false)
        }
    }
    // Tiếp tục mua sắm
    function continueShopping() {
        console.log('Tiếp tục mua hàng, reset lại sản phẩm về ban đầu');
        // window.location.reload();
        let dataItem = [...DATA_ITEMS];
        setDataItems(dataItem)
        setCssButtonDelete(false);
        setCssButtonContinueBuy(true)
    }

    const cartItemElement = stateDataItems.map( (cart_item ) => 

        <div  key = { cart_item.id }
            className=   {` cart-item   `} >
            {/* Ảnh sp */}
            <span className=" cart-item-product-image ">
                <img src={ cart_item.image_product } alt="sound" />
            </span>
        
            {/* Tên sp */}
            <span> { cart_item.name_product } </span>
            {/* Giảm tăng số lượng sp */}
            <span className="custom-number">
                <i onClick= { (event) => reduce_product_number( event, cart_item.id ) } className="fas fa-minus" />
                
                {/* Ô nhập số lượng sản phẩm */}
                <input 
                    onChange = { (event) => valueInputQuantity(event, cart_item.id ) }
                    value = { cart_item.quantity }
                    
                    className="custom-number-input" type="number"  
                /> 
                
                <i onClick= { (event) => addProductNumber( event, cart_item.id ) } className="fas fa-plus" /> 
            </span>
            {/* Đơn giá sp    */}
            <span> { ( cart_item.price_product.toLocaleString() ) } VNĐ </span>
            {/* Thànhs tiền */}
            <span> { (cart_item.price_product * cart_item.quantity ).toLocaleString() } VNĐ</span>

            {/* Nút xóa */}
            <span onClick = { () => deleteItem( cart_item.id ) }
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
                
                <span> SẢN PHẨM&nbsp;
                    <small className="cart-title-number-items">
                       ({DATA_ITEMS.length}) 
                    </small> 
                </span>
                <span>TÊN SẢN PHẨM</span>
                <span>SỐ LƯỢNG</span>
                <span>ĐƠN GIÁ</span>
                <span>THÀNH TIỀN</span>
                {/* Recbin */}
                <span style={{visibility: 'hidden'}}> <i className="fas fa-trash-alt" /> </span>
                </div>
                {/* Cart Item */}
                { stateDataItems.length > 0  ? (cartItemElement) : (<p className="cart-feedback">Giỏ hàng không còn sản phẩm nào!</p>)  }

                
                <div className=" cart-button-buy-delete-all ">

                    <div onClick= { continueShopping }> 
                        <span className= {`${stateCssButtonContinueBuy ? 'd-none' : 'd-flex' } button-buy`} type="button"> TIẾP TỤC MUA HÀNG </span> 
                    </div>

                    <span onClick= { deleteAllItems }
                        className= {` ${ stateCssButtonDelete ? 'd-none' : 'd-flex'} button-delete-all `}  
                        type="button" > 
                        XÓA TOÀN BỘ 
                    </span>
                
                </div>
            
            </section>

            {/* totalAmount = {stateTotalAmount} */}
            <PaymentElement stateCssButtonContinueBuy = {stateUpdateTotalMoney} />
            </>
    )
}

