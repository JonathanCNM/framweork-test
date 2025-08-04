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
  onSubmitCallback: (status: unknown, data: unknown) => void;
  onErrorCallback: (error: unknown) => void;
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
        routeId={vgsRouteId}
        onSubmitCallback={onSubmitCallback}
        onErrorCallback={onErrorCallback}
      >
        <section>{children}</section>
      </VGSCollectForm>
    </VGSCollectProvider>
  );
};
