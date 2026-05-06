import { openTurnstileWidgetIfNeeded } from 'src/ui/features/turnstile/helpers';
import { getAddressProviderHeader } from './requests/shared.client';
import type { BwickApiContext } from './bwick-api-bare';
import { BwickApiBare } from './bwick-api-bare';

const context: BwickApiContext = {
  getAddressProviderHeader,
  getKyOptions: () => ({
    hooks: {
      afterResponse: [
        (_, __, response) => {
          openTurnstileWidgetIfNeeded(response);
        },
      ],
    },
  }),
};

export const BwickAPI = Object.assign(context, BwickApiBare);
