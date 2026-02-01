import { forwardRef, ForwardedRef, memo, useMemo } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from '@app/i18n';
import { decode } from 'html-entities';
import { TamaguiTextElement, Text as TMGText } from 'tamagui';

import { TextProps } from './props';
import { $presets } from './styles';

/**
 * ===========================
 * MAIN
 * ===========================
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
const TextView = forwardRef(function Text(props: TextProps, ref: ForwardedRef<TamaguiTextElement>) {
  const { tx, txOptions, text, max, maxType = 'words', children, numberOfLines, ...rest } = props;

  // =============== HOOKS
  const { t } = useTranslation();
  const i18nText = tx && t(tx, txOptions);

  // =============== VARIABLES
  const content = i18nText || text || children;

  const truncateText = useMemo(
    () => (value: string) => {
      let text = value;
      if (!max) return value;

      switch (maxType) {
        case 'characters': {
          const isMax = value?.length > max;
          text = isMax ? `${value?.slice?.(0, max)}...` : value;
          break;
        }
        case 'words': {
          const words = value?.trim()?.split(/\s+/) || [];
          const isMax = words.length > max;
          text = isMax ? `${words.slice(0, max).join(' ')}...` : value;
          break;
        }
        default:
          text = value;
          break;
      }
      return text;
    },
    [max, maxType],
  );

  const textValue = useMemo(() => {
    switch (typeof content) {
      case 'string':
        return truncateText(decode(content));
      case 'number':
      case 'object':
        return content;
      case 'symbol':
        return truncateText(JSON.stringify(content || ''));
      case 'undefined':
      default:
        return '';
    }
  }, [content, truncateText]);

  const preset: TextProps['preset'] = props.preset ?? 'default';

  // =============== VIEWS
  return (
    <TMGText
      {...$presets[preset]}
      numberOfLines={!max ? numberOfLines : undefined}
      fontFamily={Platform.select({
        ios: 'Inter-Regular',
        default: 'Inter',
      })}
      {...rest}
      ref={ref}
    >
      {textValue}
    </TMGText>
  );
});

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const Text = memo(TextView);
export default Text;
