import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormError from '../../../componenets/FormError/FormError.tsx';
import FormField from '../../../componenets/FormField/FormField.tsx';
import FormHeader from '../../../componenets/FormHeader/FormHeader.tsx';
import FormSubmitButton from '../../../componenets/FormSubmitButton/FormSubmitButton.tsx';
import NavBar from '../../../componenets/NavBar/NavBar.tsx';
import { createList } from '../../../utils/list-api.ts';

// public facing name
// internal name
// list type (is assumed in this form)
type MailingListFormData = {
  name_internal: string;
  name_external: string;
  list_type: string;
  error?: string;
};

function MailingListCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MailingListFormData>({
    name_internal: '',
    name_external: '',
    list_type: 'MAILING',
  });

  const isInvalid =
    !formData.name_internal.trim() || !formData.name_external.trim();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: '',
    });
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setLoading(true);
    try {
      const data = await createList({
        name: formData.name_internal,
        listtype: formData.list_type,
        public_facing_name: formData.name_external,
      });
      if (data) {
        navigate('/mailing-list/' + data.id);
      }
    } catch {
      setFormData({
        ...formData,
        error: 'Failed to create list. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-roboto uppercase">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow px-4 mt-10">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-80"
        >
          <FormHeader text={'Create New Mailing List'} />

          <FormField
            fieldName="List Name Internal"
            type="text"
            name="name_internal"
            value={formData.name_internal}
            onChange={handleChange}
            isRequired={true}
          />
          <FormField
            fieldName="List Name External"
            type="text"
            name="name_external"
            value={formData.name_external}
            onChange={handleChange}
            isRequired={true}
          />

          <FormSubmitButton
            buttonText={'Create List'}
            isInvalid={isInvalid || loading}
          />

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs text-center opacity-60 hover:opacity-100 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </form>

        {formData.error && <FormError errorText={formData.error} />}
      </div>
    </div>
  );
}

export default MailingListCreate;
