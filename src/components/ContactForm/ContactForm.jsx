import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  // PropTypes як статична властивысть
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  // Стейт форми з початковим пустим заповненням Name і Number
  state = {
    name: '',
    number: '',
  };

  // Метод, що наблюдає за інпутами і що записує в state їх значення
  hanldeChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  // Метод на відправці форми, що формує зі state контакт і передає до зовнішного методу
  hanldeSubmit = event => {
    event.preventDefault();

    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    // Зовнішній метод в пропсах класа
    this.props.onSubmit(contact);

    this.resetForm();
  };

  // Очищення полей форми після отправки
  resetForm = () => {
    this.setState({
      id: '',
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.hanldeSubmit}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            className={styles.input}
            // Пишемо значення до state
            value={this.state.name}
            // Спостерігаючий метод
            onChange={this.hanldeChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            type="tel"
            name="number"
            className={styles.input}
            // Пишемо значення до state
            value={this.state.number}
            // Спостерігаючий метод
            onChange={this.hanldeChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <div className={styles.button__wrapper}>
          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

export default ContactForm;
