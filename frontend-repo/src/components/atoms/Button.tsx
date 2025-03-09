import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { forwardRef } from 'react';

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  isLoading = false,
  disabled,
  ...props
}, ref) => {
  return (
    <MuiButton
      ref={ref}
      disabled={isLoading || disabled}
      {...props}
    >
      {children}
    </MuiButton>
  );
});

Button.displayName = 'Button';

export default Button;