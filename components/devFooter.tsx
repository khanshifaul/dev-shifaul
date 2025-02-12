import Link from "next/link";

interface DevFooterProps {
  className?: string;
}

const DevFooter = ({ className }: DevFooterProps) => {
  return (
    <footer
      className={`${className} w-full flex items-center justify-center py-2 mt-12 text-sm md:text-normal text-white mix-blend-difference`}
    >
      <p className="leading-tight md:leading-loose font-mono flex ">
        {new Date().getFullYear()} &copy; Developed & designed by &nbsp;
        <span className="font-[DancingScript] text-red-700 font-semibold mix-blend-difference">
          <Link className="flex items-center gap-1" href="/" title="Portfolio">
            Shifaul Islam
          </Link>
        </span>
      </p>
    </footer>
  );
};

export default DevFooter;
