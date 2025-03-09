'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

interface SliderPriceProps {
  priceRange: [number, number];
  handlePriceRangeChange: (value: string) => void;
}

const SliderPrice: React.FC<SliderPriceProps> = ({ priceRange, handlePriceRangeChange }) => {
  const [minValue, setMinValue] = useState(priceRange[0]);
  const [maxValue, setMaxValue] = useState(priceRange[1]);

  useEffect(() => {
    setMinValue(priceRange[0]);
    setMaxValue(priceRange[1]);
  }, [priceRange]);

  const onSliderChange = (value: number[]) => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
    handlePriceRangeChange(value.join(','));
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMinValue(value);
      handlePriceRangeChange([value, maxValue].join(','));
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMaxValue(value);
      handlePriceRangeChange([minValue, value].join(','));
    }
  };

  return (
    <div className="space-y-4">
      <Slider
        value={[minValue, maxValue]}
        onValueChange={onSliderChange}
        max={100_000_000}
        min={0}
        step={1_000}
      />
      
      <div className="flex justify-between items-center mt-2 w-full max-w-[500px]">
        <div className="flex flex-col w-[150px]">
          <label htmlFor="minValue" className="text-sm">Min Value</label>
          <input
            id="minValue"
            type="number"
            value={minValue}
            onChange={handleMinChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex flex-col w-[150px]">
          <label htmlFor="maxValue" className="text-sm">Max Value</label>
          <input
            id="maxValue"
            type="number"
            value={maxValue}
            onChange={handleMaxChange}
            className="border p-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderPrice;
