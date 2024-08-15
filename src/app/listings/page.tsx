import { Button, buttonVariants } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getEntityById } from "@/lib/db/entities";
import { getAllListings, getListingsByEntity } from "@/lib/db/listings";
import { Entity, Listing, uuidRegex } from "@/lib/types";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Listings = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const entityId = searchParams.entityId;

  if (entityId && typeof entityId !== "string") {
    redirect("/listings");
  }

  if (entityId && !uuidRegex.test(entityId)) {
    redirect("/listings");
  }

  let listings: Listing[];
  let entity: Entity | undefined;

  if (!entityId) {
    listings = await getAllListings();
  } else {
    [entity, listings] = await Promise.all([
      getEntityById(entityId as string),
      getListingsByEntity(entityId as string),
    ]);

    if (!entity) {
      redirect("/listings");
    }
  }

  return (
    <div className="h-screen flex gap-8">
      <div className="w-2/3">
        <div>
          <CardHeader>
            <CardDescription>Showing all listings</CardDescription>
            <CardTitle className="text-4xl">
              {entityId ? `Listings for ${entity?.name}` : "Listings"}
            </CardTitle>
            <CardDescription>
              Listings are any sponsorships that you can apply for.
            </CardDescription>
            <div className="flex gap-2">
              <Link
                href="/my-listings"
                className={buttonVariants({ variant: "secondary" })}
              >
                My Listings
              </Link>
              <SignedOut>
                <SignInButton>
                  <Button variant={"default"}>Sign in</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/listings/new"
                  className={buttonVariants({ variant: "default" })}
                >
                  Create Listing
                </Link>
              </SignedIn>
            </div>
          </CardHeader>
        </div>
        {listings &&
          listings.map((listing) => (
            <div
              key={listing.id}
              className="p-4 border-b flex items-center justify-between"
            >
              <Link
                href={`/listings/${listing.id}`}
                className="flex items-center space-x-4"
              >
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className="dark:invert"
                  width={50}
                  height={50}
                  priority
                />
                <div>
                  <p className="text-sm font-medium">{listing.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {listing.description}
                  </p>
                </div>
              </Link>
              <div className="ml-auto text-right">
                <Link
                  href={`/listings/${listing.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  View Listing
                </Link>
              </div>
            </div>
          ))}
      </div>

      <div className="w-1/3"></div>
    </div>
  );
};

export default Listings;
