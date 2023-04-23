import PropTypes from 'prop-types';

import ContactItem from './ContactItem/ContactItem';
import styles from './ContactList.module.css';

// Приймає всі наявні контакти, складає в єдиний ul і підключає метод для можливості видалення контакту
const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactItem
          contact={contact}
          onDeleteContact={onDeleteContact}
          key={contact.id}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
