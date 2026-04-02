import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-2xl font-bold">Welcome to Audio Lab</h1>
      <p className="text-sm text-muted-foreground">Create AI audio</p>
      <div className="flex items-center gap-4">
        <OrganizationSwitcher />
        <UserButton />
      </div>

    </div>
  );
}
