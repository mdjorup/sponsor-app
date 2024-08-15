import { Button, buttonVariants } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllEntities } from "@/lib/db/entities";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Entities = async () => {
  const entities = await getAllEntities();

  return (
    <div className="h-screen flex gap-8">
      <div className="w-2/3">
        <div>
          <CardHeader>
            <CardDescription>Showing all entities</CardDescription>
            <CardTitle className="text-4xl">Entities</CardTitle>
            <CardDescription>
              Entities are the main objects in Sponsor Hunt. They represent the
              projects that you are looking to sponsor.
            </CardDescription>
            <div className="flex gap-2">
              <Link
                href="/listings"
                className={buttonVariants({ variant: "secondary" })}
              >
                Go to Listings
              </Link>
              <SignedOut>
                <SignInButton>
                  <Button variant={"default"}>Sign in</Button>
                </SignInButton>
              </SignedOut>
            </div>
          </CardHeader>
        </div>
        {entities &&
          entities.map((entity) => (
            <div
              key={entity.id}
              className="p-4 border-b flex items-center justify-between"
            >
              <Link
                href={`/entities/${entity.id}`}
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
                  <p className="text-sm font-medium">{entity.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {entity.description}
                  </p>
                </div>
              </Link>
              <div className="ml-auto text-right">
                <Link
                  href={`/listings?entityId=${entity.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  View Listings
                </Link>
              </div>
            </div>
          ))}
      </div>

      <div className="w-1/3"></div>
    </div>
  );
};

export default Entities;
