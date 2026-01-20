import ProjectDetail from "@/views/Projects/ProjectDetail";
import React from "react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://baophatart.com";

async function getProject(slug: string) {
  try {
    const res = await fetch(`${SITE_URL}/api/projects?slug=${slug}`, {
      // Revalidate định kỳ, tránh cache quá lâu
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data?.project ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  console.log(project);
  const defaultTitle = "Dự án thiết kế thi công nội thất - Bảo Phát Art";
  const defaultDescription =
    "Các dự án thiết kế và thi công nội thất đẹp, tối ưu công năng, mang lại không gian sống tiện nghi và thẩm mỹ cao.";

  if (!project) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      alternates: {
        canonical: `${SITE_URL}/du-an/${slug}`,
      },
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        url: `${SITE_URL}/du-an/${slug}`,
        type: "article",
        siteName: "Bảo Phát Art",
      },
      twitter: {
        card: "summary_large_image",
        title: defaultTitle,
        description: defaultDescription,
      },
    };
  }

  const plainTextSummary =
    typeof project.summary === "string"
      ? project.summary.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : "";

  const description =
    plainTextSummary.slice(0, 155) || defaultDescription;

  const title = `${project.name} - Dự án thiết kế & thi công nội thất | Bảo Phát Art`;
  const url = `${SITE_URL}/du-an/${project.slug || slug}`;
  const image = project.mainImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Bảo Phát Art",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: project.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

const ProjectDetailPage = () => {
  return <ProjectDetail />;
};

export default ProjectDetailPage;
