import PropTypes from 'prop-types';

export const photoPropType = PropTypes.shape({
  link: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});
