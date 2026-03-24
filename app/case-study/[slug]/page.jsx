import { projects } from "../../constants";
import CaseStudyClient from "./CaseStudyClient";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug || project.id.toString(),
  }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  return <CaseStudyClient project={project} />;
}
