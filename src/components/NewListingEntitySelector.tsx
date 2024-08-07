import { getUserEntities } from "@/lib/db/entities";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const NewListingEntitySelector = async () => {
  const entities = await getUserEntities();

  return (
    <div>
      {entities && entities.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {entities.map((entity) => (
            <Card key={entity.id}>
              <CardHeader>
                <CardDescription>
                  {capitalizeFirstLetter(entity.type)}
                </CardDescription>
                <CardTitle className="text-4xl">{entity.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{entity.description}</CardDescription>
              </CardContent>
              <CardFooter className="">
                <Link
                  href={`/listings/new?entityId=${entity.id}`}
                  className={buttonVariants({ variant: "default" })}
                >
                  Create Listing
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <p>You dont have any entities. Create a new Entity to get started </p>
          <Link
            href={"/entities/new"}
            className={buttonVariants({ variant: "default" })}
          >
            Create New Entity
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewListingEntitySelector;
