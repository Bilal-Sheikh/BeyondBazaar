import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="px-10 py-20">
			<section className="grid grid-cols-2 gap-10">
				<div>
					<AspectRatio ratio={1 / 1}>
						<Skeleton className="h-full w-full" />
					</AspectRatio>
				</div>

				<div>
					<div>
						<Skeleton className="h-60 w-full" />
					</div>
					<div className="mt-8">
						<Skeleton className="h-20 w-1/2" />
					</div>

					<div className="mt-8">
						<Skeleton className="my-2 h-7 w-full" />
						<Skeleton className="my-2 h-7 w-full" />
						<Skeleton className="my-2 h-7 w-full" />
						<Skeleton className="my-2 h-7 w-full" />
						<Skeleton className="my-2 h-7 w-full" />
					</div>
				</div>
			</section>
		</div>
	);
}
