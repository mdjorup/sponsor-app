import { createNewUser } from "@/lib/db/auth";
import { redirect } from "next/navigation";

const CreateAccount = async () => {
  await createNewUser();

  redirect("/");
};

export default CreateAccount;
