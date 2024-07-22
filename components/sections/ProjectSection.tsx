"use client"

import { useEffect, useRef } from "react"
import useOnScreen from "@/hooks/useOnScreen"
import useScrollActive from "@/hooks/useScrollActive"
import MSteam from "@/public/assets/projects/msteam.png"
import Traffic from "@/public/assets/projects/traffic.png"
import Airforce from "@/public/assets/projects/airforce.png"
import Leasing from "@/public/assets/projects/leasing.png"
import Scanning from "@/public/assets/projects/scannig.png"
import Groovy from "@/public/assets/projects/groovy.png"
import { useSectionStore } from "@/store/section"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { StaticImageData } from "next/image"
import Link from "next/link"
import { RoughNotation } from "react-rough-notation"
import ProjectCard from "../ProjectCard"

export default function ProjectSection() {
  gsap.registerPlugin(ScrollTrigger)

  const sectionRef = useRef(null)

  const elementRef = useRef<HTMLDivElement>(null)
  const isOnScreen = useOnScreen(elementRef)

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef)

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        onEnter: () => {
          gsap.fromTo(
            q(".qoutes-animation"),
            {
              y: "-200%",
            },
            {
              y: 0,
            }
          )
        },
      },
    })
  }, [])

  // Set Active Session
  const projectSectionOnView = useScrollActive(sectionRef)
  const { setSection } = useSectionStore()

  useEffect(() => {
    projectSectionOnView && setSection("#project")
  }, [projectSectionOnView, setSection])

  return (
    <section
      ref={sectionRef}
      id="project"
      className="relative h-full bg-gray-50 dark:bg-gray-100 overflow-hidden py-14 px-10 lg:px-[5%]"
    >
      <div className="w-full max-w-[1100px] h-full m-auto flex flex-col items-center gap-14">
        <div className="w-[80%] md:w-full flex absolute left-1/2 -translate-x-1/2 flex-col gap-8 items-center">
          <RoughNotation
            type="underline"
            strokeWidth={2}
            color="hsl(157, 87%, 41%)"
            order={1}
            show={isOnScreen}
          >
            <div className="text-xl md:text-4xl tracking-tight font-medium w-fit dark:text-accentColor">
              Projects
            </div>
          </RoughNotation>
          <div ref={elementRef} className="overflow-hidden ">
            <div className="qoutes-animation  md:w-full text-center font-medium flex flex-col items-center">
              <div>Good design is obvious. Great design is transparent.</div>
              <div>Design is not for philosophy, it&apos;s for life.</div>
            </div>
          </div>
        </div>
        <div className="w-full pt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} item={project} />
          ))}
        </div>

        <div className="font-medium">
          Explore more projects in{" "}
          <Link
            href="https://github.com/Saksuriyas"
            target="_blank"
            aria-label="Expore more in my github profile"
            rel="noopener noreferrer"
            className="text-accentColor"
          >
            my github profile
          </Link>
        </div>
      </div>
    </section>
  )
}

export interface Project {
  id: number
  title: string
  description: string
  techStacks: string[]
  image: StaticImageData
  githubURL: string
  githubApi: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Jenkins Common Library",
    description:
      "A Library for Jenkin custom Pipeline.",
    techStacks: ["Groovy", "Jenkin Pipeline"],
    image: Groovy,
    githubURL: "https://github.com/Saksuriyas/Jenkins_common_library",
    githubApi: "",
  },
  {
    id: 2,
    title: "SIMs of Traffic Analysis",
    description:
      "A project for car monitoring and history taking",
    techStacks: [".Net", "C#", "AdminLTE UI"],
    image: Traffic,
    githubURL: "https://github.com/Saksuriyas/SIMs",
    githubApi: "",
  },
  {
    id: 3,
    title: "Leasing of Patient History",
    description:
      "A project for patient interview and history taking",
    techStacks: [".Net", "C#", "AdminLTE UI"],
    image: Leasing,
    githubURL: "https://github.com/Saksuriyas/Leasing",
    githubApi: "",
  },
  {
    id: 4,
    title: "Airforce Identity",
    description:
      "A project for airforce employee to use card access to work",
      techStacks: [".Net", "C#", "Windows form"],
    image: Airforce,
    githubURL: "https://github.com/Saksuriyas/Airforce",
    githubApi: "",
  },
  {
    id: 5,
    title: "Scan Document",
    description:
      "A project for scan document patient to system for using of Docter to interview.",
    techStacks: [".Net", "C#", "Windows form"],
    image: Scanning,
    githubURL: "https://github.com/Saksuriyas/WinD/tree/master/ScannerDemo",
    githubApi: "",
  },
  {
    id: 6,
    title: "MS.Team Chat Bot.",
    description: "A for POC nodejs using microsoft team to chat bot.",
    techStacks: ["JS", "NodeJS", "AdaptiveCard"],
    image: MSteam,
    githubURL: "https://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/poc-bot-ms-team",
    githubApi: "",
  },
]
