package com.chintanjethi.topmart.wishlist;

import com.chintanjethi.topmart.product.ProductResponse;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WishListItemResponse {

        private Integer id;

        private ProductResponse product;

        private ZonedDateTime addedAt;
}
