interface CategoryItem {
	value: string;
	label: string;
}

interface CategorySection {
	[key: string]: CategoryItem[];
}

export const categories: CategorySection[] = [
	{
		clothing: [
			{
				value: "MENS_TOP_WEAR",
				label: "Men's Top Wear",
			},
			{
				value: "MENS_BOTTOM_WEAR",
				label: "Men's Bottom Wear",
			},
			{
				value: "WOMENS_TOP_WEAR",
				label: "Women's Top Wear",
			},
			{
				value: "WOMENS_BOTTOM_WEAR",
				label: "Women's Bottom Wear",
			},
			{
				value: "MENS_FOOTWEAR",
				label: "Men's Footwear",
			},
			{
				value: "WOMENS_FOOTWEAR",
				label: "Women's Footwear",
			},
			{
				value: "KIDS",
				label: "Kids",
			},
		],
	},
	{
		accessories: [
			{
				value: "WALLETS",
				label: "Wallets",
			},
			{
				value: "WATCHES",
				label: "Watches",
			},
			{
				value: "BELTS",
				label: "Belts",
			},
			{
				value: "BAGS",
				label: "Bags",
			},
			{
				value: "PERFUMES",
				label: "Perfumes",
			},
		],
	},
	{
		electronics: [
			{
				value: "GAMING",
				label: "Gaming",
			},
			{
				value: "POWERBANK",
				label: "Powerbank",
			},
			{
				value: "HEADPHONES",
				label: "Headphones",
			},
			{
				value: "MOBILE_ACCESSORIES",
				label: "Mobile Accessories",
			},
		],
	},
	{
		mobiles: [
			{
				value: "MOBILES",
				label: "Mobile",
			},
		],
	},
	{
		others: [
			{
				value: "OTHERS",
				label: "Others",
			},
		],
	},
];
