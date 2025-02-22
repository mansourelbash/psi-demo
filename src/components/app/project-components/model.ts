import { PropertyModel } from '@/types/Property';
import { FC } from 'react';

export interface ProjectComponentProps {
  property: PropertyModel;
}

export type ProjectComponent = FC<ProjectComponentProps>;
