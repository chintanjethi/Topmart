package com.chintanjethi.topmart.order;

import com.chintanjethi.topmart.product.ProductCondition;
import com.chintanjethi.topmart.user.UserResponse;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemResponse {

    private Integer id;

    private OrderItemStatus status;

    private Integer productId;

    private Integer productQuantity;

    private String productName;

    private BigDecimal productPrice;

    private ProductCondition productCondition;

    private byte[] productImage;

    private UserResponse productSeller;
}
