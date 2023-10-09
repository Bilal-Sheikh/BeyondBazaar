import React from "react";

export default function Failure() {
	return (
		<div className="py-10 px-5 w-full h-full lg:h-screen">
			<div className="flex flex-auto justify-between items-center pb-3">
				<p className="text-center text-4xl font-bold tracking-tight	transition-colors">
					Payment <p className=" text-red-700">Failed</p>
				</p>
			</div>

			<div className="flex flex-col lg:flex-row justify-center items-center pt-10 gap-5 lg:gap-20">
				<p>Your Payment Id : {paymentId}</p>
				<p>Your Order Id : {orderId}</p>
			</div>
		</div>
	);
}
