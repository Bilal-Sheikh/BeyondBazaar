import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex flex-wrap justify-center items-center p-14">
			<Skeleton className="rounded-lg border-4 bg-inherit text-card-foreground w-full h-96 m-2 p-10">
				<Skeleton className="mb-10 h-10 w-5/6 rounded-full" />

				<Skeleton className="mb-10 h-10 w-3/5 rounded-full" />
				<Skeleton className="mb-10 h-10 w-3/5 rounded-full" />
				<Skeleton className="mb-10 h-10 w-3/5 rounded-full" />
			</Skeleton>
		</div>
	);
}
