
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './shopping-cart.css';

const DATA_ITEM = [
    {
        id: 1,
        image_product: 'https://www.4-acoustic.com/assets/images/d/PCS-318NB-01-867d001e.png',
        name_product: 'PCS 318NB',
        price_product: 65200000,
        number_product: 1,
    },
    {
        id: 2,
        image_product: 'https://www.nexo-sa.com/wp-content/uploads/ls18-e1476457570490.jpg',
        name_product: 'LS18',
        price_product: 89612600,
        number_product: 1,
    },
    
]

// const NUMBER_PRODUCT = [1, 2];

export function Cart() {
    // const [ state, set ] = useState( [...DATA_ITEM] )
    // Số lượng mỗi sản phẩm
    const [ stateNumberProducts, setNumberProducts ] = useState( 1 );
    // Gán Css xóa,
    const [ stateDelProduct, setDelProduct ] = useState( false );


    // ko truyền tham số, tải lại mỗi khi app chạy lại
    useEffect( () => {
    }); 

    // Tăng
    function addProductNumber( event, index ) {  console.log('Tăng số lượng sản phẩm index: ', index);
        let numberItem = stateNumberProducts;  console.log('number_product', numberItem)
       
        setNumberProducts( numberItem + 1 );
    }
    // Giảm
    function reduce_product_number( event, index ) { console.log('Tăng số lượng sản phẩm index:', index);
        let numberItem = stateNumberProducts; console.log('number_product', numberItem)
        setNumberProducts( numberItem - 1 );
    }
    // Xóa
    function delete_item( event, index ) {
        console.log('Xóa 1 sản phẩm đó index: ', index);
        setDelProduct( false );
    }

    const cartItemElement = DATA_ITEM.map( ( cart_item, id ) => 

        <div  key = { cart_item.id }
            className=   {`  ${stateDelProduct &&  id ? 'd-none' : 'd-flex'}  cart-item   `} >

            <span> <input type="checkbox" defaultValue /> </span>
        
            <span className=" cart-item-product-image ">
                <img src={ cart_item.image_product } alt="sound" />
            </span>
        
            <span> { cart_item.name_product } </span>

            <span> { (cart_item.price_product.toLocaleString('vi-VN')) } đ </span>
        
            <span className="custom-number">
                <i onClick= { (event) => reduce_product_number( event, id ) } className="fas fa-minus" />
                
                <input className="custom-number-input" type="text" Value = { stateNumberProducts } />
                
                <i onClick= { (event) => addProductNumber( event, id ) } className="fas fa-plus" /> 
            </span>

            <span> { (cart_item.price_product * stateNumberProducts ).toLocaleString('vi-VN') } đ</span>
        
            <span onClick = { (event) => delete_item( event, id ) }
                className= {` delete-one  `} type="button" > 
                <i className="fas fa-trash-alt " /> 
            </span>
        </div>    

    
    )
    

    return (
        <section className=" cart-container   container ">
            <div className="cart-container-page-title-container   container-fluid ">
                Giỏ hàng của bạn
            </div>

            <div className="cart-title">
              <span> <input type="checkbox" defaultValue /> </span>
              <span> SẢN PHẨM&nbsp;<span className="cart-title-number-items"><small> ({DATA_ITEM.length}) </small></span> </span>
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
        
    )
}

