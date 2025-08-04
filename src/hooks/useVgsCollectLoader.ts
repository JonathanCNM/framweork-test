/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadVGSCollect } from "@vgs/collect-js";
import { useEffect, useState } from "react";

export interface UseVgsCollectLoaderProps {
  vgsVaultId: string;
  vgsEnvironment: string;
  vgsVersion?: string;
}

export const useVgsCollectLoader = ({
  vgsVaultId,
  vgsEnvironment,
  vgsVersion = "2.25.0",
}: UseVgsCollectLoaderProps) => {
  const [isVGSLoaded, setIsVGSLoaded] = useState(false);
  const [isVGSLoading, setIsVGSLoading] = useState(true);
  const [vgsError, setVgsError] = useState<string | null>(null);

  useEffect(() => {
    if (!vgsVaultId || !vgsEnvironment) return;

    (async () => {
      try {
        setIsVGSLoading(true);
        await loadVGSCollect({
          vaultId: vgsVaultId,
          environment: vgsEnvironment,
          version: vgsVersion,
        });
        setIsVGSLoaded(true);
        setIsVGSLoading(false);
      } catch (error) {
        setVgsError("Error trying to get VGS Form");
      } finally {
        setIsVGSLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isVGSLoaded, isVGSLoading, vgsError };
};
