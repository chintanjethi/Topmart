import { WishlistItemsList } from "@/features/app/wishlist/components/WishlistItemsList.tsx";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Text, Title } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

export function WishlistPage() {

    return (
        <>
            <title>{ `Wishlist | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerWishlist}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconHeart size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        My Wishlist
                    </Title>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Keep track of products you love. Add items to your cart when you're ready to purchase.
                </Text>
            </Box>

            <Flex justify="center">
                <WishlistItemsList/>
            </Flex>
        </>
    );
}