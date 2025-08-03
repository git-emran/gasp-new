import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { HeroText } from "../components/HeroText";
import { Link, Text } from "@radix-ui/themes";
const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });
    const text = `Expert in Enterprise Design / Development`;
    return (
        <section id="home" className="flex flex-col justify-end min-h-screen">
            <div className="px-10 justify-start">

                <HeroText />
            </div>

            <div className="px-10 pt-6 justify-start">
                <Text as="div" className="text-gray-600">
                    👨🏻‍💻 Building my own  <Link className="font-bold text-gray-700 underline" href="https://github.com/git-emran/simple-notes">Markdown</Link>{" "}application
                </Text>

            </div>
            <AnimatedHeaderSection
                subTitle={"Designer • Developer"}
                title={"Emran Hossain"}
                text={text}
                textColor={"text-black"}
            />

        </section>
    );
};

export default Hero;
