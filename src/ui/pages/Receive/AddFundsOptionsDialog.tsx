import React from 'react';
import type { ExternallyOwnedAccount } from 'src/shared/types/ExternallyOwnedAccount';
import QrCodeIcon from 'jsx:src/ui/assets/qr-code.svg';
import { emitter } from 'src/ui/shared/events';
import { FrameListItemLink } from 'src/ui/ui-kit/FrameList';
import { Media } from 'src/ui/ui-kit/Media';
import { BottomSheetDialog } from 'src/ui/ui-kit/ModalDialogs/BottomSheetDialog';
import { DialogTitle } from 'src/ui/ui-kit/ModalDialogs/DialogTitle';
import type { HTMLDialogElementInterface } from 'src/ui/ui-kit/ModalDialogs/HTMLDialogElementInterface';
import { UIText } from 'src/ui/ui-kit/UIText';
import { VStack } from 'src/ui/ui-kit/VStack';

export function AddFundsOptionsDialog({
  wallet,
  receiveAddress,
  dialogRef,
  analytics,
}: {
  wallet: ExternallyOwnedAccount;
  receiveAddress?: string;
  dialogRef: React.RefObject<HTMLDialogElementInterface>;
  analytics: { pathname: string; address: string };
}) {
  return (
    <BottomSheetDialog
      ref={dialogRef}
      height="min-content"
      renderWhenOpen={() => (
        <VStack gap={24}>
          <DialogTitle
            title={<UIText kind="headline/h3">Receive BWICK</UIText>}
          />
          <VStack gap={8}>
            <FrameListItemLink
              style={{ border: '2px solid var(--neutral-100)' }}
              to={`/receive?address=${receiveAddress || wallet.address}`}
              onClick={() => {
                emitter.emit('buttonClicked', {
                  buttonName: 'Receive Crypto',
                  buttonScope: 'General',
                  pathname: analytics.pathname,
                  walletAddress: analytics.address,
                });
              }}
            >
              <Media
                image={
                  <div
                    style={{
                      backgroundColor: 'var(--primary-500)',
                      padding: 8,
                      color: 'var(--white)',
                      borderRadius: 12,
                    }}
                  >
                    <QrCodeIcon
                      style={{ width: 24, height: 24, display: 'block' }}
                    />
                  </div>
                }
                gap={12}
                text={<UIText kind="body/accent">Receive Crypto</UIText>}
                vGap={4}
                alignItems="start"
                detailText={
                  <UIText kind="body/accent" color="var(--neutral-500)">
                    Transfer crypto from another wallet or exchange with QR code
                    or wallet address
                  </UIText>
                }
              />
            </FrameListItemLink>
          </VStack>
        </VStack>
      )}
    />
  );
}
