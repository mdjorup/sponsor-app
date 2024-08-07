import { currentUser } from "@clerk/nextjs/server";
import { query } from "../pool";
import { User } from "../types";

export const getUserEmail = async () => {
  const user = await currentUser();

  return user?.emailAddresses[0].emailAddress;
};

export const createNewUser = async () => {
  const userEmail = await getUserEmail();

  if (!userEmail) {
    throw new Error("User not found");
  }

  await query<User>(`insert into users (email) values ($1)`, [userEmail]);
};

export const verifyUserInDatabase = async () => {
  const userEmail = await getUserEmail();

  if (!userEmail) {
    throw new Error("User not found");
  }

  const userResponse = await query<User>(
    `select * from users where email = $1`,
    [userEmail],
  );

  if (userResponse.rowCount === 0) {
    await createNewUser();
  }
};
