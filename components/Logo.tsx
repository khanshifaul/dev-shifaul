import Link from "next/link";

interface LogoProps {
  className?: string;
}
const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`${className}`}>
      <Link className="flex justify-start items-center gap-1 p-2" href="/">
        <h1 className="text-2xl font-extrabold font-[AmadeusAP] ">
          <span className="mr-10 bg-clip-text text-transparent bg-gradient-to-r via-blue-500 to-red-700 from-blue-500">
            Shifaul
          </span>
          <br />
          <span className="ml-10 bg-clip-text text-transparent bg-gradient-to-l via-blue-500 to-red-700 from-blue-500">
            Islam
          </span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
