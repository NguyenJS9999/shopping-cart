
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './shopping-cart.css';

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

// const NUMBER_PRODUCT = [1, 2];

export function Cart() {

    const [ stateDataItems, setDataItems] = useState( [...DATA_ITEMS] )

    // Số lượng mỗi sản phẩm
    // Chỗ này không cần, vì mình sẽ sửa số lượng sản phẩm trực tiếp ở state, hoặc biến DATA_ITEM
    const [ stateNumberProducts, setNumberProducts ] = useState( 1 );
    
    // Gán Css xóa,
    const [ stateDelProduct, setDelProduct ] = useState( false );

    // ko truyền tham số, tải lại mỗi khi app chạy lại
    useEffect( () => {
    }); 
    // Tăng
    function addProductNumber( event, id ) {
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
    function reduce_product_number( event, id ) {
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
    function delete_item( event, id ) {
        console.log('Xóa 1 sản phẩm đó id: ', id);
        setDelProduct( false );

        let deleteItem = [...DATA_ITEMS].filter( (item) => item.id === id );


        console.log('deleteItem', deleteItem)

    }




    const cartItemElement = DATA_ITEMS.map( ( cart_item, id ) => 

        <div  key = { cart_item.id }
            className=   {`  ${stateDelProduct &&  id ? 'd-none' : 'd-flex'}  cart-item   `} >
            {/* Chọn sp */}
            <span> <input type="checkbox" defaultValue /> </span>
        
            {/* Ảnh sp */}
            <span className=" cart-item-product-image ">
                <img src={ cart_item.image_product } alt="sound" />
            </span>
        
            {/* Tên sp */}
            <span> { cart_item.name_product } </span>

            {/* Đơn giá sp    */}
            <span> { ( cart_item.price_product.toLocaleString('vi-VN') ) } VNĐ </span>

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
            <span> { (cart_item.price_product * stateNumberProducts ).toLocaleString('vi-VN') } VNĐ</span>

            {/* Nút xóa */}
            <span onClick = { (event) => delete_item( event, cart_item.id ) }
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
        
    )
}

