'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { TextHighlight, TypographyH2 } from '@/components/ui/typography';
import { OperationType, PropertyRequestModel } from '@/types/Shared';
import { MessagesSquare } from 'lucide-react';
import { FC } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { propertyListRequest } from '@/services/units';
import { phoneExpression } from '@/lib/regex';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(phoneExpression, 'invalid format, example: 971561234789')
    .required('Phone Number is required'),
  calls: Yup.boolean().required(),
  channels: Yup.boolean().required(),
  projects: Yup.boolean().required(),
});
type SubmitInquiryProps = {
  propertyPurpose: OperationType;
  propertyName: string;
  propertyTypeId: number;
  cityId: number;
};
const SubmitInquiry: FC<SubmitInquiryProps> = ({
  propertyName,
  propertyPurpose,
  cityId,
  propertyTypeId,
}) => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    calls: false,
    channels: false,
    projects: false,
    property_purpose: propertyPurpose,
    property_name: propertyName,
    property_type_id: propertyTypeId,
    city_id: cityId,
  };
  const form = useFormik({
    initialValues: initialState,
    validationSchema: schema,
    onSubmit: async (values, formikHelpers) => {
      const body: PropertyRequestModel = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone_number: values.phone,
        property_purpose: values.property_purpose,
        property_name: values.property_name,
        property_type_id: values.property_type_id,
        city_id: values.city_id,
        external_images: [],
      };
      await propertyListRequest(body);
    },
  });
  return (
    <div className='w-full border border-[#ECECEC] rounded-[15px] p-[30px]'>
      <TypographyH2 className='text-[#414042] text-2xl font-medium'>
        Submit Your Inquiry :
      </TypographyH2>
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col mt-4 relative'>
            <label className='text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4'>
              First Name
            </label>
            <Input
              type='text'
              className='border border-[#ECECEC] rounded-[5px] p-[10px] placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal'
              placeholder='First Name'
              id='firstName'
              value={form.values.firstName}
              // onChange={(e) =>
              //   dispatch({ type: 'firstName', payload: e.target.value })
              // }
              onClick={() => form.setTouched({ firstName: true })}
              onChange={form.handleChange}
            />
            <TextHighlight className='text-sm px-3'>
              {form.touched.firstName && form.errors.firstName}
            </TextHighlight>
          </div>
          <div className='flex flex-col gap-4 mt-4 relative'>
            <label className='text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4'>
              Last Name
            </label>
            <Input
              type='text'
              className='border border-[#ECECEC] rounded-[5px] p-[12px] placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal'
              placeholder='Last Name'
              // value={state.lastName}
              // onChange={(e) =>
              //   dispatch({ type: 'lastName', payload: e.target.value })
              // }
              onClick={() => form.setTouched({ lastName: true })}
              value={form.values.lastName}
              onChange={form.handleChange}
              id='lastName'
            />
            <TextHighlight className='text-sm px-3'>
              {form.touched.lastName && form.errors.lastName}
            </TextHighlight>
          </div>
          <div className='flex flex-col mt-4 relative'>
            <label className='text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4'>
              Email
            </label>
            <Input
              type='email'
              className='border border-[#ECECEC] rounded-[5px] p-[12px] placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal'
              placeholder='Email'
              // onChange={(e) =>
              //   dispatch({ type: 'email', payload: e.target.value })
              // }
              // value={state.email}
              onClick={() => form.setTouched({ email: true })}
              value={form.values.email}
              onChange={form.handleChange}
              id='email'
            />
            <TextHighlight className='text-sm px-3'>
              {form.touched.email && form.errors.email}
            </TextHighlight>
          </div>
          <div className='flex flex-col mt-4 relative'>
            <label className='text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4'>
              Phone Number
            </label>
            <Input
              type='number'
              className='border border-[#ECECEC] rounded-[5px] p-[12px] placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal'
              placeholder='Phone Number'
              // value={state.phone}
              // onChange={(e) =>
              //   dispatch({ type: 'phone', payload: e.target.value })
              // }
              onClick={() => form.setTouched({ phone: true })}
              id='phone'
              value={form.values.phone}
              onChange={form.handleChange}
            />
            <TextHighlight className='text-sm px-3'>
              {form.touched.phone && form.errors.phone}
            </TextHighlight>
          </div>
          <div className='flex flex-col gap-y-3'>
            <div className='flex gap-x-3 '>
              <Checkbox
                id='calls'
                // checked={state.calls}
                // onCheckedChange={(checked) =>
                //   dispatch({ type: 'calls', payload: checked })
                // }
                checked={form.values.calls}
                onCheckedChange={(e) =>
                  form.setValues({ ...form.values, calls: e as boolean })
                }
              />
              <label
                htmlFor='calls'
                className='text-[#414042] text-[10px] font-normal'
              >
                Agree to receive calls and communications via various channels
                from PSI from 09:00 am to 09:00 pm.
              </label>
            </div>
            <div className='flex gap-3'>
              <Checkbox
                id='channels'
                // checked={state.channels}
                // onCheckedChange={(checked) =>
                //   dispatch({
                //     type: 'channels',
                //     payload: checked,
                //   })
                // }
                checked={form.values.channels}
                onCheckedChange={(e) =>
                  form.setValues({ ...form.values, channels: e as boolean })
                }
              />
              <label
                htmlFor='channels'
                className='text-[#414042] text-[10px] font-normal'
              >
                Agree to receive multiple calls and communications via various
                channels regarding my enquiry.
              </label>
            </div>
            <div className='flex gap-3'>
              <Checkbox
                id='projects'
                // checked={state.projects}
                // onCheckedChange={(checked) =>
                //   dispatch({
                //     type: 'projects',
                //     payload: checked,
                //   })
                // }
                checked={form.values.projects}
                onCheckedChange={(e) =>
                  form.setValues({ ...form.values, projects: e as boolean })
                }
              />
              <label
                htmlFor='projects'
                className='text-[#414042] text-[10px] font-normal'
              >
                Agree to receive calls and communications via various channels
                on various projects ,products and services.
              </label>
            </div>
          </div>
          <Button
            className='bg-[#2C2D65] text-white rounded-[5px] p-[12px] mt-4'
            type='submit'
            disabled={Object.values({
              calls: form.values.calls,
              projects: form.values.projects,
              channels: form.values.channels,
            }).some((value) => !value)}
          >
            <MessagesSquare size={20} className='mr-2' />
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SubmitInquiry;
