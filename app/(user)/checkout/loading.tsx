import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="pt-10 px-5 w-full h-full">
			<h2 className="mt-10 scroll-m-20 border-b pb-3 text-3xl font-bold tracking-tight transition-colors first:mt-0">
				<Skeleton className="rounded-lg border text-card-foreground w-full h-20 m-2" />
			</h2>

			<div className="flex flex-1 pt-5 gap-4">
				<div className="w-2/3">
					<div className="py-3">
						<Skeleton className="rounded-lg border text-card-foreground w-full h-20 m-2" />
						<Skeleton className="rounded-lg border text-card-foreground w-full h-20 m-2" />
						<Skeleton className="rounded-lg border text-card-foreground w-full h-20 m-2" />
						<Skeleton className="rounded-lg border text-card-foreground w-full h-20 m-2" />
					</div>
				</div>

				<div className="w-1/3">
					<div className="py-3">
						<Skeleton className="rounded-lg border text-card-foreground w-full h-96 m-2" />
					</div>
				</div>
			</div>
		</div>
	);
}
