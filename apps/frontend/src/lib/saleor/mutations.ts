import { gql } from '@apollo/client';

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($lineItems: [CheckoutLineInput!]!) {
    checkoutCreate(
      input: {
        channel: "default-channel"
        lines: $lineItems
        # We can add email and shipping address here if needed,
        # but for a COD-optimized flow, we might collect it later.
      }
    ) {
      checkout {
        id
        token
        lines {
          id
          quantity
          variant {
            id
            name
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CHECKOUT_SHIPPING = gql`
  mutation UpdateCheckoutShipping($checkoutId: ID!, $shippingAddress: AddressInput!) {
    checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
      checkout {
        id
        shippingAddress {
          firstName
          lastName
          phone
          city
          streetAddress1
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const COMPLETE_CHECKOUT = gql`
  mutation CompleteCheckout($checkoutId: ID!) {
    checkoutComplete(
      checkoutId: $checkoutId,
      # For COD, we might need a custom payment gateway setup in Saleor
      # or handle this via metadata.
      # paymentData: { gateway: "cod.gateway" }
      # This metadata is for internal use and will not be shown to the user.
      metadata: [
        { key: "paymentMethod", value: "COD" }
        # The supplierId and syncId would be added here
        # based on the items in the cart before calling this mutation.
        # { key: "supplierId", value: "some_supplier_id" }
      ]
    ) {
      order {
        id
        number
        status
      }
      errors {
        field
        message
      }
    }
  }
`;
