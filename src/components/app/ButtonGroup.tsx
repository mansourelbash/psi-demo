'use client';

import { FC, useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type ButtonGroupProps = {
  categories: string[];
  defaultActiveCategory?: string;
  className?: string;
  onCategoryChange?: (category: string, index: number) => void;
  buttonClassName?: string;
};
const ButtonGroup: FC<ButtonGroupProps> = ({
  categories,
  defaultActiveCategory,
  className,
  onCategoryChange,
  buttonClassName,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    (typeof categories)[number]
  >(defaultActiveCategory ?? categories[0]);
  return (
    <div className={cn('flex', className)}>
      {categories.map((category, i) => (
        <Button
          variant={activeCategory === category ? 'default' : 'outline'}
          key={category}
          className={cn(
            activeCategory === category
              ? 'bg-[#2C2D65] hover:bg-blue-800'
              : 'border-[#414042] text-#414042',
            'px-8',
            buttonClassName
          )}
          onClick={() => {
            setActiveCategory(category);
            onCategoryChange?.(category, i);
          }}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
export default ButtonGroup;
