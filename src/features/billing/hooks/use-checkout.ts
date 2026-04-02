export function useCheckout() {
    return {
        checkout: () => {
            console.log("Checkout triggered");
        }
    };
}