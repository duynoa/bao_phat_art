import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CropFreeIcon from '@mui/icons-material/CropFree';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Link from "next/link";

interface ProjectProps {
  project: {
    _id: string;
    name: string;
    slug?: string;
    address: string;
    completionYear: string;
    type: string;
    summary: string;
    mainImage: string;
  }
}

const CardProject = ({ project }: ProjectProps) => {
  return (
    <Link href={`/du-an/${project.slug || project._id}`} className="relative flex flex-col md:flex-row w-full h-auto md:h-[200px] border border-gray-300 rounded-lg overflow-hidden">
      <div className="xl:flex-1 p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-title1 uppercase text-gray-900 line-clamp-1">{project.name}</h2>
          <div className="text-base text-gray-900 line-clamp-2">
            <div dangerouslySetInnerHTML={{ __html: project.summary }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-gray-900">
          <div className="flex items-center gap-1">
            <RoomOutlinedIcon sx={{ fontSize: "16px" }} />
            <p className="text-sm">{project.address}</p>
          </div>
          <div className="flex items-center gap-1">
            <CalendarMonthOutlinedIcon sx={{ fontSize: "16px" }}/>
            <p className="text-sm">{project.completionYear}</p>
          </div>
          <div className="flex items-center gap-1">
            <CropFreeIcon sx={{ fontSize: "16px" }}/>
            <p className="text-sm">{project.type}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full aspect-[3/2] md:aspect-auto md:h-full">
        <Image
          src={project.mainImage || IMAGES.gray}
          alt={project.name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default CardProject;
