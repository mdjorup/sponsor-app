import { verifyUserInDatabase } from "@/lib/db/auth";
import { redirect } from "next/navigation";

const VerifyAccount = () => {
  verifyUserInDatabase();

  redirect("/");
};

export default VerifyAccount;
