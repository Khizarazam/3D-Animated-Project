import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div
        className="w-full relative min-h-screen font-['Helvetica_Now_Display']"
        data-scroll-container
      >
        {showCanvas &&
          data[0].map((canvasDets, index) => (
            <Canvas key={index} details={canvasDets} />
          ))}
        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">thirtysixstudios</div>
            <div className="links flex gap-10">
              {["What we do", "Who we are", "How we give back", "Talk to us"].map(
                (link, index) => (
                  <a
                    key={index}
                    href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-md hover:text-gray-300"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </nav>
          <div className="textcontainer w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-md mt-10">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingRef}
              className="text-[17rem] font-normal tracking-tight leading-none pl-5"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasDets, index) => (
            <Canvas key={index} details={canvasDets} />
          ))}
        <h1 className="text-8xl tracking-tighter">About the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          We are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional.
        </p>
        <img
          className="w-[50%] h-[70%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt="About the brand"
        />
      </div>
      <div className="w-full mb-10 relative h-screen mt-32 px-10">
        {showCanvas &&
          data[2].map((canvasDets, index) => (
            <Canvas key={index} details={canvasDets} />
          ))}
        <div className="h-[500px] w-full text-2xl flex justify-center items-center">
          <p className="w-[50%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            dignissimos maiores voluptates cumque perspiciatis esse perferendis
            libero unde praesentium, ab molestias eum corrupti labore eos. Odio
            iure assumenda velit neque.
          </p>
          <h1 className="text-[120px] pl-11 w-[50%]">ThitysixStudio.</h1>
        </div>
        <h1 className="text-8xl tracking-tighter">How it works</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          We are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional.
        </p>
      </div>
    </>
  );
}

export default App;