import { Button, buttonVariants } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllListings } from "@/lib/db/listings";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Listings = async () => {
  const listings = await getAllListings();

  return (
    <div className="h-screen flex gap-8">
      <div className="w-2/3">
        <div>
          <CardHeader>
            <CardDescription>Showing all listings</CardDescription>
            <CardTitle className="text-4xl">Listings</CardTitle>
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
