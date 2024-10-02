import { ParticlesLoader } from "@/components/ParticleLoader";
import { ModeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";
import test3 from "@/assets/test3.jpg"
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex   justify-center">
      <ParticlesLoader />

      {/* <ModeToggle />

      <Button>
        This is a test button
      </Button> */}

      <div className="max-w-[700px]">
        <div>
          <div>
            <h2 className="text-white text-4xl py-4">Hi, I,m Amal Antony</h2>
            <h4 className="my-2">Software Developer focused in Frontend. Self-taught and always eager to learn new technologies.</h4>
          </div>

          <div>
            <Image src={""} alt="" />
          </div>
        </div>

        <div>
          <h3 className="my-4 text-xl font-medium">About Me</h3>
          <h4>
            {` I'm a passionate and dedicated software developer, constantly seeking to enhance my skills and tackle new technological challenges. Started my career as a Mobile Developer focused in Android and now I'm a Frontend Developer focused in creating responsive and modern web applications using React.
`}
          </h4>
        </div>
        <div>
    
          <div>
          <h3 className="my-4 text-xl font-medium">
          Professional Experience

          </h3>
          <div className="flex flex-col">

<div className="border flex border-gray-50 bg-gray-50 opacity-20 p-5 gap-5 rounded-xl">
<Image src={test3} width={50} height={50} alt="" className="rounded-full" />

<div className="flex-1 border">

<h2 className="">
  Centrric Innnovations
</h2>
<h4>

</h4>
</div>

</div>
<div>

</div>

          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
