import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { GlobalStyle } from './GlobalStyle';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { AppContainer, ContactsTitle, MainTitle } from './App.styled';

const localStorageKey = 'contacts';
export const App = () => {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(window.localStorage.getItem(localStorageKey));
    savedContacts && savedContacts > 0 && setContacts(savedContacts);
  }, [])
  
  useEffect(() => {
    setContacts(window.localStorage.setItem(localStorageKey, JSON.stringify(contacts)))
  }, [contacts])

  const addContact = ({name, number}) => {

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    const isExist = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (isExist) {
      alert(`${name} is alredy in contacts.`);
      return;
    }

    setContacts(prevState =>  [...prevState, newContact]
    )
  }

  const changeFilter = e => {
    setFilter(e.currentTarget.value)
  }

  const deleteContact = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId))
  }

    const normalizedFilter = filter.toLowerCase().trim();

    const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return (
      <AppContainer>
      <MainTitle>Phonebook</MainTitle>
        <ContactForm onAdd={addContact} />
        
        {contacts.length > 0 ? (
          <>
            <ContactsTitle>Contacts</ContactsTitle>
            <Filter value={filter} onFind={changeFilter}/>
            <ContactList items={visibleContacts} onDelete={deleteContact}/>
          </>
      ) : null}

      <GlobalStyle />
    </AppContainer>
    );

}
 


