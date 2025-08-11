/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VGSCollectForm,
  VGSCollectProvider,
  type ICollectFormProps,
} from "@vgs/collect-js-react";
import { useVgsCollectLoader } from "../hooks";

export const VgsFormWrapper: React.FC<ICollectFormProps> = (props) => {
  const { isVGSLoaded } = useVgsCollectLoader({
    vgsVaultId: props.vaultId,
    vgsEnvironment: props.environment,
  });
  return (
    <>
      {isVGSLoaded && (
        <VGSCollectProvider>
          <VGSCollectForm {...props}>{props.children}</VGSCollectForm>
        </VGSCollectProvider>
      )}
    </>
  );
};
