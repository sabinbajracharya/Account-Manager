import React, {FC, useMemo} from 'react';
import {useFormikContext} from 'formik';
import {BaseButtonProps, Button} from '@renderer/components/FormElements';

export interface FormButtonProps extends BaseButtonProps {
  ignoreDirty?: boolean;
  submitting?: boolean;
}

const FormButton: FC<FormButtonProps> = ({children, ignoreDirty = false, submitting = false, ...baseButtonProps}) => {
  const {disabled = false, onClick, type = 'button'} = baseButtonProps;
  const {dirty, handleReset, handleSubmit, isValid} = useFormikContext();

  const buttonIsDisabled = useMemo(() => {
    switch (type) {
      case 'submit':
        return disabled || (!ignoreDirty && !dirty) || !isValid || submitting;
      case 'reset':
        return disabled || (!ignoreDirty && !dirty) || submitting;
      default:
        return disabled || submitting;
    }
  }, [disabled, dirty, isValid, submitting]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e?.preventDefault();
    if (buttonIsDisabled) return;

    if (type === 'submit') handleSubmit();

    if (type === 'reset') handleReset();

    if (type === 'button') onClick?.(e);
  };

  return (
    <Button {...baseButtonProps} disabled={buttonIsDisabled} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default FormButton;
