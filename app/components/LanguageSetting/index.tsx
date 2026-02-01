import { memo, useCallback } from 'react';
import { SelectInput } from '@app/components/Input/SelectInput';
import { LANGUAGES } from '@app/config/constant';
import { useTranslation } from '@app/i18n';
import { useAppStore } from '@app/stores';
import { Languages } from '@tamagui/lucide-icons';
import { Stack } from 'tamagui';

import LanguageSettingProps from './props';
/**
 * ===========================
 * MAIN
 * ===========================
 */
const LanguageSettingView: React.FC<LanguageSettingProps> = (props) => {
  const { color = '$primaryText' } = props;

  // =============== HOOKS
  const { setLanguage } = useAppStore((s) => s.actions);
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  // =============== VARIABLES
  const selectedLanguage = language === 'en-US' ? 'en' : language;
  const selectedLanguageOption = LANGUAGES?.filter((item) =>
    item?.metaData?.code?.includes(selectedLanguage),
  );

  // =============== VIEWS
  const renderCustomActivator = useCallback(() => {
    return <Languages size={24} color={color} />;
  }, [color]);
  return (
    <Stack>
      <SelectInput
        sheetTx="common:label.changeLanguage"
        options={LANGUAGES}
        renderCustomActivator={renderCustomActivator}
        value={
          selectedLanguageOption?.length
            ? selectedLanguageOption
            : LANGUAGES?.filter((item) => item?.value === 'en')
        }
        onChange={async (val) => {
          const value = val?.[0]?.value;
          setLanguage(value);
          changeLanguage?.(value);
        }}
      />
    </Stack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const LanguageSetting = memo(LanguageSettingView);
export default LanguageSetting;
