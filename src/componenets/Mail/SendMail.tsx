import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { sendMail } from '../../utils/mail-api';
import FormError from '../Form/FormError/FormError';
import FormField from '../Form/FormField/FormField';
import FormHeader from '../Form/FormHeader/FormHeader';
import FormSubmitButton from '../Form/FormSubmitButton/FormSubmitButton';

type MailingListFormData = {
  header: string;
  body: string;
  error?: string;
};

function SendMail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MailingListFormData>({
    header: '',
    body: '',
  });

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
      await sendMail(
        {
          header: formData.header,
          body: formData.body,
        },
        id!
      );
    } catch {
      setFormData({
        ...formData,
        error: 'Failed to send mail. Please try again',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-80"
    >
      <FormHeader text={'Send Mail to Subscribers:'} />
      <FormField
        fieldName="Subject"
        type="text"
        name="header"
        value={formData.header}
        onChange={handleChange}
        isRequired={true}
      />
      <FormField
        fieldName="Body"
        type="text"
        name="body"
        value={formData.body}
        onChange={handleChange}
        isRequired={true}
      />
      <FormSubmitButton buttonText={'Send Mail'} isInvalid={loading} />
      {formData.error && <FormError errorText={formData.error} />}
    </form>
  );
}

export default SendMail;
