import { WishlistItemsList } from "@/features/app/wishlist/components/WishlistItemsList.tsx";
import { Flex, Title } from "@mantine/core";

export function WishlistPage() {

    return (
        <>
            <title>{ `Wishlist | TopMart` }</title>

            <Title ta="center" mb="md">
                Wishlist
            </Title>

            <Flex justify="center">
                <WishlistItemsList/>
            </Flex>
        </>
    );
}