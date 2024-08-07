import { buttonVariants } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
import { getUserId } from "@/lib/db/auth";
import { getEntityById } from "@/lib/db/entities";
import { Entity } from "@/lib/types";
import Link from "next/link";

const UnfountEntityPage = () => {
  return <div>Entity not found</div>;
};

const EntityPage = async ({
  params,
}: {
  params: { entityId: Entity["id"] };
}) => {
  const entity = await getEntityById(params.entityId);

  const userId = await getUserId();

  if (!entity) {
    return <UnfountEntityPage />;
  }

  const ownsEntity = entity.user_id === userId;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <H1>{entity.name}</H1>
          <P>{entity.description}</P>
        </div>
        <div className="flex gap-8 items-center">
          {ownsEntity && (
            <Link
              href={`/entities/${entity.id}/edit`}
              className={buttonVariants({ variant: "secondary" })}
            >
              Edit
            </Link>
          )}
          <Link
            href={entity.link}
            target="_blank"
            className={buttonVariants({ variant: "default" })}
          >
            Visit Website
          </Link>
        </div>
      </div>
      <hr className="my-8" />
      <div>Type: {entity.type}</div>
      <div>Created: {entity.created_at.toLocaleDateString()}</div>
    </div>
  );
};

export default EntityPage;
