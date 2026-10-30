import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantStyles = {
    primary: "bg-[#087F8C] hover:bg-[#075B66] text-white focus:ring-[#087F8C] shadow-sm hover:shadow",
    secondary: "bg-[#2563A6] hover:bg-[#1D4E83] text-white focus:ring-[#2563A6] shadow-sm hover:shadow",
    accent: "bg-[#B8E7D0] hover:bg-[#97D4B6] text-[#18313B] font-semibold focus:ring-[#B8E7D0]",
    outline: "border border-[#DCE8E9] bg-white hover:bg-[#F5FAFA] text-[#18313B] focus:ring-[#087F8C] hover:border-[#087F8C]",
    ghost: "text-[#18313B] hover:bg-[#F5FAFA] focus:ring-[#087F8C]",
    danger: "bg-[#B42332] hover:bg-[#8F1B27] text-white focus:ring-[#B42332]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-4 py-2 text-sm font-semibold gap-2",
    lg: "px-6 py-3 text-base font-bold gap-2.5 shadow-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
