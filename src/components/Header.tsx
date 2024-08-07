import { buttonVariants } from "@/components/ui/button";
import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

const Header = () => {
  return (
    <div className="w-full flex h-16 border-b px-5 mb-5">
      <div className="flex-1 flex justify-start items-center">
        <Link href={"/"}>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/listings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Listings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/entities" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Entities
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <SignedIn>
          <UserProfile />
        </SignedIn>
        <SignedOut>
          <Link
            href={"/signin"}
            className={buttonVariants({ variant: "default" })}
          >
            Sign In
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
