import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createList } from '../../utils/list-api.ts';
import FormError from '../Form/FormError/FormError.tsx';
import FormField from '../Form/FormField/FormField.tsx';
import FormHeader from '../Form/FormHeader/FormHeader.tsx';
import FormSubmitButton from '../Form/FormSubmitButton/FormSubmitButton.tsx';

type ListType = 'MAILING' | 'BUG' | 'INQUIRY';

type CreateListProps = {
  listType: ListType;
};

type ListFormData = {
  name_internal: string;
  name_external: string;
  list_type: string;
  error?: string;
};

function CreateListForm({ listType }: CreateListProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ListFormData>({
    name_internal: '',
    name_external: '',
    list_type: listType,
  });

  const isInvalid =
    !formData.name_internal.trim() || !formData.name_external.trim();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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
        list_type: formData.list_type,
        public_facing_name: formData.name_external,
      });
      if (data) {
        if (listType === 'MAILING') {
          navigate('/mailing-list/' + data.id);
        } else if (listType === 'BUG') {
          navigate('/bug-report/' + data.id);
        } else if (listType === 'INQUIRY') {
          navigate('/inquiry/' + data.id);
        }
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
    <div className="flex flex-col items-center justify-center flex-grow px-4 mt-10">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-80"
      >
        <FormHeader text={'Create New List'} />

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
  );
}

export default CreateListForm;
