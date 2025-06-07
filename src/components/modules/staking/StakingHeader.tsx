
import { useIsMobile } from "@/hooks/use-mobile";
import { texts } from "@/lib/constants/texts";

export const StakingHeader = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {texts.staking.header.title}
      </h2>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
        {texts.staking.header.description}
      </p>
      <div className="mt-2 text-xs md:text-sm text-purple-400">
        {texts.staking.header.subtitle}
      </div>
    </div>
  );
};
