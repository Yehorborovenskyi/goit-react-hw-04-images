import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import  { useState} from 'react';

export default function SearchBar({onSubmit}) {
const [input, setInput] = useState('')

const handleChange = event => {
setInput(event.currentTarget.value)
}

const handleSubmit = event =>{
  event.preventDefault();
  onSubmit({input})


}

return (
  <header className={css.Searchbar}>
  <form className={css.SearchForm} onSubmit={handleSubmit}>
   <button type="submit" className={css.SearchFormButton}>
     <span className={css.SearchFormButtonLabel}>Search</span>
   </button>

   <input
   className={css.SearchFormInput}
   onChange={handleChange}
   type="text"
   autoFocus
   name="search"
   placeholder="Search images and photos"
    
   />
 </form>
</header>
 );

}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};