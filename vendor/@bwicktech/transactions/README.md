# @bwicktech/transactions

These modules are used to manage state needed for building BWICK send and swap forms

## Get Started

### Install

```sh
npm install @bwicktech/transactions
```

### Use

```tsx
import { useSendForm } from '@bwicktech/components';
import type { SendFormView } from '@bwicktech/components';

function SendForm() {
  const sendView: SendFormView = useSendForm({
    currencyCode: 'usd',
    DEFAULT_CONFIGURATION,
    address,
    positions,
    getNetworks: () => networksStore.load(),
    client
  });

  return <form />;
}
```
