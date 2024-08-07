import EntityForm from "@/components/EntityForm";
import { H2 } from "@/components/ui/typography";

const NewEntity = () => {
  return (
    <div>
      <H2>Create a New Entity</H2>
      <div className="w-2/3 p-3">
        <EntityForm />
      </div>
    </div>
  );
};

export default NewEntity;
