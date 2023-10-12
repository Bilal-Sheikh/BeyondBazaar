import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex flex-wrap justify-center items-center p-14">
			<Skeleton className="rounded-lg border text-card-foreground w-[300px] h-96 m-2" />
			<Skeleton className="rounded-lg border text-card-foreground w-[300px] h-96 m-2" />
			<Skeleton className="rounded-lg border text-card-foreground w-[300px] h-96 m-2" />
			<Skeleton className="rounded-lg border text-card-foreground w-[300px] h-96 m-2" />

			<Skeleton className="rounded-lg border text-card-foreground w-[300px] h-96 m-2" />
			<Skeleton className="rounded-lg border text-card-foreground w-[300px] h-96 m-2" />
			<Skeleton className="rounded-lg border text-card-foreground w-[300px] h-96 m-2" />
			<Skeleton className="rounded-lg border text-card-foreground w-[300px] h-96 m-2" />
		</div>
	);
}
