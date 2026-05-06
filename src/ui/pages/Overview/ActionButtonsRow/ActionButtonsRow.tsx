import type { ComponentPropsWithoutRef, ElementType } from 'react';
import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import SwapIcon from 'jsx:src/ui/assets/actions/swap.svg';
import SendIcon from 'jsx:src/ui/assets/actions/send.svg';
import FundIcon from 'jsx:src/ui/assets/actions/fund.svg';
import { UnstyledAnchor } from 'src/ui/ui-kit/UnstyledAnchor';
import { walletPort } from 'src/ui/shared/channels';
import { UnstyledLink } from 'src/ui/ui-kit/UnstyledLink';
import { useWalletParams } from 'src/ui/shared/requests/useWalletParams';
import { HStack } from 'src/ui/ui-kit/HStack';
import { UIText } from 'src/ui/ui-kit/UIText';
import { Button } from 'src/ui/ui-kit/Button';
import { type HTMLDialogElementInterface } from 'src/ui/ui-kit/ModalDialogs/HTMLDialogElementInterface';
import { UnstyledButton } from 'src/ui/ui-kit/UnstyledButton';
import { emitter } from 'src/ui/shared/events';
import { AddFundsOptionsDialog } from '../../Receive/AddFundsOptionsDialog';
import * as s from './styles.module.css';

function ActionButton<As extends ElementType = 'a'>({
  as,
  icon,
  title,
  className,
  ...props
}: {
  className?: string;
  icon: React.ReactNode;
  title: React.AnchorHTMLAttributes<HTMLAnchorElement>['title'];
} & { as?: As } & ComponentPropsWithoutRef<As>) {
  const Element = as || UnstyledAnchor;
  return (
    <Element {...props} className={classNames(s.actionButton, className)}>
      <div className={s.icon} title={title}>
        {icon}
      </div>
    </Element>
  );
}

export function ActionButtonsRow({
  receiveAddress,
  selectedChain,
}: {
  receiveAddress?: string;
  selectedChain?: string | null;
}) {
  const { pathname } = useLocation();
  const { data: wallet } = useQuery({
    queryKey: ['wallet/uiGetCurrentWallet'],
    queryFn: () => {
      return walletPort.request('uiGetCurrentWallet');
    },
  });
  const addWalletParams = useWalletParams(wallet);
  const fundOptionsDialogRef = useRef<HTMLDialogElementInterface>(null);

  if (!addWalletParams || !wallet) {
    return null;
  }

  const sendButton = (
    <ActionButton
      title="Send"
      as={UnstyledLink}
      icon={<SendIcon />}
      to={selectedChain ? `/send-form?chain=${selectedChain}` : '/send-form'}
    />
  );

  const fundButton = (
    <ActionButton
      title="Receive"
      as={UnstyledButton}
      icon={<FundIcon />}
      onClick={() => {
        fundOptionsDialogRef.current?.showModal();

        emitter.emit('buttonClicked', {
          buttonName: 'Fund',
          buttonScope: 'General',
          pathname,
          walletAddress: wallet.address,
        });
      }}
    />
  );

  return (
    <div>
      <AddFundsOptionsDialog
        dialogRef={fundOptionsDialogRef}
        wallet={wallet}
        receiveAddress={receiveAddress}
        analytics={{ pathname, address: wallet.address }}
      />
      <ul
        className={s.list}
        style={{
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        <li>{fundButton}</li>
        <li>{sendButton}</li>
        <li style={{ flexGrow: 1, minWidth: 0 }}>
          <Button
            aria-label="Swap"
            size={48}
            as={UnstyledLink}
            to="/swap-form"
            style={{
              borderRadius: 24,
              width: '100%',
              paddingInline: 0,
              ['--button-background' as string]: 'var(--black)',
              ['--button-text' as string]: 'var(--white)',
              ['--button-background-hover' as string]: 'var(--neutral-800)',
            }}
          >
            <HStack gap={6} alignItems="center">
              <div style={{ display: 'flex' }}>
                <SwapIcon />
              </div>
              <UIText kind="small/accent">Swap</UIText>
            </HStack>
          </Button>
        </li>
      </ul>
    </div>
  );
}
