
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './shopping-cart.css';
import { PaymentElement } from './payment';

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
    {
        id: 3,
        image_product: 'https://product.hstatic.net/1000367569/product/sub_pcs_218_bk_200d595b6d5c4faea5437d34a2ef63fa_master.jpg',
        name_product: 'PCS 218BK',
        price_product: 33000000,
        quantity: 3,
    },
  
]



export function Cart() {

    const [ stateDataItems, setDataItems] = useState( [...DATA_ITEMS] );
    // Tổng tiền các sản phẩm muốn mua - Hiên chưa cộng dồn được
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
    function delete_item(id) {
        console.log('Xóa 1 sản phẩm đó id: ', id);
        let deletedItem = [...DATA_ITEMS].filter((item) => item.id !== id);
        console.log('Sau xóa còn deletedItem', deletedItem)   
        setDataItems( deletedItem );
      }

    // Xóa tất cả các item
    function deleteAllItems() { 
        // let deleteAllItem = [...DATA_ITEMS].filter( (item) => item.id === id );   
        // setDataItems(deleteAllItem)
        let deleteItem =  [...DATA_ITEMS].splice( 0, DATA_ITEMS.length  );
        console.log('Xóa tất cả các Item deleteItem', deleteItem)
        setDataItems([...DATA_ITEMS].splice( 0, DATA_ITEMS.length  ))
    }
    // Tiếp tục mua sắm
    function continueShopping() {
        console.log('Tiếp tục mua hàng, reset lại sản phẩm về ban đầu');
        window.location.reload();
        let dataItem = [...DATA_ITEMS];
        setDataItems(dataItem)
    }

    // let totalValue = DATA_ITEMS.map( ( cart_item)  => {
    //     console.log('cart_item.price_product', cart_item.price_product);
    //     let total
    // });
    // console.log('totalValue', totalValue)
    // setTotalAmount(totalValue)
    // cart_item.price_product * cart_item.quantity

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

            {/* Thànhs tiền */}
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
                <span> 
                    <input type="checkbox" defaultValue /> 
                </span>
                
                <span> SẢN PHẨM&nbsp;
                    <small className="cart-title-number-items">
                       ({DATA_ITEMS.length}) 
                    </small> 
                </span>
                
                <span> TÊN SẢN PHẨM</span>
                
                <span>ĐƠN GIÁ</span>
                
                <span>SỐ LƯỢNG</span>
                
                <span>THÀNH TIỀN</span>
                {/* Recbin */}
                <span style={{visibility: 'hidden'}}> <i className="fas fa-trash-alt" /> </span>
                </div>
                {/* Cart Item */}
                { stateDataItems.length > 0  ? (cartItemElement) : (<p className="cart-feedback">Không tìm thấy sản phẩm phù hợp!</p>)  }

                
                <div className=" cart-button-buy-delete-all ">
                    <div onClick= { continueShopping }> 
                        <span className="button-buy" type="button"> TIẾP TỤC MUA HÀNG </span> 
                    </div>

                    <span onClick= { deleteAllItems }
                        className="button-delete-all" type="button" > XÓA TOÀN BỘ </span>
                
                </div>
            
            </section>

            <PaymentElement totalAmount = {stateTotalAmount}/>
            </>
    )
}

