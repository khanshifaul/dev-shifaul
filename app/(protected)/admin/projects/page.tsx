import PageTitle from "@/components/admin/page-title";
import ProjectTable from "@/components/admin/project-table";
import RefreshBtn from "@/components/admin/refresh-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Projects = async () => {
  return (
    <div>
      <PageTitle title="Projects">
        <div className="flex gap-2">
          <RefreshBtn />
          <Button size={"sm"}>
            <Link href={"/admin/blog-posts/new"}>Add New Project</Link>
          </Button>
        </div>
      </PageTitle>
      <ProjectTable />
    </div>
  );
};

export default Projects;
