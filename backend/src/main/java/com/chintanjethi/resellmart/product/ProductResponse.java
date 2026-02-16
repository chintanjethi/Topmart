package com.chintanjethi.topmart.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.chintanjethi.topmart.category.CategoryResponse;
import com.chintanjethi.topmart.user.UserResponse;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductResponse {

    private Integer id;

    private String name;

    private String description;

    private BigDecimal price;

    private BigDecimal previousPrice;

    private ProductCondition condition;

    private Integer availableQuantity;

    private ZonedDateTime listedAt;

    private Boolean isDeleted;

    private List<ProductImageResponse> images;

    private CategoryResponse category;

    private UserResponse seller;
}
