type FormFieldProps = {
  fieldName: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
};

function FormField({fieldName,type,name,value,onChange,isRequired = false,}: FormFieldProps) {
    return(
        <>
            <label className="text-sm mb-4">{fieldName}</label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={onChange} 
                required={isRequired} 
                autoComplete="off"
                className="bg-transparent border border-edge p-2 outline-none focus:border-hoverc mb-4 ${isNotMatch && formData.confirmPassword ? 'border-red-500' : 'border-edge'}" 
            />
        </>
    )
}

export default FormField;