import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex-col md:flex h-full">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2 border-b pb-4">
					<Skeleton className="rounded-lg border text-card-foreground w-96 h-10 m-2" />
				</div>

				<div className="flex flex-wrap justify-center items-center w-full">
					<Skeleton className="rounded-lg border text-card-foreground w-96 h-44 m-2" />
					<Skeleton className="rounded-lg border text-card-foreground w-96 h-44 m-2" />
					<Skeleton className="rounded-lg border text-card-foreground w-96 h-44 m-2" />
				</div>

				<div className="flex justify-center items-center w-full">
					<Skeleton className="rounded-lg border text-card-foreground w-full h-96 m-2" />
				</div>
			</div>
		</div>
	);
}
