This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About this project

This e-commerce website is designed to offer a comprehensive shopping experience to users. Customers can browse, select, and purchase products with the assurance of a secure payment gateway. They have the ability to add products to their carts and make hassle-free transactions.

On the other hand, sellers have the capability to manage their product listings. They can add new products, edit existing listings, update their inventory, and remove products as needed. Additionally, the platform empowers sellers to keep a close watch on their sales and effectively track their performance and revenue.

## Project functioning

For users:
- View all products, choose by category, or search for a product.
- Sort the products based on price and date.
- Add product to cart.
- Customize your cart.
- Purchase a single product or whole cart.
- View transaction and order history.
- Manage your personal account.

For Sellers:
- Add a new product.
- Update your product's inventory and other details.
- Delete a product.
- Track and manage your sales, and take immediate action.

Tech Stack: 
- Next JS 13
- Clerk JS
- Prisma ORM
- PostgreSQL Database
- Shadcn UI
- Tailwind CSS
- Razorpay
- Zod
- TypeScript

# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# How to Test Purchase? 

This project uses Razorpay, an international/domestic(Indian) payment gateway that provides all the payment methods.

Using credit cards(https://razorpay.com/docs/payments/payments/test-card-details/) - Razorpay provides fake cards for both Indian and International cards. Remember to put any random CVV and any future date
## Test Card for Indian Payments
            Mastercard : 5267 3181 8797 5449
            Visa : 	4111 1111 1111 1111	

## Test Card for International Payments
          Mastercard  5555 5555 5555 4444
                      5105 1051 0510 5100	

          Visa        4012 8888 8888 1881
                      5104 0600 0000 0008
                      
# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
