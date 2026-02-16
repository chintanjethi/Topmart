import { CartButtonGroup } from "@/components/ui/CartButtonGroup.tsx";
import { CustomLink } from "@/components/ui/link/CustomLink.tsx";
import { WishlistActionIcon } from "@/components/ui/WishlistActionIcon.tsx";
import { paths } from "@/config/paths.ts";
import { CartItemResponse, ProductResponse } from "@/types/api.ts";
import { PRODUCT_CONDITION } from "@/utils/constants.ts";
import { base64ToDataUri } from "@/utils/fileUtils.ts";
import appClasses from "@/styles/app.module.css";
import { Anchor, Badge, Box, Card, Flex, Image, Text, useMantineColorScheme } from "@mantine/core";
import { IconList, IconPackages, IconTool } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router";

type ProductCardProps = {
    product: ProductResponse,
    cartItem: CartItemResponse | undefined,
    inWishlist: boolean
    cartEnabled: boolean
    wishlistEnabled: boolean
};

export function ProductCard(
    { product, cartItem, inWishlist, cartEnabled, wishlistEnabled }: ProductCardProps
) {
    const { colorScheme } = useMantineColorScheme();
    const navigate = useNavigate();

    const displayedImage = product.images[0];
    const hasDiscount = product.previousPrice && product.previousPrice > product.price;

    return (
        <Card withBorder radius="md" w={ 300 } className={ appClasses.productCard } padding={0}>
            <Card.Section className={ appClasses.productImageWrap }>
                <Box pos="relative">
                    <Image
                        src={ base64ToDataUri(displayedImage.image, displayedImage.type) } alt="Product Image"
                        fit="contain" h={ 200 } p="xs"
                        bg={ colorScheme === "dark" ? "dark.4" : "gray.1" }
                        style={ { cursor: "pointer" } }
                        onClick={ () => navigate(paths.app.productDetails.getHref(product.id.toString())) }
                    />
                    { hasDiscount &&
                        <Badge
                            color="red" variant="filled" size="sm"
                            pos="absolute" top={8} right={8}
                            style={{ zIndex: 2 }}
                        >
                            { Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100) }% OFF
                        </Badge>
                    }
                    { product.availableQuantity === 0 &&
                        <Badge
                            color="dark" variant="filled" size="sm"
                            pos="absolute" top={8} left={8}
                            style={{ zIndex: 2 }}
                        >
                            Sold Out
                        </Badge>
                    }
                </Box>
            </Card.Section>

            <Box p="sm">
                <Anchor
                    size="md" lineClamp={ 2 } fw={600}
                    c="var(--mantine-color-text)"
                    component={ Link } to={ paths.app.productDetails.getHref(product.id.toString()) }
                    style={{ lineHeight: 1.4 }}
                >
                    { product.name }
                </Anchor>

                <Text size="xs" c="dimmed" mt={2}>
                    Sold by { " " }
                    <CustomLink to={ paths.app.productsByUser.getHref(product.seller.id.toString()) }>
                        { product.seller.name }
                    </CustomLink>
                </Text>

                <Flex mt="xs" gap={6} wrap="wrap">
                    <Badge variant="light" size="xs" color="gray" leftSection={<IconList size={10}/>}>
                        { product.category.name }
                    </Badge>
                    <Badge variant="light" size="xs" color="gray" leftSection={<IconTool size={10}/>}>
                        { PRODUCT_CONDITION[product.condition] }
                    </Badge>
                </Flex>

                <Flex align="center" mt={6} mb={4}>
                    <IconPackages size={14} style={{ opacity: 0.5 }}/>
                    <Text
                        span size="xs" ms={4}
                        c={ product.availableQuantity <= 3 ? "red.6" : "dimmed" }
                        fw={ product.availableQuantity <= 3 ? 600 : 400 }
                    >
                        { product.availableQuantity <= 0
                            ? "Out of stock"
                            : product.availableQuantity <= 3
                                ? `Only ${product.availableQuantity} left!`
                                : `${product.availableQuantity} available`
                        }
                    </Text>
                </Flex>

                <Flex
                    justify="space-between" align="center" pt="xs" mt="xs"
                    style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}
                >
                    <div>
                        <Text span size="xl" fw={ 700 }>
                            £{ product.price.toFixed(2) }
                        </Text>
                        { hasDiscount &&
                            <Text span size="sm" fw={ 400 } ms="xs" td="line-through" c="dimmed">
                                £{ product.previousPrice.toFixed(2) }
                            </Text>
                        }
                    </div>

                    <WishlistActionIcon
                        inWishlist={ inWishlist } productId={ product.id.toString() }
                        wishlistEnabled={ wishlistEnabled }
                        size={ 20 }
                    />
                </Flex>

                <Flex justify="space-between" align="center" mt="sm">
                    { product.availableQuantity > 0 ? (
                        <CartButtonGroup
                            cartItem={ cartItem } product={ product } cartEnabled={ cartEnabled }
                        />
                    ) : (
                        <Text c="red.6" size="sm" fw={500}>
                            Unavailable
                        </Text>
                    ) }

                    <Text c="dimmed" size="xs">
                        #{ product.id }
                    </Text>
                </Flex>
            </Box>
        </Card>
    );
}