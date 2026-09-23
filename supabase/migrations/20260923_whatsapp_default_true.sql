-- Migration: Change whatsapp_enabled default to true (opt-out model)
-- Users with a phone number are now WhatsApp-contactable by default unless they turn it off.

-- Change column default to true
ALTER TABLE public.profiles
  ALTER COLUMN whatsapp_enabled SET DEFAULT true;

-- Back-fill: enable WhatsApp for all existing users who have a phone number
-- but whatsapp_enabled was never set to true (still at the old false default)
UPDATE public.profiles
  SET whatsapp_enabled = true
  WHERE phone_number IS NOT NULL
    AND whatsapp_enabled = false;

COMMENT ON COLUMN public.profiles.whatsapp_enabled IS 'Controls whether other students can see WhatsApp contact button. Defaults ON when phone number is present (opt-out).';
