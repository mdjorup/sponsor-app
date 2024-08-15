import NewListingEntitySelector from "@/components/NewListingEntitySelector";
import NewListingForm from "@/components/NewListingForm";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserId } from "@/lib/db/auth";
import { getEntityById } from "@/lib/db/entities";
import { Entity, uuidRegex } from "@/lib/types";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const NewListingPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const userId = (await getUserId()) as string;

  const entityId = searchParams.entityId;

  // assert entityId is a string
  if (entityId && typeof entityId !== "string") {
    redirect("/listings");
  }

  // check that the uuid is valid

  if (entityId && !uuidRegex.test(entityId)) {
    redirect("/listings");
  }

  let entity: Entity | undefined;

  if (entityId) {
    entity = await getEntityById(entityId as string);
    if (entity?.user_id !== userId) {
      redirect("/listings");
    }
  }

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-4xl">New Listing</CardTitle>
        <CardDescription>
          Create a listing to start an auction for you sponsorship opportunity.
        </CardDescription>
      </CardHeader>
      <hr className="my-4" />
      <div className="px-8">
        {!entity ? (
          <Suspense>
            <NewListingEntitySelector />
          </Suspense>
        ) : (
          <NewListingForm entity={entity} />
        )}
      </div>
    </div>
  );
};

export default NewListingPage;
