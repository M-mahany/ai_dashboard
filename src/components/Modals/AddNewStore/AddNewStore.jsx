'use client';

import { Button, CircularProgress, IconButton } from '@mui/material';
import './AddNewStore.scss';
import { IoClose } from 'react-icons/io5';
import { newStoreForm } from './newStoreForm';
import FormInput from '@/components/FormInput/FormInput';
import { useEffect, useState } from 'react';
import { formValidation } from '@/utils/helpers/formvalidation';
import { useCreateNewStoreMutation } from '@/lib/services/storesApi';
import { toast } from 'react-toastify';

const AddNewStore = ({ setModal }) => {
  const [data, setData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const [createNewStore, { data: apiData, isLoading, error }] = useCreateNewStoreMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const hasErrors = Object.values(formErrors).some((val) => val !== '');
    if (hasErrors) {
      setShowErrors(true);
      return;
    }
    createNewStore(data);
  };

  useEffect(() => {
    if (data) {
      formValidation(newStoreForm, data, setFormErrors);
    }
  }, [data]);

  useEffect(() => {
    let type = '';
    let message = '';
    if (apiData) {
      type = 'success';
      message = apiData?.data?.message || 'Store created successfully!';
    }
    if (error) {
      type = 'error';
      message = error?.data?.message || 'Error creating store!';
    }

    if (error || apiData) {
      toast(message, { type });
      setTimeout(() => {
        setModal(null);
      }, 1000);
    }
  }, [error, apiData]);

  return (
    <div className="addNewStoreModal">
      <div className="modalHeader">
        <p>Add New Store</p>
        <IconButton className="closeBttn" onClick={() => setModal(null)}>
          <IoClose />
        </IconButton>
      </div>
      <div className="modalBody">
        {newStoreForm.map((input, i) => (
          <FormInput
            input={input}
            data={data}
            formErrors={showErrors ? formErrors : {}}
            handleChange={handleChange}
            key={i}
          />
        ))}
      </div>
      <div className="modalFooter">
        <Button onClick={() => setModal(null)}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {isLoading && (
            <CircularProgress
              style={{ color: 'var(--secondary)', width: '24px', height: '24px', marginRight: '12px' }}
            />
          )}
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </div>
  );
};

export default AddNewStore;
