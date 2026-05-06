import React from 'react';
import { NavigationTitle } from 'src/ui/components/NavigationTitle';
import { PageBottom } from 'src/ui/components/PageBottom';
import { PageColumn } from 'src/ui/components/PageColumn';
import { PageTop } from 'src/ui/components/PageTop';
import { useBackgroundKind } from 'src/ui/components/Background/Background';
import { UIText } from 'src/ui/ui-kit/UIText';
import { VStack } from 'src/ui/ui-kit/VStack';
import { Button } from 'src/ui/ui-kit/Button';
import { UnstyledLink } from 'src/ui/ui-kit/UnstyledLink';

export function CustomBwickSwap() {
  useBackgroundKind({ kind: 'white' });
  return (
    <PageColumn>
      <NavigationTitle title="Swap" />
      <PageTop />
      <VStack gap={16} style={{ textAlign: 'center', marginTop: 'auto' }}>
        <UIText kind="headline/h2">BWICK Swap</UIText>
        <UIText kind="body/regular" color="var(--neutral-600)">
          Swap is configured for the BWICK Cosmos chain only. Connect your
          custom BWICK swap route here without calling third-party wallet APIs.
        </UIText>
      </VStack>
      <VStack gap={8} style={{ marginTop: 'auto' }}>
        <Button as={UnstyledLink} to="/send-form">
          Send BWICK
        </Button>
        <Button as={UnstyledLink} kind="regular" to="/overview">
          Back to Wallet
        </Button>
      </VStack>
      <PageBottom />
    </PageColumn>
  );
}
