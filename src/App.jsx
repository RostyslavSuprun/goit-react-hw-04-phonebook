import { Component } from 'react';

import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';

import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

import styles from './App.module.css';

class App extends Component {
  // Стейт очищено при першому старті
  state = {
    contacts: [],
    filter: '',
  };
  // Перевірка наявності збережених контактів в локалсториджі
  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) {
      this.setState({ contacts: JSON.parse(localContacts) });
    }
  }
  // зміна збережених контактів після апдейту стейту
  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  // Метод, що додає контакт
  addContact = newContact => {
    // Перевірка на дублювання
    const duplicateName = this.state.contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateName) {
      alert(`${newContact.name} is already on contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  // Метод, що спостерігає за полем фільтрації і пише в стейт
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  // Метод для фільтрування контактів по введеним у полі пошука і повернення результату фільтру
  filterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Метод для видалення контакту
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredResults = this.filterContacts();

    return (
      <Container>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredResults}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
