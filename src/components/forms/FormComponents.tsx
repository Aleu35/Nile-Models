import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';

interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  [key: string]: any;
}

export function InputField({ name, label, required, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-white text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        {...props}
        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-white"
      />
    </div>
  );
}

export function SelectField({ name, label, required, options, ...props }: FormFieldProps & { options: string[] }) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-white text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Select name={name} {...props}>
        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="text-white hover:bg-gray-700">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function DateField({ name, label, required, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-white text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type="date"
        {...props}
        className="bg-gray-800 border-gray-700 text-white"
      />
    </div>
  );
}

export function CountryField({ name, label, required, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-white text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        {...props}
        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-white"
      />
    </div>
  );
}

export function TextArea({ name, label, required, rows = 4, ...props }: FormFieldProps & { rows?: number }) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-white text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Textarea
        id={name}
        name={name}
        rows={rows}
        {...props}
        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-white"
      />
    </div>
  );
}

export function FileInput({ name, label, required, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-white text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type="file"
        {...props}
        className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
      />
    </div>
  );
}

export function SubmitButton({ children = "Submit Application", ...props }: any) {
  return (
    <Button 
      type="submit" 
      className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3"
      {...props}
    >
      {children}
    </Button>
  );
}

// Named exports for UI components (for compatibility with other imports)
export { Input };
export { Select };
export { Textarea }; 