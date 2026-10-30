import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  borderAccent?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  borderAccent = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border ${
        borderAccent ? 'border-l-4 border-l-[#087F8C] border-t-[#DCE8E9] border-r-[#DCE8E9] border-b-[#DCE8E9]' : 'border-[#DCE8E9]'
      } ${
        hoverEffect ? 'hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200' : 'shadow-card'
      } overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
