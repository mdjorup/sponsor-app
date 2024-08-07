import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H2, P } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="h-screen flex gap-8">
      <div className="w-2/3">
        <H2>Top Listings Today</H2>
      </div>

      <div className="w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Sponsor Hunt!</CardTitle>
          </CardHeader>
          <CardContent>
            <P>
              Sponsor Hunt is a platform for finding sponsors for your projects.
              It is a work in progress and is not yet ready for public use.
            </P>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
