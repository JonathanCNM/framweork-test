/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VGSCollectForm,
  VGSCollectProvider,
  type VGSCollectVaultEnvironment,
} from "@vgs/collect-js-react";

export interface VgsFormWrapperProps {
  vgsVaultId: string;
  vgsEnvironment: VGSCollectVaultEnvironment;
  vgsRouteId: string;
  children: React.ReactElement;
  onSubmitCallback: (status: any, data: any) => void;
  onErrorCallback: (error: any) => void;
}

export const VgsFormWrapper: React.FC<VgsFormWrapperProps> = ({
  vgsVaultId,
  vgsEnvironment,
  vgsRouteId,
  onSubmitCallback,
  onErrorCallback,
  children,
}) => {
  return (
    <VGSCollectProvider>
      <VGSCollectForm
        vaultId={vgsVaultId}
        environment={vgsEnvironment}
        action="/post"
        submitParameters={{}}
        routeId={vgsRouteId}
        onSubmitCallback={onSubmitCallback}
        onErrorCallback={onErrorCallback}
      >
        {children}
      </VGSCollectForm>
    </VGSCollectProvider>
  );
};
