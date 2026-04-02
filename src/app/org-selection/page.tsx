import { OrganizationList } from "@clerk/nextjs";
const OrgSelectionPage = () => {
    return (
        <div className="flex min-h-full items-center justify-center bg-background ">
            <OrganizationList
                hidePersonal
                afterCreateOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-lg"
                    }
                }}
            />
        </div>
    )
}

export default OrgSelectionPage;