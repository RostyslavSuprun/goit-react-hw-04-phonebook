import { useState } from 'react';
import {
  FieldItem,
  ContaierField,
  ContainerForm,
  BtnDisabled,
} from './ContactForm.styled';

export function ContactForm({ onData }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onData(name, number);
    setName('');
    setNumber('');
  };

  return (
    <ContainerForm onSubmit={handleSubmit}>
      <ContaierField>
        Name
        <FieldItem
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder=" enter name"
          onChange={handleChange}
        />
      </ContaierField>
      <ContaierField>
        Number
        <FieldItem
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder=" enter number"
          onChange={handleChange}
        />
      </ContaierField>
      <BtnDisabled type="submit" disabled={!name || !number}>
        Add contact
      </BtnDisabled>
    </ContainerForm>
  );
}
