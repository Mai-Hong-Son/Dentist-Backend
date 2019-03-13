
import React from 'react';
import GenericSelect from '../GenericSelect';
import GenericFilterSchedule from '../GenericFilterSchedule';
import { MultiSelection, RadioSelection } from '../Selection';

export const MultiSelectField = ({ input, ...inputProps }) => (
  <MultiSelection
    {...inputProps}
    value={input.value}
    onChange={input.onChange}
  />
);

export const RadioSelectField = ({ input, ...inputProps }) => (
  <RadioSelection
    {...inputProps}
    value={input.value}
    onChange={input.onChange}
  />
);

export const SelectField = ({ input, ...inputProps }) => (
  <GenericSelect
    {...inputProps}
    value={input.value}
    onChange={input.onChange}
  />
);

export const ScheduleSelectField = ({ input, ...inputProps }) => (
  <GenericFilterSchedule
    {...inputProps}
    value={input.value}
    onChange={input.onChange}
  />
);

