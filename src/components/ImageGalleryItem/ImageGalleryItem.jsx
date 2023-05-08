import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import  Modal  from 'components/Modal/Modal';
import { useState } from "react";

export default function ImageGalleryItem({fields}) {
const [isModalOpen, setIsModalOpen] = useState(false)


const openModal = () => {
  setIsModalOpen(true);
};
const closeModal = () => {
  setIsModalOpen(false);
};
    return(
      <li className={css.ImageGalleryItem} >
          <img
             className={css.ImageGalleryItemImage}
             onClick={openModal}
             src={fields.webformatURL}
             alt={fields.tags}
          
          />
          {isModalOpen && (
          <Modal onClose={closeModal}>
            <img src={fields.largeImageURL} alt={fields.tags} />
            </Modal>
            )}
        </li>
      )
 }


 ImageGalleryItem.propTypes = {
  fields: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
