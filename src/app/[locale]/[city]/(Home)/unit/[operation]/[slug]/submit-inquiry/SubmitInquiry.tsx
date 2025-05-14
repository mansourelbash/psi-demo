'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { TextHighlight, TypographyH2 } from '@/components/ui/typography';
import { ItemModel, UnitRequestModel } from '@/types/Shared';
import { MessagesSquare } from 'lucide-react';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { phoneExpression } from '@/lib/regex';
import { propertyListRequest } from '@/services/properties';
import ButtonGroup from '@/components/app/ButtonGroup';
import { AppSelect } from '@/components/app/AppSelect';
import { toast } from "sonner";

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
  unitTypeId: Yup.number()
    .min(1, 'Unit Type is required')
    .required('Unit Type is required'),
});
type SubmitInquiryProps = {
  unitTypeId?: number;
  propertyId: number;
  bedrooms: number;
  bathrooms: number;
  showUserClass?: boolean;
  unitTypes?: ItemModel[];
};
const apartmentTypeId = 411;
const SubmitInquiry: FC<SubmitInquiryProps> = ({
  unitTypeId: _unitTypeId,
  propertyId,
  bedrooms = 0,
  bathrooms = 0,
  showUserClass,
  unitTypes,
}) => {
  const [leadClassId, setLeadClassId] = useState<number>(3);
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    calls: true,
    channels: true,
    projects: true,
    unitTypeId: !unitTypes ? _unitTypeId ?? apartmentTypeId : undefined,
  };
  const form = useFormik({
    initialValues: initialState,
    validationSchema: schema,
    onSubmit: async (values, formikHelpers) => {
      try {
        const body: UnitRequestModel = {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phone_number: values.phone + '',
          unit_type_id: values.unitTypeId!,
          property_id: propertyId,
          lead_class_id: leadClassId,
          bedrooms,
          bathrooms,
        };
        await propertyListRequest(body);
        toast.success('Inquiry submitted successfully');
        formikHelpers.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className='w-[400px] lg:w-auto h-fit border border-[#ECECEC] rounded-[15px] p-[30px]'>
      <TypographyH2 className='text-[#414042] text-2xl font-medium'>
        Submit Your Inquiry :
      </TypographyH2>
      {showUserClass && (
        <ButtonGroup
          categories={['Buy', 'Rent']}
          className='w-full flex justify-between gap-4 my-3'
          buttonClassName='flex w-full'
          onCategoryChange={(category) =>
            setLeadClassId(category === 'Buy' ? 3 : 4)
          }
        />
      )}
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col gap-2'>
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
              onClick={() => form.setTouched({ firstName: true })}
              onChange={form.handleChange}
            />
            <TextHighlight className='text-sm px-3'>
              {form.touched.firstName && form.errors.firstName}
            </TextHighlight>
          </div>
          <div className='flex flex-col mt-4 relative'>
            <label className='text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4'>
              Last Name
            </label>
            <Input
              type='text'
              className='border border-[#ECECEC] rounded-[5px] p-[12px] placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal'
              placeholder='Last Name'
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
              onClick={() => form.setTouched({ phone: true })}
              id='phone'
              value={form.values.phone}
              onChange={form.handleChange}
            />
            <TextHighlight className='text-sm px-3'>
              {form.touched.phone && form.errors.phone}
            </TextHighlight>
          </div>
          {!!unitTypes?.length && (
            <div className='flex flex-col mt-4 relative'>
              <label className='text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4'>
                Unit Type
              </label>
              <AppSelect
                data={unitTypes.map((item) => ({
                  label: item.name,
                  value: item.id.toString(),
                }))}
                value={form.values.unitTypeId?.toString()}
                onChange={(e) =>
                  form.setValues({ ...form.values, unitTypeId: +e })
                }
                onOpen={() => form.setTouched({ unitTypeId: true })}
              />
              <TextHighlight className='text-sm px-3'>
                {form.touched.unitTypeId && form.errors.unitTypeId}
              </TextHighlight>
            </div>
          )}
          <div className='flex flex-col gap-y-3 mt-5'>
            <div className='flex gap-x-3 '>
              <Checkbox
                id='calls'
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
